# Auditoría pedagógica de dificultad — bancos heredados

Fecha: 2026-09-20  
Estado: **AUDITADO E INTEGRADO**

## Alcance

Se revisaron los 300 reactivos antiguos que todavía no tenían clasificación pedagógica explícita:

- Ortopedia / banco general: 100 preguntas.
- Fundamentos de la oclusión: 100 preguntas.
- Cefalometría de Steiner: 100 preguntas.

La auditoría de esta fase **no modifica la respuesta correcta, opciones, explicación clínica ni evidencia científica**. Solo añade la variable `difficulty` para habilitar filtros coherentes en el Modo Examen.

## Definiciones aplicadas

### Básico
Reconocimiento, recuerdo, identificación y comprensión directa:
- definiciones;
- nomenclatura;
- estructuras;
- valores de referencia;
- conceptos de una sola etapa.

### Intermedio
Interpretación y aplicación de uno o más conceptos:
- mecanismos;
- relaciones entre variables;
- interpretación de hallazgos;
- efectos esperados;
- comparación de conceptos;
- cálculo o lectura aplicada sencilla.

### Clínico
Razonamiento orientado a decisión:
- elección de conducta;
- indicación o contraindicación;
- priorización diagnóstica;
- selección de aparato/intervención;
- integración de varios hallazgos;
- interpretación avanzada con implicación clínica.

## Distribución final

| Banco | Básico | Intermedio | Clínico | Total |
|---|---:|---:|---:|---:|
| Ortopedia / banco general | 34 | 33 | 33 | 100 |
| Fundamentos de la oclusión | 40 | 40 | 20 | 100 |
| Cefalometría de Steiner | 34 | 33 | 33 | 100 |
| **Total** | **108** | **106** | **86** | **300** |

La distribución de Fundamentos no se forzó artificialmente a 34/33/33 porque el banco contiene más reactivos de reconocimiento y comprensión directa y menos reactivos genuinamente clínicos. Se conservaron 20 reactivos clínicos para que el filtro Clínico permita un examen completo de 20 preguntas sin etiquetar como “Clínico” reactivos puramente memorísticos.

## Auditoría estructural

Resultados sobre los 300 reactivos:

- Reactivos totales: 300.
- Reactivos sin dificultad después de auditoría: 0.
- IDs duplicados dentro de cada banco: 0.
- Textos duplicados normalizados: 0.
- Índices de respuesta fuera de rango: 0.
- Reactivos con menos de 2 opciones: 0.
- Reactivos sin explicación: 0.
- Reactivos sin evidencia: 0.
- Referencias visibles a “clase”, “presentación” o “diapositiva” en pregunta/opciones: 0.
- Preguntas Verdadero/Falso existentes: preservadas; el Modo Examen admite reactivos de 2 o más opciones.
- Máxima longitud de opción:
  - Ortopedia: 50 caracteres.
  - Fundamentos: 39 caracteres.
  - Steiner: 41 caracteres.

## Implementación

Archivo:
- `legacy-difficulty-audit.js`

El archivo se carga después de los bancos heredados y antes de la lógica del juego/examen. Añade:
- `difficulty`
- `difficultyAudit = "Auditoría pedagógica de dificultad 2026-09-20"`

Integraciones:
- `play.html`
- `exam.html`
- `sw.js`
- workflow Android

Service worker:
- caché `el-camino-dental-v40`

Versión de prueba:
- paquete: `2.9.0`
- Android app ID: `com.yomismtz.elcaminodental.v29`
- Android versionCode: 29

## Resultado funcional

El Modo Examen ahora ofrece dificultad Básico / Intermedio / Clínico en los seis módulos.

En Fundamentos, el filtro Clínico dispone exactamente de 20 preguntas; por ello permite examen clínico de 20 preguntas. Los filtros con menos de 50 o 100 reactivos desactivan automáticamente esas longitudes para evitar repetición o relleno artificial.
