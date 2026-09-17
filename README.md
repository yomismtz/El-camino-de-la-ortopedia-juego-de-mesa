# El camino de la ortopedia dental 🎲🦷

Versión digital del juego de mesa educativo originalmente desarrollado en PowerPoint por **Mtra. Yomira Salgado Martinez**.

## Sitio web

El proyecto cuenta con una página pública en GitHub Pages con:

- portada oficial del proyecto;
- acceso directo al juego;
- explicación de características y reglas;
- Política de Privacidad pública;
- enlace al repositorio y canal de contacto mediante Issues.

Rutas principales:

- `index.html` — sitio oficial / landing page.
- `play.html` — juego interactivo.
- `privacy.html` — Política de Privacidad pública.
- `PRIVACY.md` — copia de la política dentro del repositorio.

## Estado actual

**Versión 0.5 — visual, multimedia y sitio público.**

Incluye:

- 2 a 6 jugadores locales.
- Tablero de 37 casillas numeradas + FIN y reglas originales.
- **100 preguntas** y **60 casos clínicos**.
- Pantalla de selección de 6 personajes/fichas.
- Temporizador opcional de 30 segundos.
- Sonidos de interfaz generados mediante Web Audio como respaldo offline.
- Guardado automático y recuperación de partida mediante `localStorage`.
- PWA con orientación horizontal.
- Caché offline de portada, juego, política de privacidad y bancos educativos.

## Privacidad

El juego no requiere cuenta, no incluye publicidad ni analítica propia y no envía a un servidor propio los nombres de jugadores, respuestas o progreso. El estado de la partida se almacena localmente en el dispositivo mediante `localStorage`.

La versión web utiliza GitHub Pages. GitHub puede procesar datos técnicos asociados a la visita, incluida la dirección IP, conforme a sus propias políticas de privacidad.

Consulte [`PRIVACY.md`](PRIVACY.md) o la página pública `privacy.html`.

## Multimedia recuperada del PowerPoint

Durante la migración se recuperaron personajes, tarjetas, GIF, 12 MP3, 1 WAV y 1 MP4. También se identificaron los clips asociados a correcto/error/excelente, countdown/alarma, las preguntas 2 y 10 y el video de la pregunta 35.

La versión web pública utiliza efectos sintetizados como respaldo para no depender de binarios externos. El paquete multimedia recuperado se conserva para una compilación local/Android posterior.

## Fidelidad al PowerPoint

Las preguntas 1–36 y los casos C1–C20 conservan el texto, opciones y retroalimentación del archivo fuente. El contenido agregado posteriormente permanece marcado internamente como `origin: "new"`.

Mecánicas originales:

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
2. Integrar el paquete multimedia recuperado como assets locales cuando sea apropiado.
3. Integrar Capacitor y crear el proyecto Android.
4. Añadir icono y pantalla de inicio.
5. Generar una APK de prueba.
6. Tras validar, generar APK/AAB firmado.

## Estructura

```text
index.html                     Sitio oficial / landing page
site.css                       Diseño del sitio y páginas legales
play.html                      Juego interactivo
privacy.html                   Política de Privacidad pública
PRIVACY.md                     Política de Privacidad del repositorio
styles.css                     Diseño del juego
app.js                         Motor del juego v0.5
questions.js                   Banco base de preguntas
questions-extra-deck*.js       Ampliación hasta 100 preguntas
cases.js                       Inicializador de casos
cases-deck*.js                 Casos originales y v0.3
cases-extra-deck*.js           Ampliación hasta 60 casos
manifest.webmanifest           Configuración PWA
sw.js                          Caché offline
```
