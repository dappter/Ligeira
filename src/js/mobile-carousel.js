/**
 * Mobile Carousel — Ligeira Telecom
 *
 * Transforma seções de cards em carrosséis com scroll-snap
 * APENAS em dispositivos mobile (≤ 767px).
 * Em desktop/tablet os grids permanecem intactos.
 */

const MOBILE_BREAKPOINT = 767

/**
 * Configuração de cada carrossel
 * @type {Array<{id: string, trackSelector: string, itemSelector: string, label: string}>}
 */
const CAROUSEL_CONFIGS = [
  {
    id: 'mob-carousel-planos',
    trackSelector: '.plans-grid',
    itemSelector: '.plan-card',
    label: 'Carrossel de planos',
  },
  {
    id: 'mob-carousel-aproveite',
    // A primeira .nio-apps-grid é a seção "Aproveite com a Ligeira"
    trackSelector: '.nio-apps-section .nio-apps-grid',
    itemSelector: '.nio-app-card',
    label: 'Carrossel Aproveite com a Ligeira',
  },
  {
    id: 'mob-carousel-apps',
    // A segunda .nio-apps-grid é a seção "Apps e vantagens" (#apps)
    trackSelector: '.apps-section .nio-apps-grid',
    itemSelector: '.nio-app-card',
    label: 'Carrossel Apps e vantagens',
  },
  {
    id: 'mob-carousel-beneficios',
    trackSelector: '.benefits-grid',
    itemSelector: '.benefit-card',
    label: 'Carrossel Benefícios',
  },
  {
    id: 'mob-carousel-depoimentos',
    trackSelector: '.testimonials-grid',
    itemSelector: '.testimonial-card',
    label: 'Carrossel Depoimentos',
  },
  {
    id: 'mob-carousel-empresas-features',
    trackSelector: '.empresas-features-grid',
    itemSelector: '.empresas-feature-card',
    label: 'Carrossel Para sua empresa',
  },
]

/** Armazena referências dos wrappers criados para poder destruir no resize */
const activeCarousels = []

/**
 * Cria o wrapper + botões + dots para um carrossel
 * @param {HTMLElement} track - O grid original (plans-grid, benefits-grid, etc.)
 * @param {string} id - ID único do carrossel
 * @param {string} itemSelector - Seletor dos itens dentro do track
 * @param {string} label - Aria-label do carrossel
 */
function buildCarousel(track, id, itemSelector, label) {
  // Já foi inicializado? Pula.
  if (track.closest('.mob-carousel-wrapper')) return
  if (track.dataset.mobCarouselId) return

  const items = Array.from(track.querySelectorAll(itemSelector))
  if (items.length === 0) return

  // Marca o track para não duplicar
  track.dataset.mobCarouselId = id

  // Cria o wrapper que envolve o track
  const wrapper = document.createElement('div')
  wrapper.className = 'mob-carousel-wrapper'
  wrapper.id = id
  wrapper.setAttribute('aria-label', label)
  wrapper.setAttribute('role', 'region')

  // Insere o wrapper antes do track no DOM e move o track para dentro
  track.parentNode.insertBefore(wrapper, track)
  wrapper.appendChild(track)

  // Cria os botões de navegação
  const prevBtn = document.createElement('button')
  prevBtn.className = 'mob-carousel-btn mob-carousel-prev'
  prevBtn.setAttribute('aria-label', 'Item anterior')
  prevBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`

  const nextBtn = document.createElement('button')
  nextBtn.className = 'mob-carousel-btn mob-carousel-next'
  nextBtn.setAttribute('aria-label', 'Próximo item')
  nextBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`

  wrapper.appendChild(prevBtn)
  wrapper.appendChild(nextBtn)

  // Cria os dots
  const dotsContainer = document.createElement('div')
  dotsContainer.className = 'mob-carousel-dots'
  dotsContainer.setAttribute('aria-hidden', 'true')

  const dots = items.map((_, i) => {
    const dot = document.createElement('button')
    dot.className = 'mob-carousel-dot' + (i === 0 ? ' active' : '')
    dot.setAttribute('aria-label', `Ir para item ${i + 1}`)
    dot.dataset.index = String(i)
    dotsContainer.appendChild(dot)
    return dot
  })

  wrapper.appendChild(dotsContainer)

  // ─── Lógica de navegação ───

  let currentIndex = 0

  function getItemWidth() {
    return items[0] ? items[0].offsetWidth + parseInt(getComputedStyle(track).gap || '0') : 0
  }

  function scrollToIndex(index) {
    const total = items.length
    currentIndex = Math.max(0, Math.min(index, total - 1))
    const itemW = getItemWidth()
    track.scrollTo({ left: currentIndex * itemW, behavior: 'smooth' })
    updateDots()
    updateButtons()
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex)
    })
  }

  function updateButtons() {
    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex >= items.length - 1
  }

  // Detecta o slide atual via scroll (swipe touch)
  let scrollTimer = null
  track.addEventListener('scroll', () => {
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      const itemW = getItemWidth()
      if (itemW > 0) {
        const newIndex = Math.round(track.scrollLeft / itemW)
        if (newIndex !== currentIndex) {
          currentIndex = newIndex
          updateDots()
          updateButtons()
        }
      }
    }, 60)
  }, { passive: true })

  prevBtn.addEventListener('click', () => scrollToIndex(currentIndex - 1))
  nextBtn.addEventListener('click', () => scrollToIndex(currentIndex + 1))

  dots.forEach(dot => {
    dot.addEventListener('click', () => scrollToIndex(Number(dot.dataset.index)))
  })

  // Estado inicial
  updateButtons()

  // Guarda referência para destruição
  activeCarousels.push({ id, wrapper, track, trackParent: wrapper.parentNode })
}


/**
 * Destrói os carrosséis: remove wrappers, restaura grids ao DOM original
 */
function destroyCarousels() {
  while (activeCarousels.length) {
    const { wrapper, track } = activeCarousels.pop()
    delete track.dataset.mobCarouselId
    // Move o track de volta para o lugar do wrapper
    wrapper.parentNode.insertBefore(track, wrapper)
    wrapper.remove()
    // Reseta o scroll
    track.scrollLeft = 0
  }
}

/**
 * Inicializa todos os carrosséis se estiver em mobile
 */
function initCarousels() {
  CAROUSEL_CONFIGS.forEach(({ id, trackSelector, itemSelector, label }) => {
    const track = document.querySelector(trackSelector)
    if (!track) return
    buildCarousel(track, id, itemSelector, label)
  })
}

/**
 * Verifica se é mobile e inicializa/destroi conforme necessário
 */
function checkAndToggle() {
  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    initCarousels()
  } else {
    destroyCarousels()
  }
}

/**
 * Ponto de entrada público
 */
export function initMobileCarousels() {
  // Inicializa imediatamente
  checkAndToggle()

  // Recalcula no resize com debounce
  let resizeTimer = null
  window.addEventListener('resize', () => {
    if (resizeTimer) clearTimeout(resizeTimer)
    resizeTimer = setTimeout(checkAndToggle, 200)
  })
}
