import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetodoPagamento } from './metodo_pagamento.entity';
import { MetodoPagamentoService } from './metodo_pagamento.service';
import { MetodoPagamentoController } from './metodo_pagamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MetodoPagamento])],

  providers: [MetodoPagamentoService],

  controllers: [MetodoPagamentoController],

  exports: [MetodoPagamentoService],
})
export class MetodoPagamentoModule {}
