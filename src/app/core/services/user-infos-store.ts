import { Injectable, signal } from '@angular/core';
import { IUserInfos } from '../../shared/models/user-infos';

@Injectable({
  providedIn: 'root',
})
export class UserInfosStore {
  private readonly user = signal<IUserInfos | undefined>(undefined);

  userInfos = this.user.asReadonly(); // aqui estamos colocando o signal para so leitura

  setUserInfos(user: IUserInfos) {
    this.user.set(user);
  }
}
