# El camino de la ortopedia dental 🎲🦷

Versión digital del juego de mesa educativo originalmente desarrollado en PowerPoint por **Mtra. Yomira Salgado Martinez**.

## Estado actual

**Versión 0.1 — prototipo jugable.**

Incluye:

- 2 a 6 jugadores locales.
- Tablero de 37 casillas.
- Dado animado.
- Movimiento automático de fichas.
- Turnos automáticos.
- Casillas de ortopedia dental, cultura general y casos clínicos.
- Banco inicial de preguntas migradas/adaptadas desde el PowerPoint.
- Puntuación: 1 punto por pregunta y 2 por caso clínico.
- Guardado automático de la partida con `localStorage`.
- PWA básica con funcionamiento offline una vez cargada.
- Diseño adaptable a computadora, tablet y teléfono.

## Cómo probarlo

No requiere compilación. Abre `index.html` mediante un servidor web local o publica el repositorio con GitHub Pages.

Ejemplo con Python:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Próximas fases

1. Migrar las 36 preguntas y los 20 casos clínicos del PowerPoint.
2. Extraer e integrar imágenes, GIF, audios y video originales.
3. Reproducir los eventos especiales y reglas del tablero original.
4. Añadir selección visual de personaje.
5. Añadir efectos de sonido y música con controles independientes.
6. Verificar clínicamente el banco de preguntas y separar claramente el contenido docente de cultura general.
7. Preparar el proyecto para Capacitor y Android.
8. Generar APK/AAB firmado.

## Estructura

```text
index.html            Interfaz principal
styles.css            Diseño responsive
app.js                Motor del juego y preguntas
manifest.webmanifest  Configuración PWA
sw.js                 Caché offline
```

## Nota

Este repositorio está en migración desde una presentación PowerPoint interactiva. La versión web no pretende reproducir diapositivas una a una: convierte el material en un motor de juego real y reutilizable.
