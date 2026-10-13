// Vista de presentador: notas, temporizador, reloj y control remoto de la presentación.
// Se comunica con las ventanas de la presentación por BroadcastChannel('control_presentacion').
import '../styles/tokens.css';
import './presentador.css';
import { SLIDES } from '../content.js';
import { NOTAS } from './notas.js';

const TOTAL = SLIDES.length;
const origen = Math.random().toString(36).slice(2);
const canal = 'BroadcastChannel' in window ? new BroadcastChannel('control_presentacion') : null;
const $ = (id) => document.getElementById(id);

let indice = 0;

// Selector "Diapositiva N de 12 · título".
$('selector').append(...SLIDES.map((sl, n) => new Option(`Diapositiva ${n + 1} de ${TOTAL} · ${sl.etiqueta}`, String(n))));
$('selector').addEventListener('change', (e) => ir(Number(e.target.value)));

function vecina(id, n) {
  const f = $(id);
  if (n < 0 || n >= TOTAL) { f.removeAttribute('src'); f.hidden = true; return; }
  f.hidden = false;
  f.src = `./?miniatura=1&fija=1#${n + 1}`;
}

// ——— Slide actual ———
function mostrar(n) {
  indice = Math.max(0, Math.min(TOTAL - 1, n));
  $('indicador').textContent = `Diapositiva ${indice + 1} de ${TOTAL}`;
  $('selector').value = String(indice);
  $('anterior').disabled = indice === 0;
  $('siguiente').disabled = indice === TOTAL - 1;
  // Miniaturas fijas de la slide anterior y la siguiente (cambiar el hash no recarga la página).
  vecina('vista-anterior', indice - 1);
  vecina('vista-siguiente', indice + 1);

  // Se limpia el panel y se carga solo el guion de esta slide.
  const notas = $('notas');
  notas.replaceChildren(...String(NOTAS[indice + 1] ?? '').split(/\n\s*\n/).filter(Boolean).map((t) => {
    // Marcas del guion: [Pausa] / [Respirar] → indicación; «*» → pregunta; «- » → idea clave.
    let texto = t.trim();
    const p = document.createElement('p');
    const indicacion = texto.match(/^\[(.+)\]$/);
    if (indicacion) { p.className = 'nota-indicacion'; p.textContent = indicacion[1]; return p; }
    if (/^\*(?!\*)/.test(texto)) { p.className = 'nota-pregunta'; texto = texto.slice(1); }
    else if (texto.startsWith('- ')) { p.className = 'nota-clave'; texto = texto.slice(2); }
    // Negritas opcionales (**texto**), armado sin innerHTML.
    texto.split('**').forEach((trozo, k) => {
      if (!trozo) return;
      if (k % 2) { const b = document.createElement('strong'); b.textContent = trozo; p.append(b); } else p.append(trozo);
    });
    return p;
  }));
  notas.scrollTop = 0;
}

// Cambia la slide desde esta ventana y se lo indica a la presentación (y a la miniatura).
function ir(n) {
  const destino = Math.max(0, Math.min(TOTAL - 1, n));
  if (destino === indice) return;
  mostrar(destino);
  canal?.postMessage({ tipo: 'ir', indice: destino, origen });
}

if (canal) {
  canal.onmessage = ({ data: m }) => {
    if (!m || m.origen === origen) return;
    // La presentación cambió de slide (teclado, clic, swipe, índice): se sigue.
    if (m.tipo === 'estado' && Number.isInteger(m.indice) && m.indice !== indice) mostrar(m.indice);
    // Una ventana del público recién abierta pide la slide en curso. (A la vista grande le responde el público:
    // si le respondiera el presentador antes de sincronizarse, haría volver al público a la slide 1.)
    if (m.tipo === 'pedir_estado' && m.rol === 'publico') canal.postMessage({ tipo: 'estado', indice, total: TOTAL, origen });
  };
}

// ——— Navegación ———
$('anterior').addEventListener('click', () => ir(indice - 1));
$('siguiente').addEventListener('click', () => ir(indice + 1));
addEventListener('keydown', (e) => {
  if (e.target.closest?.('input, textarea, select')) return;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { if (e.key === ' ' && e.target.closest('button')) return; e.preventDefault(); ir(indice + 1); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); ir(indice - 1); }
  if (e.key === 'Home') ir(0);
  if (e.key === 'End') ir(TOTAL - 1);
});

