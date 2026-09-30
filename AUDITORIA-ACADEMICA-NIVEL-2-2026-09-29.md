# Auditoría académica de segundo nivel — 29 septiembre 2026

> **Nota de estado actual (Paso 11):** estas auditorías documentan el origen y la revisión de los 200 reactivos de las cinco versiones fuente. La etiqueta histórica **“Juega y aprueba”** ya no corresponde a un módulo visible de la aplicación. Las 200 preguntas permanecen integradas al banco general/personalizado por clasificación. Las referencias al módulo en este documento se conservan únicamente como trazabilidad histórica de la auditoría.


## Alcance
Revisión de los 800 reactivos y de los conceptos clínicos que sustentan los 355 casos de El Camino Dental.

La auditoría de segundo nivel se hizo en dos capas:
1. revisión reactivo por reactivo de coherencia entre enunciado, opción marcada, explicación y nivel de certeza;
2. revalidación bibliográfica de los grupos temáticos de mayor riesgo clínico con guías vigentes, consensos y revisiones sistemáticas recientes.

No se modificaron silenciosamente las claves de los cinco exámenes fuente de **Juega y aprueba**. Si una clave proviene de esas versiones, se conserva como clave docente y se distingue de cualquier comentario bibliográfico externo.

## Resultado global
| Banco | Reactivos | Estado |
|---|---:|---|
| Ortopedia / banco general | 100 | Revisado |
| Fundamentos de la oclusión | 100 | Revisado |
| Cefalometría de Steiner | 100 | Revisado |
| Fisiología + función | 100 | Revisado |
| Crecimiento y desarrollo | 100 | Revisado |
| Hábitos y parafunciones | 100 | Revisado |
| Juega y aprueba | 200 | Revisado contra claves fuente + revisión conceptual externa |
| **Total** | **800** | **Revisado** |

## Revalidación posterior a integración de casos — 30 septiembre 2026

- Los 25 casos derivados de las versiones A–E se incorporaron al banco clínico general; ya no quedan separados del juego activo.
- El banco documentado queda en **800 preguntas y 355 casos clínicos activos/conservados**, sujeto a los filtros del módulo personalizado.
- La selección de preguntas y casos es aleatoria mediante colas barajadas.
- En preguntas, al barajar opciones se recalcula el índice `correct`; en casos se barajan conjuntamente `options`, `grades` y `feedback`. Por ello la posición visual aleatoria no altera la clave académica ni el puntaje.
- El workflow de Android exige pruebas automáticas de estas invariantes antes de compilar.

## Fuentes actuales usadas como anclas de segundo nivel
- American Academy of Pediatric Dentistry. **Management of the Developing Dentition and Occlusion in Pediatric Dentistry**, revisión 2024, Reference Manual 2026-2027.
- American Academy of Pediatric Dentistry. **Behavior Guidance for the Pediatric Dental Patient**, revisión 2024.
- AAPD Clinical Practice Guideline. **Nonpharmacological Behavior Guidance for the Pediatric Dental Patient**, 2023.
- American Academy of Pediatric Dentistry. **Policy on Pacifiers**, revisión 2024.
- American Academy of Pediatric Dentistry. **Policy on Obstructive Sleep Apnea**, revisión 2026.
- Lobbezoo et al. / consenso internacional actualizado de bruxismo. PMID **40312776** (2025), complementado con PMID **29926505**.
- Hussain et al. Revisión sistemática y metaanálisis de reproducibilidad de CVM. PMID **38669735** (2024).
- Barreneche-Calle et al. Revisión sistemática y metaanálisis de expansión maxilar en pacientes en crecimiento. PMID **38865748** (2024).
- Inchingolo et al. Revisión sistemática de deglución atípica y maloclusión. PMID **39275817** (2024).
- Lip bumper: revisión sistemática PMID **32241352**.
- Aparatos funcionales y momento puberal: PMID **26510187** y literatura sistemática complementaria.
- Protracción maxilar / máscara facial: revisión sistemática PMID **24725349**.

## Hallazgos por área

### Desarrollo de la dentición y oclusión
Las afirmaciones sobre pérdida prematura de temporales, mantenimiento de espacio, erupción ectópica, dientes supernumerarios, mordidas cruzadas y necesidad de diagnóstico integral son compatibles con la mejor práctica AAPD vigente. Se mantienen formulaciones que evitan indicar un aparato únicamente por edad o por un solo hallazgo.

### Hábitos y parafunciones
Se conserva el enfoque de **asociación y multifactorialidad**, no causalidad automática. La AAPD actual sostiene que frecuencia, duración e intensidad influyen en los efectos dentofaciales y que los hábitos de succión prolongados se asocian con mordida abierta anterior y mordida cruzada posterior.

La recomendación de orientar el retiro de hábitos de succión no nutritiva hacia los 36 meses es compatible con la política AAPD vigente.

### Bruxismo
Se actualizó la evidencia de los reactivos HP076–HP080 con el consenso internacional más reciente (PMID 40312776). La respuesta no se cambió: el bruxismo se presenta como actividad muscular/comportamiento cuya importancia clínica depende del contexto y las consecuencias, y el desgaste por sí solo no demuestra actividad actual.

### Respiración oral, sueño y OSA
Se mantienen las respuestas que indican **tamizaje y referencia médica** ante ronquido, pausas respiratorias o somnolencia. Se mantiene explícitamente que un paladar estrecho no diagnostica OSA y que la expansión maxilar no debe presentarse como cura universal.

### Fisiología, deglución y habla
Se mantienen como correctos los conceptos sobre fases oral, faríngea y esofágica, coordinación neuromuscular, función de lengua/labios/mejillas y naturaleza multifactorial de la relación entre maloclusión y habla/deglución. La literatura reciente sobre deglución atípica continúa apoyando un abordaje interdisciplinario, con evidencia todavía heterogénea para algunas terapias.

