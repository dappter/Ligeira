/**
 * Cobertura Entry Point — Coverage Page
 * Ligeira Telecom
 */
import './css/style.css'
import './css/cobertura.css'

import {
  createIcons,
  Zap, MapPin, Info, Check, ArrowLeft,
  CheckCircle, AlertCircle,
  Instagram, MessageCircle, X, Home,
} from 'lucide'

import { initNavbar } from './js/navbar.js'
import { initCoverage } from './js/coverage.js'

const ICONS = {
  Zap, MapPin, Info, Check, ArrowLeft,
  CheckCircle, AlertCircle,
  Instagram, MessageCircle, X, Home,
}

function init() {
  window.lucide = { createIcons: () => createIcons({ icons: ICONS }) }
  createIcons({ icons: ICONS })
  initNavbar()
  initCoverage()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
