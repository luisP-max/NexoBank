import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service.js';
import { CuentasController } from './cuentas.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta])],
  controllers: [CuentasController],
  providers: [CuentasService],
})
export class CuentasModule {}
