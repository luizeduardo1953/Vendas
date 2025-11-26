import { CreateMetodoPagamentoDto } from './create-metodo-pagamento.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMetodoPagamentoDto extends PartialType(
  CreateMetodoPagamentoDto,
) {}
