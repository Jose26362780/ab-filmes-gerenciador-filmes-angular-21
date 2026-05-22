# 🔐 Guia de Segurança - Gerenciador de Filmes

## 1. Proteção de Dados Sensíveis

### 1.1 Variáveis de Ambiente

- ✅ **JWT_SECRET**: Armazenado apenas em variáveis de ambiente (NUNCA hardcoded)
- ✅ **DATABASE_URL**: Se usar banco de dados, também em env
- ✅ **API_KEYS**: Qualquer chave de terceiros deve estar em env
- ✅ Arquivo `.env` está no `.gitignore`

### 1.2 Dados de Produção

Os seguintes arquivos NUNCA devem ser commitados:

- ❌ `server/data/users.json` - Contém senhas dos usuários
- ❌ `server/data/favorites.json` - Preferências privadas
- ❌ `server/data/movies.json` - Dados sensíveis da aplicação
- ❌ `server/public/uploads/*` - Arquivos enviados por usuários
- ❌ `.env` ou variações `.env.*`

Use os arquivos `.example.json` para desenvolvimento:

```bash
cp server/data/users.example.json server/data/users.json
cp server/data/movies.example.json server/data/movies.json
cp server/data/favorites.example.json server/data/favorites.json
```

---

## 2. Segurança de Autenticação

### 2.1 JWT (JSON Web Tokens)

- ✅ Chave secreta com mínimo 32 caracteres
- ✅ Tokens armazenados em localStorage (seguro para esse caso)
- ✅ Tokens incluídos no header `Authorization: Bearer <token>`
- ✅ Middleware valida todos os tokens

### 2.2 Senhas

⚠️ **CRÍTICO**: Atualmente, senhas estão em PLAINTEXT no JSON!

**Recomendações para produção:**

1. Use bcrypt para hash de senhas:

   ```bash
   npm install bcrypt
   npm install -D @types/bcrypt
   ```

2. Exemplo de implementação:

   ```typescript
   import bcrypt from 'bcrypt';

   // Ao registrar
   const hashedPassword = await bcrypt.hash(password, 10);

   // Ao fazer login
   const isValid = await bcrypt.compare(password, hashedPassword);
   ```

3. Nunca retorne senha na API:
   ```typescript
   const { password, ...userWithoutPassword } = user;
   return userWithoutPassword;
   ```

---

## 3. CORS e Headers de Segurança

### 3.1 CORS Configurado

- ✅ Origem restrita via `CORS_ORIGIN`
- ✅ Métodos permitidos: GET, POST, PUT, DELETE, PATCH
- ✅ Headers permitidos: Content-Type, Authorization
- ✅ Credenciais habilitadas para cookies (se necessário)

### 3.2 Headers de Segurança (Netlify)

```
X-Frame-Options: DENY              # Previne clickjacking
X-Content-Type-Options: nosniff    # Previne MIME sniffing
X-XSS-Protection: 1; mode=block    # Proteção XSS
Content-Security-Policy: ...       # Whitelist de origens
Referrer-Policy: strict-origin...  # Controla referrer
Permissions-Policy: ...            # Bloqueia APIs perigosas
```

---

## 4. Boas Práticas de Código

### 4.1 Validação de Entrada

```typescript
// ✅ BOM - Validar dados
if (!email || !email.includes('@')) {
  return res.status(400).json({ message: 'Email inválido' });
}

// ❌ RUIM - Aceitar qualquer coisa
const user = { email: req.body.email };
```

### 4.2 Tratamento de Erros

```typescript
// ✅ BOM - Não expor detalhes
res.status(401).json({ message: 'Credenciais inválidas' });

// ❌ RUIM - Expor informação sensível
res.status(401).json({
  message: 'Password for email@test.com is incorrect',
});
```

### 4.3 Logging

```typescript
// ✅ BOM - Logar com segurança
console.log('Login attempt for user:', userEmail);

// ❌ RUIM - Logar dados sensíveis
console.log('Login:', { email, password, token });
```

---

## 5. Proteção de Upload de Arquivos

### 5.1 Validações Necessárias

```typescript
// Tipos de arquivo permitidos
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Tamanho máximo
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Renomear arquivos para evitar sobrescrita
const filename = `${Date.now()}-${Math.random().toString(36)}-${file.originalname}`;
```

### 5.2 Configuração Atual

- ✅ Arquivos servidos via `/uploads`
- ✅ Diretório de upload no `.gitignore`
- ⚠️ Adicionar validação de extensão e tamanho

---

## 6. Ambiente de Desenvolvimento vs. Produção

### 6.1 Arquivo `netlify.toml`

```toml
# Production
NODE_ENV = "production"
CORS_ORIGIN = "https://seu-dominio.netlify.app"

# Development
NODE_ENV = "development"
CORS_ORIGIN = "http://localhost:4200"
```

### 6.2 Variáveis Diferentes

- **Dev**: CORS aberto, logs detalhados, sourcemaps habilitados
- **Prod**: CORS restrito, logs mínimos, sourcemaps removidos, compressão ativa

---

## 7. Checklist de Segurança Pré-Deploy

### Antes de fazer push para GitHub:

- [ ] Nenhum arquivo `.json` real em `server/data/`
- [ ] `.env` NÃO está commitado (verificar `.gitignore`)
- [ ] Senhas NÃO aparecem em nenhum arquivo
- [ ] Tokens JWT NÃO estão hardcoded
- [ ] API URLs não contêm credenciais
- [ ] Build sem warnings: `npm run build`

### Antes de deploy no Netlify:

- [ ] Variável `JWT_SECRET` configurada (gerada via script)
- [ ] `CORS_ORIGIN` apontando para seu domínio
- [ ] `NODE_ENV=production` configurado
- [ ] Todos os headers de segurança no `netlify.toml`
- [ ] Build bem-sucedido no Netlify

### Pós-Deploy:

- [ ] Testar login e autenticação
- [ ] Verificar CORS em requests da API
- [ ] Checar logs para erros
- [ ] Executar [Security Headers Check](https://securityheaders.com)
- [ ] Rodar Lighthouse para performance

---

## 8. Incidentes de Segurança

### Se algo foi commitado acidentalmente:

1. **Revogar credenciais imediatamente**
2. **Remover do histórico git:**
   ```bash
   git filter-branch --tree-filter 'rm -f server/data/users.json' HEAD
   git push origin -f
   ```
3. **Regenerar chaves JWT**
4. **Forçar logout de todos os usuários**

---

## 9. Recursos de Segurança

- [OWASP Top 10](https://owasp.org/Top10/)
- [Angular Security Guide](https://angular.io/guide/security)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

## 10. Roadmap de Melhorias

### Curto Prazo (Essencial):

- [ ] Implementar bcrypt para senhas
- [ ] Adicionar rate limiting (express-rate-limit)
- [ ] Validação e sanitização de entrada

### Médio Prazo (Importante):

- [ ] Implementar refresh tokens
- [ ] Adicionar 2FA
- [ ] Migrar para banco de dados real
- [ ] Implementar HTTPS obrigatório

### Longo Prazo (Desejável):

- [ ] OAuth2/OpenID Connect
- [ ] Auditoria de logs
- [ ] Penetration testing
- [ ] GDPR compliance

---

**Última atualização:** Maio de 2026
**Status:** ✅ Segurança Básica Implementada
