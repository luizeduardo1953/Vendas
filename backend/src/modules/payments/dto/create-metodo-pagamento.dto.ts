/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMetodoPagamentoDto {
  @IsString({ message: 'O Nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O Nome não pode estar vazio.' })
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'A Taxa deve ser um número com até duas casas decimais' },
  )
  @IsNotEmpty({ message: 'A Taxa não pode estar vazia.' })
  taxa: number;
}
