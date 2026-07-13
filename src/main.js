/**
 * Main Entry Point — Homepage
 * Ligeira Telecom
 */
import './css/style.css'
import './css/home.css'

import {
  createIcons,
  Zap, MapPin, Hash, Satellite, Locate, Wifi, Timer, Wrench, Home,
  Film, BookOpen, BookMarked, Leaf, Palette, Gamepad2, Music, Radio, Telescope,
  BarChart2, Instagram, Users, User, MessageCircle, X, Plus, CheckCircle,
  CheckCircle2, Check, ArrowRight, Phone, Mail, LayoutGrid, ChevronDown,
  ChevronLeft, ChevronRight,
  Star, Smartphone, Signal, Shield, Building2, Rss, Clock, Tag, Lock
} from 'lucide'

import { initNavbar } from './js/navbar.js'
import { initFaq } from './js/faq.js'
import { initWizard } from './js/wizard.js'
import { initPlanAddons } from './js/plan-addons.js'
import { initMobileCarousels } from './js/mobile-carousel.js'

// Initialize Lucide icons globally so dynamic content can re-use it
const ICONS = {
  Zap, MapPin, Hash, Satellite, Locate, Wifi, Timer, Wrench, Home,
  Film, BookOpen, BookMarked, Leaf, Palette, Gamepad2, Music, Radio, Telescope,
  BarChart2, Instagram, Users, User, MessageCircle, X, Plus, CheckCircle,
  CheckCircle2, Check, ArrowRight, Phone, Mail, LayoutGrid, ChevronDown,
  ChevronLeft, ChevronRight,
  Star, Smartphone, Signal, Shield, Building2, Rss, Clock, Tag, Lock
}

window.lucide = { createIcons: () => createIcons({ icons: ICONS }) }

createIcons({ icons: ICONS })

// Initialize modules
initNavbar()
initFaq()
initWizard()
initPlanAddons()
initMobileCarousels()


// Smooth scroll for anchor links
// Vite force reload trigger 3
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href')
    if (href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

  // ===================== HERO CAROUSEL =====================
  ; (function initHeroCarousel() {
    const slidesTrack = document.getElementById('hero-slides')
    const dots = document.querySelectorAll('.carousel-dot')
    const prevBtn = document.getElementById('carousel-prev')
    const nextBtn = document.getElementById('carousel-next')
    const totalSlides = document.querySelectorAll('.hero-slide').length
    if (!slidesTrack || totalSlides === 0) return

    let current = 0
    let autoTimer = null

    function goTo(index) {
      current = (index + totalSlides) % totalSlides
      slidesTrack.style.transform = `translateX(-${current * 100}%)`
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current)
        d.setAttribute('aria-selected', String(i === current))
      })
    }

    function startAuto() {
      autoTimer = setInterval(() => goTo(current + 1), 8000)
    }
    function stopAuto() { clearInterval(autoTimer) }

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto() })
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto() })
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        stopAuto()
        goTo(Number(dot.dataset.slide))
        startAuto()
      })
    })

    // Pause on hover
    const hero = document.querySelector('.hero')
    if (hero) {
      hero.addEventListener('mouseenter', stopAuto)
      hero.addEventListener('mouseleave', startAuto)
    }

    // Touch/swipe support
    let touchStartX = 0
    slidesTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX }, { passive: true })
    slidesTrack.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) { stopAuto(); goTo(current + (diff > 0 ? 1 : -1)); startAuto() }
    }, { passive: true })

    startAuto()
  })()

  // ===================== HERO CEP BAR =====================
  ; (function initHeroCepBar() {
    const cepInput = document.getElementById('hero-cep-input')
    const cepBtn = document.getElementById('hero-cep-btn')
    const naoSeiBtn = document.getElementById('hero-nao-sei-btn')

    // CEP mask
    if (cepInput) {
      cepInput.addEventListener('input', (e) => {
        let val = e.target.value.replace(/\D/g, '')
        if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8)
        e.target.value = val
      })

      // Enter key
      cepInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') cepBtn && cepBtn.click()
      })
    }

    // Verify CEP → redirect to cobertura.html?cep=XXXXX
    if (cepBtn) {
      cepBtn.addEventListener('click', () => {
        const raw = cepInput ? cepInput.value.replace(/\D/g, '') : ''
        if (raw.length < 5) {
          cepInput && cepInput.focus()
          return
        }
        window.location.href = `cobertura.html?cep=${raw}`
      })
    }

    // "Não sei meu CEP" → redirect to cobertura.html (address method)
    if (naoSeiBtn) {
      naoSeiBtn.addEventListener('click', () => {
        window.location.href = 'cobertura.html?method=address'
      })
    }
  })()
