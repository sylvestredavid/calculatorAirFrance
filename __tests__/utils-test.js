import {formatText, calculPoidTotal, calculKerozeneUtilise} from '../src/utils';

describe('formatText', () => {
  test('expect 1.2.3 equals 1.2', () => {
    expect(formatText('1.2.3')).toBe('1.2');
  });
  test('expect 1,2 equals 1.2', () => {
    expect(formatText('1,2')).toBe('1.2');
  });
  test('expect 1 2 equals 12', () => {
    expect(formatText('1 2')).toBe('12');
  });
  test('expect 1D2 equals 12', () => {
    expect(formatText('1D2')).toBe('12');
  });
  test('expect 1D2.3,4 equals 12', () => {
    expect(formatText('1D2.3,4')).toBe('12.3');
  });
});

describe('calculPoidTotal', () => {
  test('1 personne, 100l de kérozene, 100kg de bagage soute et 100kg de bagage cabine', () => {
    const state = {
      nbPassagers: '1',
      nbLitreKerozene: '100',
      nbKilosBagagesSoute: '100',
      nbKilosBagagesCabine: '100',
    };
    expect(calculPoidTotal(state)).toBe(40654);
  });
  test('100 personne, 1000l de kérozene, 500kg de bagage soute et 500kg de bagage cabine', () => {
    const state = {
      nbPassagers: '100',
      nbLitreKerozene: '1000',
      nbKilosBagagesSoute: '500',
      nbKilosBagagesCabine: '500',
    };
    expect(calculPoidTotal(state)).toBe(49140);
  });
});

describe('calculKerozeneUtilise', () => {
  test('10h', () => {
    expect(calculKerozeneUtilise('10')).toBe(30250);
  });
  test('14h', () => {
    expect(calculKerozeneUtilise('14')).toBe(42350);
  });
});
