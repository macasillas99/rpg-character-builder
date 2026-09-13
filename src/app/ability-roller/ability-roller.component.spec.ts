import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AbilityRollerComponent } from './ability-roller.component';
import { DiceService } from '../dice.service';

describe('AbilityRollerComponent', () => {
  function createComponent(routeSides: string, rolledValue = 4): {
    fixture: ComponentFixture<AbilityRollerComponent>;
    component: AbilityRollerComponent;
    diceService: jasmine.SpyObj<DiceService>;
  } {
    const diceService = jasmine.createSpyObj<DiceService>('DiceService', ['roll']);
    diceService.roll.and.returnValue(rolledValue);

    TestBed.configureTestingModule({
      imports: [AbilityRollerComponent],
      providers: [
        { provide: DiceService, useValue: diceService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: convertToParamMap({ sides: routeSides }) }
          }
        }
      ]
    });

    const fixture = TestBed.createComponent(AbilityRollerComponent);
    fixture.detectChanges();

    return {
      fixture,
      component: fixture.componentInstance,
      diceService
    };
  }

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('calls the spied DiceService with the routed number of sides', () => {
    const { component, diceService } = createComponent('12');

    component.rollAbility();

    expect(diceService.roll).toHaveBeenCalledOnceWith(12);
  });

  it('uses 6 and writes one safe warning for invalid route input', () => {
    const warning = spyOn(console, 'warn');
    const { component, diceService } = createComponent('not-a-number');

    component.rollAbility();

    expect(diceService.roll).toHaveBeenCalledOnceWith(6);
    expect(warning).toHaveBeenCalledOnceWith(
      'Invalid dice sides route parameter. Defaulting to 6.'
    );
  });

  it('displays the rolled result after the action control is clicked', () => {
    const { fixture } = createComponent('8', 7);
    const button: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="roll-button"]'
    );

    button.click();
    fixture.detectChanges();

    const result: HTMLElement = fixture.nativeElement.querySelector(
      '[data-testid="roll-result"]'
    );
    expect(result.textContent?.trim()).toBe('7');
  });
});
