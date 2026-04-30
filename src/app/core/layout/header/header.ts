import { Component, inject } from '@angular/core';
import { UserTokenStore } from '../../services/user-token-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
})
export class Header {
  private readonly _userTokenStore = inject(UserTokenStore);
  private readonly _router = inject(Router);

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this._userTokenStore.removeToken();

    this._router.navigate(['/auth/login']);
  }
}
