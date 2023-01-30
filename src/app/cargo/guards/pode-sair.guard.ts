import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { CargoComponent } from '../pages/cargo/cargo.component';


@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<CargoComponent> {

  constructor(
    private dialog: MatDialog
  ) {}

  canDeactivate(
    component: CargoComponent, // representa o componente que ele está inserido
    currentRoute: ActivatedRouteSnapshot, // a partir dele conseguimos acessar o valor dos parâmetros
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // se o guard retornar o valor TRUE, significa que a pessoa PODE sair da página
    // se o guard retornar o valor FALSE, significa que a pessoa NÃO PODE sair da página

    // 1° Pegar os dados do formulário e guardar cada um em variáveis diferentes

    const nome = component.formCargo.value.nome
    const descricao = component.formCargo.value.descricao
    const salario = component.formCargo.value.salario

    if (nome != component.cargo.nome || descricao != component.cargo.descricao|| salario != component.cargo.salario) {
      const dialogRef = this.dialog.open(ConfirmarSaidaComponent)

      const querSair = dialogRef.afterClosed()

      return querSair
    } else {
      return true
    }
  }
}
