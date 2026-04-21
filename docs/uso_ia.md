# Documentación de Uso de Inteligencia Artificial

## Proyecto: Gestor de Tareas - Evaluación N°2
**Asignatura:** Diseño y Desarrollo Web + IA  
**Sección:** YO en Informática S-2 Diurno  
**Fecha de entrega:** 22 de abril de 2025  
**Docente:** Cristian Iglesias Vera

---

## 1. Modelo de IA Utilizado

**Modelo:** Claude Sonnet 4.6 (Anthropic)  
**Acceso mediante:** claude.ai (interfaz web)  
**Fecha de sesión:** 20 de abril de 2025

---

## 2. Prompts Utilizados y Respuestas Obtenidas

### Prompt 1 — Solicitud inicial del proyecto

**Prompt enviado:**
```
basado en el archivo [rúbrica PDF], siguiendo el criterio excelente crear la pagina web 
y las siguientes especificaciones:
- No uses div, solo etiquetas semánticas
- Responsive es para adaptarse a celular, tablet y pc
- Las variables en español
- Comenta las cosas más importantes
- Ocupa el enfoque mobile first
- Pregunta si necesitas más información
[Estructura de carpetas y componentes requeridos incluidos]
```

**Respuesta de IA (resumen):**
Claude respondió haciendo tres preguntas de clarificación antes de comenzar:
1. ¿El tablero Kanban tiene 3 columnas?
2. ¿Qué nombre quieres para el proyecto?
3. ¿El archivo uso_ia.md debe documentar esta sesión real?

Esto permitió generar un proyecto alineado exactamente con los requerimientos.

---

### Prompt 2 — Confirmación de parámetros

**Prompt enviado (respuestas del estudiante):**
```
P: ¿El tablero Kanban tiene 3 columnas?
R: Sí, esas 3 columnas (Pendientes, En Progreso, Completadas)

P: ¿Qué nombre quieres para el proyecto?
R: Gestor de Tareas (genérico)

P: ¿El archivo docs/uso_ia.md debe documentar esta sesión real?
R: Sí, documenta esta sesión real
```

**Respuesta de IA:**
Claude procedió a generar todos los archivos del proyecto en orden:
1. `index.html` — Estructura HTML5 semántica completa
2. `assets/css/style.css` — Estilos con variables CSS en español
3. `assets/css/responsive.css` — Media queries mobile-first (3 breakpoints)
4. `assets/js/script.js` — Lógica Kanban completa con DOM
5. `docs/uso_ia.md` — Este archivo
6. `README.md` — Documentación del proyecto

---

## 3. Decisiones y Ajustes Manuales

Las siguientes decisiones fueron tomadas por Claude según los criterios de la rúbrica, pero el estudiante puede revisarlas y ajustarlas:

| Decisión | Razón |
|----------|-------|
| Se usó `<article>`, `<section>`, `<header>`, `<footer>`, `<nav>`, `<figure>`, `<address>`, `<fieldset>`, `<legend>` | La rúbrica exige etiquetas semánticas sin `<div>` (excepto `.tareas-container` que es requerido explícitamente en el enunciado) |
| Variables CSS en español (`--color-primario`, `--espacio-md`, etc.) | Requerimiento explícito del estudiante |
| Mobile-first con 3 breakpoints: base (móvil), 640px (tablet), 1024px (desktop) | Requerimiento de responsive para celular, tablet y PC |
| Delegación de eventos con `document.body.addEventListener` | Eficiencia: evita agregar listeners a cada botón dinámico |
| Función `escaparHTML()` | Seguridad: previene inyección de HTML desde los campos del formulario |
| Animación CSS `@keyframes aparecer` | Feedback visual al agregar tareas, mejora UX |

---

## 4. Reflexión Crítica sobre el Uso de IA

### ¿Qué aportó la IA?
- Generó la estructura completa del proyecto en minutos, siguiendo la rúbrica como guía.
- Aplicó buenas prácticas automáticamente: separación de responsabilidades, accesibilidad (`aria-*`), validación de formularios, escape de HTML.
- Mantuvo consistencia en los nombres de variables CSS en español a lo largo de todos los archivos.
- Propuso preguntas de clarificación antes de generar código, lo que evitó tener que rehacer trabajo.

### ¿Qué limitaciones tiene?
- La IA no puede ejecutar el código para verificar que funciona visualmente; eso requiere prueba manual en el navegador.
- No tiene acceso al sistema de archivos del estudiante, por lo que la estructura de carpetas debe crearse manualmente.
- No conoce preferencias estéticas personales del estudiante sin que se le indiquen.

### ¿Qué aprendí de esta experiencia?
- Formular prompts claros y específicos produce resultados más útiles.
- La IA es un asistente, no un reemplazo: el estudiante debe revisar, entender y validar el código generado.
- Incluir la rúbrica como contexto mejora significativamente la calidad de la respuesta.
- El enfoque mobile-first en CSS requiere pensar primero en pantallas pequeñas y luego expandir.

---

## 5. Herramientas Adicionales

| Herramienta | Uso |
|-------------|-----|
| claude.ai | Generación del código y documentación |
| VS Code | Revisión y edición del código generado |
| Google Chrome DevTools | Prueba del responsive design |
| GitHub | Control de versiones y entrega |
| Flaticon | Imagenes |

---

## 6. Ajustes (Por el estudiante)
- Se agregó el logo.
- Configure la fecha para no ingresar fechas anteriores. 
- Se agregó el favicon.
- Cambie el archivo de las fuentes.  
- Ajustes correspondientes en el HTML y CSS.
- Arreglo en pie de página.