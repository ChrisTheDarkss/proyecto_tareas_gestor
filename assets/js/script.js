/* ============================================================
   script.js - Lógica principal del Gestor de Tareas
   Funcionalidades:
     - Agregar tareas desde formulario
     - Cambiar estado: Pendiente → Progreso → Completada
     - Eliminar tareas
     - Actualizar contadores automáticamente
     - Validación de campos
   ============================================================ */

// ── Estado global: arreglo de tareas ──
let tareas = [];
let contadorId = 0; // ID único incremental para cada tarea

// ── Referencias al DOM ──
const formulario        = document.getElementById('form-tarea');
const campoTitulo       = document.getElementById('titulo');
const campoDescripcion  = document.getElementById('descripcion');
const campoPrioridad    = document.getElementById('prioridad');
const campoFecha        = document.getElementById('fecha');

// Contenedores de cada columna
const contenedorPendientes  = document.getElementById('contenedor-pendientes');
const contenedorProgreso    = document.getElementById('contenedor-progreso');
const contenedorCompletadas = document.getElementById('contenedor-completadas');

// Contadores (badges de las cabeceras)
const contadorPendientes  = document.getElementById('contador-pendientes');
const contadorProgreso    = document.getElementById('contador-progreso');
const contadorCompletadas = document.getElementById('contador-completadas');

// Estadísticas del resumen superior
const totalTareas     = document.getElementById('total-tareas');
const totalPendientes = document.getElementById('total-pendientes');
const totalProgreso   = document.getElementById('total-progreso');
const totalCompletadas = document.getElementById('total-completadas');

/* ──────────────────────────────────────────────
   VALIDACIÓN: Valida un campo individual
   Devuelve true si es válido, false si no
   ────────────────────────────────────────────── */
function validarCampo(campo, idError, mensaje) {
  const spanError = document.getElementById(idError);

  if (!campo.value.trim()) {
    // Marcar campo como inválido visualmente
    campo.classList.add('campo-invalido');
    spanError.textContent = mensaje;
    return false;
  }

  // Limpiar error si el campo es válido
  campo.classList.remove('campo-invalido');
  spanError.textContent = '';
  return true;
}

/* ──────────────────────────────────────────────
   UTILIDAD: Obtiene la fecha de hoy en formato
   YYYY-MM-DD (compatible con input[type=date])
   ────────────────────────────────────────────── */
function obtenerFechaHoy() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes  = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia  = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

/* ──────────────────────────────────────────────
   VALIDACIÓN: Verifica que la fecha elegida
   no sea anterior a la fecha actual
   ────────────────────────────────────────────── */
function validarFecha() {
  const spanError = document.getElementById('error-fecha');

  // Primero verificar que no esté vacía
  if (!campoFecha.value) {
    campoFecha.classList.add('campo-invalido');
    spanError.textContent = 'La fecha límite es obligatoria.';
    return false;
  }

  // Comparar como strings YYYY-MM-DD (orden lexicográfico = orden cronológico)
  if (campoFecha.value < obtenerFechaHoy()) {
    campoFecha.classList.add('campo-invalido');
    spanError.textContent = 'La fecha límite no puede ser anterior a hoy.';
    return false;
  }

  // Fecha válida
  campoFecha.classList.remove('campo-invalido');
  spanError.textContent = '';
  return true;
}

/* ──────────────────────────────────────────────
   VALIDACIÓN: Valida todos los campos del form
   Devuelve true si el formulario completo es válido
   ────────────────────────────────────────────── */
function validarFormulario() {
  const validTitulo      = validarCampo(campoTitulo,      'error-titulo',      'El título es obligatorio.');
  const validDescripcion = validarCampo(campoDescripcion, 'error-descripcion', 'La descripción es obligatoria.');
  const validPrioridad   = validarCampo(campoPrioridad,   'error-prioridad',   'Selecciona una prioridad.');
  const validFecha       = validarFecha(); // usa su propia función con validación de fecha mínima

  return validTitulo && validDescripcion && validPrioridad && validFecha;
}

/* ──────────────────────────────────────────────
   ACTUALIZAR CONTADORES
   Recuenta tareas por estado y actualiza el DOM
   ────────────────────────────────────────────── */
