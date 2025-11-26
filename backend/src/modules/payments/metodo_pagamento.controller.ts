import {
  Get,
  Post,
  Patch,
  Delete,
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { MetodoPagamentoService } from './metodo_pagamento.service';

@Controller('metodos_pagamento')
export class MetodoPagamentoController {
  constructor(
    private readonly metodoPagamentoService: MetodoPagamentoService,
  ) {}

  @Get()
  async findAll() {
    return this.metodoPagamentoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.metodoPagamentoService.findById(id);
  }

  @Post()
  async create(@Body('nome') nome: string, @Body('taxa') taxa: number) {
    return this.metodoPagamentoService.create(nome, taxa);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('nome') nome: string,
    @Body('taxa') taxa: number,
  ) {
    return this.metodoPagamentoService.update(id, nome, taxa);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.metodoPagamentoService.delete(id);
  }
}
