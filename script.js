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

  loginFormDiv.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!validateEmail(email)) {
      loginError.textContent = "Hibás email formátum!";
      return;
    }

    if (password.length < 6) {
      loginError.textContent = "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
      return;
    }
    loginError.textContent = "";
    alert("Sikeres bejelentkezés!");
  });

  registerFormDiv.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("regEmail").value.trim();
    const pass1 = document.getElementById("regPassword").value.trim();
    const pass2 = document.getElementById("regPassword2").value.trim();

    if (!validateEmail(email)) {
      registerError.textContent = "Hibás email formátum!";
      return;
    }

    if (pass1.length < 6) {
      registerError.textContent = "A jelszónak legalább 6 karakter hosszúnak kell lennie!";
      return;
    }

    if (pass1 !== pass2) {
      registerError.textContent = "A két jelszó nem egyezik!";
      return;
    }

    registerError.textContent = "";
    alert("Sikeres regisztráció!");
  });
});