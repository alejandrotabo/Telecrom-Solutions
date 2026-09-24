document.addEventListener('DOMContentLoaded', () => {
  const roleInput = document.getElementById('login-role');
  const roleOptions = document.querySelectorAll('.role-option');
  const form = document.querySelector('.login-form');
  const error = document.getElementById('login-error');
  const accountStorageKey = 'telecromAccounts';

  if (new URLSearchParams(window.location.search).get('registered') === '1') {
    error.textContent = 'Cuenta creada. Ya puedes iniciar sesión.';
    error.classList.add('show', 'success-message');
  }

  roleOptions.forEach(option => {
    option.addEventListener('click', () => {
      roleInput.value = option.dataset.role;
      roleOptions.forEach(item => item.classList.toggle('active', item === option));
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const accounts = JSON.parse(localStorage.getItem(accountStorageKey) || '[]');
    const account = accounts.find(item => item.email === email && item.password === password);

    if (!account) {
      error.textContent = 'Correo o contraseña incorrectos. Si no tienes cuenta, regístrate primero.';
      error.classList.remove('success-message');
      error.classList.add('show');
      return;
    }

    // La cuenta, no el selector visual, determina si es cliente o administrador.
    if (account.role !== roleInput.value) {
      error.textContent = account.role === 'admin'
        ? 'Selecciona Administrador para entrar con esta cuenta.'
        : 'Esta cuenta tiene acceso de cliente. Selecciona Cliente para continuar.';
      error.classList.remove('success-message');
      error.classList.add('show');
      return;
    }

    window.location.href = `dashboard.html?role=${encodeURIComponent(account.role)}&name=${encodeURIComponent(account.name)}`;
  });
});
