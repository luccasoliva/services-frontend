import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';
import { CargoComponent } from './pages/cargo/cargo.component';
import { FormCargoComponent } from './components/form-cargo/form-cargo.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { CargosRoutingModule } from './cargos-routing.module';
import { SharedModule } from '../components/shared.module';



@NgModule({
  declarations: [
    ListarCargosComponent,
    CargoComponent,
    FormCargoComponent,
    ConfirmarDelecaoComponent,
    ConfirmarSaidaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CargosRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class CargoModule { } 