import {
  Get,
  Post,
  Delete,
  Patch,
  Controller,
  Body,
  Param,
} from '@nestjs/common';

import { ProdutoService } from './produto.service';
import { Produto } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Produto | null> {
    return this.produtoService.findById(id);
  }

  @Post()
  async create(
    @Body('nome') nome: string,
    @Body('preco') preco: number,
  ): Promise<Produto> {
    return this.produtoService.create(nome, preco);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body('nome') nome: string,
    @Body('preco') preco: number,
  ): Promise<Produto | null> {
    return this.produtoService.update(id, nome, preco);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.produtoService.delete(id);
  }
}
