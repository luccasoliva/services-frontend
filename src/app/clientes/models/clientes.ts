import { Endereco } from "./endereco"

export interface Clientes {
  idCliente: number
  nome: string
  email: string
  idEndereco: Endereco
}

