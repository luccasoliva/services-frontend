import { ClientesComponent } from './pages/clientes/clientes.component';
import { ListarClientesComponent } from './pages/listar-clientes/listar-clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { IdValidatorGuard } from './guards/id-validator.guard';
import { PodeSairGuard } from './guards/pode-sair.guard';
import {Title} from '@angular/platform-browser';


export const routes: Routes = [
  {
    path: '',
    component: ListarClientesComponent,
    title: "Site ServicesFrontend- Clientes ",
    children: [
      {
        path: ':idCliente',
        component: ClientesComponent,
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
export class ClientesRoutingModule { }














