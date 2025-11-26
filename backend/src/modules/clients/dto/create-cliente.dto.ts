/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateClienteDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  nome: string;
}
