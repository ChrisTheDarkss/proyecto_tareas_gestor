# Gestor de Tareas 📋

Aplicación web de gestión de tareas con tablero Kanban. Proyecto práctico N°2 de la asignatura **Diseño y Desarrollo Web + IA** - Informática S-2 Diurno.

## 🗂️ Estructura del Proyecto

```
proyecto_tareas_gestor/
├── index.html              # Página principal
├── README.md               # Este archivo
├── assets/
│   ├── css/
│   │   ├── style.css       # Estilos principales (variables CSS en español)
│   │   └── responsive.css  # Media queries mobile-first
│   ├── js/
│   │   └── script.js       # Lógica Kanban con manipulación DOM
│   ├── img/
│   │   ├── logo.png
│   │   └── favicon.ico
│   └── fonts/
└── docs/
    └── uso_ia.md           # Documentación del uso de IA
```

## ✨ Funcionalidades

- **Agregar tareas** con título, descripción, prioridad y fecha límite
- **Tablero Kanban** con 3 columnas: Pendientes, En Progreso, Completadas
- **Cambiar estado** de las tareas con botones en cada tarjeta
- **Eliminar tareas** desde cualquier columna
- **Contadores automáticos** por columna y resumen estadístico
- **Validación de formulario** con mensajes de error descriptivos
- **Diseño responsive** adaptado a móvil, tablet y escritorio

## 🎨 Tecnologías

- HTML5 semántico (sin `<div>`, excepto `.tareas-container` )
- CSS3 con variables (custom properties) en español y enfoque mobile-first
- JavaScript puro (Vanilla JS) con manipulación del DOM

## 🚀 Cómo ejecutar

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/usuario/proyecto_tareas_gestor.git
   ```
2. Abrir `index.html` en el navegador (no requiere servidor).

## 📱 Responsive Design

| Breakpoint | Dispositivo | Columnas del tablero |
|-----------|-------------|----------------------|
| Base      | Móvil       | 1 columna            |
| 640px+    | Tablet      | 1 columna            |
| 1024px+   | Desktop     | 3 columnas           |

## 👨‍💻 Autor

Yo
Proyecto desarrollado con asistencia de IA (Claude Sonnet 4.6).  
Ver detalles en [`docs/uso_ia.md`](docs/uso_ia.md).

---

**DISEÑO Y DESARROLLO WEB + IA · TU en Informática · 2025**