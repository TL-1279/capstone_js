const login = () => {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const user = document.getElementById("username").value;
      const pass = document.getElementById("password").value;

        alert("Đăng nhập thành công!");
        window.location.href = "index.html"; // Chuyển về trang chính
      
    });
  };
  
login();
  