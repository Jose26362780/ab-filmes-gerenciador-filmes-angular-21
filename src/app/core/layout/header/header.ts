import { Component, inject } from '@angular/core';
import { UserTokenStore } from '../../services/user-token-store';
import { Router } from '@angular/router';
import { UserInfosStore } from '../../services/user-infos-store';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
})
export class Header {
  private readonly _userTokenStore = inject(UserTokenStore);
  private readonly _router = inject(Router);
  readonly _userInfosStore = inject(UserInfosStore);

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this._userTokenStore.removeToken();
    this._userInfosStore.removeUser();

    this._router.navigate(['/auth/login']);
  }
}