function actualizarContadores() {
  const cantPendientes  = tareas.filter(t => t.estado === 'pendiente').length;
  const cantProgreso    = tareas.filter(t => t.estado === 'progreso').length;
  const cantCompletadas = tareas.filter(t => t.estado === 'completada').length;
  const cantTotal       = tareas.length;

  // Actualizar badges de columnas
  contadorPendientes.textContent  = cantPendientes;
  contadorProgreso.textContent    = cantProgreso;
  contadorCompletadas.textContent = cantCompletadas;

  // Actualizar estadísticas superiores
  totalTareas.textContent      = cantTotal;
  totalPendientes.textContent  = cantPendientes;
  totalProgreso.textContent    = cantProgreso;
  totalCompletadas.textContent = cantCompletadas;
}

/* ──────────────────────────────────────────────
   CREAR ELEMENTO HTML de una tarjeta de tarea
   Recibe el objeto tarea y devuelve el elemento DOM
   ────────────────────────────────────────────── */
function crearElementoTarjeta(tarea) {
  const articulo = document.createElement('article');
  articulo.classList.add('tarjeta-tarea');
  articulo.setAttribute('role', 'listitem');
  articulo.setAttribute('data-id', tarea.id);

  // Clase de color según estado
  if (tarea.estado === 'progreso')   articulo.classList.add('tarjeta-tarea--progreso');
  if (tarea.estado === 'completada') articulo.classList.add('tarjeta-tarea--completada');

  // Formatear fecha para mostrar
  const fechaFormateada = tarea.fecha
    ? new Date(tarea.fecha + 'T00:00:00').toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : 'Sin fecha';

  // Determinar qué botones de acción mostrar según el estado actual
  let botonesAccion = '';

  if (tarea.estado === 'pendiente') {
    botonesAccion = `
      <button class="boton boton--accion boton--iniciar"   data-accion="iniciar"   data-id="${tarea.id}" aria-label="Mover a En Progreso">▶ Iniciar</button>
      <button class="boton boton--accion boton--completar" data-accion="completar" data-id="${tarea.id}" aria-label="Marcar como Completada">✔ Completar</button>
    `;
  } else if (tarea.estado === 'progreso') {
    botonesAccion = `
      <button class="boton boton--accion boton--regresar"  data-accion="regresar"  data-id="${tarea.id}" aria-label="Regresar a Pendientes">◀ Pendiente</button>
      <button class="boton boton--accion boton--completar" data-accion="completar" data-id="${tarea.id}" aria-label="Marcar como Completada">✔ Completar</button>
    `;
  } else if (tarea.estado === 'completada') {
    botonesAccion = `
      <button class="boton boton--accion boton--regresar"  data-accion="regresar"  data-id="${tarea.id}" aria-label="Regresar a Pendientes">◀ Pendiente</button>
    `;
  }

  // Construir HTML interno de la tarjeta
  articulo.innerHTML = `
    <h4 class="tarea__titulo">${escaparHTML(tarea.titulo)}</h4>
    <p class="tarea__descripcion">${escaparHTML(tarea.descripcion)}</p>
    <footer class="tarea__meta">
      <span class="tarea__prioridad prioridad-${tarea.prioridad}" aria-label="Prioridad ${tarea.prioridad}">
        ${tarea.prioridad}
      </span>
      <time class="tarea__fecha" datetime="${tarea.fecha}">📅 ${fechaFormateada}</time>
    </footer>
    <nav class="tarea__acciones" aria-label="Acciones de la tarea">
      ${botonesAccion}
      <button class="boton boton--accion boton--eliminar" data-accion="eliminar" data-id="${tarea.id}" aria-label="Eliminar tarea">🗑 Eliminar</button>
    </nav>
  `;

  return articulo;
}

/* ──────────────────────────────────────────────
   RENDERIZAR TABLERO COMPLETO
   Limpia los contenedores y vuelve a pintar las tareas
   ────────────────────────────────────────────── */
