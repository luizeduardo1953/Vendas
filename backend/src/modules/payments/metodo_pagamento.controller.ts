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
import { UpdateMetodoPagamentoDto } from './dto/update-metodo-pagamento.dto';
import { CreateMetodoPagamentoDto } from './dto/create-metodo-pagamento.dto';

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
  async create(@Body() createMetodoPagamentoDto: CreateMetodoPagamentoDto) {
    return this.metodoPagamentoService.create(createMetodoPagamentoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateMetodoPagamentoDto: UpdateMetodoPagamentoDto,
  ) {
    return this.metodoPagamentoService.update(id, updateMetodoPagamentoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.metodoPagamentoService.delete(id);
  }
}
