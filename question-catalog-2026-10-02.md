# Paso 13 — Catálogo maestro de cobertura
Fecha: 2026-10-02

El Paso 13 establece una sola referencia para medir el avance hacia 44 categorías × 100 preguntas = 4,400 reactivos.

El catálogo contiene las 44 categorías objetivo y, por separado, inspecciona los bancos que actualmente exponen arreglos globales al runtime. No duplica ni modifica preguntas existentes.

Criterios:
- 44 categorías objetivo.
- 100 preguntas objetivo por categoría.
- IDs se cuentan globalmente para detectar duplicados.
- Una categoría se considera cubierta cuando su banco asociado contiene al menos 100 reactivos.
- Un banco existente que no expone todavía una categoría concreta no se rellena automáticamente: queda con brecha explícita.

Este paso es de trazabilidad. La generación de las preguntas faltantes queda para los siguientes pasos, categoría por categoría y con revisión de contenido.
