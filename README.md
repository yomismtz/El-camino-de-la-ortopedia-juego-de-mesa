# El camino de la ortopedia dental 🎲🦷

Versión digital del juego de mesa educativo originalmente desarrollado en PowerPoint por **Mtra. Yomira Salgado Martinez**.

## Estado actual

**Versión 0.4 — banco ampliado a 100 preguntas y 60 casos clínicos.**

Incluye:

- 2 a 6 jugadores locales.
- Tablero de 37 casillas numeradas + FIN.
- Dado animado y movimiento automático.
- Reglas originales del PowerPoint: preguntas, casos clínicos, avance/retroceso, Cárcel y Vacaciones.
- **100 preguntas totales**:
  - preguntas 1–36 migradas literalmente del PowerPoint original;
  - preguntas 37–40 añadidas en v0.3;
  - preguntas 41–100 añadidas en v0.4.
- **60 casos clínicos totales**:
  - C1–C20 migrados del PowerPoint original;
  - C21–C30 añadidos en v0.3;
  - C31–C60 añadidos en v0.4.
- 3 sobres de preguntas con distribución final aproximada de 33 / 33 / 34 preguntas.
- 5 sobres de casos clínicos con **12 casos por sobre**.
- En los casos clínicos se mantiene la regla: Excelente +2 · Buena +1 · Incorrecta −1.
- Los contenidos agregados están marcados internamente con `origin: "new"`; el contenido original conserva `origin: "ppt"`.
- Guardado automático de la partida con `localStorage`.
- PWA básica y caché offline v0.4.

## Base clínica del contenido nuevo

El material añadido en v0.4 se centra en desarrollo de la dentición, hábitos orales, mordidas cruzadas, mantenimiento/recuperación de espacio, alteraciones de erupción, Clase II y III, crecimiento, diagnóstico y guía de conducta pediátrica. Como referencia principal se utilizó la **American Academy of Pediatric Dentistry (AAPD), Management of the Developing Dentition and Occlusion in Pediatric Dentistry, revisión 2024**, junto con su documento de **Behavior Guidance for the Pediatric Dental Patient, revisión 2024**.

Los casos nuevos son material docente para el juego; no sustituyen la valoración clínica individual de un paciente real.

## Fidelidad al PowerPoint

La migración de las preguntas 1–36 y casos C1–C20 conserva el texto, opciones y retroalimentación del archivo fuente, incluyendo errores ortográficos o inconsistencias que ya existían. No se corrigieron silenciosamente.

Elementos que conviene revisar antes de usar el banco como evaluación formal:

- Pregunta 16: la opción marcada como correcta por la animación no coincide claramente con el texto explicativo.
- Pregunta 25: la animación del PowerPoint y la retroalimentación escrita presentan una inconsistencia.
- Pregunta 26: la retroalimentación escrita repite la explicación de la pregunta 25.
- Preguntas 27 y 28 están duplicadas en el PowerPoint original.
- Pregunta 31: la retroalimentación escrita pertenece a otro tema.
- Pregunta 36: la explicación original contiene una inconsistencia de redacción.
- Caso C16: una de las cuatro opciones no tiene retroalimentación textual en el PowerPoint.
- Preguntas 2, 10 y 35 dependen de multimedia del PowerPoint y siguen pendientes de integración audiovisual.

## Próxima fase — v0.5 visual y multimedia

1. Extraer e integrar imágenes, personajes, GIF, audios y video originales del PowerPoint.
2. Restaurar el audio de las preguntas 2 y 10 y el contenido audiovisual de la pregunta 35.
3. Usar las tarjetas originales de reglas como ventanas/eventos del juego.
4. Añadir selección visual de personaje.
5. Añadir música y efectos con controles independientes.
6. Revisar clínicamente las preguntas originales marcadas como inconsistentes sin modificar el original sin aprobación de la autora.
7. Preparar Capacitor/Android para APK.

## Estructura

```text
index.html                    Interfaz principal
styles.css                    Diseño responsive
app.js                        Motor del juego
questions.js                  Banco base de 40 preguntas
questions-extra-deck1.js      Preguntas 41–60
questions-extra-deck2.js      Preguntas 61–80
questions-extra-deck3.js      Preguntas 81–100
cases.js                      Inicializador del banco clínico
cases-deck1.js...deck5.js     Casos C1–C30
cases-extra-deck1.js...deck5.js Casos C31–C60
manifest.webmanifest          Configuración PWA
sw.js                         Caché offline
```
