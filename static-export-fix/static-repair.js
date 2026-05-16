(function () {
  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  ready(function () {
    document.querySelectorAll(".frm-fluent-form").forEach(function (form) {
      form.classList.remove("ff-form-loading");
      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var required = form.querySelectorAll("[aria-required='true'], [required]");
        var hasMissing = Array.prototype.some.call(required, function (field) {
          return !String(field.value || "").trim();
        });

        var message = form.parentElement.querySelector(".ff-static-message");
        if (!message) {
          message = document.createElement("p");
          message.className = "ff-static-message";
          form.parentElement.appendChild(message);
        }

        if (hasMissing) {
          message.classList.add("is-error");
          message.textContent = "Molimo ispunite obavezna polja.";
          return;
        }

        var firstName = form.querySelector("[name='names[first_name]']");
        var lastName = form.querySelector("[name='names[last_name]']");
        var email = form.querySelector("[name='email']");
        var text = form.querySelector("[name='message']");
        var body = [
          "Ime: " + (firstName ? firstName.value : ""),
          "Prezime: " + (lastName ? lastName.value : ""),
          "E-mail: " + (email ? email.value : ""),
          "",
          text ? text.value : ""
        ].join("\n");

        message.classList.remove("is-error");
        message.textContent = "Otvara se e-mail poruka za slanje upita.";
        window.location.href = "mailto:mirela.roso@yahoo.com?subject=Novi%20upit%20s%20web%20stranice&body=" + encodeURIComponent(body);
      });
    });
  });
})();
