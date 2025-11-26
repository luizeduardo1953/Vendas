import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetodoPagamento } from './metodo_pagamento.entity';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';

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

    if (!metodo) {
      throw new NotFoundException(
        `Método de pagamento com ID ${id} não encontrado.`,
      );
    }

    return metodo;
  }

  async create(
    createMetodoPagamentoDto: CreateMetodoPagamentoDto,
  ): Promise<MetodoPagamento> {
    return this.metodoPagamentoRepository.save(createMetodoPagamentoDto);
  }

  async update(
    id: number,
    updateMetodoPagamentoDto: UpdateMetodoPagamentoDto,
  ): Promise<MetodoPagamento | null> {
    const metodo = await this.findById(id);

    if (!metodo) {
      throw new NotFoundException(
        `Método de pagamento com ID ${id} não encontrado.`,
      );
    }

    this.metodoPagamentoRepository.merge(metodo, updateMetodoPagamentoDto);

    return this.metodoPagamentoRepository.save(metodo);
  }

  async delete(id: number): Promise<void> {
    const result = await this.metodoPagamentoRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Método de pagamento com ID ${id} não encontrado.`,
      );
    }
  }
}
