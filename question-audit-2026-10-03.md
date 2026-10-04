# Auditoría de preguntas — 2026-10-03

## Alcance
Auditoría del banco existente de El Camino Dental. No se agregan preguntas.

## Hallazgos estructurales
- Las preguntas de Verdadero/Falso y Sí/No tienen deliberadamente 2 opciones. No se consideran errores.
- Se revisa que el índice `correct` apunte a una opción existente.
- Se revisan opciones vacías o repetidas.
- Se revisan IDs y textos duplicados después de eliminar referencias duplicadas al mismo objeto.

## Resultado inicial
La auditoría del código existente detectó 76 reactivos con 2 opciones, todos correspondientes a formatos binarios válidos.
No se detectaron índices `correct` fuera de rango en el conjunto inspeccionado.
No se detectaron opciones vacías en el conjunto inspeccionado.
Los duplicados de referencias entre bancos no deben contarse como preguntas diferentes.

## Criterio clínico
Una respuesta solo se marcará como incorrecta cuando pueda demostrarse mediante una fuente clínica fiable o cuando exista contradicción interna clara. Las afirmaciones absolutas ("siempre", "nunca", "obligatorio") requieren revisión especial porque pueden convertir una pregunta clínicamente matizada en una pregunta falsa.

Fuentes prioritarias: ADA Clinical Practice Guidelines y Oral Health Topics; AAPD Reference Manual y Best Practices.

## Próxima fase
Revisión semántica categoría por categoría: enunciado, única respuesta correcta, distractores, explicación y actualidad clínica. Los cambios al banco se harán únicamente cuando el hallazgo esté confirmado.
