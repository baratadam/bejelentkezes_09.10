document.addEventListener("DOMContentLoaded", () => {
  const loginFormDiv = document.getElementById("loginForm");
  const registerFormDiv = document.getElementById("registerForm");

  const loginError = document.getElementById("loginError");
  const registerError = document.getElementById("registerError");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  document.getElementById("showRegister").addEventListener("click", (e) => {
    e.preventDefault();
    loginFormDiv.classList.add("hidden");
    registerFormDiv.classList.remove("hidden");
    loginError.textContent = "";
  });

  document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();
    registerFormDiv.classList.add("hidden");
    loginFormDiv.classList.remove("hidden");
    registerError.textContent = "";
  });

  loginFormDiv.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!validateEmail(email)) {
      loginError.textContent = "Hibás email formátum!";
      return;
    }

    if (password.length < 6) {
      loginError.textContent =
        "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
      return;
    }

    loginError.textContent = "";

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        alert(`Sikeres bejelentkezés! Üdv, ${user.email}!`);
      } else {
        const error = await response.json();
        loginError.textContent = error.message;
      }
    } catch (err) {
      loginError.textContent = "Hiba történt a bejelentkezés során!";
    }
  });

  registerFormDiv.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const password2 = document.getElementById("regPassword2").value.trim();

    if (!validateEmail(email)) {
      registerError.textContent = "Hibás email formátum!";
      return;
    }

    if (password.length < 6) {
      registerError.textContent =
        "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
      return;
    }

    if (password !== password2) {
      registerError.textContent = "A jelszavak nem egyeznek!";
      return;
    }

    registerError.textContent = "";

    try {
      const response = await fetch("/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Sikeres regisztráció! Most már bejelentkezhetsz.");
        document.getElementById("showLogin").click();
      } else {
        const error = await response.json();
        registerError.textContent = error.message;
      }
    } catch (err) {
      registerError.textContent = "Hiba történt a regisztráció során!";
    }
  });
});