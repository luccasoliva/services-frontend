import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';

import { IdValidatorGuard } from './guards/id-validator.guard';

import { PodeSairGuard } from './guards/pode-sair.guard';
import { FuncionarioComponent } from './pages/funcionario/funcionario.component';
import { ListarFuncionariosComponent } from './pages/listar-funcionarios/listar-funcionarios.component';
import {Title} from '@angular/platform-browser';

const routes: Routes = [
  {
    path: '',
    component: ListarFuncionariosComponent,
    title: "Site ServicesFrontend- Funcionario ", 
    children: [
      {
        path: ':idFuncionario',
        component: FuncionarioComponent, 
        title: "Site ServicesFrontend- Squad02 ", 
        canDeactivate: [
          PodeSairGuard
        ],
        canActivate: [
          IdValidatorGuard,
          VerificacaoTokenGuard
        ]
      },
         
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
export class FuncionariosRoutingModule { }
