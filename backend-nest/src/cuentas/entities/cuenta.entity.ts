import { Column, Entity, PrimaryGeneratedColumn  } from "typeorm";

@Entity('cuentas')
export class Cuenta {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'usuario_id' })
    usuarioID: number;

    @Column({ name: 'numero_cuenta' })
    numeroCuenta: string;

    @Column({ name: 'tipo_cuenta' })
    tipoCuenta: string

    @Column({ default: 'COP' })
    moneda: string

    @Column( 'decimal', {precision: 18, scale: 2 })
    saldo: string

    @Column('decimal', { name: 'limite_sobregiro', precision: 18, scale: 2})
    limiteSobregiro: string;
}