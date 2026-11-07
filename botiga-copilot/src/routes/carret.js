import { Router } from 'express';
import { calcularEnviament, calcularSubtotal } from '../utils/carret.js';

/**
 * Crea les rutes de càlcul del carret.
 * @returns {import('express').Router} Router d'Express amb les rutes del carret.
 */
export function routerCarret() {
  const router = Router();

  /**
   * Calcula el subtotal, el cost d'enviament i el total d'un carret.
   * @param {import('express').Request} req Petició amb `items` i `descompte` opcionals.
   * @param {import('express').Response} res Resposta HTTP amb els imports calculats.
   * @returns {void}
   */
  router.post('/total', (req, res) => {
    const { items = [], descompte = 0 } = req.body;
    try {
      const subtotal = calcularSubtotal(items, descompte);
      const enviament = calcularEnviament(items, subtotal);
      res.json({
        subtotal,
        enviament,
        total: Math.round((subtotal + enviament) * 100) / 100,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
