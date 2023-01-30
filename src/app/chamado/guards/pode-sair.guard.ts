import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { ChamadoComponent } from '../pages/chamado/chamado.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<ChamadoComponent> {

  constructor(
    private dialog: MatDialog
  ) {}


  canDeactivate(
    component: ChamadoComponent, // representa o componente que ele está inserido
    currentRoute: ActivatedRouteSnapshot, // a partir dele conseguimos acessar o valor dos parâmetros
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const titulo = component.formChamado.value.titulo
    const descricao = component.formChamado.value.descricao
    const data = component.formChamado.value.dataEntrada
    const status = component.formChamado.value.status


    if (titulo != component.chamado.titulo || descricao != component.chamado.descricao || data != component.chamado.dataEntrada || status != component.chamado.status /* || pagamento != component.chamado.pagamento */) {
      const dialogRef = this.dialog.open(ConfirmarSaidaComponent)

      const querSair = dialogRef.afterClosed()

      return querSair
    } else {
      return true
    }
  }
  
}
