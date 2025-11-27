/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVendaDto {
  @IsNotEmpty({ message: 'O ID do Produto não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do Produto deve ser um número.' })
  produtoId: number;

  @IsNotEmpty({ message: 'O ID do Método de Pagamento não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do Método de Pagamento deve ser um número.' })
  metodoPagamentoId: number;

  @IsNotEmpty({ message: 'O ID do Cliente não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do Cliente deve ser um número.' })
  clienteId: number;
}
