import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-authentication-screen',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './authentication-screen.html',
})
export class AuthenticationScreen {}
