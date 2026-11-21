import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity.js';
import { Repository } from 'typeorm';
import { Transaccion } from './entities/transaccion.entity.js';
import { DataSource } from 'typeorm';

@Injectable()
export class CuentasService {
    constructor(
        @InjectRepository(Cuenta)
        private cuentasRepository: Repository<Cuenta>,
        @InjectRepository(Transaccion)
        private transaccionesRepository: Repository<Transaccion>,
        private dataSource: DataSource,
    ) {}

    obtenerTodas(): Promise<Cuenta[]> {
        return this.cuentasRepository.find({ order: { id: 'ASC' } });
    }

    obtenerHistorial(): Promise<Transaccion[]> {
        return this.transaccionesRepository.find({ order: { fecha: 'DESC'} });
    }

    async depositar(numeroCuenta: string, monto: number, descricion?: string) {
        if (monto <= 0) throw new BadRequestException('El monto debe ser mayor a $0 COP');

        return this.dataSource.transaction(async (manager) => {
            const cuenta = await manager.findOne(Cuenta, { where: { numeroCuenta } });
            if (!cuenta) throw new NotFoundException('Cuenta no encontrada');

            const nuevoSaldo = Number(cuenta.saldo) + Number(monto);
            cuenta.saldo = nuevoSaldo.toFixed(2);
            await manager.save(cuenta);

            const mov = manager.create(Transaccion, {
                cuentaDestinoId: cuenta.id,
                tipo: 'DEPOSITO',
                
            })
        }) 
    }
}
