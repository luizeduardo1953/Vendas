import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPagamento } from './metodo_pagamento.entity';

@Injectable()
export class MetodoPagamentoService {
  constructor(
    @InjectRepository(MetodoPagamento)
    private readonly metodoPagamentoRepository: Repository<MetodoPagamento>,
  ) {}

  async findAll(): Promise<MetodoPagamento[]> {
    return this.metodoPagamentoRepository.find();
  }

  async findById(id: number): Promise<MetodoPagamento | null> {
    const metodo = await this.metodoPagamentoRepository.findOneBy({ id });
    if (metodo) {
      return metodo;
    }
    return null;
  }

  async create(nome: string, taxa: number): Promise<MetodoPagamento> {
    return this.metodoPagamentoRepository.save({ nome, taxa });
  }

  async update(
    id: number,
    nome: string,
    taxa: number,
  ): Promise<MetodoPagamento | null> {
    const metodo = await this.findById(id);

    if (metodo) {
      metodo.nome = nome;
      metodo.taxa = taxa;
      return this.metodoPagamentoRepository.save(metodo);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const metodo = await this.findById(id);
    if (metodo) {
      await this.metodoPagamentoRepository.delete(metodo);
    }
  }
}