// ——— Miniatura: la misma presentación en modo solo lectura ———
// Vista grande: pide el estado al montarse y sigue cada cambio; en las slides 9 y 10 el prototipo se puede usar y se espeja en la presentación.
const miniatura = $('miniatura');

// ——— Temporizador (mm:ss) ———
let acumulado = 0; // ms de tramos anteriores
let inicio = null; // marca del tramo en curso (null = en pausa)
const dosDigitos = (x) => String(x).padStart(2, '0');
function pintarTemporizador() {
  const s = Math.floor((acumulado + (inicio ? Date.now() - inicio : 0)) / 1000);
  const h = Math.floor(s / 3600);
  $('temporizador').textContent = `${h ? `${h}:` : ''}${dosDigitos(Math.floor(s / 60) % 60)}:${dosDigitos(s % 60)}`;
}
$('temporizador-alternar').addEventListener('click', (e) => {
  if (inicio) { acumulado += Date.now() - inicio; inicio = null; } else inicio = Date.now();
  e.currentTarget.textContent = inicio ? 'Pausa' : (acumulado ? 'Reanudar' : 'Iniciar');
  pintarTemporizador();
});
$('temporizador-reiniciar').addEventListener('click', () => {
  acumulado = 0; inicio = null;
  $('temporizador-alternar').textContent = 'Iniciar';
  pintarTemporizador();
});

// ——— Reloj en tiempo real (hh:mm:ss) ———
const formatoHora = new Intl.DateTimeFormat('es-AR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
function pintarHora() { $('hora').textContent = formatoHora.format(new Date()); }
setInterval(() => { pintarHora(); pintarTemporizador(); }, 250);
pintarHora();

// ——— Tamaño del texto de las notas (pasos de la escala tipográfica; se recuerda) ———
const TAMANOS = ['t-body-lg', 't-title-lg', 'pres-cuerpo', 'pres-subtitulo', 'pres-titulo'];
let tamano = 2;
try { const g = parseInt(localStorage.getItem('presentador-tamano'), 10); if (g >= 0 && g < TAMANOS.length) tamano = g; } catch { /* sin almacenamiento */ }
function aplicarTamano() {
  $('notas').classList.remove(...TAMANOS);
  $('notas').classList.add(TAMANOS[tamano]);
  $('texto-menos').disabled = tamano === 0;
  $('texto-mas').disabled = tamano === TAMANOS.length - 1;
  try { localStorage.setItem('presentador-tamano', String(tamano)); } catch { /* sin almacenamiento */ }
}
$('texto-menos').addEventListener('click', () => { tamano = Math.max(0, tamano - 1); aplicarTamano(); });
$('texto-mas').addEventListener('click', () => { tamano = Math.min(TAMANOS.length - 1, tamano + 1); aplicarTamano(); });
aplicarTamano();

// ——— Ancho de la columna izquierda ———
// La vista grande queda limitada por el alto disponible; la columna se ajusta a ese ancho
// (sin cambiar el tamaño de la vista) y el espacio que sobra pasa al guion.
const columnas = document.querySelector('.columnas');
function ajustarColumnas() {
  if (matchMedia('(max-width: 900px)').matches) { columnas.style.gridTemplateColumns = ''; return; }
  const panel = document.querySelector('.panel-vista');
  const zona = document.querySelector('.miniatura-zona');
  const relleno = panel.offsetWidth - panel.clientWidth + parseFloat(getComputedStyle(panel).paddingLeft) * 2;
  const ideal = zona.clientHeight * (16 / 9) + relleno;
  const maximo = columnas.clientWidth * 0.5;
  columnas.style.gridTemplateColumns = `${Math.round(Math.min(ideal, maximo))}px minmax(360px, 1fr)`;
}
addEventListener('resize', ajustarColumnas);
ajustarColumnas();

// ——— Arranque ———
mostrar(0);
miniatura.src = `./?miniatura=1#1`;
// Si la presentación ya está abierta, responde con su slide y esta vista se pone al día.
canal?.postMessage({ tipo: 'pedir_estado', origen });
