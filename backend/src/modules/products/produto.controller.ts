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
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

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
  async create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(createProdutoDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto | null> {
    return this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.produtoService.delete(id);
  }
}
