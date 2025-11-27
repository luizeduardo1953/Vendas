import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './venda.entity';
import { ClienteService } from '../clients/cliente.service';
import { ProdutoService } from '../products/produto.service';
import { MetodoPagamentoService } from '../payments/metodo_pagamento.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';

@Injectable()
export class VendaService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
    private clienteService: ClienteService,
    private produtoService: ProdutoService,
    private metodoPagamentoService: MetodoPagamentoService,
  ) {}

  async create(createVendaDto: CreateVendaDto): Promise<Venda> {
    const cliente = await this.clienteService.findById(
      createVendaDto.clienteId,
    );
    const produto = await this.produtoService.findById(
      createVendaDto.produtoId,
    );
    const metodoPagamento = await this.metodoPagamentoService.findById(
      createVendaDto.metodoPagamentoId,
    );

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${createVendaDto.clienteId} não encontrado.`,
      );
    }

    if (!produto) {
      throw new NotFoundException(
        `Produto com ID ${createVendaDto.produtoId} não encontrado.`,
      );
    }

    if (!metodoPagamento) {
      throw new NotFoundException(
        `Método de Pagamento com ID ${createVendaDto.metodoPagamentoId} não encontrado.`,
      );
    }

    const taxaAplicada = produto.preco * (metodoPagamento.taxa / 100);
    const valorLiquido = produto.preco - taxaAplicada;

    const venda = this.vendaRepository.create({
      ...createVendaDto,
      cliente,
      produto,
      metodoPagamento,

      // ADICIONE ESTAS LINHAS:
      precoVenda: produto.preco, // <--- O ERRO ESTAVA AQUI (Faltava isso)
      taxaAplicada: taxaAplicada, // Se tiver essa coluna no banco, salve também
      valorLiquido: valorLiquido,
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

  // No VendaService

  async update(id: number, updateVendaDto: UpdateVendaDto): Promise<Venda> {
    // 1. Busca a venda
    const venda = await this.vendaRepository.findOne({
      where: { id },
      relations: ['produto', 'metodoPagamento', 'cliente'],
    });

    if (!venda) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada.`);
    }

    // 2. Atualiza o Cliente APENAS se um novo ID for enviado
    if (updateVendaDto.clienteId) {
      const cliente = await this.clienteService.findById(
        updateVendaDto.clienteId,
      );
      if (!cliente) throw new NotFoundException('Cliente não encontrado');
      venda.cliente = cliente;
    }

    // 3. Verifica se precisa recalcular valores (Se mudou Produto OU Método)
    if (updateVendaDto.metodoPagamentoId || updateVendaDto.produtoId) {
      // CORREÇÃO: Usar os campos corretos do DTO, e não "clienteId"
      const idProdutoFinal = updateVendaDto.produtoId ?? venda.produto.id;
      const idMetodoFinal =
        updateVendaDto.metodoPagamentoId ?? venda.metodoPagamento.id;

      const produto = await this.produtoService.findById(idProdutoFinal);
      const metodo = await this.metodoPagamentoService.findById(idMetodoFinal);

      if (!produto || !metodo) {
        throw new NotFoundException(
          'Produto ou Método de pagamento inválido na atualização.',
        );
      }

      // Recalcula
      const taxaAplicada = produto.preco * (metodo.taxa / 100);
      const valorLiquido = produto.preco - taxaAplicada;

      // Atualiza a entidade
      venda.produto = produto;
      venda.metodoPagamento = metodo;
      venda.valorLiquido = valorLiquido;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { clienteId, produtoId, metodoPagamentoId, ...dados } =
      updateVendaDto;

    this.vendaRepository.merge(venda, dados);

    return this.vendaRepository.save(venda);
  }

  async delete(id: number): Promise<void> {
    const venda = await this.findById(id);

    if (venda) {
      await this.vendaRepository.delete(venda);
    }
  }
}
