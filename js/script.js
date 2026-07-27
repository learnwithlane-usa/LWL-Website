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
  var hiddenFrame = document.getElementById("hidden_iframe");

  if (introForm && hiddenFrame) {
    var justSubmitted = false;

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

      // Real submission: POSTs into the hidden iframe (no page navigation).
      // Once the iframe finishes loading the response, send the visitor on
      // to the classroom instead of showing an on-page thank-you.
      justSubmitted = true;
    });

    // The iframe fires a "load" event once on initial blank load, and again
    // after the form POST completes. Only redirect on the post-submit load.
    hiddenFrame.addEventListener("load", function () {
      if (justSubmitted) {
        window.location.href = "https://learnwithlane.com/classroom";
      }
    });
  }
})();
