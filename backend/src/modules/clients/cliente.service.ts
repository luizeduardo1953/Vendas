import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findById(id: number): Promise<Cliente | null> {
    const cliente = await this.clienteRepository.findOneBy({ id });

    return cliente || null;
  }

  async create(nome: string): Promise<Cliente> {
    const client = this.clienteRepository.create({ nome });
    return this.clienteRepository.save(client);
  }

  async update(id: number, nome: string): Promise<Cliente | null> {
    const cliente = await this.findById(id);

    if (cliente) {
      cliente.nome = nome;
      return this.clienteRepository.save(cliente);
    }
    return null;
  }

  async delete(id: number): Promise<void> {
    const cliente = await this.findById(id);
    if (cliente) {
      await this.clienteRepository.delete(id);
    }
  }
}
