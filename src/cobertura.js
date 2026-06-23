/**
 * Cobertura Entry Point — Coverage Page
 * Ligeira Telecom
 */
import './css/style.css'
import './css/cobertura.css'

import {
  createIcons,
  Zap, MapPin, Hash, Locate, Wifi, CheckCircle, AlertCircle,
  Instagram, Users, MessageCircle, X, Home, ArrowRight, Check,
  Navigation, Search
} from 'lucide'

import { initNavbar } from './js/navbar.js'
import { initCoverage } from './js/coverage.js'

const ICONS = {
  Zap, MapPin, Hash, Locate, Wifi, CheckCircle, AlertCircle,
  Instagram, Users, MessageCircle, X, Home, ArrowRight, Check,
  Navigation, Search
}

document.addEventListener('DOMContentLoaded', () => {
  window.lucide = { createIcons: () => createIcons({ icons: ICONS }) }
  createIcons({ icons: ICONS })
  initNavbar()
  initCoverage()
})

// CEP passado via query string ?cep=XXXXX
const urlParams = new URLSearchParams(window.location.search)
const cepParam = urlParams.get('cep')
const methodParam = urlParams.get('method')

if (methodParam === 'address') {
  // Ativa a aba de endereço
  const addressTab = document.querySelector('[data-method="address"]')
  if (addressTab) addressTab.click()
  const addressInput = document.getElementById('address-input')
  if (addressInput) setTimeout(() => addressInput.focus(), 200)
} else if (cepParam) {
  const cepInput = document.getElementById('cep-input')
  if (cepInput) {
    let val = cepParam.replace(/\D/g, '')
    if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8)
    cepInput.value = val
    // Dispara a verificação automaticamente após carregar
    setTimeout(() => {
      const searchBtn = document.querySelector('.btn-coverage-search')
      if (searchBtn) searchBtn.click()
    }, 400)
  }
}

