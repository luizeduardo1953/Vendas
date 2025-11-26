// src/venda/venda.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venda } from './venda.entity';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';

// Importar os Módulos de Apoio
import { ClienteModule } from '../clients/cliente.module';
import { ProdutoModule } from '../products/produto.module';
import { MetodoPagamentoModule } from '../payments/metodo_pagamento.modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([Venda]),

    ClienteModule,
    ProdutoModule,
    MetodoPagamentoModule,
  ],
  controllers: [VendaController],
  providers: [VendaService],
})
export class VendaModule {}
