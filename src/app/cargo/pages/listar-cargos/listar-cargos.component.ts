import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmarDelecaoComponent } from 'src/app/funcionarios/components/confirmar-delecao/confirmar-delecao.component';
import { FormCargoComponent } from '../../components/form-cargo/form-cargo.component';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css']
})
export class ListarCargosComponent implements OnInit {

    cargos: Cargo[] =[]
    colunas: Array<string> = ['id', 'nome', 'descricao', 'salario' ,'actions']

  constructor(
    private cargoService: CargoService,
    private dialog: MatDialog, // responsável por abrir o componente confirmar-delecao na tela
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log('passando aqui')
    this.cargoService.atualizarCargosSub$.subscribe(
      (precisaAtualizar) => {
        if(precisaAtualizar) {
          this.recuperarCargos()
        }
      }
    )
    
  }

  recuperarCargos() {
    this.cargoService.getCargos().subscribe(
      (cargos) => {
        this.cargos = cargos.reverse()
      },
      (erro) => {
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso!!')
      }
    )
  }

  abrirFormCargos() {
    const referenciaDialog = this.dialog.open(FormCargoComponent)

    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarCargos()
      }
    )
  }

  deletarCargos(cargo: Cargo) {
    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.cargoService.deleteCargo(cargo).subscribe(
            () => {
              this.snackbar.open('Cargo deletado', 'OK',{
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right'
              } )
              this.recuperarCargos()
            },
            (error) => {
              this.snackbar.open('Não foi possível deletar o cargo', 'Ok', {
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
