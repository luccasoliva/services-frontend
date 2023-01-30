import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { Funcionario } from '../models/funcionario';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // importação do fireStorage
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly baseUrl: string = 'http://localhost:8080/servicos/funcionarios'
  atualizarFuncionariosSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage, // objeto responsável por salvar os arquivos no firebase
    private authService: AuthService

  ) { }

  getFuncionarios(): Observable<Funcionario[]> {
    const token = this.authService.recuperarToken()

    // Bearer token
    return this.http.get<Funcionario[]>(`${this.baseUrl}/ativos`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  // http://localhost:3000/funcionarios/
  deleteFuncionario(func: Funcionario): Observable<any> {
    const token = this.authService.recuperarToken()

    // se não tiver foto, apenas será deletado o email e nome
    if (func.foto && func.foto.length > 0) {
      //1° pegar a referência da imagem no fireStorage
      /**
       * refFromURL() pega referência do arquivo do storage pelo link de acesso gerado
       * pelo firebase
       */
      return this.storage.refFromURL(func.foto).delete()
      .pipe(
        mergeMap(() => {
          /**
           * mergeMap tem a função de pegar dois ou mais observables e transformar todos
           * em um só
           */
          return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        })
      )
    }

    return this.http.delete<any>(`${this.baseUrl}/${func.idFuncionario}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getFuncionarioById(id: number): Observable<Funcionario> {
    const token = this.authService.recuperarToken()

    return this.http.get<Funcionario>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }


  salvarFuncionario(func: Funcionario,idCargo: number, foto?: File ) {
    const token = this.authService.recuperarToken()
 
    if (foto == undefined) { 
      return this.http.post<Funcionario>(`${this.baseUrl}/${idCargo}`, func, {
        headers: {
          Authorization: `Bearer ${token}`
        }})
    }

    return this.http.post<Funcionario>(`${this.baseUrl}/${idCargo}`, func, {
      headers: {
        Authorization: `Bearer ${token}`
      }})

    .pipe(
      map(async (func) => {
       
        const linkFotoFirebase = await this.uploadImagem(foto)

      
        func.foto = linkFotoFirebase

     
        return this.atualizarFuncionario(func)
      })
    )
  }

  // fazer com que a função receba a foto ou não

  atualizarFuncionario(func: Funcionario, foto?: File): any{
    const token = this.authService.recuperarToken()

    
    // se a foto não foi passada, atualizar apenas com os dados básicos
    if (foto == undefined) {
      return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .pipe(
        tap((funcionario) => {
          this.atualizarFuncionariosSub$.next(true)
        })
      )
    }


    // se já existir uma foto ligada a esse funcionário, iremos deletá-la para pôr a nova
    if (func.foto && func.foto.length > 0) {
      const inscricao = this.storage.refFromURL(func.foto).delete()
      .subscribe(
        () => {
          inscricao.unsubscribe()
        }
      )
    }

    return this.http.put<Funcionario>(`${this.baseUrl}/${func.idFuncionario}`, func, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).pipe(
      mergeMap(async (funcionarioAtualizado) => {
        const linkFotoFirebase = await this.uploadImagem(foto)

        funcionarioAtualizado.foto = linkFotoFirebase

        return this.atualizarFuncionario(funcionarioAtualizado)
      }),
      tap((funcionario) => {
        this.atualizarFuncionariosSub$.next(true)
      })
    )
  }

  // 1° Pegar a imagem
  // 2° Fazer o upload da imagem
  // 3° Gerar o link de download e retorná-lo
  private async uploadImagem(foto: File): Promise<string> {
    // a palavra async informa que a função vai trabalhar com
    // código assíncrono, ou seja, códigos que demoram para serem executados

    const nomeDoArquivo = Date.now() // retorna a data atual em milissegundos

    // faz o upload do arquivo para o firebase
    // 1° Parâmetro: nome do arquivo
    // 2° Parâmetro: o arquivo que deve ser enviado
    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto)

    // a propriedade REF é a referência do arquivo no firebase

    const downloadURL = await dados.ref.getDownloadURL() // retorna um link pro acesso da imagem

    return downloadURL
  }


}
