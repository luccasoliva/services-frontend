import { Cargo } from "src/app/cargo/models/cargo"

export interface Funcionario {
  idFuncionario?: number
  nome: string
  email: string
  foto: string
  status: string
  idCargo?: Cargo

}
