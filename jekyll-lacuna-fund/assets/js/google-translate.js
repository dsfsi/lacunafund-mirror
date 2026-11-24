(function () {
  var languages = { en: 'English', es: 'Español', fr: 'Français', sw: 'Kiswahili', am: 'አማርኛ', zu: 'isiZulu' };
  var toggle = document.querySelector('[data-language-toggle]');
  var menu = document.querySelector('[data-language-menu]');
  var current = document.querySelector('[data-language-current]');
  if (!toggle || !menu || !current) return;
  function cookieLanguage() { var match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/); if (!match) return 'en'; var parts = decodeURIComponent(match[1]).split('/'); return parts[2] || 'en'; }
  function setCookie(code) { var value = code === 'en' ? '' : '/en/' + code; var expiry = code === 'en' ? ';expires=Thu, 01 Jan 1970 00:00:00 GMT' : ''; document.cookie = 'googtrans=' + value + ';path=/' + expiry; document.cookie = 'googtrans=' + value + ';path=/;domain=.' + window.location.hostname + expiry; }
  function showCurrent() { current.textContent = languages[cookieLanguage()] || languages.en; }
  window.googleTranslateElementInit = function () { if (window.google && window.google.translate) new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: Object.keys(languages).join(','), autoDisplay: false }, 'google_translate_element'); };
  var script = document.createElement('script'); script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; script.async = true; document.body.appendChild(script);
  toggle.addEventListener('click', function () { var open = menu.hasAttribute('hidden'); if (open) menu.removeAttribute('hidden'); else menu.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', String(open)); });
  menu.querySelectorAll('[data-language]').forEach(function (item) { item.addEventListener('click', function () { var code = item.getAttribute('data-language'); var combo = document.querySelector('.goog-te-combo'); setCookie(code); if (combo) { combo.value = code === 'en' ? '' : code; combo.dispatchEvent(new Event('change')); } else window.location.reload(); showCurrent(); menu.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); }); });
  document.addEventListener('click', function (event) { if (!event.target.closest('.language-switcher')) { menu.setAttribute('hidden', ''); toggle.setAttribute('aria-expanded', 'false'); } });
  showCurrent();
}());
