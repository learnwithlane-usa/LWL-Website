/* =========================================================
   Learn with Lane — Site scripts
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

  /* ---------- FAQ collapsible text ---------- */
  document.querySelectorAll(".faq__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq__item");
      var answer = item.querySelector(".faq__a");
      var isOpen = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ---------- New Student Introduction form ---------- */
  var introForm = document.getElementById("introForm");

  if (introForm) {
    introForm.addEventListener("submit", function (e) {
      var action = introForm.getAttribute("action") || "";

      if (action.indexOf("REPLACE_WITH_") !== -1) {
        e.preventDefault();
        var warning = document.createElement("p");
        warning.className = "form-help";
        warning.style.color = "#d93025";
        warning.textContent =
          "This form isn't connected yet. Please email david@learnwithlane.com directly with your student's details for now.";
        introForm.parentNode.insertBefore(warning, introForm);
        return;
      }

      // Submit as a background beacon (not a hidden iframe — many browsers
      // and ad/tracking blockers silently swallow hidden cross-site iframe
      // posts). sendBeacon is the standard, purpose-built API for "fire a
      // POST, then leave the page" and survives the navigation below.
      e.preventDefault();

      var params = new URLSearchParams(new FormData(introForm));
      var body = params.toString();

      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          action,
          new Blob([body], { type: "application/x-www-form-urlencoded" })
        );
      } else if (window.fetch) {
        fetch(action, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body,
          keepalive: true,
        }).catch(function () {
          /* Response is opaque in no-cors mode; nothing to read either way. */
        });
      }

      window.location.href = "https://learnwithlane.com/classroom";
    });
  }
})();
