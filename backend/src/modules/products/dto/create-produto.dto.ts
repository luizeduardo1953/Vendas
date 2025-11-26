/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'O Nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O Nome não pode estar vazio.' })
  nome: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O Preço deve ser um número com até duas casas decimais' },
  )
  @IsNotEmpty({ message: 'O Preço não pode estar vazia.' })
  preco: number;
}
