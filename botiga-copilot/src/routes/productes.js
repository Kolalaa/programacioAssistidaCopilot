import { Router } from 'express';

/**
 * Crea les rutes de consulta de productes.
 * @param {import('node:sqlite').DatabaseSync} db Base de dades de la botiga.
 * @returns {import('express').Router} Router d'Express amb les rutes de productes.
 */
export function routerProductes(db) {
  const router = Router();

  /**
   * Retorna els productes, opcionalment filtrats per categoria, amb les seves
   * estadístiques de ressenyes.
   * @param {import('express').Request} req Petició amb la categoria opcional a la query.
   * @param {import('express').Response} res Resposta HTTP.
   * @returns {void}
   */
  router.get('/', (req, res) => {
    const { categoria } = req.query;
    let sql = `
      SELECT
        p.*,
        ROUND(AVG(r.puntuacio), 2) AS mitjana,
        COUNT(r.id) AS numRessenyes
      FROM productes p
      LEFT JOIN ressenyes r ON r.producte_id = p.id
    `;
    const parametres = [];
    if (categoria) {
      sql += ' WHERE p.categoria = ?';
      parametres.push(categoria);
    }
    sql += ' GROUP BY p.id';
    const productes = db.prepare(sql).all(...parametres);
    res.json(productes);
  });

  /**
   * Retorna un producte pel seu identificador.
   * @param {import('express').Request} req Petició amb l'identificador a la ruta.
   * @param {import('express').Response} res Resposta HTTP amb el producte o un error 404.
   * @returns {void}
   */
  router.get('/:id', (req, res) => {
    const producte = db
      .prepare('SELECT * FROM productes WHERE id = ?')
      .get(Number(req.params.id));
    if (!producte) {
      return res.status(404).json({ error: 'Producte no trobat' });
    }
    res.json(producte);
  });

  return router;
}
