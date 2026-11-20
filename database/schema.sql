-- estas tablas eliminan si existen para reiniciar limpio en desarrollo
DROP TABLE IF EXISTS transacciones;
DROP TABLE IF EXISTS cuentas;
DROP TABLE IF EXISTS usuarios;

-- tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_HASH VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabla de cuenta bancarias 
CREATE TABLE cuentas (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    numero_cuenta VARCHAR(20) UNIQUE NOT NULL,
    tipo_cuenta VARCHAR(20) NOT NULL DEFAULT 'AHORROS'
        CHECK (tipo_cuenta IN ('AHORROS', 'CORRIENTE')),
    moneda VARCHAR(3) DEFAULT 'COP' NOT NULL,
    saldo NUMERIC(18, 2) DEFAULT 0.00,
    limite_sobregiro NUMERIC(18, 2) DEFAULT 0.00 CHECK (limite_sobregiro >= 0),
    creada_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT saldo_valido CHECK (saldo >= -limite_sobregiro)
);

--tabla de transacciones 
CREATE TABLE transacciones (
    id SERIAL PRIMARY KEY,
    cuenta_origen_id INT REFERENCES cuentas(id),
    cuenta_destino_id INT REFERENCES cuentas(id),
    tipo VARCHAR(20) NOT NULL
        CHECK (tipo IN ('DEPOSITO', 'RETIRO', 'TRANSFERENCIA', 'IMPUESTO')),
    monto NUMERIC(18, 2) NOT NULL CHECK (monto > 0),
    moneda VARCHAR(3) DEFAULT 'COP' NOT NULL,
    saldo_posterior NUMERIC(18, 2),
    descripcion VARCHAR(255),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- datos de pruebas iniciales (usuario con ambas cuentas)
INSERT INTO usuarios (nombre, email, password_HASH)
VALUES ('Usuario Demo', 'demo@nexobank.com', 'hash_tempral_123');

INSERT INTO cuentas (usuario_id, numero_cuenta, tipo_cuenta, moneda, saldo, limite_sobregiro)
VALUES
    (1, '1000-0001-0001', 'AHORROS', 'COP', 5000000.00, 0.00),
    (1, '2000-0001-0002', 'CORRIENTE', 'COP', 1200000.00, 1000000.00);