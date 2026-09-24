// MODELO: contenido de la historia que se muestra en el carrusel de Sobre Nosotros.
// Puede reemplazarse por datos de una API sin cambiar la estructura visual.
const aboutSlides = [
  {
    eyebrow: 'El origen',
    title: 'Una empresa que nació en familia',
    text: 'TeleCrom comenzó con una conversación familiar: usar la tecnología para resolver el trabajo cotidiano de los negocios cercanos.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    alt: 'Personas conversando alrededor de una mesa',
    accent: '01'
  },
  {
    eyebrow: 'Lo que construimos',
    title: 'Menos tareas repetitivas, más tiempo para crecer',
    text: 'Diseñamos automatizaciones con n8n, integraciones y herramientas digitales que conectan equipos y hacen visible el impacto.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    alt: 'Equipo colaborando en una oficina',
    accent: '02'
  },
  {
    eyebrow: 'Nuestra forma de trabajar',
    title: 'Tecnología cercana, soluciones que sí se usan',
    text: 'Combinamos desarrollo web, ciberseguridad y branding con acompañamiento claro para que cada solución pueda evolucionar contigo.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    alt: 'Equipo revisando una solución digital',
    accent: '03'
  }
];

window.TeleCromAboutModel = { slides: aboutSlides };
