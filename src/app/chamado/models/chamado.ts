import { Clientes } from "src/app/clientes/models/clientes"
import { Funcionario } from "src/app/funcionarios/models/funcionario"
import { Pagamento } from "src/app/pagamento/models/pagamento"


export interface Chamado {
    idChamado?: number
    titulo: string
    descricao: string
    status: string
    dataEntrada: Date
    idFuncionario?: Funcionario
    idCliente?: Clientes
    idPagamento?:Pagamento
}