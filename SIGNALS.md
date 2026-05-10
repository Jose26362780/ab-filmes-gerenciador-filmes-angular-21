# 📡 Implementação de Signals - Documentação Completa

Este documento detalha todos os padrões de Signals implementados no projeto AB Filmes.

---

## 🔹 Signal (Normal)

**O que é**: Container reativo que guarda um valor e notifica automaticamente dependentes quando muda.

**Uso no projeto**:

```ts
// Services - Gerenciamento de autenticação
export class UserTokenStore {
  private token = signal<string>('');
  private readonly tokenReadonly = this.token.asReadonly();

  setToken(value: string) {
    this.token.set(value);
  }

  getToken = this.tokenReadonly;
}
```

**Benefícios**: Simples reatividade, atualizações diretas com `set()` ou `update()`.

---

## 🔹 Computed (Signal Derivado)

**O que é**: Signal que calcula um valor baseado em outros signals e se recalcula automaticamente quando dependências mudam.

**Uso no projeto**:

```ts
// Componentes - Filtragem reativa
export class MoviesFilter {
  searchTerm = signal('');
  selectedCategory = signal('');

  filteredMovies = computed(() => {
    const term = this.searchTerm();
    const category = this.selectedCategory();
    // Lógica derivada que recomputa quando term ou category mudam
    return this.movies.filter((m) => m.title.includes(term) && m.category === category);
  });
}
```

**Benefícios**: Evita duplicação de dados, memoização automática, sem `subscribe`.

---

## 🔹 LinkedSignal

**O que é**: Signal ligado a outro signal que se atualiza automaticamente mas pode ser sobrescrito localmente.

**Uso no projeto**:

```ts
// Componentes - Edição de formulários
export class MovieDetails {
  movieData = input.required<Movie>();

  editingTitle = linkedSignal({
    source: this.movieData,
    computation: (movie) => movie.title,
  });

  // Usuário pode editar localmente até salvar
  updateTitle(newTitle: string) {
    this.editingTitle.set(newTitle);
  }
}
```

**Benefícios**: Sincronização automática com possibilidade de override local.

---

## 🔹 RxResource

**O que é**: Signal de recurso que encapsula chamadas RxJS (HTTP) e expõe estado reativo (value, loading, error).

**Uso no projeto**:

```ts
// Services - Requisições HTTP
export class MoviesApi {
  movies = rxResource({
    request: () => this._httpClient.get<Movie[]>(environment.baseUrl + '/movies'),
    onSuccess: (data) => {
      // Tratamento após sucesso
    },
  });

  getMovies() {
    return this.movies.value(); // Signal do valor
  }

  isLoading() {
    return this.movies.isLoading(); // Signal do status
  }

  error() {
    return this.movies.error(); // Signal de erro
  }
}
```

**Benefícios**: Centraliza fetch, elimina `subscribe` manual, gerencia loading/erro automaticamente.

---

## 🔹 Signal Input

**O que é**: Input reativo como signal para comunicação pai → filho.

**Uso no projeto**:

```ts
// Componentes Standalone
@Component({
  selector: 'app-movie-card',
})
export class MovieCard {
  movieId = input.required<number>();
  movieTitle = input<string>('');

  // Pode usar em computed/effect
  movieInfo = computed(() => `${this.movieTitle()} - ID: ${this.movieId()}`);
}

// Uso no pai
<app-movie-card [movieId]="movie.id" [movieTitle]="movie.title" />
```

**Benefícios**: Reatividade direta, sem `ngOnChanges`, integrado com signals.

---

## 🔹 Signal Output

**O que é**: Output reativo como signal para comunicação filho → pai.

**Uso no projeto**:

```ts
// Componentes Standalone
@Component({
  selector: 'app-favorite-button',
})
export class FavoriteButton {
  favoriteClicked = output<number>();

  onFavoriteClick(movieId: number) {
    this.favoriteClicked.emit(movieId);
  }
}

// Uso no pai
<app-favorite-button (favoriteClicked)="addToFavorites($event)" />
```

**Benefícios**: Alternativa simplificada a `EventEmitter`, tipagem clara.

