# QA de versión candidata — Paso 13

Fecha: 2026-09-29

## Alcance

Esta fase convierte las comprobaciones críticas del juego en controles reproducibles antes de generar la APK candidata.

### Validaciones automatizadas

- Tablero de 100 casillas y meta 100.
- Tipos de casilla sin colisiones.
- 20 casillas de pregunta y 19 de caso.
- Cárcel en la casilla 44.
- Demanda mueve a cárcel.
- Primera visita a cárcel: 2 turnos; posteriores: 3.
- Eventos +1, +2, −1, −2 y −3 conectados a su resolución.
- Límite de seguridad de cadenas de eventos.
- Victoria exacta y rebote para posiciones 0–99 y tiradas 2–12.
- Pregunta incorrecta: −1.
- Caso excelente: +2; bueno: +1; incorrecto: −1.
- Cronómetro de 30 segundos y urgencia en los últimos 10.
- Expiración del cronómetro.
- Configuración local de 2–5 jugadores.
- Modo contra computadora y niveles Bajo, Medio, Alto y Súper inteligente.
- Guardado, recuperación y resolución pendiente.
- Pausa/reanudación Android con voz y cronómetro.
- Reglamento consultable y textos actuales.
- Todos los scripts JavaScript declarados por play.html deben existir físicamente.
- play.html no debe cargar scripts duplicados.

## Criterio de candidata

Una compilación solo puede considerarse candidata si:
1. Validate sources termina correctamente.
2. npm test termina correctamente.
3. El bundle web se prepara sin archivos faltantes.
4. Capacitor crea y sincroniza Android.
5. El branding Android se aplica.
6. Gradle genera la APK.
7. El artefacto APK se publica correctamente.

## Prueba física pendiente

Las pruebas automáticas no sustituyen la validación en hardware real. Antes de publicación deben comprobarse en al menos un teléfono Android: orientación, legibilidad, audio/TTS, volumen, toque, botón Atrás, suspensión/reanudación, instalación/actualización y una partida completa hasta la meta.
