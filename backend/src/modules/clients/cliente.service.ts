import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findById(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return cliente;
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);

    if (cliente) {
      return this.clienteRepository.save(cliente);
    } else {
      throw new NotFoundException(`Não foi possível criar o cliente.`);
    }
  }

  async update(id: number, nome: string): Promise<Cliente | null> {
    const cliente = await this.findById(id);

    if (cliente) {
      cliente.nome = nome;
      return this.clienteRepository.save(cliente);
    } else {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.clienteRepository.delete(id);

    if (result.affected === 0) {
      //verifica se afetou alguma linha
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
  }
}
