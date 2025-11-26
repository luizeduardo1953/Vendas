import { CreateProdutoDto } from './create-produto.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {}
