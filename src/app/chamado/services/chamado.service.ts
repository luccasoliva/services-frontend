import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Clientes } from 'src/app/clientes/models/clientes';
import { PagamentoService } from 'src/app/pagamento/services/pagamento.service';
import { Chamado } from '../models/chamado';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/chamados'
  atualizarChamadosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private pagService: PagamentoService
  ) { }

  
  getChamados(): Observable<Chamado[]> {
    const token = this.auth.recuperarToken()
    return this.http.get<Chamado[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getChamadoById(id: number): Observable<Chamado> {
    const token = this.auth.recuperarToken()
    return this.http.get<Chamado>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteChamado(chamado: number): Observable<any> {
    const token = this.auth.recuperarToken()
    return this.http.delete(`${this.baseUrl}/${chamado}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  saveChamado(chamado:Chamado, idCliente:number, idFuncionario:number) {
    const token = this.auth.recuperarToken()
    
    return this.http.post<Chamado>(`${this.baseUrl}/${idCliente}/${idFuncionario}`,chamado, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
   

  }

  updateChamado(chamado:Chamado) {
    const token = this.auth.recuperarToken()
    return this.http.put(`${this.baseUrl}/${chamado.idChamado}`, chamado, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((upChamado) => {
        this.atualizarChamadosSub$.next(true)
      })
    )
  }

}
