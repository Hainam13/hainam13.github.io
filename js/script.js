// Wait for DOM to load
document.addEventListener("DOMContentLoaded", function () {
  // Function to toggle password visibility
  window.togglePassword = function(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = passwordInput.nextElementSibling;
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleButton.innerHTML = `
        <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      `;
    } else {
      passwordInput.type = "password";
      toggleButton.innerHTML = `
        <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      `;
    }
  };

  // Login form handler
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const message = document.getElementById("loginMessage");

      const correctEmail = "user@example.com";
      const correctPassword = "123456";

      if (!email || !password) {
        message.style.color = "red";
        message.textContent = "Vui lòng nhập đầy đủ thông tin.";
        return;
      }

      if (email === correctEmail && password === correctPassword) {
        message.style.color = "green";
        message.textContent = "✅ Đăng nhập thành công!";
        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        message.style.color = "red";
        message.textContent = "❌ Sai email hoặc mật khẩu!";
      }
    });
  }

  // Register form handler
  const registerForm = document.querySelector("#registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const fullname = document.getElementById("fullname");
      const email = document.getElementById("email");
      const password = document.getElementById("password");
      const confirm = document.getElementById("confirmPassword");
      const msg = document.getElementById("registerMessage");

      if (
        fullname.value.trim() === "" ||
        email.value.trim() === "" ||
        password.value.trim() === "" ||
        confirm.value.trim() === ""
      ) {
        msg.style.color = "red";
        msg.textContent = "Vui lòng điền đầy đủ thông tin.";
        return;
      }

      if (!validateEmail(email.value)) {
        msg.style.color = "red";
        msg.textContent = "Email không hợp lệ.";
        return;
      }

      if (password.value.length < 6) {
        msg.style.color = "red";
        msg.textContent = "Mật khẩu phải có ít nhất 6 ký tự.";
        return;
      }

      if (password.value !== confirm.value) {
        msg.style.color = "red";
        msg.textContent = "❌ Mật khẩu không khớp!";
        return;
      }

      // Save user info to localStorage
      const user = { fullname: fullname.value, email: email.value, password: password.value };
      localStorage.setItem("user", JSON.stringify(user));

      msg.style.color = "green";
      msg.textContent = "✅ Đăng ký thành công! Hãy đăng nhập.";
    });
  }

  // Contact form handler
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      if (
        name.value.trim() === "" ||
        email.value.trim() === "" ||
        message.value.trim() === ""
      ) {
        alert("Vui lòng điền đầy đủ thông tin liên hệ.");
        return;
      }

      if (!validateEmail(email.value)) {
        alert("Email không hợp lệ.");
        return;
      }

      alert("Cảm ơn bạn đã gửi tin nhắn! Chúng tôi sẽ phản hồi sớm.");
      contactForm.reset();
    });
  }

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
