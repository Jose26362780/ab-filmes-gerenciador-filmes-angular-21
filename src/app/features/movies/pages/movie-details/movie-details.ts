import { Component, inject, input, linkedSignal, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MoviesApi } from '../../services/movies-api';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [DecimalPipe],
  templateUrl: './movie-details.html',
})
export class MovieDetails {

  private readonly _moviesApi = inject(MoviesApi);

  readonly BASE_URL = 'http://localhost:3000';

  id = input.required<string>();

  movieDetailsResource = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this._moviesApi.getMovieDetails(+params),
  });

  movieDetails = linkedSignal(() => {
    const ERROR_ON_RESPONSE = !!this.movieDetailsResource.error();

    if (ERROR_ON_RESPONSE) return undefined;

    return this.movieDetailsResource.value();
  });

  isFavorite = signal(false);
  currentRating: < number | undefined>(undefined) = signal(4); // Inicia com 4 estrelas preenchidas

  toggleFavorite() {
    this.isFavorite.update((value) => !value);
    console.log(`Filme agora é favorito: ${this.isFavorite()}`);
  }

  updateRating(newRating: number) {

  }
}
