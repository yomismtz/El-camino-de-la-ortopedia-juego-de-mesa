# El Camino Dental 🎲🦷

Juego educativo digital de odontología y ortopedia dentofacial desarrollado por **Mtra. Yomira Salgado Martinez**.

## Estado actual

**Versión 3.7 — web/PWA y Android.**

El proyecto incluye:

- tablero de **100 casillas** y dos dados;
- partidas de **2 a 5 jugadores**;
- juego local y contra la computadora;
- **1000 preguntas** integradas al banco académico;
- **500 casos clínicos** conservados en las fuentes del proyecto; los bancos activos dependen del módulo seleccionado;
- 12 personajes;
- selección de módulo, áreas y dificultad;
- narración de reactivos y cronómetro de 30 segundos coordinado con la voz;
- Modo Examen y Modo Docente;
- guardado automático y recuperación de partidas;
- resumen académico al finalizar;
- PWA y compilación Android en orientación horizontal;
- reglamento consultable antes y durante la partida.

## Reglas principales

En cada turno se lanzan dos dados y se avanza la suma. La casilla de llegada debe resolverse.

- **Pregunta:** correcta, conserva la posición; incorrecta o tiempo agotado, retrocede 1.
- **Caso clínico:** Excelente +2 · Buena +1 · Incorrecta −1.
- **Excelente diagnóstico:** avanza 1.
- **Tratamiento concluido:** avanza 2.
- **Paciente canceló:** retrocede 1.
- **Expediente perdido:** retrocede 2.
- **Tratamiento salió mal:** retrocede 3.
- **Vacaciones, impuestos o equipo descompuesto:** pierde 1 turno.
- **Demanda:** envía a la cárcel.
- **Cárcel:** primera visita, pierde 2 turnos; segunda y posteriores, pierde 3.

Los movimientos derivados de preguntas, casos y eventos resuelven también la nueva casilla.

### Victoria exacta y rebote

Solo se gana terminando **exactamente en la casilla 100**.

Si una tirada supera la meta, la ficha llega al 100 y retrocede las casillas sobrantes. La casilla final del rebote se resuelve normalmente.

Ejemplo: desde la casilla 97, una tirada de 8 lleva al jugador hasta 100 y luego 5 casillas hacia atrás, terminando en la 95. Desde 97, una tirada de 3 termina exactamente en 100 y gana.

## Contenido académico

Los 200 reactivos procedentes de las cinco versiones fuente que antes se identificaban internamente como **“Primer parcial / Juega y aprueba”** se conservan como fuente académica, pero **no constituyen un módulo visible independiente**. Sus preguntas se integran al banco general y personalizado según su clasificación.

Los 25 casos derivados de esa fuente se conservan en el repositorio para trazabilidad académica, pero no forman parte del módulo visible eliminado.

Módulos visibles actuales:

- Juego personalizado (1 a 5 áreas).
- Fundamentos de la oclusión.
- Nomenclatura y etimología médica.
- Fisiología + alteraciones de la función.
- Crecimiento y desarrollo craneofacial.
- Hábitos y parafunciones.
- Cefalometría de Steiner.
- Ortopedia / banco general.

## Android

La compilación Android se genera mediante GitHub Actions con Capacitor. La versión Android fuerza orientación horizontal, mantiene la pantalla activa durante la partida, usa navegación Atrás integrada y guarda el estado cuando la aplicación pasa a segundo plano.

El flujo de APK de prueba genera el artefacto **ElCaminoDental-v3.7**. El package Android oficial es **com.uam.cientodentistas** y no debe cambiarse. El repositorio también contiene un flujo de preparación de **AAB release para Google Play** con `versionCode 37`, `versionName 3.7.0` y `targetSdk 36`.

## Privacidad

El juego no requiere cuenta, no incluye publicidad ni analítica propia y no envía a un servidor propio los nombres de jugadores, respuestas o progreso. La partida y el contenido del Modo Docente se almacenan localmente en el dispositivo mediante `localStorage`.

La versión web utiliza GitHub Pages, cuyo proveedor puede procesar datos técnicos asociados a la visita conforme a sus propias políticas.

Consulte `PRIVACY.md` o `privacy.html`.

## Archivos principales

```text
index.html                     Portada pública
play.html                      Juego y reglamento
app-v10.js                     Motor activo del juego
styles-v10.css                 Estilos base del juego
ui-polish.css                  Ajustes visuales y Android
character-art.css              Presentación de personajes
android-navigation.js          Navegación y ciclo de vida Android
area-classifier.js             Clasificación académica por áreas
primer-parcial-questions.js    Fuente interna de 200 reactivos integrados
questions*.js                  Bancos generales de preguntas
expansion-questions-2026.js   200 preguntas adicionales auditables
expansion-cases-2026.js       145 casos clínicos adicionales auditables
cases*.js                      Bancos de casos clínicos
exam.html / exam.js            Modo Examen
teacher.html / teacher.js      Modo Docente
manifest.webmanifest           Configuración PWA
sw.js                          Caché offline
.github/workflows/             Compilaciones y validaciones Android
```

## Validación

El flujo Android comprueba sintaxis JavaScript y elementos críticos de jugabilidad antes de construir la APK, incluidos el reglamento consultable, la lógica de rebote en la meta y el manejo seguro de pausa/reanudación.

Las auditorías académicas y de contenido permanecen en el repositorio como registro de revisión y trazabilidad.

## Preparación para Google Play

La Mejora 12 añade un preflight reproducible mediante `playstore-preflight.js` y un flujo de AAB en `.github/workflows/playstore-aab.yml`. El artefacto generado es una compilación release AAB sin firma de publicación: antes de subirlo a Play Console debe configurarse la clave de carga y Play App Signing. No se almacenan claves privadas en el repositorio.

El flujo verifica el package oficial, versionado, target SDK, referencias del bundle, Bluetooth nativo y documentación de privacidad. La ficha de Play Console, Data Safety, clasificación de contenido, público objetivo, capturas, icono, política de privacidad pública y firma siguen requiriendo revisión/configuración en Play Console.
