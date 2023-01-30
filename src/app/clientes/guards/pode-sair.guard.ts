import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { ClientesComponent } from '../pages/clientes/clientes.component';


@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<ClientesComponent> {

  constructor(
    private dialog: MatDialog
  ) {}

  canDeactivate(
    component: ClientesComponent, // representa o componente que ele está inserido
    currentRoute: ActivatedRouteSnapshot, // a partir dele conseguimos acessar o valor dos parâmetros
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // se o guard retornar o valor TRUE, significa que a pessoa PODE sair da página
    // se o guard retornar o valor FALSE, significa que a pessoa NÃO PODE sair da página

    // 1° Pegar os dados do formulário e guardar cada um em variáveis diferentes

    const nome = component.formClientes.value.nome
    const email = component.formClientes.value.email

    if (nome != component.clientes.nome || email != component.clientes.email) {
      const dialogRef = this.dialog.open(ConfirmarSaidaComponent)

      const querSair = dialogRef.afterClosed()

      return querSair
    } else {
      return true
    }
  }
}
