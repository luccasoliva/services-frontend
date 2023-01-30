import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChamadoRoutingModule } from './chamado-routing.module';
import { ChamadoComponent } from './pages/chamado/chamado.component';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { FormChamadoComponent } from './components/form-chamado/form-chamado.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../components/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ChamadoComponent,
    ListarChamadosComponent,
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent,
    FormChamadoComponent
  ],
  imports: [
    CommonModule,
    ChamadoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ChamadoModule { }
