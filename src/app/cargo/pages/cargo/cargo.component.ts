import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {
  
  cargo!: Cargo
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  formCargo: FormGroup = this.fb.group({
    nome: ['',[Validators.required]],
    descricao: ['',[Validators.required]],
    salario: ['', [Validators.required]]
  })
  constructor(
    private route: ActivatedRoute,
    private cargoSerive: CargoService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idCargo = parseInt(params.get('idCargo') ?? '0')
        this.recuperarCargo(idCargo)
      }
    )
  }

  recuperarCargo(id: number) {
    this.cargoSerive.getCargoById(id).subscribe(
      carg => {
        this.cargo = carg

        this.formCargo.setValue({
          nome: this.cargo.nome,
          descricao: this.cargo.descricao,
          salario: this.cargo.salario
        })
        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  valorMudou() {
    this.formCargo.valueChanges.subscribe(
      (valores) => {
        this.desabilitar = this.formCargo.invalid || !(valores.nome != this.cargo.nome ||
                                                        valores.descricao != this.cargo.descricao ||
                                                        valores.salario != this.cargo.salario )
      }
    )
  }

  salvarAtualizacoes() {
    const c: Cargo = { ...this.formCargo.value }
    c.idCargo = this.cargo.idCargo

    const obsSalvar: Observable<any> = this.cargoSerive.updateCargo(c)
  
    obsSalvar.subscribe(
      (resultado) => {
              this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
                duration: 3000
              })
              this.cargo = resultado
              this.recuperarCargo(resultado.idCargo)
            })
  }

  delete() {
    this.dialog.open(ConfirmarDelecaoComponent).afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.cargoSerive.deleteCargo(this.cargo).subscribe(
            () => {
              this.snackbar.open('Cargo deletado', 'Ok', {
                duration: 3000
              })
              this.router.navigateByUrl('/cargos')
            }
          )
        }
      }
    )
  }

}
