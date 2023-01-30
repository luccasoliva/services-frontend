import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Title} from '@angular/platform-browser';

// localhost:4200 -> localhost:4200/funcionarios

const routes: Routes = [
  {
    path: 'funcionarios',
    loadChildren: () => import('./funcionarios/funcionarios.module').then(m => m.FuncionariosModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'funcionarios',
    title: "Site ServicesFrontend- Squad02 "
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    title: "Site ServicesFrontend- Squad02 "
  },
  {
    path: 'cargos',
    loadChildren: () => import('./cargo/cargos.module').then(m =>m.CargoModule),
    title: "Site ServicesFrontend- Squad02 "
  },{
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m =>m.ClientesModule)
  },
  {
    path: 'pagamentos',
    loadChildren: () => import('./pagamento/pagamento.module').then(m => m.PagamentoModule),
    title: "Site ServicesFrontend- Squad02 "
  },
  {
    path: 'chamados',
    loadChildren: () => import('./chamado/chamado.module').then(m => m.ChamadoModule),
    title: "Site ServicesFrontend- Squad02 "
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
