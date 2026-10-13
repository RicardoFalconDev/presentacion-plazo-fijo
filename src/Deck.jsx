import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { SLIDE_COMPONENTS } from './slides/Slides.jsx';
import { SLIDES } from './content.js';
import { Icon } from './components/ui.jsx';
import { CANAL, MINIATURA, FIJA } from './sync.js';

const W = 1920, H = 1080;
const TOTAL = SLIDE_COMPONENTS.length;
const desdeHash = () => Math.min(TOTAL, Math.max(1, parseInt(location.hash.slice(1), 10) || 1)) - 1;


// Escala el escenario 1920 × 1080 para que entre completo en la ventana.
function useEscala() {
  const calc = () => Math.min(innerWidth / W, innerHeight / H);
  const [k, setK] = useState(calc);
  useEffect(() => { const on = () => setK(calc()); addEventListener('resize', on); return () => removeEventListener('resize', on); }, []);
  return k;
}

// Transición entre slides: eje X compartido (Material), 300 ms.
const variantes = {
  entra: (dir) => ({ opacity: 0, x: dir * 48 }),
  centro: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0, 0, 0, 1] } },
  sale: (dir) => ({ opacity: 0, x: dir * -48, transition: { duration: 0.2, ease: [0.3, 0, 1, 1] } }),
};

export default function Deck() {
  const [i, setI] = useState(desdeHash);
  const [dir, setDir] = useState(1);
  const [indice, setIndice] = useState(false);
  const k = useEscala();
  const toque = useRef(null);

  const ir = useCallback((n) => {
    const destino = Math.max(0, Math.min(TOTAL - 1, n));
    setI((actual) => { if (destino !== actual) setDir(destino > actual ? 1 : -1); return destino; });
  }, []);

  useEffect(() => { const h = `#${i + 1}`; if (location.hash !== h) history.replaceState(null, '', h); }, [i]);

  // Sincronización con la vista de presentador y con otras ventanas de la presentación.
  // Mensajes que escucha: siguiente · anterior · ir { indice } · pedir_estado · estado { indice, origen }.
  // Mensajes que emite: pedir_estado al abrirse y estado { indice, total, origen } cada vez que cambia la slide.
  const canal = useRef(null);
  const origen = useRef(Math.random().toString(36).slice(2));
  const actual = useRef(i);
  actual.current = i;
  useEffect(() => {
    if (FIJA || !('BroadcastChannel' in window)) return undefined;
    const c = new BroadcastChannel(CANAL);
    canal.current = c;
    c.onmessage = ({ data: m }) => {
      if (!m || m.origen === origen.current) return;
      if (m.tipo === 'siguiente') ir(actual.current + 1);
      else if (m.tipo === 'anterior') ir(actual.current - 1);
      else if (m.tipo === 'ir' || m.tipo === 'estado') { if (Number.isInteger(m.indice) && m.indice !== actual.current) ir(m.indice); }
      else if (m.tipo === 'pedir_estado' && !MINIATURA) c.postMessage({ tipo: 'estado', indice: actual.current, total: TOTAL, origen: origen.current });
    };
    // Al abrirse, pide el estado para sumarse a la slide en curso (en vez de imponer la suya).
    c.postMessage({ tipo: 'pedir_estado', rol: MINIATURA ? 'miniatura' : 'publico', origen: origen.current });
    return () => { c.close(); canal.current = null; };
  }, [ir]);
  // Avisa los cambios de slide (no el estado inicial). La miniatura solo escucha.
  const emitido = useRef(i);
  useEffect(() => {
    if (emitido.current === i) return;
    emitido.current = i;
    if (!MINIATURA) canal.current?.postMessage({ tipo: 'estado', indice: i, total: TOTAL, origen: origen.current });
  }, [i]);
  useEffect(() => { const on = () => ir(desdeHash()); addEventListener('hashchange', on); return () => removeEventListener('hashchange', on); }, [ir]);

  useEffect(() => {
    if (MINIATURA) return undefined;
    const on = (e) => {
      if (e.target.closest?.('input, textarea')) return;
      if (e.key === 'Escape') { setIndice((v) => !v); return; }
      if (indice) return;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(e.key)) { if (e.key === 'Enter' && e.target.closest('button, a')) return; e.preventDefault(); ir(i + 1); }
      if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); ir(i - 1); }
      if (e.key === 'Home') ir(0);
      if (e.key === 'End') ir(TOTAL - 1);
    };
    addEventListener('keydown', on);
    return () => removeEventListener('keydown', on);
  }, [i, ir, indice]);

  // Clic en los costados del escenario (fuera de elementos interactivos) y swipe en pantallas táctiles.
  const onClick = (e) => {
    if (MINIATURA) return;
    if (e.target.closest('button, a, iframe, .telefono, .entradas, .pasos')) return;
    const r = e.currentTarget.getBoundingClientRect();
    ir((e.clientX - r.left) / r.width > 0.35 ? i + 1 : i - 1);
  };
  const onPointerDown = (e) => { if (e.pointerType !== 'mouse') toque.current = [e.clientX, e.clientY]; };
  const onPointerUp = (e) => {
    if (!toque.current) return;
    const dx = e.clientX - toque.current[0], dy = e.clientY - toque.current[1];
    toque.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) ir(dx < 0 ? i + 1 : i - 1);
  };

  const Actual = SLIDE_COMPONENTS[i];
  return (
    <MotionConfig reducedMotion="user">
      <main className={`deck ${MINIATURA ? 'miniatura' : ''} ${FIJA ? 'fija' : ''}`} aria-roledescription="presentación">
        <div className="escenario" style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${k})` }}
          onClick={onClick} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
          <AnimatePresence mode="popLayout" initial={false} custom={dir}>
            <motion.section key={i} className="slide-capa" custom={dir} variants={variantes} initial="entra" animate="centro" exit="sale"
              aria-roledescription="slide" aria-label={`${i + 1} de ${TOTAL}: ${SLIDES[i].etiqueta}`}>
              <Actual />
            </motion.section>
          </AnimatePresence>

          {!MINIATURA && <footer className={`pie ${i === 0 || i === TOTAL - 1 ? 'sobre-marca' : ''}`}>
            <span className="pie-titulo">Plazo fijo · Caso de estudio</span>
            <div className="progreso" aria-hidden="true"><motion.span animate={{ width: `${((i + 1) / TOTAL) * 100}%` }} transition={{ duration: 0.3 }} /></div>
            <button className="pie-boton" onClick={() => ir(i - 1)} disabled={i === 0} aria-label="Slide anterior"><Icon name="flecha" size={28} /></button>
            <button className="pie-numero" onClick={() => setIndice(true)} aria-label="Abrir índice">{String(i + 1).padStart(2, '0')} / {TOTAL}</button>
            <button className="pie-boton" onClick={() => ir(i + 1)} disabled={i === TOTAL - 1} aria-label="Slide siguiente"><Icon name="flecha" size={28} /></button>
          </footer>}

          <AnimatePresence>
            {indice && (
              <motion.div className="indice" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIndice(false)}>
                <motion.nav className="indice-panel" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }} onClick={(e) => e.stopPropagation()} aria-label="Índice">
                  <p className="pres-etiqueta">Índice · Esc para cerrar</p>
                  <ol>
                    {SLIDES.map((s, n) => (
                      <li key={s.id}><button className={n === i ? 'actual' : ''} onClick={() => { ir(n); setIndice(false); }}><span>{String(n + 1).padStart(2, '0')}</span>{s.etiqueta}</button></li>
                    ))}
                  </ol>
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </MotionConfig>
  );
}
