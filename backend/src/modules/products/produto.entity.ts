import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal')
  preco: number;
}
