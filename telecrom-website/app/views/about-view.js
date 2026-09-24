// VISTA: transforma los datos del modelo en las diapositivas del carrusel.
class AboutView {
  constructor(root, slides) {
    this.root = root;
    this.slides = slides;
  }

  render() {
    this.root.innerHTML = `<div class="about-story-carousel" data-about-carousel>
      <div class="about-story-track">${this.slides.map((slide, index) => `<article class="about-story-slide ${index === 0 ? 'active' : ''}" data-about-slide="${index}" aria-hidden="${index !== 0}">
        <img src="${slide.image}" alt="${slide.alt}">
        <div class="about-story-overlay"></div>
        <div class="about-story-content"><span class="about-story-eyebrow">${slide.eyebrow}</span><h3>${slide.title}</h3><p>${slide.text}</p></div>
      </article>`).join('')}</div>
      <div class="about-story-controls"><button class="about-story-arrow" type="button" data-about-direction="prev" aria-label="Historia anterior">←</button><div class="about-story-dots" role="tablist" aria-label="Historia de TeleCrom">${this.slides.map((slide, index) => `<button type="button" class="about-story-dot ${index === 0 ? 'active' : ''}" data-about-index="${index}" role="tab" aria-label="Ver historia ${index + 1}" aria-selected="${index === 0}"></button>`).join('')}</div><button class="about-story-arrow" type="button" data-about-direction="next" aria-label="Historia siguiente">→</button></div>
    </div>`;
  }
}

window.TeleCromAboutView = AboutView;
