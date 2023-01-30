import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Clientes } from 'src/app/clientes/models/clientes';
import { ClientesService } from 'src/app/clientes/services/clientes.service';
import { Funcionario } from 'src/app/funcionarios/models/funcionario';
import { FuncionarioService } from 'src/app/funcionarios/services/funcionario.service';
import { Pagamento } from 'src/app/pagamento/models/pagamento';
import { PagamentoService } from 'src/app/pagamento/services/pagamento.service';
import { Chamado } from '../../models/chamado';
import { ChamadoService } from '../../services/chamado.service';
import { ConfirmarSaidaComponent } from '../confirmar-saida/confirmar-saida.component';

@Component({
  selector: 'app-form-chamado',
  templateUrl: './form-chamado.component.html',
  styleUrls: ['./form-chamado.component.css']
})
export class FormChamadoComponent implements OnInit {

  formChamado: FormGroup = this.fb.group({
    idChamado: ['',[Validators.required]],
    titulo: ['',[Validators.required]],
    descricao: ['',[Validators.required]],
    dataEntrada: ['', [Validators.required]],
    status: ['', [Validators.required]],
    formaPagamento: ['', [Validators.required]],
    statusPagamento: ['', [Validators.required]],
    valorPagamento: ['', [Validators.required]],
    idFuncionarios:['',[Validators.required]],
    idCliente:['',[Validators.required]]

  })

  clientes: Clientes[] = []
  funcionario: Funcionario[] = []

  salvandoChamado: boolean = false

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private chamadoService: ChamadoService,
    private dialogRef: MatDialogRef<FormChamadoComponent>,
    private funcService:FuncionarioService,
    private clienteService: ClientesService,
    private pagService: PagamentoService
  ) { }

  ngOnInit(): void {
   this.funcService.getFuncionarios().subscribe(
    (func) => { // sucesso
      this.funcionario = func
    },
    (erro) => { // erro
      console.log(erro)
    },
    () => { // complete
      console.log('Dados enviados com sucesso')
    }
  )
   
   this.clienteService.getClientes().subscribe(
    (cli) => { // sucesso
      this.clientes = cli
    },
    (erro) => { // erro
      console.log(erro)
    },
    () => { // complete
      console.log('Dados enviados com sucesso')
    }
  )
  }

  salvar() {
    this.salvandoChamado = true
    const c: Chamado = this.formChamado.value
    const idCliente:number = this.formChamado.value.idCliente
    const idFuncionario:number = this.formChamado.value.idFuncionarios
    let obsSalvar: Observable<any> = this.chamadoService.saveChamado(c,idCliente,idFuncionario)

    obsSalvar.subscribe(
      (resultado) => {
        this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
          duration: 3000
        })
        this.dialogRef.close()
        this.salvarPagamento()
      }
    )
    
}

salvarPagamento(){
  const c: any = this.formChamado.value
  let p: Pagamento ={}

  p.formaPagamento = c.formaPagamento
  p.idPagamento = c.idChamado
  p.status = c.statusPagamento
  p.valor = c.valorPagamento

  let obsSalvar: Observable<any> = this.pagService.savePagamento(p)

  obsSalvar.subscribe(
    (resultado) => {
      this.snackbar.open('Chamado salvo com sucesso', 'Ok', {
        duration: 3000
      })
      this.dialogRef.close()
    }
  )

}


sairDialog(): void {
  this.dialog.open(ConfirmarSaidaComponent).afterClosed()
  .subscribe((out) => {
    if(out) {
      
      this.dialog.closeAll()
    }
  })
}

}