### Crecimiento craneofacial
Se mantienen las diferencias entre modelado y remodelado, función osteocítica/mecanotransducción, papel de suturas y cartílago condilar dentro de un sistema integrado, y la advertencia de no usar curvas poblacionales como predictores exactos individuales.

### CVM
La revisión de 2024 encuentra reproducibilidad satisfactoria en conjunto, pero no elimina la variación entre observadores. Por ello siguen siendo correctos los reactivos que recomiendan usar CVM como un indicador dentro de un conjunto diagnóstico y no como predictor individual perfecto.

### Aparatología funcional
Se mantiene la idea de que la respuesta depende de diagnóstico, crecimiento y cooperación; no se garantiza crecimiento mandibular adicional universal. La literatura sistemática apoya que el momento puberal puede influir en la magnitud de respuesta en pacientes seleccionados.

### Expansión maxilar
Se conservan los reactivos que distinguen efectos dentoalveolares y esqueléticos, que individualizan el protocolo y que consideran maduración. La literatura reciente confirma heterogeneidad de efectos según diseño del aparato y anclaje.

### Lip bumper
Se mantiene que sus efectos son predominantemente dentoalveolares y que puede aumentar perímetro de arco. También se mantiene la advertencia de alteraciones eruptivas de segundos molares; la certeza de esta evidencia sigue siendo baja.

### Cefalometría de Steiner
Los valores 82°/80°/2°, SND, SN-GoGn, 1.NA, 1.NB y línea S se mantienen como **referencias clásicas**, no como leyes biológicas universales. El banco ya incluye preguntas que obligan a integrar clínica, geometría, crecimiento, periodonto y variación poblacional.

## Juega y aprueba
- 200/200 claves coinciden con las guías docentes de las cinco versiones fuente.
- Las claves no se sustituyeron por opiniones externas.
- 126 reactivos tienen explicación académica explícita.
- 74 reactivos de opción múltiple no traían razonamiento explícito en la guía fuente. Para no inventar una justificación atribuida al examen, la interfaz muestra una explicación conservadora indicando la respuesta de la guía fuente y la respuesta correcta; los demás bancos usan su explicación académica completa.

## Cambios académicos aplicados en esta segunda auditoría
1. Actualización bibliográfica del bloque de bruxismo al consenso 2025.
2. Conservación de todas las claves de los 800 reactivos: no se encontró una clave que exigiera ser cambiada con la evidencia revisada.
3. Se mantiene la corrección previa de los distractores con crédito parcial en casos de Crecimiento y del caso HPC025.
4. La retroalimentación ahora separa de forma uniforme:
   - respuesta correcta;
   - por qué es correcta;
   - por qué la opción elegida no es la mejor, cuando existe explicación específica o cuando la opción fue incorrecta;
   - mejor respuesta y razonamiento en casos clínicos.

## Límite de la auditoría
Esta revisión mejora el control académico del banco, pero no sustituye una revisión formal por pares de una facultad o comité académico. En afirmaciones clínicas con evidencia de baja certeza, la redacción se mantiene prudente y evita presentar asociaciones como causalidad o garantizar resultados terapéuticos.

## Cierre de auditoría integral — 30 septiembre 2026

### Alcance efectivo
- 800/800 preguntas: clave, opciones, explicación y formulación clínica revisadas sobre la auditoría académica previa y revalidación temática actual.
- 355/355 casos clínicos activos: escenario, opción Excelente, gradación y feedback incluidos en el alcance; los 25 casos A–E ya están incorporados al banco general.
- Aleatorización: validada por QA. En preguntas se recalcula el índice correcto después de mezclar opciones; en casos se conservan sincronizados opción, grado y feedback.

### Revalidación bibliográfica de áreas de mayor riesgo
- AAPD, Management of the Developing Dentition and Occlusion in Pediatric Dentistry, revisión 2024 (Reference Manual 2026–2027): diagnóstico integral, hábitos, dentición en desarrollo, mantenimiento de espacio, mordidas cruzadas y Clases II/III.
- AAPD, Policy on Obstructive Sleep Apnea, revisión 2026: tamizaje y referencia médica cuando esté indicado; no se trata un hallazgo dentofacial aislado como diagnóstico de OSA.
- Verhoeff et al., International Consensus on Bruxism, 2025, PMID 40312776: terminología y evaluación actualizadas; se mantiene el enfoque contextual y no una etiqueta automática de enfermedad.
- Hussain et al., CVM systematic review/meta-analysis, 2024, PMID 38669735: reproducibilidad satisfactoria con variabilidad; CVM se mantiene como indicador complementario, no predictor individual perfecto.
- Barreneche-Calle et al., maxillary expansion systematic review/meta-analysis, 2024, PMID 38865748: efectos dependientes de técnica/anclaje; se evita presentar un protocolo universal.
- Inchingolo et al., atypical swallowing systematic review, 2024, PMID 39275817: asociación/tratamiento con evidencia heterogénea; se conserva lenguaje no absoluto.
- Santana et al., lip bumper systematic review, PMID 32241352: efectos principalmente dentoalveolares y evidencia de certeza baja; se mantienen cautelas clínicas.

### Resultado
No se identificó en esta revalidación una nueva contradicción que obligue a cambiar una clave académica ya auditada. Las correcciones históricas documentadas permanecen vigentes. La suite automática del commit 0e7ba86d75eff99b93e80ba5ce394e2132aec30d pasó completa y compiló APK correctamente. Cualquier futura edición de bancos deberá volver a ejecutar esta puerta QA.

