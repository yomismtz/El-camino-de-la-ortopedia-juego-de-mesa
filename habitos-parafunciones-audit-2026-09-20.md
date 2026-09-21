# Auditoría científica — Hábitos y parafunciones

Fecha: 2026-09-20  
Estado: **AUDITADO E INTEGRADO**

## Alcance

Módulo `habitos_parafunciones` con:

- 100 preguntas de opción múltiple.
- 60 casos clínicos.
- 20 temas, con 5 preguntas y 3 casos por tema.
- Dificultad de preguntas: 34 Básico / 33 Intermedio / 33 Clínico.
- Dificultad de casos: 20 Básico / 20 Intermedio / 20 Clínico.
- Posiciones correctas A/B/C/D en preguntas: 25/25/25/25.
- Posiciones Excelente A/B/C/D en casos: 15/15/15/15.
- Posiciones Buena A/B/C/D en casos: 15/15/15/15.
- Duplicados literales de preguntas: 0.
- Duplicados literales de casos: 0.
- Ítems sin evidencia: 0.
- Casos sin exactamente una opción Excelente y una Buena: 0.
- Referencias visibles a clase, presentación o diapositiva: 0.
- Longitud máxima de opción en preguntas: 50 caracteres.
- Longitud máxima de opción en casos: 53 caracteres.

## Temario auditado

1. Conceptos y evaluación.
2. Succión digital.
3. Uso de chupón.
4. Dosis del hábito.
5. Mordida abierta anterior.
6. Mordida cruzada posterior.
7. Resalte y cambios dentoalveolares.
8. Consejería para cesación.
9. Refuerzo conductual.
10. Aparatos rompehábito.
11. Lactancia y biberón.
12. Interposición lingual.
13. Hábitos labiales.
14. Onicofagia.
15. Mordisqueo de objetos.
16. Bruxismo: concepto y evaluación.
17. Bruxismo y sueño.
18. Manejo del bruxismo.
19. Respiración oral y vía aérea.
20. Integración multidisciplinaria.

## Criterios científicos aplicados

- Los hábitos de succión no nutritiva se presentan como factores asociados o contribuyentes, no como explicación causal única de una maloclusión.
- Se considera duración, frecuencia, intensidad, contexto y susceptibilidad individual; la presencia aislada de un hábito no equivale a daño.
- La AAPD recomienda orientación anticipatoria para discontinuar hábitos de succión no nutritiva hacia los 36 meses. El uso prolongado de chupón puede influir en el complejo orofacial y se asocia con mordida abierta anterior y mordida cruzada posterior.
- No se afirma que los chupones llamados “ortodóncicos” prevengan maloclusiones de forma garantizada.
- Las intervenciones conductuales y la aparatología rompehábito se presentan con las limitaciones de una evidencia clínica de baja certeza; no se prescribe un aparato de forma universal.
- Lactancia y alimentación con biberón se abordan como exposiciones dentro de una etiología multifactorial; no se promete una oclusión específica a partir de un único patrón de alimentación.
- Interposición lingual, postura oral y maloclusión se presentan como relaciones potencialmente bidireccionales y multifactoriales.
- La respiración oral persistente obliga a explorar etiología y síntomas respiratorios/sueño; no se presenta como un simple “mal hábito” ni se promete que una intervención dental cure apnea.
- Bruxismo del sueño y bruxismo despierto se distinguen conforme a consensos internacionales. En personas sanas, el bruxismo se considera un comportamiento que puede ser factor de riesgo/protección, no una enfermedad automática.
- El desgaste dental aislado no se usa como confirmación de bruxismo activo.
- No se recomienda un tratamiento universal para el bruxismo pediátrico; la evidencia de tratamientos específicos sigue siendo insuficiente.
- Onicofagia y otros comportamientos repetitivos se manejan sin estigmatización y con derivación multidisciplinaria cuando existe deterioro, compulsión o comorbilidad.

## Bibliografía principal

- American Academy of Pediatric Dentistry. **Policy on Pacifiers**. Revision 2024.
- American Academy of Pediatric Dentistry. **Management of the Developing Dentition and Occlusion in Pediatric Dentistry**. Revision 2024.
- PMID 41590179 — systematic review/meta-analysis: digit and pacifier sucking, anterior open bite and posterior crossbite.
- PMID 38548628 — systematic review: non-nutritive sucking habits and malocclusion.
- PMID 27692622 — systematic review/meta-analysis: non-nutritive sucking behavior and malocclusion.
- PMID 30054865 — systematic review: conventional versus orthodontic pacifiers.
- PMID 25825863 — Cochrane review: interventions for cessation of non-nutritive sucking habits.
- PMID 26140303; PMID 29596751; PMID 27050935; PMID 25785498 — systematic reviews/meta-analyses on breastfeeding, bottle feeding and malocclusion.
- ASHA. **Orofacial Myofunctional Disorders**.
- PMID 34107494 — systematic review: oral myofunctional/articulation disorders and malocclusions.
- PMID 27387832; PMID 34874802 — reviews of onychophagia.
- PMID 29926505; PMID 23121262 — international consensus statements on bruxism assessment.
- PMID 37252006 — pediatric bruxism systematic review.
- PMID 38098259; PMID 28396971; PMID 40706401 — systematic reviews/meta-analyses on pediatric bruxism and sleep/respiratory factors.
- PMID 36629590; PMID 38196770; PMID 39275819 — umbrella/systematic reviews on treatment of pediatric sleep bruxism.

## Archivos del banco

Preguntas:
- `habitos-parafunciones-questions-1.js`
- `habitos-parafunciones-questions-2.js`
- `habitos-parafunciones-questions-3.js`
- `habitos-parafunciones-questions-4.js`
- `habitos-parafunciones-questions-5.js`

Casos:
- `habitos-parafunciones-cases-1.js`
- `habitos-parafunciones-cases-2.js`
- `habitos-parafunciones-cases-3.js`

## Integración

- Selector de módulo en `play.html`.
- Bancos conectados en `app-v10.js`.
- Etiquetas visuales de preguntas/casos de hábitos.
- Totales visibles actualizados a 600 preguntas y 330 casos clínicos.
- Service worker actualizado a caché v37 e incluye los ocho archivos del módulo.
- Workflow Android actualizado para validar y copiar los bancos.
- Se agregó fallback de casos por banco para evitar casillas clínicas vacías cuando un módulo no contiene un deck solicitado.


## Cierre de integración Android/web

- Web publicada con el módulo `habitos_parafunciones`, 600 preguntas y 330 casos clínicos visibles en el total general.
- Caché PWA: `el-camino-dental-v37`.
- Versión Android de prueba: **2.7.0**.
- App ID de prueba: `com.yomismtz.elcaminodental.v27`.
- Workflow Android: **Build Android APK v2.7**.
- Run validado: `35546430509` — **success**.
- Artifact validado: `ElCaminoDental-v2.7`.
- Dentro del APK se verificó la presencia de los 8 archivos del banco de Hábitos y parafunciones, el selector del módulo, el ruteo en `app-v10.js` y el caché v37.
