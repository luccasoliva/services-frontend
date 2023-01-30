import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { IdValidatorGuard } from './guards/id-validator.guard';
import { PodeSairGuard } from './guards/pode-sair.guard';
import { CargoComponent } from './pages/cargo/cargo.component';
import { ListarCargosComponent } from './pages/listar-cargos/listar-cargos.component';
import {Title} from '@angular/platform-browser';


const routes: Routes = [
  {
    path: '',
    component: ListarCargosComponent,
    title: "Site ServicesFrontend- Cargos ", 
    children: [
      {
        path: ':idCargo',
        component: CargoComponent,
        title: "Site ServicesFrontend- Squad02 ", 
        canDeactivate: [
          PodeSairGuard
        ],
        canActivate: [
          IdValidatorGuard,
          VerificacaoTokenGuard
        ]
      }
    ],
    canActivate: [
      VerificacaoTokenGuard
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CargosRoutingModule { }
