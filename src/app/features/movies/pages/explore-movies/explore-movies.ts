import { Component, Inject, linkedSignal, signal } from '@angular/core';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';
import { MoviesFilter } from '../../components/movies-filter/movies-filter';
import { MoviesApi } from '../../services/movies-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { IMovieResponse } from '../../../../shared/models/movie-response';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList, MoviesFilter],
  templateUrl: './explore-movies.html',
})
export class ExploreMovies {
  private readonly _moviesApi = Inject(MoviesApi);

  movieTitleFilter = signal('');
  movieCategoryFilter = signal('');

  moviesResource = rxResource({
    params: () => true,
    stream: () => this._moviesApi.getMovies(),
  });

  moviesFiltered = linkedSignal(() => {
    const moviesList = (this.moviesResource.value() ?? []) as IMovieResponse[];
    const ERROR_ON_RESPONSE = !!this.moviesResource.error();

    if (ERROR_ON_RESPONSE) return [];

    const titleSearch = this.movieTitleFilter().toLocaleLowerCase().trim();
    const categorySearch = this.movieCategoryFilter().toLocaleLowerCase().trim();

    if (!titleSearch && !categorySearch) {
      return moviesList;
    }

    return moviesList.filter((movie) => {
      const matchesTitle = movie.titulo.toLowerCase().includes(titleSearch);
      const matchesCategory = movie.genero.toLowerCase().includes(categorySearch);

      return matchesTitle && matchesCategory;
    });
  });

  adicionarFilme() {}
}
