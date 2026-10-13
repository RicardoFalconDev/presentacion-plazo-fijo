import { useEffect, useRef, useState } from 'react';

// Sincronización entre ventanas (presentación, vista de presentador y su miniatura).
export const CANAL = 'control_presentacion';
const q = new URLSearchParams(location.search);
// ?miniatura=1 → vista grande del presentador: sigue al canal y se puede usar (slides 9 y 10), sin pie ni teclado.
export const MINIATURA = q.has('miniatura');
// ?fija=1 → miniaturas Anterior/Siguiente: solo muestran la slide del hash, sin canal ni interacción.
export const FIJA = q.has('fija');

// Estado de una slide compartido entre ventanas (por ejemplo, la entrada elegida en la slide 9).
export function useCompartido(clave, inicial) {
  const [valor, setValor] = useState(inicial);
  const actual = useRef(valor);
  actual.current = valor;
  const canal = useRef(null);
  useEffect(() => {
    if (FIJA || !('BroadcastChannel' in window)) return undefined;
    const c = new BroadcastChannel(CANAL);
    canal.current = c;
    c.onmessage = ({ data: m }) => {
      if (m?.clave !== clave) return;
      if (m.tipo === 'slide_estado' && m.valor !== actual.current) setValor(m.valor);
      if (m.tipo === 'pedir_slide_estado') c.postMessage({ tipo: 'slide_estado', clave, valor: actual.current });
    };
    // Al montarse toma el valor de otra ventana que ya muestre esta slide.
    c.postMessage({ tipo: 'pedir_slide_estado', clave });
    return () => { c.close(); canal.current = null; };
  }, [clave]);
  const cambiar = (v) => { setValor(v); canal.current?.postMessage({ tipo: 'slide_estado', clave, valor: v }); };
  return [valor, cambiar];
}
