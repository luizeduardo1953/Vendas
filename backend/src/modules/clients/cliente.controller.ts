import { Get, Post, Delete, Controller, Patch } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Body, Param } from '@nestjs/common';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

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
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() createClienteDto: CreateClienteDto,
  ): Promise<Cliente | null> {
    return this.clienteService.update(id, createClienteDto.nome);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.clienteService.delete(id);
  }
}
