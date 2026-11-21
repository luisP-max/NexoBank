import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('transacciones')
export class Transaccion {
    @PrimaryGeneratedColumn()
    id:number

    @Column({ name: 'cuenta_origen_id', nullable: true })
    cuentaOrigenId: number;

    @Column({ name: 'cuenta_destino_id', nullable: true })
    cuentaDestinoId: number;

    @Column()
    tipo: string // 'DEPOSITO', 'RETIRO', 'TRANSFERENCIA'

    @Column('decimal', { precision: 18, scale: 2 })
    monto: string;

    @Column({ default: 'COP' })
    moneda: string;

    @Column('decimal', {name: 'saldo_posterior', precision: 18, scale: 2, nullable: true })
    saldoPosterior: string;

    @Column({ nullable: true })
    descricion: string
    
    @CreateDateColumn({ name: 'fecha' })
    fecha: Date;
}