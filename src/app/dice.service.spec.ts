import { TestBed } from '@angular/core/testing';
import { DiceService } from './dice.service';

describe('DiceService', () => {
  let service: DiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiceService);
  });

  it('returns an integer inside the inclusive range', () => {
    for (let rollNumber = 0; rollNumber < 100; rollNumber += 1) {
      const result = service.roll(20);

      expect(Number.isInteger(result)).withContext(`roll ${rollNumber + 1}`).toBeTrue();
      expect(result).withContext(`roll ${rollNumber + 1}`).toBeGreaterThanOrEqual(1);
      expect(result).withContext(`roll ${rollNumber + 1}`).toBeLessThanOrEqual(20);
    }
  });

  it('includes both endpoints of the requested range', () => {
    spyOn(Math, 'random').and.returnValues(0, 0.999999);

    expect(service.roll(6)).toBe(1);
    expect(service.roll(6)).toBe(6);
  });

  it('throws RangeError for invalid sides', () => {
    for (const invalidSides of [1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(() => service.roll(invalidSides))
        .withContext(`sides: ${invalidSides}`)
        .toThrowError(RangeError);
    }
  });
});
