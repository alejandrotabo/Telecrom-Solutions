// CONTROLADOR: conecta los eventos de la página con el modelo y la vista.
// El flujo es: usuario hace clic -> controlador modifica modelo -> vista se actualiza.
const model = new window.TeleCromDashboardModel();
const view = new window.TeleCromDashboardView(model);
let storeFilter = 'all';

// Cambia de pestaña sin recargar la página y renderiza el panel solicitado.
function showView(viewName) {
  document.querySelectorAll('[data-dashboard-view]').forEach(button => { const active = button.dataset.dashboardView === viewName; button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active)); });
  document.querySelectorAll('[data-dashboard-panel]').forEach(panel => { panel.hidden = panel.dataset.dashboardPanel !== viewName; });
  if (viewName === 'products') view.renderProducts();
  if (viewName === 'store') view.renderStore(storeFilter);
  if (viewName === 'analytics') view.renderAnalytics();
  if (viewName === 'account') view.renderAccount();
}

// Actualiza los indicadores pequeños que aparecen en el resumen.
function refreshOverview() {
  const products = model.ownedProducts;
  document.getElementById('active-projects').textContent = String(products.length).padStart(2, '0');
  document.getElementById('open-requests').textContent = '03';
  const list = document.getElementById('client-projects');
  if (list) list.innerHTML = products.map(product => `<div class="project-row"><span class="project-icon">${product.icon}</span><div><strong>${model.getProductName(product)}</strong><small>${product.label}</small></div><span class="status-chip status-progress">Activo</span></div>`).join('');
}

// Todos los clics y formularios del dashboard pasan por este controlador.
function bindEvents() {
  document.addEventListener('click', event => {
    const navButton = event.target.closest('[data-dashboard-view]');
    const openButton = event.target.closest('[data-open-view]');
    const dashboardHome = event.target.closest('[data-dashboard-home]');
    const buyButton = event.target.closest('[data-buy-product]');
    const renameButton = event.target.closest('[data-rename-product]');
    const filterButton = event.target.closest('[data-store-filter]');
    if (navButton) showView(navButton.dataset.dashboardView);
    if (openButton) showView(openButton.dataset.openView);
    if (dashboardHome) {
      event.preventDefault();
      showView('overview');
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#overview`);
    }
    if (filterButton) { storeFilter = filterButton.dataset.storeFilter; view.renderStore(storeFilter); }
    if (buyButton) { if (model.acquireProduct(buyButton.dataset.buyProduct)) { refreshOverview(); view.renderStore(storeFilter); showView('products'); } }
    if (renameButton) { const product = model.state.catalog.find(item => item.id === renameButton.dataset.renameProduct); const name = window.prompt('Nuevo nombre para el producto:', model.getProductName(product)); if (name && model.renameProduct(product.id, name)) { view.renderProducts(); refreshOverview(); } }
  });
  document.addEventListener('submit', event => {
    if (event.target.id === 'profile-form') { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); model.updateAccount(data); document.getElementById('profile-feedback').textContent = 'Cambios guardados'; document.getElementById('dashboard-title').textContent = `Hola, ${data.name}.`; }
    if (event.target.id === 'password-form') { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); const feedback = document.getElementById('password-feedback'); if (data.next !== data.confirm) { feedback.textContent = 'Las contraseñas no coinciden'; return; } model.updatePassword(data.next); event.target.reset(); feedback.textContent = 'Contraseña actualizada'; }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const isAdmin = model.isAdmin;
  document.body.classList.toggle('dashboard-admin', isAdmin);
  document.getElementById('dashboard-role-badge').textContent = isAdmin ? 'Administrador' : 'Cliente';
  document.getElementById('dashboard-eyebrow').textContent = isAdmin ? 'Portal Administrador' : 'Portal Cliente';
  document.getElementById('dashboard-title').textContent = isAdmin ? 'Hola, equipo TeleCrom.' : `Hola, ${model.state.account.name}.`;
  document.querySelectorAll('.admin-only').forEach(element => { element.hidden = !isAdmin; });
  refreshOverview();
  view.renderProducts();
  view.renderStore();
  view.renderAnalytics();
  view.renderAccount();
  bindEvents();
});
