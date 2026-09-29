# Auditoría de contenido y respuestas — 29 septiembre 2026

## Alcance
Auditoría del banco educativo de El Camino Dental después de integrar “Juega y aprueba”.

- 800 preguntas.
- 355 casos clínicos.
- Módulos revisados: banco general, Fundamentos de la oclusión, Steiner, Fisiología + función, Crecimiento y desarrollo, Hábitos y parafunciones y Juega y aprueba.
- Se comprobaron estructura de objetos, opciones, índice de respuesta correcta, identificadores, calificación de casos y coherencia entre respuesta marcada y explicación.

## Juega y aprueba
Los 200 reactivos se contrastaron con las guías docentes de las cinco versiones fuente A–E.

Resultado:
- 200/200 reactivos con respuesta marcada compatible con su guía fuente.
- 40/40 por cada versión A, B, C, D y E.
- 25/25 casos derivados de los reactivos 16–20 conservan como “excellent” la misma respuesta correcta de la guía.
- PP-A-40 usa “Micrognatia / micrognacia”, ambas formas admitidas explícitamente por la guía fuente.
- No se cambiaron las claves de respuesta de los cinco exámenes fuente.

## Auditoría estructural de preguntas
Antes de las correcciones finales se verificaron las 800 preguntas:
- texto presente;
- mínimo dos opciones;
- índice `correct` dentro del rango;
- identificadores válidos;
- sin opciones realmente duplicadas;
- una repetición textual legítima entre versiones del primer parcial: “Célula formadora de matriz cartilaginosa”.

Los aparentes duplicados detectados inicialmente en preguntas de Steiner correspondían a opciones matemáticamente distintas por signo u operador, por ejemplo +10/−10 o SNA−SNB/SNA+SNB, por lo que no son duplicados reales.

## Auditoría de casos
Se revisaron 355 casos:
- 60 banco general;
- 30 Fundamentos;
- 60 Steiner;
- 60 Fisiología + función;
- 60 Crecimiento y desarrollo;
- 60 Hábitos y parafunciones;
- 25 Juega y aprueba.

Todos conservan una única respuesta “excellent”.

### Correcciones realizadas
1. **Crecimiento y desarrollo:** 60 distractores estaban etiquetados como `good` y otorgaban +1 aunque eran respuestas incompletas o falsas. Se cambiaron a `incorrect`. La respuesta `excellent` de cada caso se conservó.
2. **HPC025 — Hábitos:** “Condicionamiento punitivo” estaba marcado como `good` en el caso de pegatinas por noches sin succión digital. Se corrigió a `incorrect` y se ajustó la retroalimentación. La respuesta correcta sigue siendo “Refuerzo positivo y autoseguimiento”.
3. **Conteo visible:** la interfaz decía 330 casos. Con los 25 casos de Juega y aprueba, el total real es 355; se actualizó en español e inglés.

## Revisión académica
Se revisó la coherencia pregunta–respuesta–explicación de los bancos generales y especializados. No se detectaron otras contradicciones obvias entre la opción marcada como correcta y la explicación almacenada.

Esta auditoría no sustituye una revisión editorial o de pares de cada afirmación clínica contra bibliografía primaria actualizada; cuando un reactivo procede de los cinco exámenes fuente, se respetó la guía docente original y no se reemplazó por una respuesta distinta.

## Estado técnico
- El cronómetro cierra el reactivo al llegar a cero, bloquea respuestas posteriores y aplica la penalización prevista.
- “Juega y aprueba” conserva 200 reactivos.
- Resultados por materia permanecen activos.
- Interfaz ES/EN permanece activa.
- El nuevo sistema visual se aplica a portada, configuración, personajes, tablero, preguntas, resultados y Modo Docente.
