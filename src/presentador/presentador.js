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

// ——— Slide actual ———
function mostrar(n) {
  indice = Math.max(0, Math.min(TOTAL - 1, n));
  $('indicador').textContent = `Diapositiva ${indice + 1} de ${TOTAL}`;
  $('titulo-actual').textContent = SLIDES[indice].etiqueta;
  $('titulo-siguiente').textContent = indice < TOTAL - 1 ? SLIDES[indice + 1].etiqueta : 'Fin de la presentación';
  $('anterior').disabled = indice === 0;
  $('siguiente').disabled = indice === TOTAL - 1;

  // Se limpia el panel y se carga solo el guion de esta slide.
  const notas = $('notas');
  notas.replaceChildren(...String(NOTAS[indice + 1] ?? '').split(/\n\s*\n/).filter(Boolean).map((t) => {
    // Párrafo con negritas opcionales (**texto**), armado sin innerHTML.
    const p = document.createElement('p');
    t.trim().split('**').forEach((trozo, k) => {
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
    // Una ventana de la presentación recién abierta pide la slide en curso.
    if (m.tipo === 'pedir_estado') canal.postMessage({ tipo: 'estado', indice, total: TOTAL, origen });
  };
}

// ——— Navegación ———
$('anterior').addEventListener('click', () => ir(indice - 1));
$('siguiente').addEventListener('click', () => ir(indice + 1));
addEventListener('keydown', (e) => {
  if (e.target.closest?.('input, textarea')) return;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { if (e.key === ' ' && e.target.closest('button')) return; e.preventDefault(); ir(indice + 1); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); ir(indice - 1); }
  if (e.key === 'Home') ir(0);
  if (e.key === 'End') ir(TOTAL - 1);
});

// ——— Miniatura: la misma presentación en modo solo lectura ———
// Al montarse pide el estado (pedir_estado) y sigue cada cambio, igual que cualquier ventana del público.
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

// ——— Arranque ———
mostrar(0);
miniatura.src = `./?miniatura=1#1`;
// Si la presentación ya está abierta, responde con su slide y esta vista se pone al día.
canal?.postMessage({ tipo: 'pedir_estado', origen });
