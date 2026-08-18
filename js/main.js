/* ============================================================
   Mauldin Village — shared interactions
   - Mobile nav toggle
   - Contact form validation + confirmation
   - Gallery lightbox (works with placeholder tiles now,
     real photos later)
   - Footer year
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile nav ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav__links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Contact form ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var success = document.querySelector("#form-success");
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setInvalid(field, invalid) {
      var wrap = field.closest(".field");
      if (wrap) wrap.classList.toggle("invalid", invalid);
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var valid = true;

      var name = form.querySelector("#name");
      var email = form.querySelector("#email");
      var message = form.querySelector("#message");

      if (!name.value.trim()) { setInvalid(name, true); valid = false; } else setInvalid(name, false);
      if (!emailRe.test(email.value.trim())) { setInvalid(email, true); valid = false; } else setInvalid(email, false);
      if (!message.value.trim()) { setInvalid(message, true); valid = false; } else setInvalid(message, false);

      if (!valid) return;

      // Front-end only — swap in the Jotform/backend endpoint when ready.
      form.reset();
      if (success) {
        success.classList.add("show");
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    form.querySelectorAll("input, textarea, select").forEach(function (el) {
      el.addEventListener("input", function () { setInvalid(el, false); });
    });
  }

  /* ---------- Gallery lightbox ---------- */
  var lightbox = document.querySelector("#lightbox");
  if (lightbox) {
    var lbContent = lightbox.querySelector(".lightbox__content");
    var lbCaption = lightbox.querySelector(".lightbox__caption");
    var lbClose = lightbox.querySelector(".lightbox__close");

    function openLightbox(markup, caption) {
      lbContent.innerHTML = markup;
      lbCaption.textContent = caption || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox() {
      lightbox.classList.remove("open");
      lbContent.innerHTML = "";
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () {
        var media = item.querySelector("img, svg, .ph");
        openLightbox(media ? media.outerHTML : "", item.getAttribute("data-caption"));
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.querySelector("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
