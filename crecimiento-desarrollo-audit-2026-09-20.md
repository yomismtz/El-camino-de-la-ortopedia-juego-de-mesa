# Auditoría — Crecimiento y desarrollo craneofacial

Fecha de cierre de auditoría: 2026-09-20

## Resultado
Banco corregido y auditado antes de integración al juego.

- 100 preguntas únicas.
- 60 casos clínicos/situacionales únicos.
- 0 enunciados duplicados normalizados.
- 0 reactivos completos duplicados.
- 0 respuestas correctas fuera de rango.
- 0 reactivos sin evidencia.
- 0 referencias visibles a clase, presentación o diapositivas.
- Opciones breves para móvil: máximo 49 caracteres en preguntas y 47 en casos.

## Distribución

### Preguntas
- Básico: 34
- Intermedio: 33
- Clínico: 33
- Respuesta correcta A/B/C/D: 25 / 25 / 25 / 25

### Casos
- Básico: 20
- Intermedio: 20
- Clínico: 20
- Exactamente 1 respuesta Excelente por caso.
- Exactamente 1 respuesta Buena por caso.
- Posición de Excelente A/B/C/D: 15 / 15 / 15 / 15

## Cobertura temática
Cada uno de los 20 temas tiene exactamente 5 preguntas y 3 casos:
1. Crecimiento y desarrollo.
2. Tejido óseo dinámico.
3. Osteoblastos y osteoclastos.
4. BMU.
5. Modelado y remodelado.
6. Ley de Wolff y mecanostato.
7. Teorías de crecimiento.
8. Osificación.
9. Crecimiento maxilar.
10. Crecimiento mandibular.
11. Base craneal y sincondrosis.
12. Suturas.
13. Cartílago condilar.
14. Desplazamiento y remodelación.
15. Rotación mandibular.
16. Crecimiento diferencial.
17. Curvas de Scammon.
18. Crecimiento neural y somático.
19. Pico puberal.
20. Aplicación clínica.

## Criterios científicos aplicados
- Las teorías clásicas se presentan como modelos complementarios, no como verdades exclusivas.
- Se distingue modelado de remodelado óseo y se evita usarlos como sinónimos.
- Ley de Wolff y mecanostato se usan como marcos de adaptación mecánica, no como recetas clínicas universales.
- Las suturas se tratan como sitios activos de crecimiento/respuesta dentro de un sistema coordinado, no como motores autónomos universales.
- Las sincondrosis de base craneal se vinculan con osificación endocondral.
- El cartílago condilar se trata como cartílago secundario con capacidad adaptativa.
- No se afirma que aparatos funcionales garanticen una cantidad fija de crecimiento mandibular.
- Las curvas de Scammon se usan como modelos poblacionales/históricos y no como predictores individuales exactos.
- Edad cronológica y CVM no se usan como predictores absolutos. CVM se considera un indicador complementario con variabilidad de observador y de paciente.
- El momento terapéutico se vincula a diagnóstico, objetivo, maduración y crecimiento restante.

## Núcleo bibliográfico verificado
- PMID 32151371 — Craniofacial Growth: Current Theories and Influence on Management.
- PMID 19883366 — Bone modeling and remodeling.
- PMID 3688455 — Bone mass and the mechanostat.
- PMID 40396131 — Toward a clear relationship between mechanical signals and bone adaptation.
- PMID 35887171 — Cranial Base Synchondrosis: Chondrocytes at the Hub.
- PMID 16191905 — Cranial base in craniofacial development.
- PMID 27250655 — Developmental Regulation of the Growth Plate and Cranial Synchondrosis.
- PMID 16040724 — Adaptive remodeling of condylar cartilage.
- PMID 19164410 — Abnormal mandibular growth and condylar cartilage.
- PMID 38669735 — Inter-/intra-observer agreement of CVM staging: systematic review and meta-analysis.
- PMID 35370135 — Efficacy of the Cervical Vertebral Maturation Method: systematic review.
- PMID 25773948 — Reliability of the cervical vertebrae maturation method.
- PMID 29411861 — Historical review of Scammon growth study.
- Fels Longitudinal Study / PMC4103980 — variation in adolescent craniofacial growth.
- AAPD — Management of the Developing Dentition and Occlusion in Pediatric Dentistry.

## Archivos auditados
- `crecimiento-desarrollo-questions.js`
- `crecimiento-desarrollo-cases.js`

## Commits de corrección
- `54b5523` — reescritura del banco de 100 preguntas con reactivos únicos.
- `6200a94` — reescritura de los 60 casos con escenarios únicos.

## Integración al juego
- Selector de módulo añadido en `play.html`.
- Bancos `crecimiento-desarrollo-questions.js` y `crecimiento-desarrollo-cases.js` cargados antes de `app-v10.js`.
- Enrutamiento de preguntas y casos añadido en `app-v10.js`.
- Etiquetas de módulo y categoría añadidas a la interfaz.
- Totales visibles actualizados a 500 preguntas y 270 casos clínicos.
- Ambos bancos añadidos al caché offline.
- Service worker actualizado de `el-camino-dental-v31` a `el-camino-dental-v32`.
- Validación posterior: selector, scripts, rutas de bancos, etiquetas y caché presentes; 100 preguntas y 60 casos disponibles en los tres mazos.
- Comprobación sintáctica JavaScript: `app-v10.js`, `sw.js` y ambos bancos = OK.

## Commits de integración
- `b85bca2` — selector, scripts y totales visibles.
- `cbf46bb` — enrutamiento de bancos, badge y categorías.
- `ebcc479` — caché offline v32.

## Estado
**AUDITADO E INTEGRADO.**

La auditoría estructural final mantiene 0 duplicados, 0 índices inválidos y 0 reactivos sin evidencia. El módulo de Crecimiento y desarrollo craneofacial ya está disponible en la lógica principal del juego y en el caché offline.
