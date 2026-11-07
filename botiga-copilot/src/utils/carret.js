/**
 * Calcula el total del carret aplicant un descompte percentual.
 * @param {Array<{preu: number, quantitat: number}>} items
 * @param {number} descompte Percentatge entre 0 i 100.
 * @returns {number} Total arrodonit a 2 decimals.
 * @throws {RangeError} Si el descompte és fora de rang.
 */
export function calcularTotal(items, descompte = 0) {
  return calcularSubtotal(items, descompte);
}

export function calcularSubtotal(items, descompte = 0) {
  if (descompte < 0 || descompte > 100) {
    throw new RangeError('El descompte ha de ser entre 0 i 100');
  }
  let subtotal = 0;
  for (const item of items) {
    subtotal += item.preu * item.quantitat;
  }
  return Math.round(subtotal * (1 - descompte / 100) * 100) / 100;
}

export function calcularEnviament(items, subtotal) {
  if (subtotal > 50) {
    return 0;
  }

  const pes = items.reduce(
    (total, item) => total + (item.pes ?? 0.5) * item.quantitat,
    0
  );
  if (pes <= 1) {
    return 3.9;
  }
  if (pes <= 5) {
    return 5.9;
  }
  return 9.9;
}
