import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <header>
      <nav aria-label="Primary navigation">
        <strong>RPG Character Builder</strong>
        <a
          routerLink="/"
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          Home
        </a>
        <a routerLink="/classes" routerLinkActive="active">Classes</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
      </nav>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer>
      <p>WEB 425 · RPG Character Builder</p>
    </footer>
  `
})
export class AppComponent {}
