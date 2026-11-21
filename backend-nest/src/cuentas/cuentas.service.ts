import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuenta } from './entities/cuenta.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class CuentasService {
    constructor(
        @InjectRepository(Cuenta)
        private cuentasRepository: Repository<Cuenta>,
    ) {}

    obtenerTodas(): Promise<Cuenta[]> {
        return this.cuentasRepository.find();
    }
}
