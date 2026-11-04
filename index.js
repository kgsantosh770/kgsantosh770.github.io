(function () {
  'use strict';

  var ROLES = [
    'AI-First Engineer',
    'Full-Stack Developer',
    'React & Vue Specialist',
    'Node.js Backend Engineer',
    'Cursor + Claude Power User'
  ];

  function initTyping() {
    var el = document.getElementById('typingText');
    if (!el) return;
    var i = 0, c = 0, erasing = false;
    function tick() {
      var word = ROLES[i];
      if (!erasing) {
        el.textContent = word.substring(0, ++c);
        if (c === word.length) { erasing = true; return setTimeout(tick, 2200); }
        setTimeout(tick, 65);
      } else {
        el.textContent = word.substring(0, --c);
        if (c === 0) { erasing = false; i = (i + 1) % ROLES.length; return setTimeout(tick, 400); }
        setTimeout(tick, 35);
      }
    }
    tick();
  }

  function initAnimations() {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.15 });

    document.querySelectorAll('.anim').forEach(function (el) {
      observer.observe(el);
    });
  }

  function initNav() {
    var btn = document.getElementById('menuBtn');
    var nav = document.getElementById('mobileNav');

    btn.addEventListener('click', function () {
      btn.classList.toggle('open');
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        btn.classList.remove('open');
        nav.classList.remove('open');
      });
    });

    var topbar = document.getElementById('topbar');
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > 100 && y > lastY) {
        topbar.style.transform = 'translateY(-100%)';
      } else {
        topbar.style.transform = 'translateY(0)';
      }
      lastY = y;
    }, { passive: true });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href && href.length > 1) {
          var target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  function initFreelanceModal() {
    var btn = document.getElementById('freelanceBtn');
    var modal = document.getElementById('freelanceModal');
    var close = document.getElementById('modalClose');
    if (!btn || !modal) return;

    var btnMobile = document.getElementById('freelanceBtnMobile');

    function openModal() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }

    btn.addEventListener('click', openModal);
    if (btnMobile) btnMobile.addEventListener('click', openModal);

    close.addEventListener('click', function () {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function initScrollSpy() {
    var links = document.querySelectorAll('.spy-link[data-spy]');
    if (!links.length) return;
    var sections = [];
    links.forEach(function (link) {
      var sec = document.getElementById(link.dataset.spy);
      if (sec) sections.push({ el: sec, link: link });
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          sections.forEach(function (s) {
            if (s.el === entry.target) s.link.classList.add('active');
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(function (s) { observer.observe(s.el); });
  }

  function init() {
    initTyping();
    initAnimations();
    initNav();
    initSmoothScroll();
    initFreelanceModal();
    initScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
