import { Get, Post, Delete, Controller, Patch } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Body, Param } from '@nestjs/common';
import { Cliente } from './cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  async findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Cliente | null> {
    return this.clienteService.findById(id);
  }

  @Post()
  async create(@Body('nome') nome: string): Promise<Cliente> {
    return this.clienteService.create(nome);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('nome') nome: string, // <-- O novo 'nome' vem do JSON do corpo da requisição
  ): Promise<Cliente | null> {
    return this.clienteService.update(id, nome);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.clienteService.delete(id);
  }
}
