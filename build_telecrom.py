"""
build_telecrom.py
Tareas:
  T2 - Actualiza contenido del home con info real de los docs
  T3 - Crea portfolio.html con las 9 cards
  T4 - Deja solo 6 cards en home + botón Ver más
  T5 - Crea el redirect telecrom-website/portfolio.html
"""

# ─── helpers ──────────────────────────────────────────────────────────────────

def read(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'  [OK] {path}')

# ─── paths ────────────────────────────────────────────────────────────────────

HOME   = 'telecrom-website/app/views/home.html'
PORT_V = 'telecrom-website/app/views/portfolio.html'
PORT_R = 'telecrom-website/portfolio.html'

# ══════════════════════════════════════════════════════════════════════════════
# T2 — Actualizar contenido del home con info real de los docs
# ══════════════════════════════════════════════════════════════════════════════
print('\n[T2] Actualizando contenido del home...')
home = read(HOME)

# -- <title> y meta description
home = home.replace(
    '<title>TeleCrom Solutions — Automatización Inteligente con n8n</title>',
    '<title>TeleCrom Solutions — Automatización, Web, Ciberseguridad y Branding</title>'
)
home = home.replace(
    '<meta name="description" content="TeleCrom Solutions ofrece automatización empresarial con n8n. Prototipos funcionales, paquetes listos y soluciones personalizadas para tu negocio.">',
    '<meta name="description" content="TeleCrom Solutions ayuda a pequeños y medianos negocios a crecer con automatizaciones inteligentes, desarrollo web, ciberseguridad y branding. Empresa familiar, calidad técnica real.">'
)
home = home.replace(
    '<meta name="keywords" content="automatización, n8n, workflows, TeleCrom, soluciones empresariales, integración, bots">',
    '<meta name="keywords" content="automatización, n8n, workflows, TeleCrom, desarrollo web, ciberseguridad, branding, soluciones digitales, pymes Colombia">'
)

# -- HERO: título y subtítulo
home = home.replace(
    '''      <h1>
        Tecnología <span class="highlight">inteligente</span> para hacer crecer tu negocio
      </h1>

      <p class="hero-subtitle">
        Creamos automatizaciones, páginas web, estrategias de ciberseguridad y marcas que convierten ideas en negocios preparados para crecer.
      </p>''',
    '''      <h1>
        Recupera tu tiempo,<br><span class="highlight">automatiza</span> tu negocio
      </h1>

      <p class="hero-subtitle">
        Ayudamos a pequeños y medianos negocios a eliminar tareas repetitivas, crecer en digital y operar con más confianza — con cercanía familiar y calidad técnica real.
      </p>'''
)

# -- ABOUT: texto principal
home = home.replace(
    '''          <div class="section-label">Sobre Nosotros</div>
          <h2>Somos <span class="text-accent">TeleCrom</span> Solutions</h2>
          <p>
            TeleCrom nació en familia, a partir de una pregunta sencilla: ¿cómo puede la tecnología devolverle tiempo a las personas que sostienen un negocio todos los días?
          </p>
          <p>
            Hoy convertimos esa inquietud en automatizaciones, sitios web y soluciones digitales claras, pensadas para crecer junto a cada cliente.
          </p>''',
    '''          <div class="section-label">Sobre Nosotros</div>
          <h2>Somos <span class="text-accent">TeleCrom</span> Solutions</h2>
          <p>
            TeleCrom nació en familia. Las iniciales TC vienen de los apellidos Taborda Carmona — dos generaciones detrás de cada línea de código, cada automatización y cada marca que ayudamos a construir.
          </p>
          <p>
            Nuestra misión es simple: que un negocio que hoy pierde horas en tareas repetitivas, que no tiene presencia digital clara o que no sabe qué tan expuesto está al riesgo digital, tenga una alternativa cercana, honesta y técnicamente sólida — sin necesitar el presupuesto de una gran corporación.
          </p>'''
)

