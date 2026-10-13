// Contenido de la presentación (tomado del documento del caso). Editar acá los textos.
// En desarrollo se puede apuntar a un prototipo local con VITE_PROTOTIPO (por ejemplo http://localhost:5174/).
export const PROTOTIPO = import.meta.env.VITE_PROTOTIPO || 'https://ricardofalcondev.github.io/prototipo-plazo-fijo/';
export const PORTFOLIO = 'https://ricardofalcon.framer.website/';
export const AUTOR = 'Ricardo Falcon';
export const FIGMA = 'https://www.figma.com/design/oUvDg6bzPow3zy12FEvVl7/Plazo-fijo---Challenge?node-id=113-168&t=Eb7sMXXysy3Ep9mw-1';

export const SLIDES = [
  { id: 'intro', etiqueta: 'Challenge · Plazo fijo' },
  { id: 'desafio', etiqueta: 'El desafío y los tres objetivos' },
  { id: 'partida', etiqueta: 'El punto de partida: revisión heurística' },
  { id: 'usuario', etiqueta: 'Entender al usuario y sus necesidades' },
  { id: 'problema', etiqueta: 'El problema que decidí abordar' },
  { id: 'oportunidad', etiqueta: 'La oportunidad de diseño' },
  { id: 'hipotesis', etiqueta: 'Las hipótesis que guiaron la propuesta' },
  { id: 'decisiones', etiqueta: 'De las hipótesis a las decisiones de diseño' },
  { id: 'descubrir', etiqueta: 'La solución: descubrir el simulador' },
  { id: 'simular', etiqueta: 'La solución: simular, comprender y decidir' },
  { id: 'validacion', etiqueta: '¿Cómo validaría la propuesta?' },
  { id: 'pasos', etiqueta: 'Próximos pasos' },
];

export const INTRO = {
  titulo: '¿Qué pasa cuando una persona tiene ahorros y quiere hacerlos rendir, pero todavía no sabe si quiere invertir?',
};

export const DESAFIO = {
  titulo: '¿Cómo generar mayor interés por el plazo fijo?',
  bajada: 'El banco ya permite constituir plazos fijos desde su aplicación. La oportunidad está en mejorar cómo las personas descubren y evalúan el producto.',
  objetivos: [
    { icono: 'negocio', titulo: 'Objetivo de negocio', texto: 'Incrementar el interés y la intención de contratación de plazos fijos desde los canales digitales.' },
    { icono: 'usuario', titulo: 'Objetivo de usuario', texto: 'Explorar alternativas para hacer rendir sus ahorros, comprender sus beneficios y condiciones, y decidir sin sentirse obligado a contratar desde el inicio.' },
    { icono: 'diseno', titulo: 'Objetivo de diseño', texto: 'Diseñar una experiencia digital que conecte tres momentos, diferenciando la exploración de una operación financiera real.' },
  ],
};

export const PARTIDA = {
  titulo: 'Una experiencia centrada en la contratación',
  flujo: ['Producto', 'Monto', 'Vencimiento', 'Revisión', 'Confirmación'],
  subtitulo: 'Tres oportunidades identificadas',
  oportunidades: [
    'Conectar el producto con una motivación cotidiana antes de presentar la operación financiera.',
    'Permitir que pueda probar montos y plazos con el objetivo explícito de conocer el resultado, sin comenzar una contratación.',
    'Diferenciar el momento de conocer el producto del momento de contratarlo.',
  ],
};

export const PERSONA = {
  nombre: 'Martín, 32 años',
  rasgos: 'Protopersona hipotética · Ingresos estables · Interés por ahorrar',
  cita: '«Quiero hacer rendir mis ahorros, pero primero necesito entender si me conviene».',
  foto: 'martin.webp',
  objetivos: ['Hacer rendir sus ahorros.', 'Aprovechar ingresos extra.', 'Ahorrar para proyectos personales.', 'Tomar decisiones financieras informadas.'],
  necesidades: ['Entender cuánto podría ganar.', 'Saber cuándo recuperaría su dinero.', 'Comprender las condiciones.', 'Poder explorar sin iniciar una contratación.'],
  jtbd: 'Cuando tengo ahorros disponibles, quiero conocer cuánto podría ganar y cuándo recuperaría mi dinero, para decidir con confianza si me conviene contratar un plazo fijo.',
};

export const PROBLEMA = {
  etiqueta: 'Problem statement',
  titulo: 'Explorar una inversión no es lo mismo que estar listo para contratarla.',
  bajada: 'Una experiencia centrada en la constitución del producto podría representar una barrera inicial para quienes todavía están evaluando sus alternativas.',
};

