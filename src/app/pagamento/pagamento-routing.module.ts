import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificacaoTokenGuard } from '../guards/verificacao-token.guard';
import { IdValidatorGuard } from './guards/id-validator.guard';
import { PodeSairGuard } from './guards/pode-sair.guard';
import { ListarPagamentosComponent } from './pages/listar-pagamentos/listar-pagamentos.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';

const routes: Routes = [
  {
    path: '',
    component: ListarPagamentosComponent,
    title: "Site ServicesFrontend - Pagamentos ", 
    children: [
      {
        path: ':idPagamento',
        component: PagamentoComponent,
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
export class PagamentoRoutingModule { }
