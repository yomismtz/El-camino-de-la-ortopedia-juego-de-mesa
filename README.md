# El camino de la ortopedia dental 🎲🦷

Versión digital del juego de mesa educativo originalmente desarrollado en PowerPoint por **Mtra. Yomira Salgado Martinez**.

## Estado actual

**Versión 0.2 — reglas originales y mapa real del tablero.**

Incluye:

- 2 a 6 jugadores locales.
- 37 casillas numeradas, más INICIO y FIN.
- Dado animado y movimiento automático de fichas.
- Turnos automáticos.
- Mapa de casillas reconstruido desde el PowerPoint original.
- Reglas originales:
  - Pregunta incorrecta: retrocede 1 casilla.
  - Caso clínico excelente: avanza 2.
  - Caso clínico bueno: avanza 1.
  - Caso clínico incorrecto: retrocede 1.
  - “Perdiste el expediente”: retrocede 2.
  - “Cárcel”: pierde 1 turno.
  - “Vacaciones”: regresa al INICIO.
  - “Hiciste un excelente diagnóstico”: avanza 1.
  - “Concluiste un tratamiento”: avanza 2.
  - “El paciente canceló una cita”: retrocede 1.
- Los sobres del tablero conservan su organización original: Preguntas 1, 2 y 3; Casos clínicos 1 a 5.
- Guardado automático con `localStorage`.
- PWA básica y funcionamiento offline una vez cargada.
- Diseño adaptable a computadora, tablet y teléfono.

## Mapa reconstruido del tablero

Las casillas especiales fueron identificadas a partir de las imágenes de fondo y los hipervínculos del PowerPoint original. Las casillas de preguntas mantienen el sobre al que apuntaban y las de casos clínicos mantienen el grupo de cuatro casos al que estaban conectadas.

## Contenido migrado

La mecánica ya está implementada. El banco de contenido todavía es parcial: en la v0.3 se migrarán literalmente las **36 preguntas** y los **20 casos clínicos** del archivo original, junto con sus retroalimentaciones.

## Cómo probarlo

No requiere compilación. Abre `index.html` mediante un servidor web local o publica el repositorio con GitHub Pages.

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Próximas fases

1. Migrar las 36 preguntas y los 20 casos clínicos completos.
2. Integrar las imágenes originales de las tarjetas de reglas.
3. Extraer e integrar personajes, GIF, audios, canciones y video originales.
4. Reproducir la selección visual de personaje.
5. Probar todas las rutas de juego y corregir casos límite.
6. Preparar el proyecto para Capacitor y Android.
7. Generar APK/AAB firmado.

## Estructura

```text
index.html            Interfaz principal
styles.css            Diseño responsive
app.js                Motor del juego, tablero, reglas y contenido
manifest.webmanifest  Configuración PWA
sw.js                 Caché offline
```

## Nota

Este repositorio no reproduce el PowerPoint como una secuencia de diapositivas. Convierte su tablero, reglas, preguntas, casos clínicos y recursos multimedia en un motor de juego real y reutilizable.
