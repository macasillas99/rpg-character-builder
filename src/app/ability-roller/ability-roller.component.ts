import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiceService } from '../dice.service';

@Component({
  selector: 'app-ability-roller',
  standalone: true,
  template: `
    <section>
      <h1>Ability-Score Roller</h1>
      <button type="button" data-testid="roll-button" (click)="rollAbility()">
        Roll ability score
      </button>
      <p data-testid="roll-result">{{ result }}</p>
    </section>
  `
})
export class AbilityRollerComponent {
  public result: number | null = null;
  private readonly sides: number;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly diceService: DiceService
  ) {
    const routeValue = this.route.snapshot.paramMap.get('sides');
    const requestedSides = Number(routeValue);

    if (routeValue === null || !Number.isInteger(requestedSides) || requestedSides < 2) {
      this.sides = 6;
      console.warn('Invalid dice sides route parameter. Defaulting to 6.');
    } else {
      this.sides = requestedSides;
    }
  }

  public rollAbility(): void {
    this.result = this.diceService.roll(this.sides);
  }
}
