import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cargo } from '../models/cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/cargos'
  atualizarCargosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)
  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getCargos(): Observable<Cargo[]> {
    const token = this.auth.recuperarToken()
    return this.http.get<Cargo[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getCargoById(id: number): Observable<Cargo> {
    const token = this.auth.recuperarToken()
    return this.http.get<Cargo>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  deleteCargo(cargo: Cargo): Observable<any> {
    const token = this.auth.recuperarToken()
    return this.http.delete(`${this.baseUrl}/${cargo.idCargo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
  }

  saveCargo(cargo:Cargo) {
    const token = this.auth.recuperarToken()
    return this.http.post<Cargo>(this.baseUrl,cargo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateCargo(cargo:Cargo) {
    const token = this.auth.recuperarToken()
    return this.http.put(`${this.baseUrl}/${cargo.idCargo}`, cargo, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      tap((upCargo) => {
        this.atualizarCargosSub$.next(true)
      })
    )
  }
}