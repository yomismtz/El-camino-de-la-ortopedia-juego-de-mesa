# Paso 12 — Auditoría estructural del banco de preguntas

Fecha: 2026-10-02

## Resultado actual

El repositorio contiene **1,145 reactivos de preguntas** en los bancos auditados, antes de contar los casos clínicos como preguntas independientes.

| Banco | Reactivos |
|---|---:|
| Banco general + decks adicionales | 100 |
| Primer parcial | 225 |
| Nomenclatura y etimología | 100 |
| Anatomía | 20 |
| Anestesia dental | 20 |
| Cefalometría de Steiner | 100 |
| Fisiología + función | 100 |
| Crecimiento y desarrollo | 100 |
| Hábitos y parafunciones | 100 |
| Expansión auditada 2026 | 200 |
| **Total** | **1,145** |

## Hallazgos

- Los bancos revisados tienen IDs propios y no se detectó una colisión numérica intencional entre los bancos principales.
- La mayoría de los reactivos tienen 4 opciones.
- Existen reactivos de 2 opciones en algunos bancos. Esto se conserva por compatibilidad, pero queda marcado como **pendiente de expansión a 3–7 opciones**.
- Hay bancos sin dificultad explícita o con escalas distintas (Básico/Intermedio/Clínico y Medio/Difícil). No se deben convertir automáticamente a la escala final sin revisión de contenido.
- La meta global definida para el proyecto sigue siendo **44 categorías × 100 preguntas = 4,400 preguntas**. El repositorio todavía no alcanza esa meta: faltan **3,255 preguntas**.
- La distribución final deseada por categoría (30 fáciles, 20 medias, 20 difíciles y 30 extremas) todavía no está aplicada de manera uniforme a las 44 categorías.

## Cambio del Paso 12

Se incorpora `step12-question-audit.js`, que ejecuta una auditoría estructural en tiempo de ejecución y expone:

- cantidad total de reactivos cargados;
- conteo por banco;
- preguntas sin texto;
- opciones inválidas;
- índices de respuesta correctos inválidos;
- reactivos con menos de 3 opciones;
- reactivos con más de 7 opciones;
- reactivos sin dificultad;
- posibles IDs duplicados entre bancos cargados.

La auditoría **no modifica preguntas ni inventa contenido**. Su función es impedir que los siguientes pasos de expansión introduzcan errores silenciosos.

## Criterio para los siguientes pasos

La expansión hacia 4,400 preguntas debe hacerse categoría por categoría y con revisión de exactitud, evitando rellenar huecos con preguntas artificialmente repetidas.
