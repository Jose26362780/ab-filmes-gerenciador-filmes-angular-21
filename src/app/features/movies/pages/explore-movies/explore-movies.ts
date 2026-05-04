import { Component, Inject, linkedSignal, signal } from '@angular/core';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';
import { MoviesFilter } from '../../components/movies-filter/movies-filter';
import { MoviesApi } from '../../services/movies-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';
import { IMovieResponse } from '../../../../shared/models/movie-response';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList, MoviesFilter, JsonPipe],
  templateUrl: './explore-movies.html',
})
export class ExploreMovies {
  private readonly _moviesApi = Inject(MoviesApi);

  movies = signal<IMovieResponse[]>([]);

  moviesResource = rxResource({
    params: () => true,
    stream: () => this._moviesApi.getMovies(),
  });

  moviesFiltered = linkedSignal<IMovieResponse[]>(() => {
    const ERROR_ON_RESPONSE = !!this.moviesResource.error();

    console.log('ERROR_ON_RESPONSE', ERROR_ON_RESPONSE);

    if (ERROR_ON_RESPONSE) return [];

    const moviesList = this.moviesResource.value() as IMovieResponse[] | undefined;
    console.log('moviesList', moviesList);

    return moviesList ?? [];
  });

  adicionarFilme() {}
}
