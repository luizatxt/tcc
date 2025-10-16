// auth.js — autenticação simples usando localStorage

document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  // Cadastro
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = signupForm.nome.value.trim();
      const email = signupForm.email.value.trim().toLowerCase();
      const senha = signupForm.senha.value;

      if (!nome || !email || !senha) {
        alert('Preencha todos os campos.');
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      if (usuarios.find(u => u.email === email)) {
        alert('E-mail já cadastrado. Faça login ou use outro e-mail.');
        return;
      }

      usuarios.push({ nome, email, senha });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      alert('Conta criada com sucesso!');
      window.location.href = 'login.html';
    });
  }

  // Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = loginForm.email.value.trim().toLowerCase();
      const senha = loginForm.senha.value;

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const user = usuarios.find(u => u.email === email && u.senha === senha);

      if (user) {
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        // redireciona para painel dos pais
        window.location.href = 'dashboard-pais.html';
      } else {
        alert('E-mail ou senha incorretos.');
      }
    });
  }
});

// Função utilitária para proteger páginas (adicionar onload="verificarLogin()" no body)
function verificarLogin() {
  const user = JSON.parse(localStorage.getItem('usuarioLogado'));
  if (!user) {
    window.location.href = 'login.html';
  }
}
// logout simples
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = 'index.html';
}
