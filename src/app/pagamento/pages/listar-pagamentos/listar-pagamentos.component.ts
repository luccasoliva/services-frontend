import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormPagamentoComponent } from '../../components/form-pagamento/form-pagamento.component';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.css']
})
export class ListarPagamentosComponent implements OnInit {

  pagamento: Pagamento[] = []
  colunas: Array<string> = ['id', 'formaPagamento', 'status', 'valor', 'actions']

  constructor(
    private pagamentoService: PagamentoService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.pagamentoService.atualizarPagamentosSub$.subscribe(
      (precisaAtualizar) => {
        if(precisaAtualizar) {
          this.recuperarPagamentos()
        }
      }
    )
  }

  
  recuperarPagamentos() {
    this.pagamentoService.getPagamentos().subscribe(
      (pagamento) => {
        this.pagamento = pagamento.reverse()
      },
      (erro) => {
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso!!')
      }
    )
  }

  abrirFormPagamento() {
    const referenciaDialog = this.dialog.open(FormPagamentoComponent)

    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarPagamentos()
      }
    )
  }

  deletarPagamento(pagamento: Pagamento) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.pagamentoService.deletePagamento(pagamento).subscribe(
            () => {
              this.snackbar.open('Pagamento deletado', 'OK',{
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
              } )
              this.recuperarPagamentos()
            },
            (error) => {
              this.snackbar.open('Não foi possível deletar o pagamento', 'Ok', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
              })
              console.log(error)
            }
          )
        }
      }
    )
}

}
