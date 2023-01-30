import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Cargo } from '../../models/cargo';
import { CargoService } from '../../services/cargo.service';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit {

  formCargo: FormGroup = this.fb.group({
    nome: ['',[Validators.required]],
    descricao: ['',[Validators.required]],
    salario: ['', [Validators.required]]
  })

  salvandoCargo: boolean = false

  constructor(
    private fb: FormBuilder,
    private cargoService: CargoService,
    private dialogRef: MatDialogRef<FormCargoComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  salvar() {
    this.salvandoCargo = true
    const c: Cargo = this.formCargo.value
    let obsSalvar: Observable<any> = this.cargoService.saveCargo(c)

    obsSalvar.subscribe(
      (resultado) => {
        this.snackbar.open('Cargo salvo com sucesso', 'Ok', {
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
