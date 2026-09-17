# El camino de la ortopedia dental 🎲🦷

Versión digital del juego de mesa educativo originalmente desarrollado en PowerPoint por **Mtra. Yomira Salgado Martinez**.

## Estado actual

**Versión 0.5 — visual y multimedia.**

Incluye:

- 2 a 6 jugadores locales.
- Tablero de 37 casillas numeradas + FIN y reglas originales.
- **100 preguntas** y **60 casos clínicos**.
- Pantalla de selección de 6 personajes/fichas, sin repetir personaje.
- Interfaz visual inspirada en el juego original, con colores y tarjetas de eventos reconstruidas a partir del PowerPoint.
- Temporizador opcional de 30 segundos.
- Sonidos de interfaz generados en la propia app mediante Web Audio para correcto, excelente, incorrecto, selección, temporizador, alarma y victoria; funcionan offline y no requieren archivos externos.
- Guardado automático de partida y recuperación de partidas anteriores.
- PWA/offline: interfaz y bancos quedan en caché tras cargarse.

## Multimedia recuperada del PowerPoint

Durante la migración se recuperaron del archivo fuente los recursos originales, incluidos personajes, tarjetas, GIF, 12 MP3, 1 WAV y 1 MP4. También se identificaron los clips asociados a correcto/error/excelente, countdown/alarma, las preguntas 2 y 10 y el video de la pregunta 35.

La versión web pública usa sonidos sintetizados como respaldo y no publica los clips binarios originales. El paquete multimedia recuperado se conserva para la compilación local/Android y puede incorporarse como `assets` cuando se prepare la APK.

Las preguntas 2, 10 y 35 se mantienen identificadas como preguntas multimedia; en la web muestran una indicación de que su audio/video original está reservado para el paquete local/APK.

## Fidelidad al PowerPoint

Las preguntas 1–36 y los casos C1–C20 conservan el texto, opciones y retroalimentación del archivo fuente. El contenido agregado posteriormente permanece marcado como `origin: "new"`.

Se conservan las mecánicas originales:

- Pregunta incorrecta: retrocede 1.
- Caso clínico: Excelente +2 · Buena +1 · Incorrecta −1.
- Expediente: retrocede 2.
- Cárcel: pierde 1 turno.
- Vacaciones: regresa al Inicio.
- Excelente diagnóstico: avanza 1.
- Tratamiento concluido: avanza 2.
- Paciente cancela: retrocede 1.

## Siguiente fase — primera APK

1. Probar una partida completa en navegador y Android horizontal.
2. Integrar el paquete multimedia original como assets locales de Android.
3. Integrar Capacitor y crear el proyecto Android.
4. Añadir icono y pantalla de inicio.
5. Generar una primera APK de prueba.
6. Tras validar, generar APK/AAB firmado.

## Estructura

```text
index.html                     Interfaz principal
styles.css                     Diseño responsive
app.js                         Motor v0.5
questions.js                   Banco base de preguntas
questions-extra-deck*.js       Ampliación hasta 100 preguntas
cases.js                       Inicializador de casos
cases-deck*.js                 Casos originales y v0.3
cases-extra-deck*.js           Ampliación hasta 60 casos
manifest.webmanifest           Configuración PWA
sw.js                          Caché offline v0.5
```
