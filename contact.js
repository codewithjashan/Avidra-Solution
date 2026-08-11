/* =====================================================
   AVIDRA SOLUTIONS — CONTACT PAGE
   Vanilla JS: scroll reveal, form validation, counters
===================================================== */
(function () {
  'use strict';

  /* ---------- Scroll reveal (fade-up) ---------- */
  var animatedEls = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window && animatedEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = el.getAttribute('data-delay') || 0;
          setTimeout(function () {
            el.classList.add('is-visible');
          }, parseInt(delay, 10));
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    animatedEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Bootstrap-style client-side validation ---------- */
  // var form = document.getElementById('avidraContactForm');
  // if (form) {
  //   form.addEventListener('submit', function (event) {
  //     if (!form.checkValidity()) {
  //       event.preventDefault();
  //       event.stopPropagation();
  //     } else {
  //       event.preventDefault();
  //       var submitBtn = form.querySelector('button[type="submit"]');
  //       var originalHtml = submitBtn.innerHTML;
  //       submitBtn.disabled = true;
  //       submitBtn.innerHTML = '<i class="bi bi-check2-circle"></i> Brief Sent — We\'ll Be in Touch';
  //       setTimeout(function () {
  //         submitBtn.disabled = false;
  //         submitBtn.innerHTML = originalHtml;
  //         form.reset();
  //         form.classList.remove('was-validated');
  //       }, 3200);
  //     }
  //     form.classList.add('was-validated');
  //   }, false);
  // }

  /* ---------- Success metrics counter animation ---------- */
  var counters = document.querySelectorAll('.metric-number');
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  } else {
    counters.forEach(function (el) { animateCounter(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

})();
