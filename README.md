# ✅ AB Filmes | Gerenciador de Filmes Angular 21

Projeto desenvolvido durante a formação Angular da `Rocketseat`.

Uma aplicação web moderna para gerenciar filmes com funcionalidades de exploração, criação, detalhes, favoritos e autenticação. Focada em arquitetura escalável, lazy loading de rotas e integração com backend via API REST. Utiliza Angular 21 com componentes standalone, guards de autenticação, interceptadores HTTP e gerenciamento de estado com signals.

Durante o desenvolvimento, foco em:

- Arquitetura moderna Angular (Standalone components com `loadChildren` e `loadComponent`).
- Guards de autenticação e autorização (`auth-guard`, `guest-guard`).
- Interceptadores HTTP para autenticação automática.
- Lazy loading de features (rotas e componentes sob demanda).
- Gerenciamento de estado com signals e services.
- Separação clara entre camadas (core, features, shared).
- Integração com backend Node.js/TypeScript.

---

## 🚀 Tecnologias Utilizadas

Este projeto utiliza tecnologias modernas do ecossistema web:

![Angular](https://img.shields.io/badge/Angular%2021-DB0535?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-000000?style=for-the-badge&logo=reactivex&logoColor=E7008A)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)

---

## 📂 Estrutura do Projeto

```bash
.
├── src/
│  ├── app/
│  │  ├── app.ts                     # Componente raiz
│  │  ├── app.routes.ts              # Definição de rotas (lazy loading)
│  │  ├── app.config.ts              # Configuração da aplicação
│  │  ├── core/
│  │  │  ├── guards/
│  │  │  │  ├── auth-guard.ts        # Proteção de rotas autenticadas
│  │  │  │  └── guest-guard.ts       # Proteção de rotas públicas
│  │  │  ├── interceptors/
│  │  │  │  └── auth-interceptor.ts  # Interceptação de requests
│  │  │  ├── layout/
│  │  │  │  ├── header/
│  │  │  │  └── main-layout/
│  │  │  ├── routes/
│  │  │  │  ├── auth.routes.ts       # Rotas de autenticação
│  │  │  │  └── movies.routes.ts     # Rotas de filmes
│  │  │  └── services/
│  │  │     ├── user-api.ts
│  │  │     ├── user-token-store.ts
│  │  │     └── user-infos-store.ts
│  │  ├── features/
│  │  │  ├── authentication/
│  │  │  │  ├── layout/
│  │  │  │  ├── pages/
│  │  │  │  │  ├── login-form/
│  │  │  │  │  └── register-user-form/
│  │  │  │  ├── models/
│  │  │  │  └── validators/
│  │  │  ├── movies/
│  │  │  │  ├── components/
│  │  │  │  │  └── movies-filter/
│  │  │  │  ├── pages/
│  │  │  │  │  ├── explore-movies/
│  │  │  │  │  ├── movie-details/
│  │  │  │  │  └── create-movie/
│  │  │  │  └── services/
│  │  │  │     └── movies-api.ts
│  │  │  └── favorites/
│  │  │     └── pages/
│  │  │        └── favorite-movies/
│  │  ├── shared/
│  │  │  ├── components/
│  │  │  │  └── movies-list/
│  │  │  ├── models/
│  │  │  ├── services/
│  │  │  │  └── favorites-api.ts
│  │  │  ├── types/
│  │  │  └── utils/
│  │  └── environments/
│  │     ├── environment.ts           # Prod
│  │     └── environment.development.ts  # Dev
│  ├── index.html
│  ├── main.ts
│  └── styles.css                    # Estilos globais
├── server/                          # Backend Node.js
│  ├── src/
│  │  ├── server.ts
│  │  ├── features/
│  │  │  ├── users/
│  │  │  ├── movies/
│  │  │  └── favorites/
│  │  └── middlewares/
│  ├── data/
│  ├── public/uploads/
│  ├── package.json
│  └── tsconfig.json
├── public/
│  └── images/
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## 🔄 Fluxo da Aplicação

    1. **Login/Registro**: Usuário autentica ou cria conta.
    2. **Token**: JWT é armazenado em `localStorage` e incluído em todas as requests.
    3. **Exploração**: Usuário acessa tela de filmes com filtros.
    4. **Detalhes**: Clica em filme para ver mais informações e avaliar.
    5. **Favoritos**: Adiciona/remove filmes da lista de favoritos.
    6. **Criação**: Usuário pode criar novo filme com upload de imagem.
    7. **Logout**: Sessão encerrada e dados limpos.

## ✨ Funcionalidades Principais

    ✅ Autenticação com JWT e armazenamento seguro de token
    ✅ Registro de novos usuários
    ✅ Exploração de catálogo de filmes com filtros
    🔍 Busca e filtro de filmes por categoria/ano
    ⭐ Avaliação de filmes
    ❤️ Adicionar/remover filmes favoritos
    ➕ Criar novos filmes com upload de capa
    🔐 Guards de autenticação em rotas
    📤 Upload de imagens para servidor
    💾 Persistência de dados no backend
    🚀 Lazy loading de rotas e componentes
    🔄 Interceptadores HTTP para autenticação automática

## 🛠️ Como Rodar o Projeto Localmente

Siga os passos abaixo para rodar a aplicação frontend + backend:

```bash
# 1. Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd ab-filmes-gerenciador-filmes-angular-21

# 2. Instalar dependências do frontend
npm install

# 3. Instalar dependências do backend
cd server
npm install
cd ..

# 4. Rodar o backend (em um terminal)
cd server
npm start

# 5. Rodar o frontend (em outro terminal)
npm start

# 6. Acessar no navegador
# Frontend: http://localhost:4200
# Backend: http://localhost:3000
```

## 📦 Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento Angular
npm run build      # Compila o projeto para produção
npm test           # Executa testes unitários
npm run watch      # Compila em modo watch durante desenvolvimento
```

## 🔗 API Backend

O backend está em `server/src/` com endpoints para:

- **Autenticação**: POST `/users/login`, POST `/users/register`, GET `/users/validate-token`
- **Filmes**: GET `/movies`, GET `/movies/:id`, POST `/movies`, POST `/movies/:id/rate`
- **Favoritos**: GET `/favorites`, POST `/favorites/:id`, DELETE `/favorites/:id`

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do `server/`:

```env
PORT=3000
JWT_SECRET=sua-chave-secreta-aqui
```

## 🏗️ Arquitetura e Padrões

### Componentes Standalone

Todos os componentes usam `imports` diretamente, sem módulos `NgModule`.

### Lazy Loading com `loadChildren` e `loadComponent`

Rotas são carregadas sob demanda:

```ts
loadChildren: () => import('./features/movies/movies.routes').then((m) => m.MOVIES_ROUTES);
```

### Guards de Autenticação

Rotas protegidas por `authGuard` (autenticado) e `guestGuard` (não autenticado).

### Interceptadores HTTP

`auth-interceptor` adiciona token JWT automaticamente em todas as requests.

### Signals para Estado

Uso de `signal()` e `effect()` para reatividade sem dependências do RxJS puro.

---

## 📡 Implementação de Signals

Este projeto **foca na implementação de Signals** como mecanismo principal de gerenciamento de estado reativo.

**Padrões utilizados**:

- ✅ **Signal Input/Output** para comunicação entre componentes
- ✅ **Computed** para valores derivados e filtros reativos
- ✅ **RxResource** para requisições HTTP com loading/erro
- ✅ **State Services** para gerenciamento global (autenticação, dados do usuário)
- ✅ **toSignal** para integração com streams RxJS

📖 **Documentação completa**: Ver [SIGNALS.md](./SIGNALS.md) para exemplos detalhados, padrões e best practices.

---

## 🔐 Autenticação

O projeto usa **JWT (JSON Web Tokens)** para autenticação:

1. Usuário faz login com email/senha
2. Backend retorna JWT + informações do usuário
3. Token é armazenado em `localStorage`
4. Interceptador HTTP adiciona token em header `Authorization`
5. Guards verificam autenticação antes de acessar rotas

## 📸 Funcionalidade de Upload

Filmes podem ter capa:

- Seleção de arquivo no formulário
- Preview antes de salvar
- Upload para servidor em `public/uploads/`
- Referência armazenada no banco de dados

## 💻 Sobre o Autor 😄

Engenheiro de Software com foco em desenvolvimento front-end rumo ao full stack. Dedicado a criar experiências digitais inovadoras que impactam o mundo através da tecnologia.

## 🔗 Contato

- [![linkedin](https://img.shields.io/badge/Linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jose-martinez-352032222/)
- [![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:juniorjose1925@gmail.com)
- [![portfolio](https://img.shields.io/badge/Jose.Dev-0A0A03?style=for-the-badge&logo=react&logoColor=white)](https://my-portfolio-jose-martinez.netlify.app/)

---
