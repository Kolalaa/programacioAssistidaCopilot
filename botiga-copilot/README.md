# Botiga Copilot

Mini-botiga en línia per practicar la programació assistida amb GitHub Copilot.

## Requisits

- Node.js 22.13 o superior (recomanat: Node.js 24 LTS)

## Instal·lació i execució

```bash
npm install
npm start
```

Obre <http://localhost:3000> al navegador.

## Tests

```bash
npm test
```

La comanda s'ha d'executar des de la carpeta `botiga-copilot` i utilitza el
runner de tests integrat de Node.js.

## Endpoints de l'API

### Productes

- `GET /api/productes`: retorna tots els productes amb la mitjana i el nombre
  de ressenyes.
- `GET /api/productes?categoria=roba`: filtra els productes per categoria.
- `GET /api/productes/:id`: retorna un producte concret. Si no existeix,
  retorna `404`.

### Ressenyes

- `GET /api/ressenyes?producteId=1`: retorna les ressenyes d'un producte.
- `POST /api/ressenyes`: crea una ressenya.

  ```json
  {
    "producteId": 1,
    "autor": "Marta",
    "text": "Molt bona qualitat.",
    "puntuacio": 5
  }
  ```

- `POST /api/carret/total`: calcula el subtotal, el cost d'enviament i el
  total. Accepta un descompte percentual opcional. El pes dels productes que
  no tenen pes informat és de `0,5 kg` per unitat.

  ```json
  {
    "items": [
      { "preu": 10, "quantitat": 2 }
    ],
    "descompte": 0
  }
  ```

  Resposta:

  ```json
  {
    "subtotal": 20,
    "enviament": 3.9,
    "total": 23.9
  }
  ```

## Estructura

```
src/
  index.js          Punt d'entrada: inicia el servidor
  app.js            Configuració d'Express i rutes
  config.js         Configuració de l'aplicació
  db.js             Base de dades SQLite en memòria amb dades de prova
  routes/           Rutes de l'API
  utils/carret.js   Càlcul del total del carret
public/             Frontend (HTML, CSS i JavaScript)
test/               Tests amb el runner integrat de Node.js
docs/               Documentació de proveïdors externs
```
