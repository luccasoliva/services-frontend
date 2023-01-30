import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService, } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarLogoutComponent } from 'src/app/components/confirmar-logout/confirmar-logout.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = 'http://localhost:8080'
  private jwt = new JwtHelperService() // esse objeto permitirá saber se o token está válido ou não

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) { }

  signIn(user: User): Observable<{ Authorization: string }> {
    return this.http.post<{ Authorization: string }>(`${this.baseUrl}/login`, user)
    .pipe(
      tap((response) => {
        this.armazenarToken(response.Authorization)
      })
    )
  }
 // adicao de confirmacao logout



  signOut(): void {
    this.dialog.open(ConfirmarLogoutComponent).afterClosed()
    .subscribe((logout) => {
      if(logout) {
        this.removerToken()
        this.router.navigateByUrl('/auth/login')
      }
    })


  }

  armazenarToken(token: string): void {
    localStorage.setItem('authorization', token)
  }

  removerToken(): void {
    localStorage.removeItem('authorization')
  }

  recuperarToken(): string | null {
    return localStorage.getItem('authorization')
  }

  logado(): boolean {
    // o usuário estará logado se o token estiver armazenado
    // e o token ainda for válido

    const token = this.recuperarToken()

    if (token == null) {
      return false
    }

    return !this.jwt.isTokenExpired(token) // testando a validade do token
  }

  tempoApp() {

    const token = this.recuperarToken()!.toString()

    return this.jwt.getTokenExpirationDate(token)
  }
  getEmailToken() {

    const token = this.recuperarToken()!.toString()

    return this.jwt.decodeToken(token).sub
  }
}
