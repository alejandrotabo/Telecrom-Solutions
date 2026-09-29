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

  // Sembrar cuentas demo si no existen aún en localStorage
  let accounts = JSON.parse(localStorage.getItem(accountStorageKey) || '[]');
  if (!accounts.length) {
    accounts = [
      { name: 'Alejandro Taborda', email: 'cliente@telecrom.com', password: '123', role: 'client', company: 'TeleCrom Client' },
      { name: 'Administrador TeleCrom', email: 'admin@telecrom.com', password: '123', role: 'admin', company: 'TeleCrom Solutions' }
    ];
    localStorage.setItem(accountStorageKey, JSON.stringify(accounts));
  }

  function setRole(role) {
    roleInput.value = role;
    roleOptions.forEach(item => item.classList.toggle('active', item.dataset.role === role));
  }

  roleOptions.forEach(option => {
    option.addEventListener('click', () => setRole(option.dataset.role));
  });

  // Botones de demostración rápida
  const btnDemoClient = document.getElementById('btn-demo-client');
  const btnDemoAdmin  = document.getElementById('btn-demo-admin');
  const emailInput    = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');

  if (btnDemoClient) {
    btnDemoClient.addEventListener('click', () => {
      setRole('client');
      emailInput.value = 'cliente@telecrom.com';
      passwordInput.value = '123';
      error.textContent = 'Credenciales demo cargadas (Cliente). Presiona Entrar o haz submit.';
      error.classList.add('show', 'success-message');
    });
  }

  if (btnDemoAdmin) {
    btnDemoAdmin.addEventListener('click', () => {
      setRole('admin');
      emailInput.value = 'admin@telecrom.com';
      passwordInput.value = '123';
      error.textContent = 'Credenciales demo cargadas (Admin). Presiona Entrar o haz submit.';
      error.classList.add('show', 'success-message');
    });
  }

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
