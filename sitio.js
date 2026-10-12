/* Sitio de #marka: muestra la versión publicada y arma los enlaces de descarga.
   Sin librerías: lo que no carga, se degrada a un enlace que igual funciona. */

(function () {
  "use strict";

  var REPO_PUBLICO = "nova-21/marka";
  var ARCHIVO = "marka-win64.zip";
  var WHATSAPP = "593996761222";
  var MENSAJE = "Hola, deseo activar #marka (firma electrónica de documentos).";

  var DESCARGA = "https://github.com/" + REPO_PUBLICO + "/releases/latest/download/" + ARCHIVO;
  var NOVEDADES = "https://github.com/" + REPO_PUBLICO + "/releases/latest";

  function texto(selector, valor) {
    var nodo = document.querySelector(selector);
    if (nodo) nodo.textContent = valor;
  }

  function enlaceWhatsApp() {
    return "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MENSAJE);
  }

  /* Los botones de descarga: al archivo si hay versión publicada, a las novedades si todavía no. */
  function apuntarDescargas(url) {
    document.querySelectorAll("[data-descarga]").forEach(function (nodo) {
      nodo.setAttribute("href", url);
      nodo.setAttribute("rel", "noopener");
    });
  }

  function pintarVersion(datos) {
    if (datos.version) texto("[data-version]", datos.version);
    if (datos.fecha) {
      texto("[data-fecha]", "publicada el " + datos.fecha);
    } else {
      texto("[data-fecha]", "publicada recientemente");
    }
    if (datos.peso) texto("[data-peso]", datos.peso);

    var sha = document.querySelector("[data-sha256]");
    if (sha && datos.sha256) sha.textContent = datos.sha256;

    apuntarDescargas(datos.publicado === false ? NOVEDADES : DESCARGA);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var enlaces = [document.getElementById("whatsapp"), document.getElementById("whatsapp-pie")];
    enlaces.forEach(function (nodo) {
      if (!nodo) return;
      nodo.setAttribute("href", enlaceWhatsApp());
      nodo.setAttribute("rel", "noopener");
    });

    // Enlace seguro por defecto (funciona aunque el JSON no cargue).
    apuntarDescargas(DESCARGA);

    fetch("version.json", { cache: "no-store" })
      .then(function (respuesta) { return respuesta.json(); })
      .then(pintarVersion)
      .catch(function () { /* sin datos: quedan el enlace de descarga y el texto por defecto */ });
  });
})();
