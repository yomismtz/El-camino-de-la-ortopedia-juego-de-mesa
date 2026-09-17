# El camino de la ortopedia dental 🎲🦷

Versión digital del juego de mesa educativo originalmente desarrollado en PowerPoint por **Mtra. Yomira Salgado Martinez**.

## Estado actual

**Versión 0.3 — banco completo y ampliado.**

Incluye:

- 2 a 6 jugadores locales.
- Tablero de 37 casillas numeradas + FIN.
- Dado animado y movimiento automático.
- Reglas originales del PowerPoint: preguntas, casos clínicos, avance/retroceso, Cárcel y Vacaciones.
- **40 preguntas totales**:
  - preguntas 1–36 migradas del PowerPoint original;
  - preguntas 37–40 añadidas en v0.3 y marcadas internamente como contenido nuevo.
- **30 casos clínicos totales**:
  - C1–C20 migrados del PowerPoint original;
  - C21–C30 añadidos en v0.3 y marcados internamente como contenido nuevo.
- 3 sobres de preguntas: 13 / 13 / 14 preguntas.
- 5 sobres de casos clínicos: 6 casos por sobre.
- En los casos originales, la clasificación **Excelente / Buena / Incorrecta** fue reconstruida a partir de los disparadores, imágenes y sonidos del propio PPT.
- Guardado automático de la partida con `localStorage`.
- PWA básica y caché offline.

## Fidelidad al PowerPoint

La migración de las preguntas 1–36 y casos C1–C20 conserva el texto, opciones y retroalimentación del archivo fuente, incluyendo errores ortográficos o inconsistencias que ya existían. No se corrigieron silenciosamente.

Elementos que conviene revisar antes de usar el banco como evaluación formal:

- Pregunta 16: la opción marcada como correcta por la animación no coincide claramente con el texto explicativo.
- Pregunta 25: la animación del PowerPoint marca como correcta `2 vueltas al día por 3 semanas`, mientras la retroalimentación escrita indica `0.25 mm cada 12 h`.
- Pregunta 26: la retroalimentación escrita repite la explicación de la pregunta 25.
- Pregunta 31: la retroalimentación escrita pertenece a la diferencia entre ortopedia y ortodoncia, no a Moctezuma II.
- Pregunta 36: la explicación original contiene una inconsistencia de redacción.
- Caso C16: una de las cuatro opciones no tiene retroalimentación textual en el PowerPoint.
- Preguntas 2, 10 y 35 dependen de audio/video del PowerPoint; la multimedia se integrará en v0.4.

## Contenido nuevo de v0.3

Las preguntas 37–40 y los casos C21–C30 son material educativo nuevo, separado internamente con `origin: "new"`. Para hábitos, crecimiento, crossbite y selección de tratamiento se tomó como referencia general la guía de la **American Academy of Pediatric Dentistry (AAPD), Management of the Developing Dentition and Occlusion in Pediatric Dentistry, revisión 2024**.

## Próxima fase — v0.4

1. Extraer e integrar imágenes, personajes, GIF, audios y video originales del PowerPoint.
2. Restaurar el audio de las preguntas 2 y 10 y el contenido audiovisual de la pregunta 35.
3. Usar las tarjetas originales de reglas como ventanas/eventos del juego.
4. Añadir selección visual de personaje.
5. Añadir música y efectos con controles independientes.
6. Revisar clínicamente las preguntas marcadas como inconsistentes sin modificar el original sin aprobación de la autora.
7. Preparar Capacitor/Android para APK.

## Estructura

```text
index.html            Interfaz principal
styles.css            Diseño responsive
app.js                Motor del juego
questions.js          Banco de 40 preguntas
cases.js              Inicializador del banco clínico
cases-deck1.js...     Cinco sobres con 30 casos clínicos
manifest.webmanifest  Configuración PWA
sw.js                  Caché offline
```
