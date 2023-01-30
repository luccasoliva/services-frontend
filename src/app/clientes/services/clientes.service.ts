import { Clientes } from './../models/clientes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/clientes'
  atualizarClientesSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getClientes(): Observable<Clientes[]> {
    const token = this.auth.recuperarToken()
    return this.http.get<Clientes[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getClienteById(id: number): Observable<Clientes> {
    const token = this.auth.recuperarToken()
    return this.http.get<Clientes>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteCliente(clientes: Clientes): Observable<any> {
    const token = this.auth.recuperarToken()
    return this.http.delete<Clientes>(`${this.baseUrl}/${clientes}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  saveCliente(clientes:Clientes) {
    const token = this.auth.recuperarToken()
    return this.http.post<Clientes>(this.baseUrl,clientes, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateCliente(clientes:Clientes) {
    const token = this.auth.recuperarToken()
    return this.http.put<Clientes>(`${this.baseUrl}/${clientes.idCliente}`, clientes, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((upClientes) => {
        this.atualizarClientesSub$.next(true)
      })
    )
  }
}
