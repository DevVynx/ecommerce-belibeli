# 🐳 Desenvolvimento em Docker - Guia Rápido

## Pré-requisitos

- Docker Desktop instalado
- Docker Compose v2+

## Setup Inicial (Recomendado)

### Windows (PowerShell)

```powershell
# Executar script de setup
.\setup-docker.ps1
```

Ou manualmente:

### Todos os Sistemas Operacionais

```bash
# 1. Copiar e configurar variáveis de ambiente
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 2. Editar apps/api/.env (se necessário)
# Verifique que DATABASE_URL aponta para o container do banco:
# DATABASE_URL=postgresql://dev:dev@db:5432/ecommerce-belibeli

# 3. Subir containers
docker compose up -d

# 4. Verificar status
docker compose ps
```

## 🚀 Após o Setup Completo

### Acessar a aplicação

- **Frontend**: http://localhost:3000
- **API**: http://localhost:8000
- **Banco de Dados**: localhost:5432 (usuário: dev, senha: dev)

### Ver logs em tempo real

```bash
# Todos os serviços
docker compose logs -f

# Apenas API
docker compose logs -f api

# Apenas Web
docker compose logs -f web

# Apenas Banco de Dados
docker compose logs -f db
```

### Executar comandos no container da API

```bash
# Rodar migração
docker compose exec api pnpm prisma:migrate

# Seedar banco
docker compose exec api pnpm db:seed

# Resetar banco (limpa + seed)
docker compose exec api pnpm db:reset

# Acessar shell do container
docker compose exec api sh
```

### Executar comandos no container da Web

```bash
# Acessar shell
docker compose exec web sh
```

## 🔄 Hot Reload

- **API**: Automático (tsx watch)
- **Web**: Automático (next dev)

Alterações nos arquivos são refletidas em tempo real!

## 🛑 Parar o Ambiente

```bash
# Parar containers mantendo dados
docker compose stop

# Remover tudo (cuidado!)
docker compose down

# Remover tudo e dados do banco (PERDA DE DADOS!)
docker compose down -v
```

## 📝 Checklist Inicial

- [ ] `.env` files criados (api e web)
- [ ] `docker compose up -d` executado
- [ ] Web acessível em http://localhost:3000
- [ ] API acessível em http://localhost:8000
- [ ] Banco de dados conectado (`docker compose exec api pnpm prisma:migrate`)
- [ ] Seedar dados (opcional: `docker compose exec api pnpm db:seed`)

## ⚠️ Possíveis Problemas

### Porta 3000 ou 8000 em uso

```bash
# Encontrar processo usando porta
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# Matar processo ou usar docker compose com portas diferentes
```

### Permissão negada ao executar script setup-docker.ps1

```powershell
# Mudar política de execução temporariamente
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
.\setup-docker.ps1
```

### Container sai do ar imediatamente

```bash
# Ver logs de erro
docker compose logs api
docker compose logs web

# Reconstruir imagens
docker compose down
docker compose up -d --build
```

### Problemas com node_modules

```bash
# Remover volume e recriar
docker compose down
docker volume rm ecommerce-belibeli_belibeli_node_modules 2>/dev/null || true
docker compose up -d
```

## 📚 Recursos Adicionais

- [Docker Documentation](https://docs.docker.com)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file)
- [Next.js with Docker](https://nextjs.org/docs/deployment/docker)
- [Prisma Docker Guide](https://www.prisma.io/docs/concepts/components/prisma-client/deployment)
