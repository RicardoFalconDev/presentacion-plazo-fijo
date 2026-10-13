import { motion } from 'framer-motion';
import { Encabezado, Card, Pasos, Telefono, Icon, fade } from '../components/ui.jsx';
import {
  INTRO, DESAFIO, PARTIDA, PERSONA, PROBLEMA, OPORTUNIDAD, HIPOTESIS, DECISIONES,
  DESCUBRIR, SIMULAR, VALIDACION, PASOS, SLIDES, PROTOTIPO, FIGMA, PORTFOLIO, AUTOR,
} from '../content.js';
import { useCompartido } from '../sync.js';

// Cada slide se diseña sobre un escenario de 1920 × 1080 (se escala al viewport en Deck).

function Intro() {
  return (
    <div className="slide slide-marca">
      <div className="marca-circulo a" /><div className="marca-circulo b" />
      <div className="intro-contenido">
        <motion.p className="pres-etiqueta claro" {...fade(0)}>{AUTOR}</motion.p>
        <motion.p className="pres-etiqueta claro" {...fade(1)}>{SLIDES[0].etiqueta}</motion.p>
        <motion.h1 className="pres-display" {...fade(1)}>{INTRO.titulo}</motion.h1>
      </div>
      {/* Ayuda de navegación cerca de la barra inferior, separada del título. */}
      <motion.p className="pres-cuerpo intro-ayuda" {...fade(3)}>Usá las flechas del teclado, tocá los costados o deslizá para avanzar.</motion.p>
    </div>
  );
}

function Desafio() {
  return (
    <div className="slide slide-desafio">
      <Encabezado etiqueta={SLIDES[1].etiqueta} titulo={DESAFIO.titulo} bajada={DESAFIO.bajada} />
      <div className="grilla-3">
        {DESAFIO.objetivos.map((o, i) => (
          <Card key={o.titulo} icono={o.icono} titulo={o.titulo} texto={o.texto} i={3 + i} />
        ))}
      </div>
    </div>
  );
}

