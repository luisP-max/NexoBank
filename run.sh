echo "========================================="
echo "       Iniciando NexoBank System         "
echo "========================================="

echo "[1/4] Levantando base de datos en PostgreSQL en Docker..."
docker compose up -d db

echo -n "       Esperando a que PostgreSQL este listo... "
sleep 3
if docker exec nexobank-db pg_isready -U Luis -d nexobank -q; then
    echo "OK (activo en puerto 5433)"
else
    echo "ERROR (revisa los logs con: docker logs nexobank-db)"
    exit 1
fi

echo "[2/4] Verificando modulo Backend (nestJS)..."
echo "[3/4] Verificando modulo analitica (python)..."
echo "[4/4] Verificando modulo frontend..."

echo ""
echo "Estructura inicial de NexoBank lista para desarrollo."
