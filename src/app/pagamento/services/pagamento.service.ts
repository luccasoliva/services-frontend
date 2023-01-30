import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Pagamento } from '../models/pagamento';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/pagamentos'
  atualizarPagamentosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getPagamentos(): Observable<Pagamento[]> {
    const token = this.auth.recuperarToken()
    return this.http.get<Pagamento[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })    
  }

  getPagamentoById(id: number): Observable<Pagamento> {
    const token = this.auth.recuperarToken()
    return this.http.get<Pagamento>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deletePagamento(pag: Pagamento): Observable<any> {
    const token = this.auth.recuperarToken()
    return this.http.delete(`${this.baseUrl}/${pag.idPagamento}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }
  savePagamento(pag: Pagamento) {
    const token = this.auth.recuperarToken()
    return this.http.post<Pagamento>(`${this.baseUrl}/${pag.idPagamento}`, pag, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  updatePagamento(pag: Pagamento) {
    const token = this.auth.recuperarToken()
    return this.http.put(`${this.baseUrl}/${pag.idPagamento}`, pag, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((upPag) => {
        this.atualizarPagamentosSub$.next(true)
      })
    )
  }

}