# -- ABOUT: features
home = home.replace(
    '''          <div class="about-feature reveal reveal-delay-1"><div class="feature-icon">⚡</div><h4>Rápido</h4><p>Construimos soluciones que pasan rápido de la idea a la acción.</p></div>
          <div class="about-feature reveal reveal-delay-2"><div class="feature-icon">🔒</div><h4>Seguro</h4><p>Protegemos la información y las decisiones importantes de tu negocio.</p></div>
          <div class="about-feature reveal reveal-delay-3"><div class="feature-icon">🔄</div><h4>Escalable</h4><p>Diseñamos sistemas que pueden crecer sin volverse difíciles de usar.</p></div>
          <div class="about-feature reveal reveal-delay-4"><div class="feature-icon">🤝</div><h4>Soporte 24/7</h4><p>Te acompañamos antes, durante y después de cada entrega.</p></div>''',
    '''          <div class="about-feature reveal reveal-delay-1"><div class="feature-icon">⚡</div><h4>Rápido y honesto</h4><p>Construimos rápido, pero probamos antes de entregar. Un sistema simple que funciona vale más que uno complejo que falla.</p></div>
          <div class="about-feature reveal reveal-delay-2"><div class="feature-icon">🔒</div><h4>Seguro por diseño</h4><p>La ciberseguridad no es un servicio aparte: es una forma de trabajar. Protegemos los datos de nuestros clientes como si fueran propios.</p></div>
          <div class="about-feature reveal reveal-delay-3"><div class="feature-icon">🔄</div><h4>Escalable sin dependencia</h4><p>Diseñamos sistemas que crecen con tu negocio, sin volverse difíciles de mantener ni depender exclusivamente de nosotros.</p></div>
          <div class="about-feature reveal reveal-delay-4"><div class="feature-icon">🤝</div><h4>Cercanía familiar</h4><p>Trato directo, disponibilidad real y una palabra que se cumple — antes que procesos fríos de call center.</p></div>'''
)

# -- SERVICES: textos reales
home = home.replace(
    '''          <p>Conectamos tus herramientas y convertimos tareas repetitivas en flujos medibles con n8n, APIs e IA.</p>''',
    '''          <p>Flujos de trabajo con n8n que eliminan tareas repetitivas: captura de leads, reportes automáticos, atención inicial y seguimiento de clientes sin intervención manual.</p>'''
)
home = home.replace(
    '''          <p>Diseñamos y construimos páginas web rápidas, claras y escalables para negocios pequeños y organizaciones grandes.</p>''',
    '''          <p>Sitios web rápidos, claros y pensados para convertir visitas en clientes. Desde la landing hasta el sistema completo, construido para crecer.</p>'''
)
home = home.replace(
    '''          <p>Evaluamos riesgos, protegemos tus activos digitales y definimos prácticas para operar con más confianza.</p>''',
    '''          <p>Auditorías, monitoreo y buenas prácticas para reducir el riesgo digital. Porque proteger tu negocio no debería ser un lujo.</p>'''
)
home = home.replace(
    '''          <p>Construimos identidades visuales con personalidad, coherencia y una presencia que tu audiencia puede recordar.</p>''',
    '''          <p>Identidad visual y de marca coherente, memorable y aplicable en cualquier canal — construida para que tu negocio se diferencie desde el primer vistazo.</p>'''
)

# Agregar servicio 5: Software a la medida
home = home.replace(
    '''        <article class="service-card reveal reveal-delay-4">
          <div class="service-number">04</div>
          <div class="service-icon">✦</div>
          <h3>Branding de marca</h3>
          <p>Identidad visual y de marca coherente, memorable y aplicable en cualquier canal — construida para que tu negocio se diferencie desde el primer vistazo.</p>
          <a href="#contact">Impulsar mi marca <span>→</span></a>
        </article>''',
    '''        <article class="service-card reveal reveal-delay-4">
          <div class="service-number">04</div>
          <div class="service-icon">✦</div>
          <h3>Branding de marca</h3>
          <p>Identidad visual y de marca coherente, memorable y aplicable en cualquier canal — construida para que tu negocio se diferencie desde el primer vistazo.</p>
          <a href="#contact">Impulsar mi marca <span>→</span></a>
        </article>
        <article class="service-card reveal reveal-delay-5">
          <div class="service-number">05</div>
          <div class="service-icon">🛠️</div>
          <h3>Software a la medida</h3>
          <p>Cuando una plantilla o automatización estándar no alcanza, desarrollamos la herramienta exacta que tu operación necesita.</p>
          <a href="#contact">Construir mi solución <span>→</span></a>
        </article>'''
)

