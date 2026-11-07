import { Router } from 'express';
import { calcularEnviament, calcularSubtotal } from '../utils/carret.js';

export function routerCarret() {
  const router = Router();

  // POST /api/carret/total  { items: [{ preu, quantitat }], descompte }
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
