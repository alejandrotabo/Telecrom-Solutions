// MODELO: contiene los datos del dashboard y las operaciones que los modifican.
// Cuando exista backend, estas funciones serán el lugar natural para llamar a la API.
const STORAGE_KEY = 'telecromDashboard';

const catalog = [
  { id: 'leadflow', icon: '⚡', name: 'LeadFlow n8n', category: 'automation', label: 'Automatización', description: 'Captura, clasifica y asigna leads sin trabajo manual.', price: 290, saving: 12.4 },
  { id: 'shield', icon: '◉', name: 'Shield Monitor', category: 'security', label: 'Seguridad', description: 'Alertas inteligentes para mantener tu operación protegida.', price: 180, saving: 4.1 },
  { id: 'pulse', icon: '◈', name: 'Pulse Reports', category: 'growth', label: 'Crecimiento', description: 'Reportes automáticos para tomar decisiones con contexto.', price: 120, saving: 2.0 },
  { id: 'inbox', icon: '✦', name: 'Inbox Copilot', category: 'automation', label: 'Automatización', description: 'Ordena consultas y responde lo importante a tiempo.', price: 210, saving: 7.5 }
];

// Lee la cuenta creada en el registro y recupera los cambios de esta demo.
function readState() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get('name') || 'cliente';
  const accounts = JSON.parse(localStorage.getItem('telecromAccounts') || '[]');
  const account = accounts.find(item => item.name === name) || accounts[0] || { name, email: 'cliente@telecrom.com', company: '' };
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  return {
    role: params.get('role') || 'client',
    account: { name: account.name || name, email: account.email || '', company: account.company || '' },
    products: saved?.products || ['leadflow', 'shield'],
    aliases: saved?.aliases || {},
    metrics: saved?.metrics || { runs: 248 },
    catalog
  };
}

class DashboardModel {
  constructor() { this.state = readState(); }
  get isAdmin() { return this.state.role === 'admin'; }
  get ownedProducts() { return this.state.products.map(id => this.state.catalog.find(product => product.id === id)).filter(Boolean); }
  getProductName(product) { return this.state.aliases[product.id] || product.name; }
  // Persistencia temporal del prototipo. En producción debe reemplazarse por el controlador PHP.
  save() { localStorage.setItem(STORAGE_KEY, JSON.stringify({ products: this.state.products, aliases: this.state.aliases, metrics: this.state.metrics })); }
  renameProduct(id, name) { const cleanName = name.trim(); if (!cleanName) return false; this.state.aliases[id] = cleanName; this.save(); return true; }
  acquireProduct(id) { if (this.state.products.includes(id)) return false; this.state.products.push(id); this.save(); return true; }
  updateAccount(data) { this.state.account = { ...this.state.account, ...data }; this.save(); return this.state.account; }
  updatePassword(password) { this.state.password = password; this.save(); }
}

// Namespace global para que el prototipo funcione tambien con file://.
// Un backend en PHP, Python o Node puede reemplazar esta implementacion sin tocar la vista.
window.TeleCromDashboardModel = DashboardModel;
