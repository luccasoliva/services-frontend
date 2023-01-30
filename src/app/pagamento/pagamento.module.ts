import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentoRoutingModule } from './pagamento-routing.module';
import { MaterialModule } from '../material/material.module';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { FormPagamentoComponent } from './components/form-pagamento/form-pagamento.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../components/shared.module';
import { NavbarComponent } from '../components/navbar/navbar.component';


@NgModule({
  declarations: [
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent,
    FormPagamentoComponent,
    PagamentoComponent,
    ListarPagamentosComponent
  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class PagamentoModule { }
