import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <header>
      <nav aria-label="Primary navigation">
        <strong>RPG Character Builder</strong>
        <span>Home</span>
        <span>About</span>
      </nav>
    </header>

    <main>
      <section data-testid="home-page">
        <h1>{{ heroHeading }}</h1>

        <h2>Design a character</h2>
        <p>Choose a class, establish abilities, and record a profile.</p>

        <h3>Character-building features</h3>
        <ul data-testid="character-features">
          <li>Browse character classes</li>
          <li>Roll ability scores</li>
          <li>Create and save a character profile</li>
        </ul>

        <h4>Ready for your next adventure</h4>
        <p>Use the character builder to create the hero behind your next story.</p>
      </section>
    </main>

    <footer>
      <p>WEB 425 · RPG Character Builder</p>
    </footer>
  `
})
export class HomeComponent {
  public heroHeading = 'Build the hero behind your next adventure';
}
