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
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';

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
  async create(@Body() createVendaDto: CreateVendaDto) {
    return this.vendaService.create(createVendaDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateVendaDto: UpdateVendaDto,
  ) {
    return this.vendaService.update(+id, updateVendaDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.vendaService.delete(id);
  }
}
