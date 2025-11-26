import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('metodo_pagamento')
export class MetodoPagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  taxa: number;
}
