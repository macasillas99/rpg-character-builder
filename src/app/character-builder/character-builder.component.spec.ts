import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { CharacterBuilderComponent } from './character-builder.component';

describe('CharacterBuilderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CharacterBuilderComponent]
    });
  });

  function setInput(
    fixture: ReturnType<typeof TestBed.createComponent<CharacterBuilderComponent>>,
    selector: string,
    value: string
  ): void {
    const input: HTMLInputElement = fixture.nativeElement.querySelector(selector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
  }

  function completeValidForm(
    fixture: ReturnType<typeof TestBed.createComponent<CharacterBuilderComponent>>
  ): void {
    setInput(fixture, '[data-testid="character-name"]', 'Mira');
    setInput(fixture, '[data-testid="character-class"]', 'Wizard');
    setInput(fixture, '[data-testid="character-level"]', '5');

    const veteran: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-testid="character-veteran"]'
    );
    veteran.checked = true;
    veteran.dispatchEvent(new Event('change'));
  }

  function submitForm(
    fixture: ReturnType<typeof TestBed.createComponent<CharacterBuilderComponent>>
  ): void {
    const form: HTMLFormElement = fixture.nativeElement.querySelector(
      '[data-testid="character-form"]'
    );
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  }

  it('keeps the name control and typed model in two-way binding', fakeAsync(() => {
    const fixture = TestBed.createComponent(CharacterBuilderComponent);
    fixture.detectChanges();

    setInput(fixture, '[data-testid="character-name"]', 'Mira');
    tick();

    expect(fixture.componentInstance.character.name).toBe('Mira');

    fixture.componentInstance.character.name = 'Elara';
    fixture.detectChanges();
    tick();

    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-testid="character-name"]'
    );
    expect(nameInput.value).toBe('Elara');
  }));

  it('does not store a character when the form is invalid', fakeAsync(() => {
    const fixture = TestBed.createComponent(CharacterBuilderComponent);
    fixture.detectChanges();
    tick();

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '[data-testid="character-submit"]'
    );
    expect(submitButton.disabled).toBeTrue();

    submitForm(fixture);
    tick();

    expect(fixture.componentInstance.characters).toEqual([]);
  }));

  it('stores valid output with hit points calculated from level', fakeAsync(() => {
    const fixture = TestBed.createComponent(CharacterBuilderComponent);
    fixture.detectChanges();

    completeValidForm(fixture);
    tick();
    fixture.detectChanges();
    submitForm(fixture);
    tick();

    expect(fixture.componentInstance.characters).toEqual([
      {
        name: 'Mira',
        characterClass: 'Wizard',
        level: 5,
        veteran: true,
        startingHitPoints: 15
      }
    ]);
  }));

  it('resets the model and form state after a successful submission', fakeAsync(() => {
    const fixture = TestBed.createComponent(CharacterBuilderComponent);
    fixture.detectChanges();

    completeValidForm(fixture);
    tick();
    fixture.detectChanges();

    const form = fixture.debugElement
      .query(By.css('[data-testid="character-form"]'))
      .injector.get(NgForm);

    submitForm(fixture);
    tick();
    fixture.detectChanges();

    expect(fixture.componentInstance.character).toEqual({
      name: '',
      characterClass: '',
      level: 1,
      veteran: false,
      startingHitPoints: 11
    });
    expect(form.pristine).toBeTrue();
    expect(form.untouched).toBeTrue();

    const nameInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-testid="character-name"]'
    );
    const levelInput: HTMLInputElement = fixture.nativeElement.querySelector(
      '[data-testid="character-level"]'
    );
    expect(nameInput.value).toBe('');
    expect(levelInput.value).toBe('1');
  }));
});