export const OPORTUNIDAD = {
  etiqueta: 'How might we',
  titulo: '¿Cómo podríamos ayudar a las personas a descubrir y comprender los beneficios de un plazo fijo sin que sientan que deben contratarlo desde el inicio?',
};

export const HIPOTESIS = [
  { icono: 'explorar', titulo: 'Hipótesis de experiencia', texto: 'Ofrecer una simulación previa a la contratación podría reducir la percepción de compromiso inicial y motivar a más personas a explorar un plazo fijo.' },
  { icono: 'conversar', titulo: 'Hipótesis de contenido', texto: 'Utilizar un lenguaje conversacional, centrado en las necesidades del usuario y en beneficios concretos, podría hacer que la experiencia resulte más clara, cercana y accesible.' },
];

export const DECISIONES = [
  { icono: 'explorar', titulo: 'Explorar antes de comprometerse', texto: 'Separar la simulación de la contratación.' },
  { icono: 'conversar', titulo: 'Conversar antes que instruir', texto: 'Usar preguntas simples y lenguaje cotidiano.' },
  { icono: 'ganancia', titulo: 'Hacer tangible el beneficio', texto: 'Mostrar ganancias estimadas y total a recibir.' },
  { icono: 'calendario', titulo: 'Dar claridad sobre la disponibilidad', texto: 'Comunicar vencimiento y condiciones.' },
  { icono: 'control', titulo: 'Mantener el control', texto: 'Permitir modificar, regresar y revisar.' },
];

export const DESCUBRIR = {
  titulo: 'Una invitación a explorar desde distintos puntos de la app',
  entradas: [
    { icono: 'home', titulo: 'Home', texto: 'Generar interés', pantalla: '02', fondo: true }, // fondo: arranca desplazada hasta la tarjeta de plazo fijo
    { icono: 'telefono', titulo: 'Interceptor', texto: 'Presentar la oportunidad', pantalla: '01' },
    { icono: 'inversiones', titulo: 'Inversiones', texto: 'Facilitar el descubrimiento', pantalla: '03' },
    { icono: 'billetera', titulo: 'Plazo fijo', texto: 'Invitar a simular', pantalla: '04' },
    { icono: 'ganancia', titulo: 'Tenencia', texto: 'Invitar a seguir invirtiendo', pantalla: '13' },
  ],
};

export const SIMULAR = {
  titulo: 'Simular, comprender y decidir',
  bajada: 'Probá el simulador en vivo: cada paso abre la pantalla del prototipo y podés seguir el recorrido desde el teléfono.',
  pasos: [
    { titulo: 'Modalidad', pantalla: '05' },
    { titulo: 'Monto', pantalla: '06' },
    { titulo: 'Plazo', pantalla: '08' },
    { titulo: 'Elegir cuenta', pantalla: '10' },
    { titulo: 'Revisión', pantalla: '11' },
    { titulo: 'Resultado', pantalla: '12' },
  ],
};

export const VALIDACION = {
  titulo: '¿Cómo validaría la propuesta?',
  metodo: 'Pruebas moderadas con 5 a 8 participantes',
  metodoTexto: 'Con distintos niveles de experiencia financiera, para evaluar comprensión, exploración y percepción de compromiso.',
  indicadores: [
    { icono: 'inicio', titulo: 'Inicio de simulación', texto: 'Porcentaje de usuarios que ingresan al simulador desde la sección Plazo fijo.' },
    { icono: 'check', titulo: 'Simulaciones completadas', texto: 'Porcentaje de usuarios que obtienen un resultado válido.' },
    { icono: 'conversion', titulo: 'Conversión a contratación', texto: 'Porcentaje de usuarios que, después de simular, constituyen un plazo fijo.' },
    { icono: 'estrella', titulo: 'CSAT', texto: '¿Qué percepción tienen las personas usuarias del flujo?' },
  ],
};

export const PASOS = {
  titulo: 'Próximos pasos',
  items: [
    { titulo: 'Validar las hipótesis', texto: 'Identificar si la simulación reduce la percepción de compromiso y facilita la exploración.' },
    { titulo: 'Iterar la experiencia y el contenido', texto: 'Ajustar interacciones, sumar casuísticas, mensajes y explicaciones según el feedback obtenido.' },
    { titulo: 'Medir el impacto', texto: 'Evaluar el comportamiento de los usuarios y comparar los resultados con el recorrido actual.' },
  ],
};
