
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



  constructor(
    public authService: AuthService,
    private route: Router,

  ) { }

  ngOnInit(): void {
  }

  chamarFuncionario() {

    this.route.navigateByUrl("/funcionarios")
  }
  chamarPagamento() {

    this.route.navigateByUrl("/pagamentos")
  }
  chamarCargos() {

    this.route.navigateByUrl("/cargos")
  }

  chamarClientes() {

    this.route.navigateByUrl("/clientes")
  }

  chamarChamados() {

    this.route.navigateByUrl("/chamados")
  }

  getEmailToken(){
    return this.authService.getEmailToken()
  }
  tempoToken(){
    return this.authService.tempoApp()
  }
}
