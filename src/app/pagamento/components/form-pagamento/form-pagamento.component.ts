import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Chamado } from 'src/app/chamado/models/chamado';
import { Pagamento } from '../../models/pagamento';
import { PagamentoService } from '../../services/pagamento.service';
import { ConfirmarDelecaoComponent } from '../confirmar-delecao/confirmar-delecao.component';

@Component({
  selector: 'app-form-pagamento',
  templateUrl: './form-pagamento.component.html',
  styleUrls: ['./form-pagamento.component.css']
})
export class FormPagamentoComponent implements OnInit {

  formPagamento: FormGroup = this.fb.group({
    formaPagamento: ['',[Validators.required]],
    status: ['',[Validators.required]],
    valor: ['', [Validators.required]]
  })

  salvandoPagamento: boolean = false

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormPagamentoComponent>,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private pagamentoService: PagamentoService
  ) { }

  ngOnInit(): void {
  }

  salvar() {
    this.salvandoPagamento = true
    const p: Pagamento= this.formPagamento.value
    let obsSalvar: Observable<any> = this.pagamentoService.savePagamento(p)

    obsSalvar.subscribe(
      (resultado) => {
        this.snackbar.open('Pagamento salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
      }
    )
  }
  fecharDialog(): void {
    this.dialog.open(ConfirmarDelecaoComponent).afterClosed()
    .subscribe((sair) => {
        this.dialog.closeAll()   
    })
  }
}
