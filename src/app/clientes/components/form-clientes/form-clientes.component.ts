import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Clientes } from '../../models/clientes';
import { ClientesService } from '../../services/clientes.service';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-form-clientes',
  templateUrl: './form-clientes.component.html',
  styleUrls: ['./form-clientes.component.css']
})
export class FormClientesComponent implements OnInit {

  formClientes: FormGroup = this.fb.group({
    nome: ['',[Validators.required]],
    email: ['',[Validators.required]],

  })

  salvandoClientes: boolean = false

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private dialogRef: MatDialogRef<FormClientesComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  salvar() {
    this.salvandoClientes = true
    const c: Clientes = this.formClientes.value
    let obsSalvar: Observable<any> = this.clienteService.saveCliente(c)

    obsSalvar.subscribe(
      (resultado) => {
        this.snackbar.open('Cliente salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )

  }

  signOut(): void {
    this.dialog.open(ConfirmarSaidaComponent).afterClosed()
    .subscribe((out) => {
      if(out) {

        this.dialog.closeAll()
      }
    })
  }

}
