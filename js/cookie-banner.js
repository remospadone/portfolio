(function () {
  var KEY = 'cookie_consent';

  if (localStorage.getItem(KEY)) return;

  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML =
    '<div class="cookie-banner-inner">' +
      '<p>Questo sito utilizza cookie tecnici per il corretto funzionamento. ' +
        'Per maggiori dettagli consulta la nostra ' +
        '<a href="cookie.html">Cookie Policy</a> e la ' +
        '<a href="privacy.html">Privacy Policy</a>.' +
      '</p>' +
      '<div class="cookie-banner-actions">' +
        '<button id="cookie-accept" class="btn cookie-btn">Accetta</button>' +
        '<button id="cookie-reject" class="btn cookie-btn cookie-btn-outline">Rifiuta</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(banner);

  function save(consent) {
    localStorage.setItem(KEY, consent);
    banner.classList.add('cookie-banner-hide');
    setTimeout(function () { banner.remove(); }, 400);
  }

  document.getElementById('cookie-accept').addEventListener('click', function () {
    save('accepted');
  });
  document.getElementById('cookie-reject').addEventListener('click', function () {
    save('rejected');
  });
})();
