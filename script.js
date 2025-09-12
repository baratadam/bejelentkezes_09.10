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