import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PROTOTIPO } from '../content.js';
import { FIJA } from '../sync.js';

// Íconos Material (mismo estilo que el sistema de diseño del prototipo).
const PATHS = {
  negocio: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
  usuario: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  diseno: 'M12 3a9 9 0 000 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  explorar: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  conversar: 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z',
  ganancia: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
  calendario: 'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10z',
  control: 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  telefono: 'M15.5 1h-8A2.5 2.5 0 005 3.5v17A2.5 2.5 0 007.5 23h8a2.5 2.5 0 002.5-2.5v-17A2.5 2.5 0 0015.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z',
  inversiones: 'M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z',
  billetera: 'M21 18v1c0 1.1-.9 2-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14c1.1 0 2 .9 2 2v1h-9a2 2 0 00-2 2v8a2 2 0 002 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  inicio: 'M8 5v14l11-7z',
  check: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
  conversion: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z',
  estrella: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  persona: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  flecha: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  abrir: 'M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z',
};

export function Icon({ name, size = 32, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flex: 'none' }}>
      <path d={PATHS[name]} fill={color} />
    </svg>
  );
}

// Animación en cascada para el contenido de cada slide (≤ 700 ms en total).
export const fade = (i = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0, 0, 0, 1], delay: 0.08 + i * 0.07 } },
});

export function Encabezado({ etiqueta, titulo, bajada, claro }) {
  return (
    <header className={`encabezado ${claro ? 'claro' : ''}`}>
      {etiqueta && <motion.p className="pres-etiqueta" {...fade(0)}>{etiqueta}</motion.p>}
      <motion.h1 className="pres-titulo" {...fade(1)}>{titulo}</motion.h1>
      {bajada && <motion.p className="pres-cuerpo c-secundario" {...fade(2)}>{bajada}</motion.p>}
    </header>
  );
}

export function Card({ icono, titulo, texto, children, i = 0, className = '' }) {
  return (
    <motion.article className={`pres-card ${className}`} {...fade(i)}>
      {icono && <span className="pres-icono"><Icon name={icono} /></span>}
      {titulo && <h2 className="pres-subtitulo">{titulo}</h2>}
      {texto && <p className="pres-cuerpo c-secundario">{texto}</p>}
      {children}
    </motion.article>
  );
}

// Flujo de pasos que se dibuja paso a paso (Descubrir › Evaluar › Contratar, etc.).
export function Pasos({ pasos, desde = 0, activo, onSelect, chico }) {
  return (
    <ol className={`pasos ${chico ? 'chico' : ''}`}>
      {pasos.map((p, i) => {
        const titulo = typeof p === 'string' ? p : p.titulo;
        const Tag = onSelect ? 'button' : 'span';
        return (
          <motion.li key={titulo} className="paso-item"
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: [0, 0, 0, 1], delay: 0.25 + (desde + i) * 0.12 } }}>
            {i > 0 && <span className="paso-flecha"><Icon name="flecha" size={chico ? 24 : 32} /></span>}
            <Tag className={`paso ${activo === i ? 'activo' : ''}`} onClick={onSelect ? () => onSelect(i) : undefined} aria-pressed={onSelect ? activo === i : undefined}>
              {titulo}
            </Tag>
          </motion.li>
        );
      })}
    </ol>
  );
}

// Teléfono con el prototipo publicado en vivo (iframe). Cambiar `pantalla` recarga en esa pantalla.
// `sync`: clave para espejar el prototipo entre ventanas (presentación ↔ vista de presentador).
// `fondo`: el prototipo arranca desplazado hasta el final de la pantalla (Home → tarjeta de plazo fijo).
export function Telefono({ pantalla, titulo, sync, fondo }) {
  const [cargando, setCargando] = useState(true);
  useEffect(() => { setCargando(true); }, [pantalla]);
  const src = `${PROTOTIPO}?modo=nativo&pantalla=${pantalla}${fondo ? '&fondo=1' : ''}`;
  const srcVista = sync && !FIJA ? `${src}&sync=${sync}` : src;
  return (
    <div className="telefono" onClick={(e) => e.stopPropagation()}>
      <div className="telefono-pantalla">
        <iframe key={pantalla} src={srcVista} title={titulo || 'Prototipo del simulador de plazo fijo'} onLoad={() => setCargando(false)} />
        {cargando && <div className="telefono-cargando" aria-hidden="true"><span className="spinner" /></div>}
      </div>
      <a className="telefono-abrir" href={src} target="_blank" rel="noreferrer"><Icon name="abrir" size={18} /> Abrir en otra pestaña</a>
    </div>
  );
}
