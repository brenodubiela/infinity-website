export const CONSENT_KEY = "infinity_cookie_consent";
// Subir a versão quando a política de cookies mudar: o banner volta a pedir consentimento.
export const CONSENT_VERSION = 1;

// Roda antes da primeira pintura. O banner vem no HTML estático (pinta junto com a página);
// para quem já escolheu, html[data-consent] o esconde via CSS antes de aparecer.
export const consentScript = `(function(){try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_KEY)})||"null");if(c&&c.version===${CONSENT_VERSION})document.documentElement.setAttribute("data-consent","1");}catch(e){}})();`;
