import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

  pagamento!: Pagamento
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  formPagamento: FormGroup = this.fb.group({
    formaPagamento: ['',[Validators.required]],
    status: ['',[Validators.required]],
    valor: ['', [Validators.required]]
  })

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar, 
    private pagamentoService: PagamentoService,
    private dialog: MatDialog
   
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idPagamento = parseInt(params.get('idPagamento') ?? '0')
        this.recuperarPagamento(idPagamento)
      }
    )
  }

  recuperarPagamento(id: number) {
    this.pagamentoService.getPagamentoById(id).subscribe(
      pag => {
        this.pagamento = pag

        this.formPagamento.setValue({
          formaPagamento: this.pagamento.formaPagamento,
          status: this.pagamento.status,
          valor: this.pagamento.valor
        })
        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }
  valorMudou() {
    this.formPagamento.valueChanges.subscribe(
      (valores) => {
        this.desabilitar = this.formPagamento.invalid || !(valores.formaPagamento != this.pagamento.formaPagamento ||
                                                        valores.status != this.pagamento.status ||
                                                        valores.valor != this.pagamento.valor )
      }
    )
  }

  salvarAtualizacoes() {
    const p: Pagamento = { ...this.formPagamento.value }
    p.idPagamento = this.pagamento.idPagamento

    const obsSalvar: Observable<any> = this.pagamentoService.updatePagamento(p)
  
    obsSalvar.subscribe(
      (resultado) => {
        this.snackbar.open('Pagamento salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.pagamento = resultado
        this.recuperarPagamento(resultado.idPagamento)
      })
    }

    delete() {
    this.dialog.open(ConfirmarDelecaoComponent).afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.pagamentoService.deletePagamento(this.pagamento).subscribe(
            () => {
              this.snackbar.open('Pagamento deletado', 'Ok', {
                duration: 3000
              })
              this.router.navigateByUrl('/pagamentos')
            }
          )
        }
      }
    )
  }
}
