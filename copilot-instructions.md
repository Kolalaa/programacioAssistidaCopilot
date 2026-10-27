# Botiga Copilot

## Stack 

- Backend: Node.js amb Express i SQLite (mòdul `node:sqlite`), amb mòduls ES (`import`/`export`).
- Frontend: HTML,CSS i JavaScript sense frameworks.
- Tests: runner integrat de Node.js (`node:test` i `node:assert/strict`).

## Convencions
- Noms de les variables, funcions i missatges en català, en camelCase.
- Noms de fitxers en minúscules amb guions baixos (_).
- Comentaris en català.

## Arquitectura
- Totes les rutes són relatives a l'arrel del projecte ('botiga-copilot`).
- `src/index.js`: punt d'entrada. Configura Express i arrenca el servidor (port 3000).
- `src/`: codi del backend (rutes, lògica i accés a la base de dades SQLite).
- `public/`: frontend estàtic (HTML, CSS i JavaScript sense frameworks).
- `test/`: tests amb `node:test`.

## No facis
- No afegeixis deppendencies noves sense demanar-ho.