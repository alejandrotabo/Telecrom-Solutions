document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.register-form');
  const password = document.getElementById('register-password');
  const confirmation = document.getElementById('register-password-confirm');
  const error = document.getElementById('register-error');
  const accountStorageKey = 'telecromAccounts';

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (password.value !== confirmation.value) {
      error.textContent = 'Las contraseñas no coinciden.';
      error.classList.add('show');
      confirmation.focus();
      return;
    }

    const email = document.getElementById('register-email').value.trim().toLowerCase();
    const accounts = JSON.parse(localStorage.getItem(accountStorageKey) || '[]');

    if (accounts.some(account => account.email === email)) {
      error.textContent = 'Ya existe una cuenta con este correo.';
      error.classList.add('show');
      document.getElementById('register-email').focus();
      return;
    }

    // El registro publico siempre crea clientes. Los administradores los crea el backend.
    accounts.push({
      name: document.getElementById('register-name').value.trim(),
      phone: document.getElementById('register-phone').value.trim(),
      company: document.getElementById('register-company').value.trim(),
      email,
      password: password.value,
      role: 'client'
    });
    localStorage.setItem(accountStorageKey, JSON.stringify(accounts));
    window.location.href = 'login.html?registered=1';
    error.classList.remove('show');
  });
});
