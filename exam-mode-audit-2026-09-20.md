# Modo Examen — integración y validación

Fecha: 2026-09-20  
Estado: **INTEGRADO Y COMPILADO EN v2.8**

## Funciones implementadas

- Selección de módulo.
- Selección de dificultad cuando el banco tiene dificultad pedagógica auditada.
- Selección de 20, 50 o 100 preguntas según disponibilidad del filtro.
- Orden aleatorio de preguntas sin repetición.
- Navegación Anterior / Siguiente.
- Posibilidad de cambiar respuestas antes de finalizar.
- Sin revelar la respuesta correcta durante el examen.
- Confirmación antes de finalizar y aviso de preguntas sin responder.
- Resultado final en porcentaje.
- Conteo de correctas, incorrectas y sin responder.
- Desempeño agrupado por tema.
- Identificación de áreas a reforzar usando un umbral descriptivo de <70% dentro de ese examen.
- Revisión final con respuesta del usuario, respuesta correcta y explicación.
- Diseño adaptado a móvil, con zona segura inferior para Android.
- Disponible desde Inicio, Juego y Modo Docente.
- Funciona offline mediante service worker.

## Bancos disponibles

Cada banco contiene 100 preguntas:

1. Fundamentos de la oclusión.
2. Fisiología + Alteraciones de la función.
3. Crecimiento y desarrollo craneofacial.
4. Hábitos y parafunciones.
5. Cefalometría de Steiner.
6. Ortopedia / banco general.

Total disponible para Modo Examen: **600 preguntas**.

## Dificultad

Los siguientes módulos tienen clasificación pedagógica auditada y permiten filtrar por Básico / Intermedio / Clínico:

- Fisiología + función: 34 / 33 / 33.
- Crecimiento y desarrollo: 34 / 33 / 33.
- Hábitos y parafunciones: 34 / 33 / 33.

Los bancos antiguos de Fundamentos de la oclusión, Steiner y Ortopedia general todavía no contienen metadatos de dificultad auditados. Para evitar inventar una clasificación, el Modo Examen los presenta por ahora como **Todas las dificultades**.

Cuando un filtro de dificultad deja solo 33–34 preguntas disponibles, el selector impide solicitar 50 o 100 preguntas y conserva la opción válida de 20.

## Validaciones

- `exam.js`: sintaxis JavaScript válida.
- Todos los IDs usados por `exam.js` existen en `exam.html`.
- Los seis bancos contienen 100 preguntas utilizables, incluyendo preguntas de 2 opciones tipo verdadero/falso.
- `exam.html`, `exam.css` y `exam.js` están incluidos en el APK.
- Caché offline actualizado a `el-camino-dental-v39`.
- GitHub Pages: despliegue exitoso.
- Android v2.8: compilación exitosa.
- App ID de prueba: `com.yomismtz.elcaminodental.v28`.
- APK generado desde Gradle; no fue reempaquetado manualmente.

## Archivos

- `exam.html`
- `exam.css`
- `exam.js`

## Observación para la siguiente auditoría

Para habilitar Básico / Intermedio / Clínico en todos los módulos todavía falta clasificar y auditar pedagógicamente las 300 preguntas históricas de:

- Fundamentos de la oclusión.
- Cefalometría de Steiner.
- Ortopedia / banco general.