function Partida() {
  return (
    <div className="slide">
      <Encabezado etiqueta={SLIDES[2].etiqueta} titulo={PARTIDA.titulo} />
      <motion.div className="bloque-flujo" {...fade(2)}>
        <p className="pres-etiqueta-neutra">Recorrido actual</p>
        <Pasos pasos={PARTIDA.flujo} />
      </motion.div>
      <motion.h2 className="pres-subtitulo" {...fade(4)}>{PARTIDA.subtitulo}</motion.h2>
      <div className="grilla-3">
        {PARTIDA.oportunidades.map((t, i) => (
          <Card key={t} i={5 + i} className="card-numero">
            <span className="numero">{i + 1}</span>
            <p className="pres-cuerpo">{t}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Usuario() {
  return (
    <div className="slide">
      <Encabezado etiqueta="Protopersona" titulo={SLIDES[3].etiqueta} />
      <motion.article className="pres-card persona" {...fade(3)}>
        <div className="persona-cabecera">
          <img className="persona-avatar" src={`${import.meta.env.BASE_URL}${PERSONA.foto}`} width="88" height="88" alt="" />
          <div>
            <h2 className="pres-subtitulo">{PERSONA.nombre}</h2>
            <p className="pres-cuerpo c-secundario">{PERSONA.rasgos}</p>
          </div>
        </div>
        <p className="persona-cita">{PERSONA.cita}</p>
        <div className="persona-grilla">
          {[['Objetivos', PERSONA.objetivos], ['Necesidades', PERSONA.necesidades]].map(([t, items]) => (
            <div key={t}>
              <h3 className="pres-etiqueta-neutra">{t}</h3>
              <ul className="pres-cuerpo persona-lista">{items.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="persona-jtbd">
          <h3 className="pres-etiqueta">Job to be done</h3>
          <p className="pres-subtitulo-regular">{PERSONA.jtbd}</p>
        </div>
      </motion.article>
    </div>
  );
}

function Destacado({ etiqueta, titulo, bajada, children, n }) {
  return (
    <div className="slide slide-destacado">
      <motion.p className="pres-etiqueta" {...fade(0)}>{SLIDES[n].etiqueta}</motion.p>
      <motion.p className="pill" {...fade(1)}>{etiqueta}</motion.p>
      <motion.h1 className="pres-display oscuro" {...fade(2)}>{titulo}</motion.h1>
      {bajada && <motion.p className="pres-subtitulo-regular c-secundario" {...fade(3)}>{bajada}</motion.p>}
      {children}
    </div>
  );
}

function Problema() {
  return <Destacado n={4} etiqueta={PROBLEMA.etiqueta} titulo={PROBLEMA.titulo} bajada={PROBLEMA.bajada} />;
}

function Oportunidad() {
  return <Destacado n={5} etiqueta={OPORTUNIDAD.etiqueta} titulo={OPORTUNIDAD.titulo} />;
}

function Hipotesis() {
  return (
    <div className="slide">
      <Encabezado etiqueta="Hipótesis" titulo={SLIDES[6].etiqueta} />
      <div className="grilla-2">
        {HIPOTESIS.map((h, i) => <Card key={h.titulo} icono={h.icono} titulo={h.titulo} i={3 + i}><p className="pres-subtitulo-regular">{h.texto}</p></Card>)}
      </div>
    </div>
  );
}

function Decisiones() {
  return (
    <div className="slide">
      <Encabezado etiqueta="Decisiones de diseño" titulo={SLIDES[7].etiqueta} />
      <div className="grilla-5">
        {DECISIONES.map((d, i) => <Card key={d.titulo} icono={d.icono} titulo={d.titulo} texto={d.texto} i={3 + i} />)}
      </div>
    </div>
  );
}

function Descubrir() {
  const [sel, setSel] = useCompartido('descubrir', 0);
  const e = DESCUBRIR.entradas[sel];
  return (
    <div className="slide slide-demo">
      <div className="demo-texto">
        <Encabezado etiqueta={SLIDES[8].etiqueta} titulo={DESCUBRIR.titulo} />
        <div className="entradas" role="tablist" aria-label="Puntos de entrada al simulador">
          {DESCUBRIR.entradas.map((x, i) => (
            <motion.button key={x.titulo} role="tab" aria-selected={sel === i} className={`entrada ${sel === i ? 'activa' : ''}`} onClick={() => setSel(i)} {...fade(3 + i)}>
              <span className="pres-icono"><Icon name={x.icono} /></span>
              <span><strong className="pres-subtitulo">{x.titulo}</strong><span className="pres-cuerpo c-secundario">{x.texto}</span></span>
            </motion.button>
          ))}
        </div>
        <motion.p className="pres-cuerpo c-terciario" {...fade(7)}>Elegí un punto de entrada: el teléfono muestra el prototipo en vivo.</motion.p>
      </div>
      <motion.div {...fade(4)}><Telefono pantalla={e.pantalla} fondo={e.fondo} titulo={`Prototipo: ${e.titulo}`} sync="descubrir" /></motion.div>
    </div>
  );
}

function Simular() {
  const [sel, setSel] = useCompartido('simular', 0);
  return (
    <div className="slide slide-demo">
      <div className="demo-texto">
        <Encabezado etiqueta={SLIDES[9].etiqueta} titulo={SIMULAR.titulo} bajada={SIMULAR.bajada} />
        <motion.div className="bloque-flujo" {...fade(3)}>
          <Pasos pasos={SIMULAR.pasos} activo={sel} onSelect={setSel} chico />
        </motion.div>
      </div>
      <motion.div {...fade(4)}><Telefono pantalla={SIMULAR.pasos[sel].pantalla} titulo={`Prototipo: ${SIMULAR.pasos[sel].titulo}`} sync="simular" /></motion.div>
    </div>
  );
}

function Validacion() {
  return (
    <div className="slide">
      <Encabezado etiqueta="Validación" titulo={VALIDACION.titulo} />
      <div className="validacion">
        <Card icono="usuario" titulo={VALIDACION.metodo} texto={VALIDACION.metodoTexto} i={2} className="metodo" />
        <div className="grilla-2 indicadores">
          {VALIDACION.indicadores.map((m, i) => <Card key={m.titulo} icono={m.icono} titulo={m.titulo} texto={m.texto} i={3 + i} />)}
        </div>
      </div>
    </div>
  );
}

function Pasos12() {
  return (
    <div className="slide slide-marca">
      <div className="marca-circulo a" /><div className="marca-circulo b" />
      <div className="cierre">
        <motion.p className="pres-etiqueta claro" {...fade(0)}>Cierre</motion.p>
        <motion.h1 className="pres-titulo claro" {...fade(1)}>{PASOS.titulo}</motion.h1>
        <div className="grilla-3">
          {PASOS.items.map((p, i) => (
            <motion.article key={p.titulo} className="pres-card en-marca" {...fade(2 + i)}>
              <span className="numero">{i + 1}</span>
              <h2 className="pres-subtitulo">{p.titulo}</h2>
              <p className="pres-cuerpo c-secundario">{p.texto}</p>
            </motion.article>
          ))}
        </div>
        <motion.div className="cierre-links" {...fade(6)} onClick={(e) => e.stopPropagation()}>
          <a className="boton claro" href={PROTOTIPO} target="_blank" rel="noreferrer">Ver el prototipo <Icon name="abrir" size={20} /></a>
          <a className="boton contorno" href={FIGMA} target="_blank" rel="noreferrer">Ver el diseño en Figma <Icon name="abrir" size={20} /></a>
          <a className="boton contorno" href={PORTFOLIO} target="_blank" rel="noreferrer">Mi portfolio <Icon name="abrir" size={20} /></a>
        </motion.div>
      </div>
    </div>
  );
}

export const SLIDE_COMPONENTS = [Intro, Desafio, Partida, Usuario, Problema, Oportunidad, Hipotesis, Decisiones, Descubrir, Simular, Validacion, Pasos12];