# -- PACKAGES: texto real con precios reales
home = home.replace(
    '''        <!-- Package 1: Marketing -->
        <div class="package-card reveal reveal-delay-1">
          <div class="package-icon">📣</div>
          <div class="package-category">Esencial</div>
          <h3>Auto Marketing</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Automatiza tus campañas de email y redes sociales.</p>
          <ul class="package-features">
            <li>Envío automático de emails</li>
            <li>Publicación en redes sociales</li>
            <li>Seguimiento de leads</li>
            <li>Reportes automáticos</li>
          </ul>
          <div class="package-price">
            <span class="price-amount">$XXX</span>
            <span class="price-period">/ mes</span>
          </div>
          <a href="#contact" class="btn btn-secondary btn-sm package-cta">Solicitar Info</a>
        </div>''',
    '''        <!-- Package 1: Esencial -->
        <div class="package-card reveal reveal-delay-1">
          <div class="package-icon">⚡</div>
          <div class="package-category">Esencial</div>
          <h3>Plan Esencial</h3>
          <p>Para negocios que quieren automatizar sus primeros procesos y empezar a recuperar tiempo desde el primer mes.</p>
          <ul class="package-features">
            <li>1 automatización funcional</li>
            <li>Captura y calificación de leads</li>
            <li>Notificaciones automáticas</li>
            <li>Soporte y mantenimiento incluido</li>
          </ul>
          <div class="package-price">
            <span class="price-amount">$350K–$600K</span>
            <span class="price-period">COP / mes</span>
          </div>
          <a href="#contact" class="btn btn-secondary btn-sm package-cta">Solicitar Info</a>
        </div>'''
)

home = home.replace(
    '''        <!-- Package 2: Ventas (Featured) -->
        <div class="package-card featured reveal reveal-delay-2">
          <span class="package-badge">Profesional</span>
          <div class="package-icon">💰</div>
          <div class="package-category">Solido</div>
          <h3>Sales Automator</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Optimiza tu pipeline de ventas de principio a fin.</p>
          <ul class="package-features">
            <li>CRM automatizado</li>
            <li>Seguimiento de oportunidades</li>
            <li>Cotizaciones automáticas</li>
            <li>Integración con WhatsApp</li>
            <li>Dashboard de métricas</li>
          </ul>
          <div class="package-price">
            <span class="price-amount">$XXX</span>
            <span class="price-period">/ mes</span>
          </div>
          <a href="#contact" class="btn btn-primary btn-sm package-cta">Comenzar Ahora</a>
        </div>''',
    '''        <!-- Package 2: Profesional (Featured) -->
        <div class="package-card featured reveal reveal-delay-2">
          <span class="package-badge">Profesional</span>
          <div class="package-icon">🚀</div>
          <div class="package-category">Sólido</div>
          <h3>Plan Profesional</h3>
          <p>Para negocios en crecimiento que necesitan varias automatizaciones trabajando juntas como un sistema.</p>
          <ul class="package-features">
            <li>Hasta 3 automatizaciones activas</li>
            <li>Atención al cliente automatizada</li>
            <li>Reportes semanales con IA</li>
            <li>Integración con WhatsApp Business</li>
            <li>Soporte prioritario incluido</li>
          </ul>
          <div class="package-price">
            <span class="price-amount">$800K–$1.5M</span>
            <span class="price-period">COP / mes</span>
          </div>
          <a href="#contact" class="btn btn-primary btn-sm package-cta">Comenzar Ahora</a>
        </div>'''
)

home = home.replace(
    '''        <!-- Package 6: Custom -->
        <div class="package-card featured reveal reveal-delay-3">
          <span class="package-badge">Integral</span>
          <div class="package-icon">🛠️</div>
          <div class="package-category">Personalizado</div>
          <h3>Custom Flow</h3>
          <p>¿Necesitas algo único? Diseñamos la automatización perfecta para tu caso específico.</p>
          <ul class="package-features">
            <li>Análisis de requerimientos</li>
            <li>Diseño a medida</li>
            <li>Integraciones ilimitadas</li>
            <li>Soporte dedicado</li>
            <li>Capacitación incluida</li>
          </ul>
          <div class="package-price">
            <span class="price-amount">Cotizar</span>
          </div>
          <a href="#contact" class="btn btn-primary btn-sm package-cta">Solicitar Cotización</a>
        </div>''',
    '''        <!-- Package 3: Integral -->
        <div class="package-card featured reveal reveal-delay-3">
          <span class="package-badge">Integral</span>
          <div class="package-icon">🏆</div>
          <div class="package-category">Completo</div>
          <h3>Plan Integral</h3>
          <p>Para negocios que quieren transformar su operación digital con un ecosistema completo de automatización y soporte.</p>
          <ul class="package-features">
            <li>Automatizaciones ilimitadas</li>
            <li>Desarrollo web incluido</li>
            <li>Ciberseguridad básica</li>
            <li>Identidad de marca</li>
            <li>Soporte dedicado 24/7</li>
          </ul>
          <div class="package-price">
            <span class="price-amount">$1.8M–$3.5M</span>
            <span class="price-period">COP / mes</span>
          </div>
          <a href="#contact" class="btn btn-primary btn-sm package-cta">Solicitar Cotización</a>
        </div>'''
)

