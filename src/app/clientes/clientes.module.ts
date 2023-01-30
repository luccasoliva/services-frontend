import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../components/shared.module';
import { MaterialModule } from '../material/material.module';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { FormClientesComponent } from './components/form-clientes/form-clientes.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

@NgModule({
  declarations: [
    ListarClientesComponent,
    ClientesComponent,
    FormClientesComponent,
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
})
export class ClientesModule {}
