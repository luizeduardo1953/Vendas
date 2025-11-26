import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  async findById(id: number): Promise<Produto | null> {
    const produto = await this.produtoRepository.findOneBy({ id });
    if (produto) {
      return produto;
    }
    return null;
  }

  async create(nome: string, preco: number): Promise<Produto> {
    return this.produtoRepository.save({ nome, preco });
  }

  async update(
    id: number,
    nome: string,
    preco: number,
  ): Promise<Produto | null> {
    const produto = await this.findById(id);

    if (produto) {
      produto.nome = nome;
      produto.preco = preco;
      return this.produtoRepository.save(produto);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const produto = await this.findById(id);
    if (produto) {
      await this.produtoRepository.delete(produto);
    }
  }
}
