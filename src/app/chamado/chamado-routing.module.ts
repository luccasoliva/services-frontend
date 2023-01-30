import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { IdValidatorGuard } from './guards/id-validator.guard';
import { PodeSairGuard } from './guards/pode-sair.guard';
import { ChamadoComponent } from './pages/chamado/chamado.component';
import { ListarChamadosComponent } from './pages/listar-chamados/listar-chamados.component';

const routes: Routes = [
  {
    path: '',
    component: ListarChamadosComponent,
    title: "Site ServicesFrontend- Cargos ", 
    children: [
      {
        path: ':idChamado',
        component: ChamadoComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChamadoRoutingModule { }
