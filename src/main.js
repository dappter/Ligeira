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
  BarChart2, Instagram, Users, MessageCircle, X, Plus, CheckCircle,
  CheckCircle2, Check, ArrowRight, Phone, Mail, LayoutGrid, ChevronDown,
  Star, Smartphone, Signal, Shield, Building2, Rss, Clock
} from 'lucide'

import { initNavbar } from './js/navbar.js'
import { initFaq } from './js/faq.js'
import { initCoverage } from './js/coverage.js'
import { initWizard } from './js/wizard.js'

// Initialize Lucide icons globally so dynamic content can re-use it
const ICONS = {
  Zap, MapPin, Hash, Satellite, Locate, Wifi, Timer, Wrench, Home,
  Film, BookOpen, BookMarked, Leaf, Palette, Gamepad2, Music, Radio, Telescope,
  BarChart2, Instagram, Users, MessageCircle, X, Plus, CheckCircle,
  CheckCircle2, Check, ArrowRight, Phone, Mail, LayoutGrid, ChevronDown,
  Star, Smartphone, Signal, Shield, Building2, Rss, Clock
}

window.lucide = { createIcons: () => createIcons({ icons: ICONS }) }

createIcons({ icons: ICONS })

// Initialize modules
initNavbar()
initFaq()
initCoverage()
initWizard()

// Smooth scroll for anchor links
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
