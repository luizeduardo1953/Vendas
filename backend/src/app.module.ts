import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './modules/clients/cliente.module';
import { ProdutoModule } from './modules/products/produto.module';
import { MetodoPagamentoModule } from './modules/payments/metodo_pagamento.modules';
import { VendaModule } from './modules/sales/venda.module';

@Module({
  imports: [
    ClienteModule,
    ProdutoModule,
    MetodoPagamentoModule,
    VendaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',

      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
