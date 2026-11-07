import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { crearApp } from '../src/app.js';
import { crearBaseDades } from '../src/db.js';

let servidor;
let base;

before(() => {
  servidor = crearApp(crearBaseDades()).listen(0);
  base = `http://localhost:${servidor.address().port}`;
});

after(() => servidor.close());

test('GET /api/productes retorna tots els productes', async () => {
  const resposta = await fetch(`${base}/api/productes`);
  assert.equal(resposta.status, 200);
  const productes = await resposta.json();
  assert.equal(productes.length, 6);

  const samarreta = productes.find((p) => p.id === 1);
  assert.equal(samarreta.mitjana, 4);
  assert.equal(samarreta.numRessenyes, 2);
});

test('GET /api/productes informa quan un producte no té ressenyes', async () => {
  const resposta = await fetch(`${base}/api/productes`);
  const productes = await resposta.json();
  const dessuadora = productes.find((p) => p.id === 2);

  assert.equal(dessuadora.mitjana, null);
  assert.equal(dessuadora.numRessenyes, 0);
});

test('GET /api/productes?categoria=roba filtra per categoria', async () => {
  const resposta = await fetch(`${base}/api/productes?categoria=roba`);
  const productes = await resposta.json();
  assert.ok(productes.every((p) => p.categoria === 'roba'));
});

test('GET /api/productes/:id retorna 404 si no existeix', async () => {
  const resposta = await fetch(`${base}/api/productes/999`);
  assert.equal(resposta.status, 404);
});

test('POST /api/carret/total retorna subtotal, enviament i total', async () => {
  const resposta = await fetch(`${base}/api/carret/total`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ preu: 10, quantitat: 2 }],
      descompte: 0,
    }),
  });

  assert.equal(resposta.status, 200);
  assert.deepEqual(await resposta.json(), {
    subtotal: 20,
    enviament: 3.9,
    total: 23.9,
  });
});

test('POST /api/carret/total aplica enviament gratuït després del descompte', async () => {
  const resposta = await fetch(`${base}/api/carret/total`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{ preu: 60, quantitat: 1 }],
      descompte: 10,
    }),
  });

  assert.deepEqual(await resposta.json(), {
    subtotal: 54,
    enviament: 0,
    total: 54,
  });
});
