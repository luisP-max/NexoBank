import { Controller, Get } from '@nestjs/common';
import { CuentasService } from './cuentas.service.js';

@Controller('cuentas')
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @Get()
  listarCuentas() {
    return this.cuentasService.obtenerTodas();
  }
}
