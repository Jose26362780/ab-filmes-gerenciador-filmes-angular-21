import express from 'express';
import cors from 'cors';
import { userRoutes } from './features/users/user.routes';
import { movieRoutes } from './features/movies/movie.routes';
import { favoriteRoutes } from './features/favorites/favorite.routes';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de CORS segura
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Servir arquivos estáticos
// // Ex: http://localhost:3000/uploads/minha-imagem.jpg
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Rotas
app.use('/users', userRoutes);
app.use('/movies', movieRoutes);
app.use('/favorites', favoriteRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API Funcionando 🚀');
});

// Inicialização
app.listen(PORT, () => {
  console.log(`🎬 Servidor de filmes rodando em http://localhost:${PORT}`);
});
