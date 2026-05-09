import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { MoviesApi } from '../../services/movies-api';
import { setErrorMessage } from '../../../../shared/utils/set-error-message';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-movie',
  imports: [FormsModule, RouterLink],
  templateUrl: './create-movie.html',
})
export class CreateMovie {
  private readonly _moviesApi = inject(MoviesApi);

  title = signal<string>('');
  year = signal<number | undefined>(undefined);
  category = signal<string>('');
  description = signal<string>('');

  imagePreview = signal<string | undefined>(undefined);
  selectedFile = signal<File | undefined>(undefined);

  movieFormData = signal<FormData | undefined>(undefined);

  createMovieResource = rxResource({
    params: () => this.movieFormData(),
    stream: ({ params }) => this._moviesApi.createMovie(params),
  });

  errorMessage = computed(() => setErrorMessage(this.createMovieResource.error()));

  successMessage = computed(() => {
    const SUCCESS_CREATION = this.createMovieResource.hasValue();

    return SUCCESS_CREATION ? 'Filme criado com sucesso!' : undefined;
  });

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      this.selectedFile.set(file);

      if (this.imagePreview()) {
        URL.revokeObjectURL(this.imagePreview()!);
      }

      const objectURL = URL.createObjectURL(file);

      this.imagePreview.set(objectURL);
    }
  }

  salvar() {
    const formData = new FormData();

    formData.append('titulo', this.title());
    formData.append('descricao', this.description());
    formData.append('anoLancamento', this.year()?.toString() ?? '');
    formData.append('genero', this.category());
    formData.append('image', this.selectedFile() ?? '');

    this.movieFormData.set(formData);

    console.log('title', this.title());
    console.log('year', this.year());
    console.log('description', this.description());
    console.log('category', this.category());

    console.log('imagePreview', this.imagePreview());
    console.log('selectedFile', this.selectedFile());

    console.log('Filme salvo!');
  }
}
