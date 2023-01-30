import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormChamadoComponent } from '../../components/form-chamado/form-chamado.component';
import { Chamado } from '../../models/chamado';
import { ChamadoService } from '../../services/chamado.service';

@Component({
  selector: 'app-listar-chamados',
  templateUrl: './listar-chamados.component.html',
  styleUrls: ['./listar-chamados.component.css']
})
export class ListarChamadosComponent implements OnInit {
  chamados: Chamado[] = []

  colunas: Array<string> = ['id', 'titulo', 'data','status', 'statusPag', 'cliente', 'funcionario' ,'actions' ]

  

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private chamadosService: ChamadoService
  ) { }

  ngOnInit(): void {
    this.chamadosService.atualizarChamadosSub$
    .subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarChamados()
        }
      }
    )
  }
  recuperarChamados(): void {
    this.chamadosService.getChamados().subscribe(
      (chamados) => { // sucesso
        this.chamados = chamados.reverse()


      },
      (erro) => { // erro
        console.log(erro)
      },
      () => { // complete
        console.log('Dados enviados com sucesso')
      }
    )
  }
  deletarChamado(idChamado: number): void {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)
    dialogRef.afterClosed()
      .subscribe(
        (deletar) => {
          if (deletar) {
            this.chamadosService.deleteChamado(idChamado)
              .subscribe(
                () => {
                  this.snackbar.open('Chamado deletado', 'Ok', {
                    duration: 3000
                  })
                  this.recuperarChamados()
                },
                (error) => {
                  this.snackbar.open('Não foi possível deletar o chamado', 'Ok', {
                    duration: 3000
                  })
                  console.log(error)
                }
              )
          }
        }
      )
  }

  abrirFormChamados(): void {

    const referenciaDialog = this.dialog.open(FormChamadoComponent)


    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarChamados()
      }
    )
  }

}
