import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('metodo_pagamento')
export class MetodoPagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  taxa: number;
}
