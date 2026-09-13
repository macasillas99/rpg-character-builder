import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CharacterClass } from '../models/character-class';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section data-testid="classes-page">
      <h1>Choose a character class</h1>

      <ul data-testid="class-list">
        @for (characterClass of characterClasses; track characterClass.id) {
          <li>
            <h2>{{ characterClass.name }}</h2>
            <p>{{ characterClass.description }}</p>
            <a [routerLink]="['/classes', characterClass.id]">View details</a>
          </li>
        }
      </ul>
    </section>
  `
})
export class ClassesComponent {
  public characterClasses: CharacterClass[] = [
    {
      id: 'fighter',
      name: 'Fighter',
      description: 'A durable combat specialist suited to close-range encounters.'
    },
    {
      id: 'wizard',
      name: 'Wizard',
      description: 'An arcane spellcaster who solves problems with powerful magic.'
    },
    {
      id: 'rogue',
      name: 'Rogue',
      description: 'A quick and stealthy specialist skilled at precision and utility.'
    }
  ];
}
