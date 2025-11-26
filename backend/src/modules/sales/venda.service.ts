import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { ClienteService } from '../clients/cliente.service';
import { ProdutoService } from '../products/produto.service';
import { MetodoPagamentoService } from '../payments/metodo_pagamento.service';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private metodoPagamentoService: MetodoPagamentoService,
  ) {}

  async create(
    clienteId: number,
    produtoId: number,
    metodoPagamentoId: number,
  ): Promise<Venda> {
    const cliente = await this.clienteService.findById(clienteId);
    const produto = await this.produtoService.findById(produtoId);

    const metodoPagamento =
      await this.metodoPagamentoService.findById(metodoPagamentoId);

    if (!cliente) {
      throw new Error(`Cliente com ID ${clienteId} não encontrado.`);
    }

    if (!produto) {
      throw new Error(`Produto com ID ${produtoId} não encontrado.`);
    }

    if (!metodoPagamento) {
      throw new Error(
        `Método de Pagamento com ID ${metodoPagamentoId} não encontrado.`,
      );
    }

    const taxaAplicada = produto.preco * (metodoPagamento.taxa / 100);
    const valorLiquido = produto.preco - taxaAplicada;

    const venda = this.vendaRepository.create({
      cliente,
      produto,
      metodoPagamento,
      status: 'Pago',
      precoVenda: produto.preco,
      taxaAplicada,
      valorLiquido,
    });
    return this.vendaRepository.save(venda);
  }

  async findAll(): Promise<Venda[]> {
    return this.vendaRepository.find();
  }

  async findById(id: number): Promise<Venda | null> {
    const venda = await this.vendaRepository.findOneBy({ id });

    if (venda) {
      return venda;
    }

    return null;
  }

  async update(id: number, status: string): Promise<Venda | null> {
    const venda = await this.findById(id);

    if (venda) {
      venda.status = status;
      return this.vendaRepository.save(venda);
    }

    return null;
  }

  async delete(id: number): Promise<void> {
    const venda = await this.findById(id);

    if (venda) {
      await this.vendaRepository.delete(venda);
    }
  }
}
