// src/sales/venda.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn, // Adicionado para melhor prática na data
} from 'typeorm';
import { Cliente } from '../clients/cliente.entity';
import { Produto } from '../products/produto.entity';
import { MetodoPagamento } from '../payments/metodo_pagamento.entity';

@Entity('venda')
export class Venda {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @ManyToOne(() => MetodoPagamento)
  @JoinColumn({ name: 'metodo_de_pagamento_id' })
  metodoPagamento: MetodoPagamento;

  // --- DADOS DE PREÇO E CÁLCULO ---
  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  precoVenda: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  taxaAplicada: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  valorLiquido: number;

  // --- METADADOS ---
  @CreateDateColumn({ type: 'timestamp with time zone' })
  dataVenda: Date;

  @Column({ length: 50, default: 'Pago' })
  status: string;
}
