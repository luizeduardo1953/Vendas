import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { VendaService } from './venda.service';

@Controller('vendas')
export class VendaController {
  constructor(private readonly vendaService: VendaService) {}

  @Get()
  async findAll() {
    return this.vendaService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.vendaService.findById(id);
  }

  @Post()
  async create(
    @Body('clienteId') clienteId: number,
    @Body('produtoId') produtoId: number,
    @Body('metodoPagamentoId') metodoPagamentoId: number,
  ) {
    return this.vendaService.create(clienteId, produtoId, metodoPagamentoId);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body('status') status: string) {
    return this.vendaService.update(id, status);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.vendaService.delete(id);
  }
}
