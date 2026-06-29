/* =========================================================
   Learn With Lane — Site scripts
   Vanilla JS, no dependencies
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close menu when a link is tapped (mobile)
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var answer = item.querySelector(".faq__a");
      var isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ---------- Newsletter form (graceful client-side handling) ----------
     If you wire the form to a real MailChimp embed action, the browser will
     submit normally. While the action is the placeholder "#", we intercept
     and show a friendly message instead of navigating away. */
  var news = document.querySelector("[data-newsletter]");
  if (news) {
    news.addEventListener("submit", function (e) {
      var action = news.getAttribute("action") || "";
      if (action === "" || action === "#" || action.indexOf("PASTE_YOUR") !== -1) {
        e.preventDefault();
        var note = news.parentElement.querySelector(".form-note");
        if (note) {
          note.textContent = "Thanks! Newsletter sign-up isn't connected yet — check back soon.";
        }
      }
      // Otherwise: let the form post to MailChimp normally.
    });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }
})();
