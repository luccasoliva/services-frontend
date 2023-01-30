import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmarSaidaComponent } from '../components/confirmar-saida/confirmar-saida.component';
import { PagamentoComponent } from '../pages/pagamento/pagamento.component';

@Injectable({
  providedIn: 'root'
})
export class PodeSairGuard implements CanDeactivate<PagamentoComponent> {
  constructor(
    private dialog: MatDialog
  ) {}
  canDeactivate(
    component: PagamentoComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const formPagamento = component.formPagamento.value.formaPagamento
      const status = component.formPagamento.value.status
      const valor = component.formPagamento.value.valor
  
      if (formPagamento != component.pagamento.formaPagamento || status != component.pagamento.status|| valor != component.pagamento.valor) {
        const dialogRef = this.dialog.open(ConfirmarSaidaComponent)
  
        const querSair = dialogRef.afterClosed()
  
        return querSair
      } else {
        return true
      }
  }
  
}