# -- CONTACT: placeholder info
home = home.replace(
    '                <p>+XX (XXX) XXX-XXXX</p>',
    '                <p>+57 312 345 6789</p>'
)
home = home.replace(
    '                <p>Lorem ipsum, Ciudad, País</p>',
    '                <p>Colombia — atención remota a toda Latinoamérica</p>'
)

# -- NAVBAR: cambiar link de portafolio para apuntar a portfolio.html
home = home.replace(
    '        <a href="#portfolio">Portafolio</a>',
    '        <a href="portfolio.html">Portafolio</a>'
)

write(HOME, home)
print('  [T2] Contenido del home actualizado.')


# ══════════════════════════════════════════════════════════════════════════════
# T4 — Dejar solo 6 cards en home + botón Ver más
# ══════════════════════════════════════════════════════════════════════════════
print('\n[T4] Recortando home a 6 cards...')
home = read(HOME)  # re-leer tras T2

# Las cards a ELIMINAR del home son items 4, 5, 6 (operaciones, data, marketing social)
items_to_remove = [
    # Item 4
    '''        <!-- Item 4 -->
        <div class="portfolio-item reveal reveal-delay-1" data-category="operaciones" data-tech="n8n, Google Sheets, Notion, Slack">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">📋</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">🔄</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">✅</div>
              </div>
            </div>
            <div class="portfolio-overlay">
              <span class="portfolio-overlay-btn">Ver Detalles</span>
            </div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Operaciones</span>
              <span class="portfolio-tag">Gestión</span>
            </div>
            <h3>Gestión de Proyectos Automatizada</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sincronización automática entre herramientas de gestión.</p>
          </div>
        </div>''',
    # Item 5
    '''        <!-- Item 5 -->
        <div class="portfolio-item reveal reveal-delay-2" data-category="data" data-tech="n8n, PostgreSQL, Google Analytics, API REST">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">🗄️</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">📈</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">📧</div>
              </div>
            </div>
            <div class="portfolio-overlay">
              <span class="portfolio-overlay-btn">Ver Detalles</span>
            </div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Data</span>
              <span class="portfolio-tag">Analytics</span>
            </div>
            <h3>Dashboard de Analytics en Tiempo Real</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pipeline de datos automatizado con reportes en tiempo real.</p>
          </div>
        </div>''',
    # Item 6
    '''        <!-- Item 6 -->
        <div class="portfolio-item reveal reveal-delay-3" data-category="marketing" data-tech="n8n, Instagram, Buffer, Canva API">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">📸</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">🎨</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">📱</div>
              </div>
            </div>
            <div class="portfolio-overlay">
              <span class="portfolio-overlay-btn">Ver Detalles</span>
            </div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Marketing</span>
              <span class="portfolio-tag">Social Media</span>
            </div>
            <h3>Social Media Autopilot</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Publicación y programación automática en redes sociales.</p>
          </div>
        </div>''',
]

for item in items_to_remove:
    if item in home:
        home = home.replace(item, '')
        print(f'  Eliminada card del home')
    else:
        print(f'  AVISO: no se encontró una card para eliminar')

# Agregar botón "Ver portafolio completo" justo antes del cierre de la sección
home = home.replace(
    '''      </div>
    </div>
  </section>

  <!-- ========== PROCESS ========== -->''',
    '''      </div>

      <div class="portfolio-more reveal" style="text-align:center; margin-top: 48px;">
        <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.95rem;">
          Estos son solo algunos de nuestros proyectos. Hay más esperándote.
        </p>
        <a href="portfolio.html" class="btn btn-secondary">
          Ver portafolio completo <span style="margin-left:6px;">→</span>
        </a>
      </div>
    </div>
  </section>

  <!-- ========== PROCESS ========== -->''',
    1  # solo la primera ocurrencia
)

write(HOME, home)
print('  [T4] Home recortado a 6 cards con botón Ver más.')


# ══════════════════════════════════════════════════════════════════════════════
# T3 — Crear portfolio.html completo con las 9 cards
# ══════════════════════════════════════════════════════════════════════════════
print('\n[T3] Creando portfolio.html...')

