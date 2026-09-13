import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Character } from '../models/character';

@Component({
  selector: 'app-character-builder',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section>
      <h1>Build a character</h1>

      <form
        #characterForm="ngForm"
        data-testid="character-form"
        (ngSubmit)="submitCharacter(characterForm)"
      >
        <p>
          <label for="character-name">Name</label>
          <input
            id="character-name"
            name="name"
            type="text"
            required
            data-testid="character-name"
            [(ngModel)]="character.name"
          />
        </p>

        <p>
          <label for="character-class">Class</label>
          <input
            id="character-class"
            name="characterClass"
            type="text"
            required
            data-testid="character-class"
            [(ngModel)]="character.characterClass"
          />
        </p>

        <p>
          <label for="character-level">Level</label>
          <input
            id="character-level"
            name="level"
            type="number"
            required
            min="1"
            max="20"
            step="1"
            pattern="(?:[1-9]|1[0-9]|20)"
            data-testid="character-level"
            [(ngModel)]="character.level"
          />
        </p>

        <p>
          <input
            id="character-veteran"
            name="veteran"
            type="checkbox"
            data-testid="character-veteran"
            [(ngModel)]="character.veteran"
          />
          <label for="character-veteran">Veteran character</label>
        </p>

        <button
          type="submit"
          data-testid="character-submit"
          [disabled]="characterForm.invalid || !isModelValid()"
        >
          Create character
        </button>
      </form>

      <ul data-testid="character-list">
        @for (savedCharacter of characters; track $index) {
          <li>
            {{ savedCharacter.name }} — {{ savedCharacter.characterClass }},
            level {{ savedCharacter.level }},
            {{ savedCharacter.startingHitPoints }} starting HP
            @if (savedCharacter.veteran) {
              (veteran)
            }
          </li>
        }
      </ul>
    </section>
  `
})
export class CharacterBuilderComponent {
  public characters: Character[] = [];
  public character: Character = this.createEmptyCharacter();

  public isModelValid(): boolean {
    return (
      this.character.name.trim().length > 0 &&
      this.character.characterClass.trim().length > 0 &&
      Number.isInteger(this.character.level) &&
      this.character.level >= 1 &&
      this.character.level <= 20
    );
  }

  public submitCharacter(form: NgForm): void {
    if (form.invalid || !this.isModelValid()) {
      return;
    }

    const savedCharacter: Character = {
      name: this.character.name.trim(),
      characterClass: this.character.characterClass.trim(),
      level: this.character.level,
      veteran: this.character.veteran,
      startingHitPoints: 10 + this.character.level
    };

    this.characters.push(savedCharacter);
    this.character = this.createEmptyCharacter();
    form.resetForm(this.character);
  }

  private createEmptyCharacter(): Character {
    return {
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
      startingHitPoints: 11
    };
  }
}
