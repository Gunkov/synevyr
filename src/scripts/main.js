(function () {
  'use strict';

  var mqDesktop = window.matchMedia('(min-width: 922px)');
  var bar = document.getElementById('main-header-bar');
  var spacer = document.getElementById('header-spacer');
  var toggle = document.querySelector('.menu-toggle');

  /* Sticky header (desktop only) */
  function onScroll() {
    if (!bar) return;
    if (!mqDesktop.matches) {
      bar.classList.remove('is-stuck', 'is-shrunk', 'nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
      if (spacer) spacer.style.height = '0';
      return;
    }
    var y = window.scrollY || window.pageYOffset;
    if (y > 10) {
      if (!bar.classList.contains('is-stuck') && spacer) {
        spacer.style.height = bar.offsetHeight + 'px';
        bar.classList.add('is-stuck');
      }
    } else {
      bar.classList.remove('is-stuck', 'is-shrunk');
      if (spacer) spacer.style.height = '0';
    }
    bar.classList.toggle('is-shrunk', y > 120);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () {
    if (bar && bar.classList.contains('is-stuck') && spacer) {
      spacer.style.height = bar.offsetHeight + 'px';
    }
  });
  onScroll();

  /* Mobile menu */
  if (toggle && bar) {
    toggle.addEventListener('click', function () {
      var open = bar.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* Close mobile menu after navigating to an anchor */
  Array.prototype.forEach.call(document.querySelectorAll('.main-menu a'), function (link) {
    link.addEventListener('click', function () {
      if (bar) bar.classList.remove('nav-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Tabs */
  Array.prototype.forEach.call(document.querySelectorAll('[data-tabs]'), function (root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('.tabs-item'));
    var panels = Array.prototype.slice.call(root.querySelectorAll('.tabs-panel'));
    items.forEach(function (item, i) {
      item.addEventListener('click', function () {
        items.forEach(function (it, j) {
          it.classList.toggle('active', i === j);
          it.setAttribute('tabindex', i === j ? '0' : '-1');
        });
        panels.forEach(function (p, j) {
          p.classList.toggle('active', i === j);
        });
      });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  });

  /* Scroll-to-top */
  var scrollTop = document.getElementById('scroll-top');
  function onScrollTop() {
    if (!scrollTop) return;
    scrollTop.classList.toggle('show', (window.scrollY || window.pageYOffset) > 300);
  }
  window.addEventListener('scroll', onScrollTop, { passive: true });
  onScrollTop();
  if (scrollTop) {
    scrollTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* Contact form validation (CF7-like, no backend) */
  var form = document.querySelector('.cform');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var response = form.querySelector('.form-response');
      var valid = true;

      Array.prototype.forEach.call(form.querySelectorAll('.form-tip'), function (tip) {
        tip.remove();
      });
      Array.prototype.forEach.call(form.querySelectorAll('.not-valid'), function (field) {
        field.classList.remove('not-valid');
      });

      function addTip(input, message) {
        valid = false;
        input.classList.add('not-valid');
        var tip = document.createElement('span');
        tip.className = 'form-tip';
        tip.textContent = message;
        input.parentNode.appendChild(tip);
      }

      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var name = form.querySelector('input[name="name"]');
      var email = form.querySelector('input[name="email"]');
      var message = form.querySelector('textarea[name="message"]');

      if (name && !name.value.trim()) addTip(name, "Поле обов'язкове.");
      if (email) {
        if (!email.value.trim()) addTip(email, "Поле обов'язкове.");
        else if (!emailRe.test(email.value.trim()))
          addTip(email, 'Адреса електронної пошти, вказана у формі, недійсна.');
      }
      if (message && !message.value.trim()) addTip(message, "Поле обов'язкове.");

      if (response) {
        response.classList.add('visible');
        if (valid) {
          response.classList.remove('failed');
          response.classList.add('sent');
          response.textContent = 'Дякуємо за ваше повідомлення. Воно було успішно відправлене.';
          form.reset();
        } else {
          response.classList.remove('sent');
          response.classList.add('failed');
          response.textContent =
            'Виникла помилка під час відправлення форми. Перевірте заповнені поля та спробуйте ще раз.';
        }
      }
    });
  }
})();
