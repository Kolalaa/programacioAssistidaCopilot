import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularEnviament, calcularSubtotal, calcularTotal } from '../src/utils/carret.js';

test('calcula el total sense descompte', () => {
  const items = [
    { preu: 10, quantitat: 2 },
    { preu: 5.5, quantitat: 1 },
  ];
  assert.equal(calcularTotal(items), 25.5);
});

test('aplica un descompte percentual', () => {
  const items = [{ preu: 20, quantitat: 2 }];
  assert.equal(calcularTotal(items, 25), 30);
});

test('un carret buit val 0', () => {
  assert.equal(calcularTotal([]), 0);
});

test('llança un error si el descompte és fora de rang', () => {
  assert.throws(() => calcularSubtotal([], 120), RangeError);
});

test('calcula l enviament segons el pes per defecte', () => {
  assert.equal(calcularEnviament([{ preu: 10, quantitat: 2 }], 20), 3.9);
  assert.equal(calcularEnviament([{ preu: 10, quantitat: 11 }], 40), 9.9);
});

test('l enviament és gratuït amb un subtotal superior a 50 euros', () => {
  assert.equal(calcularEnviament([{ preu: 30, quantitat: 2 }], 60), 0);
});
