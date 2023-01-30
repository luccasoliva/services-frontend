import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { Clientes } from '../../models/clientes';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: Clientes
  desabilitar: boolean = true
  naoEncontrado: boolean = false

  formClientes: FormGroup = this.fb.group({
    nome: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
  })
  constructor(
    private route: ActivatedRoute,
    private clienteService: ClientesService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idCliente = parseInt(params.get('idCliente') ?? '0')
        this.recuperarCliente(idCliente)
      }
    )
  }

  recuperarCliente(id: number) {
    this.clienteService.getClienteById(id).subscribe(
      client => {
        this.clientes = client

        this.formClientes.setValue({
          nome: this.clientes.nome,
          email: this.clientes.email
        })
        this.valorMudou()
      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

  valorMudou() {
    this.formClientes.valueChanges.subscribe(
      (valores) => {
        this.desabilitar = this.formClientes.invalid || !(valores.nome != this.clientes.nome ||
                                                        valores.email != this.clientes.email)
      }
    )
  }

  salvarAtualizacoes() {
    const c: Clientes = { ...this.formClientes.value }
    c.idCliente = this.clientes.idCliente

    const obsSalvar: Observable<any> = this.clienteService.updateCliente(c)

    obsSalvar.subscribe(
      (resultado) => {
              this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
                duration: 3000
              })
              this.clientes = resultado
              this.recuperarCliente(resultado.idCliente)
            })
  }

  delete() {
    this.dialog.open(ConfirmarDelecaoComponent).afterClosed().subscribe(
      (deletar) => {
        if (deletar) {
          this.clienteService.deleteCliente(this.clientes).subscribe(
            () => {
              this.snackbar.open('Cliente deletado', 'Ok', {
                duration: 3000
              })
              this.router.navigateByUrl('/clientes')
            }
          )
        }
      }
    )
  }

}
