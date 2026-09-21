# Auditoría de gradación clínica de casos heredados

Fecha: 2026-09-20  
Estado: **CORREGIDO, AUDITADO E INTEGRADO**

## Problema corregido

Los bancos antiguos de casos clínicos de Fundamentos, Steiner y Fisiología tenían una sola opción `excellent` y el resto `incorrect`. Eso hacía imposible otorgar el puntaje intermedio **Buena (+1)**, aun cuando la mecánica general del juego lo contempla.

## Alcance

Se revisaron y corrigieron:

- Fundamentos de la oclusión: 30 casos.
- Cefalometría de Steiner: 60 casos.
- Fisiología + Alteraciones de la función: 60 casos.
- Total corregido: **150 casos clínicos**.

## Criterio aplicado

Cada caso queda con:

- exactamente 1 opción **Excelente**;
- exactamente 1 opción **Buena**;
- las alternativas restantes como **Incorrectas**;
- retroalimentación específica para la alternativa Buena;
- conservación de la opción Excelente original;
- conservación de la evidencia ya asociada al caso;
- 4 opciones en todos los casos, incluyendo los casos antiguos de Verdadero/Falso que antes tenían solo 2.

La opción Buena se redactó como una conducta o interpretación **clínicamente defendible, pero menos completa o específica** que la opción Excelente. No se asignó +1 al azar a distractores originalmente falsos.

## Resultado estructural

### Fundamentos
- Casos: 30
- Casos con 1 Excelente: 30/30
- Casos con 1 Buena: 30/30
- Casos con feedback completo: 30/30
- Casos con 4 opciones: 30/30

### Steiner
- Casos: 60
- Casos con 1 Excelente: 60/60
- Casos con 1 Buena: 60/60
- Casos con feedback completo: 60/60
- Casos con 4 opciones: 60/60

### Fisiología
- Casos: 60
- Casos con 1 Excelente: 60/60
- Casos con 1 Buena: 60/60
- Casos con feedback completo: 60/60
- Casos con 4 opciones: 60/60

Total: **150/150 corregidos sin errores estructurales**.

## Implementación

Archivo de corrección:
- `legacy-case-grading-audit.js`

Se carga después de los bancos clínicos y antes de `app-v10.js`. El sistema de aleatorización de la v3.0/v3.1 mantiene sincronizados:
- texto de cada opción;
- grado Excelente/Buena/Incorrecta;
- feedback correspondiente.

Por ello, aunque las opciones se mezclen en cada partida, el puntaje sigue asociado a la opción correcta.

## Integración

- `play.html`: carga la auditoría antes del motor del juego.
- `sw.js`: caché actualizado a `el-camino-dental-v43`.
- Workflow Android: valida y copia el archivo de auditoría.
- Versión de prueba: `3.2.0`.
- Android app ID: `com.yomismtz.elcaminodental.v32`.
- Android versionCode: `32`.

La música, efectos interactivos, orden aleatorio de preguntas y respuestas, Modo Examen y resto de mecánicas permanecen sin cambios.
