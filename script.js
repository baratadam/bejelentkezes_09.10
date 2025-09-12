document.addEventListener("DOMContentLoaded", () => {
  const loginFormDiv = document.getElementById("loginForm");
  const registerFormDiv = document.getElementById("registerForm");

  const loginError = document.getElementById("loginError");
  const registerError = document.getElementById("registerError");

  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

document.getElementById("showRegister").addEventListener("click", (e) => {
    e.preventDefault();
    loginFormDiv.classList.add("hidden");
    registerFormDiv.classList.remove("hidden");
  });

  document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();
    registerFormDiv.classList.add("hidden");
    loginFormDiv.classList.remove("hidden");
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