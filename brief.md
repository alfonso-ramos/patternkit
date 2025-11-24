
## 2. Arquitectura técnica inicial
- [ ] Crear proyecto Next.js 15+ con App Router y configurar Server Components donde aplique.
- [ ] Instalar TailwindCSS y shadcn/ui, definiendo sistema de theming (modo oscuro/ligero).
- [ ] Habilitar soporte MDX para contenido estático y planear almacenamiento de snippets en JSON/MDX.
- [ ] Integrar motor de resaltado (Shiki o Prism) compatible con múltiples lenguajes.
- [ ] Diseñar estructura de carpetas para contenido, assets, quizzes y visualizaciones.

## 3. Landing / Home
- [ ] Diseñar y maquetar Hero con título, subtítulo y CTA “Comenzar”.
- [ ] Construir sección “¿Qué aprenderás?” con bullets (explicaciones simples, diagramas, ejemplos reales, multi-lenguaje, mini-quizzes).
- [ ] Implementar bloque “Dos rutas” con tarjetas Patrones/Estructuras, iconos y CTA.
- [ ] Crear sección de características diferenciadoras (código multi-lenguaje, visualizaciones animadas, tema dual, navegación rápida).
- [ ] Añadir bloque “¿Qué hace diferente este portal?” con bullets humanos/prácticos.
- [ ] Implementar footer con links a Docs, GitHub y página “Contribuir”.

## 4. Sistema de contenido para Patrones de Diseño
- [ ] Definir plantilla MDX con metadatos (tipo: creacional/estructural/comportamiento, dificultad).
- [ ] Redactar explicación por patrón (problema, motivo, analogía, ventajas, desventajas, anti-usos).
- [ ] Investigar y documentar casos reales (Netflix, Google, Meta, etc.).
- [ ] Construir componente de diagramas UML (versión estática + animación opcional).
- [ ] Implementar selector de lenguaje (JS, TS, Java, Python, C++, opcional C#) con código comentado.
- [ ] Añadir acciones copiar/descargar y explicación línea a línea para cada snippet.
- [ ] Escribir casos de uso detallados con notas “por qué funciona”.
- [ ] Crear mini-quiz por patrón (3–4 preguntas) con feedback inmediato.

## 5. Sistema de contenido para Estructuras de Datos
- [ ] Definir lista inicial (arrays, linked lists, stacks, queues, hash tables, BST, AVL, Red-Black, B-Trees, heaps, graphs, tries, priority queues, sets/maps, etc.).
- [ ] Diseñar plantilla con encabezado, clasificación lineal/no lineal y tabla de complejidad temporal/espacial.
- [ ] Redactar explicación (qué es, cómo funciona, cuándo usar/no usar) con analogías estilo Gen Z.
- [ ] Implementar visualizaciones animadas (operaciones básicas, BFS/DFS, rotaciones AVL, etc.).
- [ ] Crear selector multi-lenguaje (JS, TS, Java, Python, C, C++) con implementación desde cero y funciones insert/delete/search.
- [ ] Incluir explicación línea a línea, botones copiar/descargar y resaltado de código.
- [ ] Construir tablas Big-O coloreadas para operaciones clave.
- [ ] Documentar casos reales (hash tables en apps grandes, stacks en historiales, árboles/grafos en compiladores, BFS/DFS en redes).
- [ ] Diseñar mini-quizzes (3–5 preguntas) con animación Correcto/Incorrecto.

## 6. Motor de visualizaciones y experiencia interactiva
- [ ] Evaluar y seleccionar librería principal (D3.js o React Flow) y definir fallback SVG/canvas para MVP.
- [ ] Crear componentes reutilizables para árboles, grafos, colas, etc., con controles play/pause/step.
- [ ] Integrar descripciones contextuales sincronizadas con la animación.

## 7. Contenido interactivo y comunidad
- [ ] Implementar sistema de mini-quizzes con almacenamiento ligero del progreso del usuario.
- [ ] Diseñar animaciones accesibles para feedback Correcto/Incorrecto.
- [ ] Crear página “Contribuir” con lineamientos para profesores/devs y enlace a GitHub.
- [ ] Preparar sección de documentación pública (Docs) con guía de estilo y aportes.

## 8. Calidad, rendimiento y lanzamiento
- [ ] Optimizar navegación (prefetch, caching, imágenes responsivas) para mantener el portal rápido.
- [ ] Asegurar accesibilidad (teclado, contraste, ARIA, foco visible).
- [ ] Implementar toggle global de tema con persistencia en local storage.
- [ ] Configurar pruebas básicas (unitarias/visualizaciones) y monitoreo Lighthouse.
- [ ] Elaborar checklist de QA + plan de despliegue inicial.