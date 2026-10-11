// Contenido de la presentación (tomado del documento del caso). Editar acá los textos.
export const PROTOTIPO = 'https://ricardofalcondev.github.io/prototipo-plazo-fijo/';
export const FIGMA = 'https://www.figma.com/design/ojhcfF0sAvAUHdnnqKluc5/Sandbox';

export const SLIDES = [
  { id: 'intro', etiqueta: 'Caso de estudio · Plazo fijo' },
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
  titulo: '¿Y si invertir empezara por explorar?',
  bajada: 'Una experiencia para comprender cuánto podrían rendir los ahorros antes de tomar una decisión.',
};

export const DESAFIO = {
  titulo: '¿Cómo generar mayor interés por el plazo fijo?',
  bajada: 'El banco ya permite constituir plazos fijos desde su aplicación. La oportunidad está en mejorar cómo las personas descubren y evalúan el producto.',
  objetivos: [
    { icono: 'negocio', titulo: 'Objetivo de negocio', texto: 'Incrementar el interés y la intención de contratación de plazos fijos desde los canales digitales.' },
    { icono: 'usuario', titulo: 'Objetivo de usuario', texto: 'Explorar alternativas para hacer rendir sus ahorros, comprender sus beneficios y condiciones, y decidir sin sentirse obligado a contratar desde el inicio.' },
    { icono: 'diseno', titulo: 'Objetivo de diseño', texto: 'Diseñar una experiencia digital que conecte tres momentos, diferenciando la exploración de una operación financiera real.', pasos: ['Descubrir', 'Evaluar', 'Contratar'] },
  ],
};

export const PARTIDA = {
  titulo: 'Una experiencia centrada en la contratación',
  flujo: ['Producto', 'Monto', 'Vencimiento', 'Revisión', 'Confirmación'],
  subtitulo: 'Tres oportunidades identificadas',
  oportunidades: [
    'El recorrido comienza desde el producto.',
    'El beneficio se descubre durante el recorrido.',
    'La exploración no aparece como una experiencia independiente.',
  ],
};

export const PERSONA = {
  nombre: 'Martín, 32 años',
  rasgos: 'Protopersona hipotética · Ingresos estables · Interés por ahorrar',
  cita: '«Quiero hacer rendir mis ahorros, pero primero necesito entender si me conviene».',
  objetivos: 'Hacer rendir sus ahorros y tomar decisiones informadas.',
  necesidades: 'Comprender ganancias, plazos y disponibilidad del dinero.',
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
  pasos: ['Descubrir', 'Evaluar', 'Contratar'],
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
    { icono: 'home', titulo: 'Home', texto: 'Generar interés', pantalla: '02' },
    { icono: 'telefono', titulo: 'Interceptor', texto: 'Presentar la oportunidad', pantalla: '01' },
    { icono: 'inversiones', titulo: 'Inversiones', texto: 'Facilitar el descubrimiento', pantalla: '03' },
    { icono: 'billetera', titulo: 'Plazo fijo', texto: 'Invitar a simular', pantalla: '04' },
  ],
};

export const SIMULAR = {
  titulo: 'Simular, comprender y decidir',
  bajada: 'Probá el simulador en vivo: cada paso abre la pantalla del prototipo y podés seguir el recorrido desde el teléfono.',
  pasos: [
    { titulo: 'Modalidad', pantalla: '05' },
    { titulo: 'Monto', pantalla: '06' },
    { titulo: 'Plazo', pantalla: '08' },
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
