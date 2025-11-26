import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],

  controllers: [ClienteController],

  providers: [ClienteService],

  exports: [ClienteService],
})
export class ClienteModule {}