---

## 🔹 Signal Model (Two-Way Data Binding)

**O que é**: Atalho para `@Input` + `@Output` conectados, ideal para `[(ngModel)]` com signals.

**Uso no projeto**:

```ts
// Componentes - Formulários
@Component({
  selector: 'app-create-movie',
})
export class CreateMovie {
  title = model(''); // Recebe valor e emite quando muda
  category = model('');

  onTitleChange(value: string) {
    this.title.set(value);
    // Automaticamente emite para o pai
  }
}

// Uso no pai com two-way binding
<app-create-movie [(title)]="formData.title" [(category)]="formData.category" />
```

**Benefícios**: Two-way binding simplificado, sem `EventEmitter` manual.

---

## 🔹 Forms Signals

**O que é**: Integração de Angular Forms com Signals, expondo estado do formulário como signals reativos.

**Uso no projeto**:

```ts
// Componentes - Validação reativa
@Component({
  selector: 'app-login-form',
})
export class LoginForm {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // Leitura reativa do formulário
  isFormValid = computed(() => (this.form.statusChanges ? false : true));

  loginAttempted = signal(false);

  onSubmit() {
    this.loginAttempted.set(true);
    if (this.form.valid) {
      // Processar
    }
  }
}
```

**Benefícios**: Estado do formulário como signals, sem subscriptions manuais.

---

## 🔹 toSignal

**O que é**: Converte um `Observable` em `Signal`, permitindo usar RxJS no modelo reativo de signals.

**Uso no projeto**:

```ts
// Services - Conversão de Observable para Signal
export class UserInfoStore {
  constructor(private userApi: UserApi) {
    this.currentUser = toSignal(this.userApi.getUserInfo(), { initialValue: null });
  }

  currentUser: Signal<User | null>;
}

// Componente - Uso direto como signal
export class Header {
  userStore = inject(UserInfoStore);
  currentUser = this.userStore.currentUser; // Signal
}
```

**Benefícios**: Integração RxJS com signals, sem unsubscribe manual.

---

## 🔹 State Management com Signals em Services

**O que é**: Padrão de centralizar estado global/local em services usando signals, similar a `BehaviorSubject` mas com menos boilerplate.

**Uso no projeto**:

```ts
// Services - Estado global
@Injectable({ providedIn: 'root' })
export class UserInfoStore {
  private readonly userInfos = signal<UserInfo | null>(null);
  private readonly loading = signal(false);

  // Expor apenas leitura
  userInfos$ = this.userInfos.asReadonly();
  loading$ = this.loading.asReadonly();

  // Métodos para atualizar
  setUserInfo(user: UserInfo) {
    this.userInfos.set(user);
  }

  setLoading(value: boolean) {
    this.loading.set(value);
  }

  clearUserInfo() {
    this.userInfos.set(null);
  }
}

// Componente - Uso
export class Header {
  userStore = inject(UserInfoStore);
  userInfo = computed(() => this.userStore.userInfos$());
  isLoading = computed(() => this.userStore.loading$());
}
```

**Benefícios**: Estado centralizado, reativo, sem `subscribe`, padrão consistente.

---

## 🎯 Resumo: Signals no Projeto

| Tipo               | Uso                            | Exemplo                        |
| ------------------ | ------------------------------ | ------------------------------ |
| **Signal**         | Estado mutável                 | Tokens, flags de loading       |
| **Computed**       | Valores derivados              | Filmes filtrados, totalizações |
| **LinkedSignal**   | Sincronização com override     | Edição de campos               |
| **RxResource**     | Requisições HTTP               | GET/POST de filmes e usuários  |
| **Input**          | Props reativas (pai → filho)   | Movie card recebe dados        |
| **Output**         | Eventos reativos (filho → pai) | Clique em favoritar            |
| **Model**          | Two-way binding                | Campos de formulário           |
| **Forms Signals**  | Validação reativa              | Status e valores de forms      |
| **toSignal**       | Observable → Signal            | Conversão de streams RxJS      |
| **State Services** | Gerenciamento global           | Autenticação, dados de usuário |
