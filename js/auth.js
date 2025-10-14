// auth.js — controle de login e cadastro com localStorage

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // Função para salvar novo usuário
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = signupForm.nome.value.trim();
      const email = signupForm.email.value.trim();
      const senha = signupForm.senha.value.trim();

      if (!nome || !email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      const users = JSON.parse(localStorage.getItem('usuarios')) || [];

      // Verifica se o e-mail já existe
      if (users.find(u => u.email === email)) {
        alert('Este e-mail já está cadastrado!');
        return;
      }

      users.push({ nome, email, senha });
      localStorage.setItem('usuarios', JSON.stringify(users));

      alert('Conta criada com sucesso! Agora faça login.');
      window.location.href = "login.html";
    });
  }

  // Função de login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const senha = loginForm.senha.value.trim();

      const users = JSON.parse(localStorage.getItem('usuarios')) || [];
      const user = users.find(u => u.email === email && u.senha === senha);

      if (user) {
        alert(`Bem-vindo(a), ${user.nome}!`);
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        window.location.href = "dashboard-pais.html";
      } else {
        alert('E-mail ou senha incorretos!');
      }
    });
  }
});