function renderizarTablero() {
  // Limpiar todos los contenedores
  contenedorPendientes.innerHTML  = '';
  contenedorProgreso.innerHTML    = '';
  contenedorCompletadas.innerHTML = '';

  // Insertar cada tarea en su contenedor correspondiente
  tareas.forEach(tarea => {
    const elemento = crearElementoTarjeta(tarea);

    if (tarea.estado === 'pendiente') {
      contenedorPendientes.appendChild(elemento);
    } else if (tarea.estado === 'progreso') {
      contenedorProgreso.appendChild(elemento);
    } else if (tarea.estado === 'completada') {
      contenedorCompletadas.appendChild(elemento);
    }
  });

  // Actualizar todos los contadores
  actualizarContadores();
}

/* ──────────────────────────────────────────────
   AGREGAR TAREA
   Crea el objeto tarea y lo agrega al arreglo
   ────────────────────────────────────────────── */
function agregarTarea(titulo, descripcion, prioridad, fecha) {
  contadorId++;

  const nuevaTarea = {
    id:          contadorId,
    titulo:      titulo.trim(),
    descripcion: descripcion.trim(),
    prioridad:   prioridad,
    fecha:       fecha,
    estado:      'pendiente' // toda tarea nueva inicia como pendiente
  };

  tareas.push(nuevaTarea);
  renderizarTablero();
}

/* ──────────────────────────────────────────────
   CAMBIAR ESTADO de una tarea
   Actualiza el estado y re-renderiza el tablero
   ────────────────────────────────────────────── */
function cambiarEstado(id, accion) {
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return;

  // Transiciones de estado según la acción
  if (accion === 'iniciar')   tarea.estado = 'progreso';
  if (accion === 'completar') tarea.estado = 'completada';
  if (accion === 'regresar')  tarea.estado = 'pendiente';

  renderizarTablero();
}

/* ──────────────────────────────────────────────
   ELIMINAR TAREA
   Filtra la tarea del arreglo y actualiza la vista
   ────────────────────────────────────────────── */
function eliminarTarea(id) {
  // Filtrar dejando solo las que no coincidan con el id
  tareas = tareas.filter(t => t.id !== id);
  renderizarTablero();
}

/* ──────────────────────────────────────────────
   ESCAPAR HTML
   Previene inyección de HTML malicioso en contenido de usuario
   ────────────────────────────────────────────── */
function escaparHTML(texto) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(texto));
  return div.innerHTML;
}

/* ──────────────────────────────────────────────
   EVENT LISTENER: Envío del formulario
   ────────────────────────────────────────────── */
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault(); // evitar recarga de página

  // Validar antes de agregar
  if (!validarFormulario()) return;

  // Agregar tarea con los valores del formulario
  agregarTarea(
    campoTitulo.value,
    campoDescripcion.value,
    campoPrioridad.value,
    campoFecha.value
  );

  // Limpiar formulario tras agregar
  formulario.reset();
});

/* ──────────────────────────────────────────────
   EVENT LISTENER: Validación en tiempo real
   Limpia el error cuando el usuario escribe
   ────────────────────────────────────────────── */
[campoTitulo, campoDescripcion, campoPrioridad].forEach(campo => {
  campo.addEventListener('input', function () {
    if (campo.value.trim()) {
      campo.classList.remove('campo-invalido');
      const spanError = document.getElementById('error-' + campo.id);
      if (spanError) spanError.textContent = '';
    }
  });
});

// Validación en tiempo real del campo fecha (incluye chequeo de fecha mínima)
campoFecha.addEventListener('change', validarFecha);

/* ──────────────────────────────────────────────
   EVENT LISTENER: Clics en botones del tablero
   Usa delegación de eventos en el body para eficiencia
   ────────────────────────────────────────────── */
document.body.addEventListener('click', function (evento) {
  const boton = evento.target.closest('[data-accion]');
  if (!boton) return;

  const accion = boton.dataset.accion;
  const id     = parseInt(boton.dataset.id, 10);

  if (accion === 'eliminar') {
    eliminarTarea(id);
  } else {
    cambiarEstado(id, accion);
  }
});

/* ──────────────────────────────────────────────
   INICIALIZAR: Renderizar tablero vacío al cargar
   y bloquear fechas pasadas en el input nativo
   ────────────────────────────────────────────── */
campoFecha.min = obtenerFechaHoy(); // el navegador bloquea visualmente fechas anteriores
renderizarTablero();