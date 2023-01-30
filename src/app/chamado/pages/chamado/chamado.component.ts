import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Chamado } from '../../models/chamado';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-chamado',
  templateUrl: './chamado.component.html',
  styleUrls: ['./chamado.component.css']
})
export class ChamadoComponent implements OnInit {

  chamado!: Chamado
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  formChamado: FormGroup = this.fb.group({
    titulo: ['',[Validators.required]],
    descricao: ['',[Validators.required]],
    status: ['', [Validators.required]],
    dataEntrada: ['', [Validators.required]]

  })
  funcionario: Funcionario[] = []
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private chamadoService: ChamadoService
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
        let idChamado = parseInt(params.get('idChamado') ?? '0')
        this.recuperarChamado(idChamado)
      }
    )
  }
  recuperarChamado(id: number) {
    this.chamadoService.getChamadoById(id).subscribe(
      chamados => {
        this.chamado = chamados

        this.formChamado.setValue({
          titulo: this.chamado.titulo,
          descricao: this.chamado.descricao,
          status: this.chamado.status,
          dataEntrada: this.chamado.dataEntrada
        })
        
        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  valorMudou() {
    this.formChamado.valueChanges.subscribe(
      (valores) => {
        this.desabilitar = this.formChamado.invalid || !(valores.titulo != this.chamado.titulo ||
                                                        valores.descricao != this.chamado.descricao ||
                                                        valores.status != this.chamado.status)
      }
    )
  }
  salvarAtualizacoes() {
    const c: Chamado = { ...this.formChamado.value }
    c.idChamado = this.chamado.idChamado

    const obsSalvar: Observable<any> = this.chamadoService.updateChamado(c)
  
    obsSalvar.subscribe(
      (resultado) => {
              this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
                duration: 3000
              })
              this.chamado = resultado
              this.recuperarChamado(resultado.idChamado)
            })

  }

  delete() {
    this.dialog.open(ConfirmarDelecaoComponent).afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.chamadoService.deleteChamado(this.chamado.idChamado as number).subscribe(
            () => {
              this.snackbar.open('Chamado deletado', 'Ok', {
                duration: 3000
              })
              this.router.navigateByUrl('/chamados')
            }
          )
        }
      }
    )
  }

  }




