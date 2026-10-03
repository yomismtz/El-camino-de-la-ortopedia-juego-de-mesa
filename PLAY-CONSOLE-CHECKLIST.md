# Google Play Console — El Camino Dental

## Identidad técnica
- Nombre: El Camino Dental
- Package ID: `com.uam.cientodentistas`
- Versión actual: `3.7.0`
- Version code: `37`
- Target SDK del flujo Play Store: `36`
- Orientación: horizontal
- AAB: release, sin firma de publicación en CI

## Antes de publicar
1. Configurar Google Play App Signing y una upload key fuera del repositorio.
2. Firmar el AAB con la upload key mediante secretos de GitHub Actions o localmente.
3. Subir el AAB a una pista interna y probar instalación/actualización.
4. Completar Data Safety según el comportamiento real de la versión publicada.
5. Completar clasificación de contenido y público objetivo.
6. Añadir capturas de pantalla, icono y descripción de la ficha.
7. Publicar la URL pública de la política de privacidad.
8. Revisar los permisos Bluetooth y explicar su finalidad en la ficha si Play Console lo solicita.
9. Conservar el AAB, mapping de R8 y símbolos nativos correspondientes a la misma compilación cuando se habilite minificación/símbolos.
10. No cambiar `com.uam.cientodentistas`; un cambio de package produciría otra aplicación en Google Play.

## Automatización
- `playstore-preflight.js` valida package, versión, AAB, target SDK, Bluetooth y privacidad.
- `.github/workflows/playstore-aab.yml` genera el AAB release de preparación.
- El artefacto de CI es unsigned deliberadamente: las claves privadas no se guardan en GitHub ni en el repositorio.

## Nota
El preflight no sustituye la revisión de Play Console. Las declaraciones de Data Safety, audiencia, contenido, privacidad y firma deben corresponder exactamente a la versión que se publique.
