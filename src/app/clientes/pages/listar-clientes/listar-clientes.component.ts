import { ConfirmarDelecaoComponent } from 'src/app/clientes/components/confirmar-delecao/confirmar-delecao.component';
import { FormClientesComponent } from 'src/app/clientes/components/form-clientes/form-clientes.component';
import { ClientesService } from './../../services/clientes.service';
import { Clientes } from './../../models/clientes';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css']
})
export class ListarClientesComponent implements OnInit {

  clientes: Clientes[] = []
  colunas: Array<string> = ['id', 'nome', 'email','endereco', 'actions' ]

  constructor(
    private clientesService: ClientesService,
    private dialog: MatDialog, // responsável por abrir o componente confirmar-delecao na tela
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.clientesService.atualizarClientesSub$
    .subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarClientes()
        }
      }
    )
  }

  deletarCliente(cliente: Clientes): void {

    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)


    dialogRef.afterClosed()
    .subscribe(
      (deletar) => {

        if (deletar == true) {
          this.clientesService.deleteCliente(cliente)
          .subscribe(
            () => {
              this.snackbar.open('Cliente deletado', 'Ok', {
                duration: 3000
              })
              this.recuperarClientes()
            },
            (error) => {
              this.snackbar.open('Não foi possível deletar o Cliente', 'Ok', {
                duration: 3000
              })
              console.log(error)
            }
          )
        }
      }
    )
  }

  recuperarClientes(): void {
    this.clientesService.getClientes().subscribe(
      (clientes) => { // sucesso
        this.clientes = clientes.reverse()


      },
      (erro) => { // erro
        console.log(erro)
      },
      () => { // complete
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormClientes(): void {

    const referenciaDialog = this.dialog.open(FormClientesComponent)


    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarClientes()
      }
    )
  }
}
