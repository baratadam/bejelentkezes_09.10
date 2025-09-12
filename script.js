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
  });

  
  document.getElementById("showLogin").addEventListener("click", (e) => {
    e.preventDefault();
    registerFormDiv.classList.add("hidden");
    loginFormDiv.classList.remove("hidden");
  });


});