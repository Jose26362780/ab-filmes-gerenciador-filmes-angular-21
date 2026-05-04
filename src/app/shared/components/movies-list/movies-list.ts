import { Component, input } from '@angular/core';
import { MoviesListResponse } from '../../types/movies-list-response';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  imports: [JsonPipe],
  templateUrl: './movies-list.html',
  host: {
    class: 'flex-1 min-h-0',
  },
})
export class MoviesList {
  movies = input<MoviesListResponse>([]);
}
