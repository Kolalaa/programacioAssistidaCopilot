import { Router } from 'express';

/**
 * Crea les rutes per consultar i publicar ressenyes de productes.
 * @param {import('node:sqlite').DatabaseSync} db Base de dades de la botiga.
 * @returns {import('express').Router} Router d'Express amb les rutes de ressenyes.
 */
export function routerRessenyes(db) {
  const router = Router();

  /**
   * Retorna les ressenyes d'un producte ordenades de més nova a més antiga.
   * @param {import('express').Request} req Petició amb `producteId` a la query.
   * @param {import('express').Response} res Resposta HTTP.
   * @returns {void}
   */
  router.get('/', (req, res) => {
    const ressenyes = db
      .prepare('SELECT * FROM ressenyes WHERE producte_id = ? ORDER BY id DESC')
      .all(Number(req.query.producteId));
    res.json(ressenyes);
  });

  /**
   * Crea una ressenya per a un producte.
   * @param {import('express').Request} req Petició amb les dades de la ressenya.
   * @param {import('express').Response} res Resposta HTTP amb l'identificador creat.
   * @returns {void}
   */
  router.post('/', (req, res) => {
    const { producteId, autor, text, puntuacio } = req.body;
    const resultat = db
      .prepare(
        'INSERT INTO ressenyes (producte_id, autor, text, puntuacio) VALUES (?, ?, ?, ?)'
      )
      .run(producteId, autor, text, puntuacio);
    res.status(201).json({ id: Number(resultat.lastInsertRowid) });
  });

  return router;
}
