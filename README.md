# Sitio de #marka

Página pública del programa de firma electrónica de PDFs. Es un sitio **estático** (HTML, CSS y
un poco de JavaScript, sin librerías ni servidor) publicado con **GitHub Pages** desde este mismo
repositorio.

- Sitio: https://nova-21.github.io/marka/
- Descarga directa: https://github.com/nova-21/marka/releases/latest/download/marka-win64.zip

## Por qué este repositorio es aparte (y público)

El código de la app vive en un repositorio **privado**. Eso está bien, pero tiene una
consecuencia: **los archivos adjuntos de un repositorio privado no se pueden descargar sin
permiso**, así que un cliente no podría bajar el programa desde ahí. Este repositorio existe para
resolver eso: es público, solo tiene el sitio y el archivo comprimido que se descarga.

El código de la app sigue privado. Aquí no hay código.

## Cómo se publica un archivo nuevo

El ZIP **no** se guarda en el historial de git (pesa ~118 MB y crecería sin control). Se publica
como *adjunto de un Release*:

1. En el repositorio de la app se publica la versión (tag `vX.Y.Z`) y el pipeline genera el ZIP.
2. Se publica ese ZIP aquí, con el **nombre fijo** `marka-win64.zip`, para que el enlace
   `/releases/latest/download/marka-win64.zip` no cambie nunca.
3. Se actualiza `version.json` (versión, fecha, peso y SHA-256) para que el sitio muestre el dato
   correcto.

El paso 2 y 3 los realiza `tools/publish_web.py` en el repositorio de la app (ver el runbook).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página (una sola, en español) |
| `styles.css` | Los estilos, con la paleta de la app (`ui/theme.py`) |
| `sitio.js` | Lee `version.json` y arma los enlaces de descarga y de WhatsApp |
| `version.json` | Versión publicada, fecha, peso y SHA-256 (lo actualiza el script) |
| `assets/marca.svg` | El símbolo de la marca (la almohadilla en el cuadro) |

Lo que todavía **no** tiene: pagos, cobros ni emisión de licencias. La emisión de licencias vive
en la PC del autor y nunca se expone en la web; si más adelante hace falta cobrar en línea, va en
otro proyecto, no aquí.
