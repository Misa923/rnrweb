
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  var nav = document.getElementById('siteNav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', function(){
    var isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window){
    var revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach(function(el){ el.classList.add('reveal-init'); });

    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function(el){ io.observe(el); });
  }

  /* ---------- Multilingual ticker ----------
     NOTE: these are everyday working translations of "Let's get to work."
     Since translation accuracy is literally part of what R&R sells,
     it's worth having each line double-checked by a native speaker
     before this goes live. */
  var phrases = [
    { lang: 'EN', text: "Let's get to work.", dir: 'ltr' },
    { lang: 'ES', text: 'Manos a la obra.', dir: 'ltr' },
    { lang: 'FR', text: 'Mettons-nous au travail.', dir: 'ltr' },
    { lang: 'IT', text: 'Mettiamoci al lavoro.', dir: 'ltr' },
    { lang: 'PT', text: 'Vamos ao trabalho.', dir: 'ltr' },
    { lang: 'AR', text: 'لنبدأ العمل.', dir: 'rtl' }
  ];
  var tickerPhrase = document.getElementById('tickerPhrase');
  var tickerLang = document.getElementById('tickerLang');
  var idx = 0;

  function showPhrase(i){
    var p = phrases[i];
    tickerPhrase.style.opacity = 0;
    tickerLang.style.opacity = 0;
    setTimeout(function(){
      tickerPhrase.textContent = p.text;
      tickerPhrase.dir = p.dir;
      tickerLang.textContent = p.lang;
      tickerPhrase.style.opacity = 1;
      tickerLang.style.opacity = 1;
    }, reduceMotion ? 0 : 250);
  }

  if (!reduceMotion){
    setInterval(function(){
      idx = (idx + 1) % phrases.length;
      showPhrase(idx);
    }, 3200);
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  var TO_EMAIL = 'c23m900@gmail.com';

  form.addEventListener('submit', function(e){
    e.preventDefault();

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var service = form.service.value;
    var message = form.message.value.trim();

    if (!name || !email || !message){
      formNote.textContent = 'Please fill in your name, email, and a short message.';
      return;
    }

    var subject = 'New project inquiry — ' + service;
    var body =
      'Name: ' + name + '\n' +
      'Email: ' + email + '\n' +
      'Service: ' + service + '\n\n' +
      message;

    var mailtoLink = 'mailto:' + TO_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    window.location.href = mailtoLink;
    formNote.textContent = "Your email app should be opening with your message ready. If nothing happens, email us directly at " + TO_EMAIL + ".";
  });

})();
