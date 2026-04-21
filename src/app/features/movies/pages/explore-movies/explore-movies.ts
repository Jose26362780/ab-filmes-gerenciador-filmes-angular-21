import { Component, signal } from '@angular/core';
import { MoviesList } from '../../../../shared/components/movies-list/movies-list';

@Component({
  selector: 'app-explore-movies',
  imports: [MoviesList],
  templateUrl: './explore-movies.html',
})
export class ExploreMovies {
  movies = signal([{}]);

  adicionarFilme() {}
}