PORTFOLIO_HTML = '''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portafolio — TeleCrom Solutions</title>
  <meta name="description" content="Portafolio completo de TeleCrom Solutions: automatizaciones con n8n, prototipos web, diseño gráfico y más.">
  <link rel="icon" type="image/png" href="../../public/assets/Logo1.png">
  <link rel="stylesheet" href="../../public/css/styles.css?v=9">
</head>
<body>

  <!-- ========== NAVBAR ========== -->
  <nav class="navbar" id="navbar">
    <div class="container">
      <a href="home.html" class="navbar-brand">
        <img src="../../public/assets/Logo1.png" alt="TeleCrom Solutions Logo" id="nav-logo">
        <span>TELE<span class="brand-highlight">CROM</span></span>
      </a>
      <div class="navbar-links" id="nav-links">
        <a href="home.html#about">Nosotros</a>
        <a href="home.html#services">Servicios</a>
        <a href="home.html#packages">Soluciones</a>
        <a href="portfolio.html" class="nav-active">Portafolio</a>
        <a href="home.html#process">Proceso</a>
        <a href="home.html#contact" class="navbar-cta">
          <span class="btn btn-primary btn-sm">Contactar</span>
        </a>
      </div>
      <a class="nav-login" href="login.html">Iniciar sesión</a>
      <div class="menu-toggle" id="menu-toggle">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>

  <!-- ========== HERO PORTAFOLIO ========== -->
  <section class="portfolio-page-hero">
    <div class="container">
      <div class="portfolio-page-hero-content reveal">
        <span class="section-label">🖼️ Nuestro Trabajo</span>
        <h1>Portafolio</h1>
        <p>Automatizaciones funcionales, prototipos web y diseño gráfico — proyectos reales construidos con calidad técnica y cercanía.</p>
        <a href="home.html#contact" class="btn btn-primary" style="margin-top: 8px;">Cotizar mi proyecto</a>
      </div>
    </div>
  </section>

  <!-- ========== GRID PORTAFOLIO ========== -->
  <section class="section portfolio portfolio-page" id="portfolio">
    <div class="container">

      <div class="portfolio-filters reveal">
        <button class="filter-btn active" data-filter="all">Todos</button>
        <button class="filter-btn" data-filter="marketing">Marketing</button>
        <button class="filter-btn" data-filter="ventas">Ventas</button>
        <button class="filter-btn" data-filter="operaciones">Operaciones</button>
        <button class="filter-btn" data-filter="data">Data</button>
        <button class="filter-btn" data-filter="ai">AI / Bots</button>
        <button class="filter-btn filter-btn-diseno" data-filter="diseno">Diseño</button>
      </div>

      <div class="portfolio-grid">

        <!-- Item 1 -->
        <div class="portfolio-item reveal reveal-delay-1" data-category="marketing" data-tech="n8n, Gmail, Slack, Google Sheets"
             data-description="Workflow completo de email marketing con segmentación automática de audiencias, calificación de leads con IA (Gemini) y notificaciones en tiempo real al equipo comercial vía Slack.">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">📧</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">⚙️</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">📊</div>
              </div>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Marketing</span>
              <span class="portfolio-tag">Email</span>
            </div>
            <h3>Email Marketing Automatizado</h3>
            <p>Segmentación automática de leads, calificación con IA y notificaciones al equipo — sin intervención manual.</p>
          </div>
        </div>

        <!-- Item 2 -->
        <div class="portfolio-item reveal reveal-delay-2" data-category="ventas" data-tech="n8n, HubSpot, WhatsApp Business API, Stripe"
             data-description="Pipeline de ventas automatizado de punta a punta: desde la captura del lead hasta la firma del contrato. Seguimiento automático por WhatsApp, CRM sincronizado y cotizaciones generadas sin intervención del equipo.">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">💬</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">🔄</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">💰</div>
              </div>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Ventas</span>
              <span class="portfolio-tag">CRM</span>
            </div>
            <h3>Pipeline de Ventas Inteligente</h3>
            <p>Del lead a la venta cerrada sin intervención manual — CRM, WhatsApp y cotizaciones automáticas integrados.</p>
          </div>
        </div>

        <!-- Item 3 -->
        <div class="portfolio-item reveal reveal-delay-3" data-category="ai" data-tech="n8n, Gemini API, Telegram, Webhook"
             data-description="Bot de atención al cliente construido con n8n y Gemini API. Responde preguntas frecuentes, escala casos complejos al equipo y registra cada conversación automáticamente. Demo funcional en Telegram, versión de producción en WhatsApp Business.">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">🤖</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">🧠</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">💬</div>
              </div>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">AI</span>
              <span class="portfolio-tag">Chatbot</span>
            </div>
            <h3>Chatbot con IA Generativa</h3>
            <p>Atención al cliente automatizada con Gemini: responde, escala y registra cada conversación sin intervención.</p>
          </div>
        </div>

        <!-- Item 4 -->
        <div class="portfolio-item reveal reveal-delay-1" data-category="operaciones" data-tech="n8n, Google Sheets, Notion, Slack"
             data-description="Sincronización automática entre herramientas de gestión de proyectos. Crea tareas en Notion desde Google Sheets, notifica al equipo en Slack y actualiza el estado sin intervención manual.">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">📋</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">🔄</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">✅</div>
              </div>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Operaciones</span>
              <span class="portfolio-tag">Gestión</span>
            </div>
            <h3>Gestión de Proyectos Automatizada</h3>
            <p>Google Sheets, Notion y Slack sincronizados automáticamente — sin copiar y pegar entre herramientas.</p>
          </div>
        </div>

        <!-- Item 5 -->
        <div class="portfolio-item reveal reveal-delay-2" data-category="data" data-tech="n8n, PostgreSQL, Google Analytics, API REST"
             data-description="Pipeline de datos automatizado que consolida métricas de múltiples fuentes, genera un resumen ejecutivo con IA y lo envía al equipo cada lunes. Sin dashboards que nadie abre: la información llega directa al correo.">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">🗄️</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">📈</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">📧</div>
              </div>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Data</span>
              <span class="portfolio-tag">Analytics</span>
            </div>
            <h3>Reportes Automáticos con IA</h3>
            <p>Métricas de múltiples fuentes consolidadas y resumidas por IA — entregadas cada semana directo al correo.</p>
          </div>
        </div>

        <!-- Item 6 -->
        <div class="portfolio-item reveal reveal-delay-3" data-category="marketing" data-tech="n8n, Instagram API, Buffer, Gemini API"
             data-description="Publicación y programación automática en redes sociales. El contenido se toma de una hoja de cálculo, se genera la imagen con IA y se publica en el horario óptimo — sin abrir Buffer ni Instagram manualmente.">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content">
              <div class="workflow-visual">
                <div class="workflow-node node-trigger">📸</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-process">🎨</div>
                <div class="workflow-connector"></div>
                <div class="workflow-node node-output">📱</div>
              </div>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Marketing</span>
              <span class="portfolio-tag">Social Media</span>
            </div>
            <h3>Social Media Autopilot</h3>
            <p>De la hoja de cálculo a Instagram automáticamente — generación de imagen con IA y publicación en horario óptimo.</p>
          </div>
        </div>

        <!-- Item 7 — Proyecto Marvin: Gamembers -->
        <div class="portfolio-item portfolio-item--featured reveal reveal-delay-1"
             data-category="ai"
             data-tech="HTML, CSS, JavaScript, Bootstrap, PHP"
             data-live="../../proyecto-marvin/index.html"
             data-description="Plataforma web para aprender a ahorrar jugando. Incluye cuatro minijuegos de educación financiera (quiz, presupuesto, hábitos, gastos hormiga), registro de metas personales con progreso visual, ruleta de tokens y sistema de login. Construida con Bootstrap, JavaScript vanilla y PHP.">
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content portfolio-thumbnail-content--gamembers">
              <span class="gamembers-badge">Prototipo Web</span>
              <div class="gamembers-preview">
                <span class="gamembers-logo-text">GAME<span>MBERS</span></span>
                <div class="gamembers-icons">
                  <span>🎮</span><span>🪙</span><span>📈</span>
                </div>
              </div>
            </div>
            <div class="portfolio-overlay portfolio-overlay--telecom">
              <span class="portfolio-badge-live">● LIVE DEMO</span>
              <span class="portfolio-overlay-btn">Ver Demo</span>
            </div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Ahorro</span>
              <span class="portfolio-tag">Gamificación</span>
              <span class="portfolio-tag">Educación Financiera</span>
            </div>
            <h3>Gamembers — Ahorra Jugando</h3>
            <p>Plataforma web para aprender a ahorrar a través de juegos: quiz financiero, ruleta de tokens, metas de ahorro y más.</p>
          </div>
        </div>

        <!-- Item 8 — Diseño Gráfico: For My Reals -->
        <div class="portfolio-item portfolio-item--design reveal reveal-delay-2"
             data-category="diseno"
             data-tech="Photoshop, Illustrator, Diseño Publicitario"
             data-design="../../public/assets/diseno-grafico/for-my-reals.jpg"
             data-description="Flyer promocional para Sebas Dee Jay — pieza musical con identidad visual neón sobre fondo oscuro, tipografía script iluminada y composición fotográfica para redes sociales."
             data-points=\'[{"n": 1, "zona": "top-center", "label": "Tipografía principal", "desc": "For My Reals en script manual con efecto neón azul. Es el elemento de mayor jerarquía visual: tamaño, brillo y posición central garantizan que sea lo primero que el ojo lee."}, {"n": 2, "zona": "center", "label": "Sujeto fotográfico", "desc": "La figura del DJ ocupa el centro geométrico del flyer. La postura de manos hacia la cámara crea profundidad y dirige la atención hacia el nombre del artista."}, {"n": 3, "zona": "bottom-right", "label": "Identidad del artista", "desc": "Firma caligráfica de Sebas Dee Jay refuerza el branding personal del artista. Su tamaño secundario mantiene la jerarquía sin competir con el título principal."}, {"n": 4, "zona": "bottom-center", "label": "Información de contacto", "desc": "Bloque de datos (SoundCloud, Instagram, WhatsApp) en tipografía sans-serif clara. Posición inferior permite leerlo después de captar la atención con los elementos superiores."}, {"n": 5, "zona": "background", "label": "Paleta y atmósfera", "desc": "Fondo oscuro con destellos azul cyan crean profundidad. Los elementos geométricos laterales enmarcan la composición sin distraer del contenido principal."}]\'>
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content portfolio-thumbnail-content--image"
                 style="background-image: url(\'../../public/assets/diseno-grafico/for-my-reals.jpg\')">
              <span class="gamembers-badge">Diseño Gráfico</span>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Diseño Gráfico</span>
              <span class="portfolio-tag">Flyer Musical</span>
            </div>
            <h3>For My Reals — Sebas Dee Jay</h3>
            <p>Flyer promocional con tipografía neón, composición fotográfica y paleta azul para contenido musical en redes sociales.</p>
          </div>
        </div>

        <!-- Item 9 — Diseño Gráfico: Salsatón 3 -->
        <div class="portfolio-item portfolio-item--design reveal reveal-delay-3"
             data-category="diseno"
             data-tech="Photoshop, Illustrator, Diseño Publicitario"
             data-design="../../public/assets/diseno-grafico/salsaton-3.jpg"
             data-description="Flyer para el evento Salsatón en el Plan 3.0 — diseñado por Alejandro Taborda. Composición con múltiples artistas, tipografía cromada de gran escala, efectos de luz morada y detalle de logotipos de los artistas invitados."
             data-points=\'[{"n": 1, "zona": "top-center", "label": "Headline del evento", "desc": "Salsatón en el Plan 3.0 en tipografía cromada de gran escala domina la mitad inferior. El tamaño masivo y el acabado metálico lo hacen inconfundible desde el primer vistazo."}, {"n": 2, "zona": "top", "label": "Datos esenciales del evento", "desc": "Fecha (Octubre 03) y hora (Open 10PM) posicionados en la zona superior con alto contraste. Se leen antes que cualquier otro texto al seguir el flujo natural ojo-arriba."}, {"n": 3, "zona": "center", "label": "Composición de artistas", "desc": "Siete figuras organizadas en jerarquía piramidal: el artista principal al centro y más grande, los secundarios flanqueando en tamaño decreciente. Crea profundidad y comunica el lineup de un vistazo."}, {"n": 4, "zona": "bottom", "label": "Logos y sponsors", "desc": "Franja inferior con logos de artistas y marcas patrocinadoras. Tipografía uniforme y tamaño reducido los mantiene como información de soporte sin competir con el headline."}, {"n": 5, "zona": "background", "label": "Atmósfera cromática", "desc": "Fondo con graffiti desaturado e iluminación violeta lateral crea ambiente urbano. El desenfoque suave evita que compita con los elementos en primer plano."}]\'>
          <div class="portfolio-thumbnail">
            <div class="portfolio-thumbnail-content portfolio-thumbnail-content--image"
                 style="background-image: url(\'../../public/assets/diseno-grafico/salsaton-3.jpg\')">
              <span class="gamembers-badge">Diseño Gráfico</span>
            </div>
            <div class="portfolio-overlay"><span class="portfolio-overlay-btn">Ver Detalles</span></div>
          </div>
          <div class="portfolio-info">
            <div class="portfolio-tags">
              <span class="portfolio-tag">Diseño Publicitario</span>
              <span class="portfolio-tag">Evento</span>
            </div>
            <h3>Salsatón en el Plan 3.0</h3>
            <p>Flyer de evento con composición multipersona, tipografía cromada a gran escala y paleta violeta para evento de música y entretenimiento.</p>
          </div>
        </div>

      </div><!-- /portfolio-grid -->

      <div class="portfolio-cta-bar reveal" style="text-align:center; margin-top: 56px; padding: 40px 0 0; border-top: 1px solid var(--border-subtle);">
        <h3 style="color: var(--white-soft); margin-bottom: 10px;">¿Tienes un proyecto en mente?</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Cuéntanos qué necesitas — empezamos con una demo gratuita.</p>
        <a href="home.html#contact" class="btn btn-primary">Solicitar cotización</a>
      </div>

    </div>
  </section>

  <!-- ========== FOOTER MÍNIMO ========== -->
  <footer style="padding: 32px 0; background: var(--bg-secondary); border-top: 1px solid var(--border-subtle);">
    <div class="container" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
      <a href="home.html" class="navbar-brand" style="text-decoration:none;">
        <img src="../../public/assets/Logo1.png" alt="TeleCrom" style="height:28px;">
        <span style="font-weight:800; letter-spacing:0.05em;">TELE<span style="color:var(--accent);">CROM</span></span>
      </a>
      <p style="color: var(--text-muted); font-size: 0.8rem; margin:0;">© 2026 TeleCrom Solutions. Todos los derechos reservados.</p>
      <a href="home.html" class="btn btn-secondary btn-sm">← Volver al inicio</a>
    </div>
  </footer>

  <!-- ========== PORTFOLIO MODAL ========== -->
  <div class="modal-overlay" id="portfolio-modal">
    <div class="modal">
      <div class="modal-header">
        <h3>Detalle del Proyecto</h3>
        <button class="modal-close" aria-label="Cerrar">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-standard-content">
          <div class="modal-tags"></div>
          <p class="modal-description"></p>
          <h4 style="color: var(--white-soft); margin-bottom: 12px; font-family: var(--font-display);">Tecnologías utilizadas</h4>
          <div class="modal-tech"></div>
        </div>
        <div class="modal-live-content" hidden>
          <div class="modal-live-header">
            <div class="modal-tags"></div>
            <p class="modal-description"></p>
            <div class="modal-live-tech-row">
              <span class="modal-live-label">Stack:</span>
              <div class="modal-tech"></div>
            </div>
          </div>
          <div class="modal-live-preview">
            <div class="modal-live-bar">
              <span class="modal-live-dot"></span>
              <span class="modal-live-dot"></span>
              <span class="modal-live-dot"></span>
              <span class="modal-live-url" id="modal-live-url"></span>
              <span class="modal-live-badge">● LIVE PREVIEW</span>
            </div>
            <iframe id="modal-live-iframe" class="modal-live-iframe" src="" title="Demo en vivo" loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"></iframe>
          </div>
        </div>
        <div class="modal-design-content" hidden>
          <div class="modal-design-layout">
            <div class="modal-design-image-wrap">
              <img id="modal-design-img" class="modal-design-img" src="" alt="Vista del diseño" />
              <div id="modal-design-dots" class="modal-design-dots"></div>
            </div>
            <div class="modal-design-analysis">
              <div class="modal-design-meta">
                <div class="modal-tags"></div>
                <div class="modal-design-tools"></div>
              </div>
              <p class="modal-design-intro"></p>
              <ol class="modal-design-list" id="modal-design-list"></ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script src="../../app/models/about-model.js?v=3"></script>
  <script src="../../app/views/about-view.js?v=3"></script>
  <script src="../../app/controllers/portfolio-controller.js?v=1"></script>
</body>
</html>
'''

write(PORT_V, PORTFOLIO_HTML)
print('  [T3] portfolio.html creado.')


# ══════════════════════════════════════════════════════════════════════════════
# T5 — Redirect portfolio.html en raíz
# ══════════════════════════════════════════════════════════════════════════════
print('\n[T5] Creando redirect raíz...')
REDIRECT = '''<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0; url=app/views/portfolio.html">
  <link rel="icon" type="image/png" href="public/assets/Logo1.png">
  <title>Portafolio — TeleCrom Solutions</title>
</head>
<body>
  <script>window.location.replace('app/views/portfolio.html');</script>
</body>
</html>
'''
write(PORT_R, REDIRECT)
print('  [T5] Redirect creado.')

print('\n[OK] Todo listo.')
