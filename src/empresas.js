/**
 * Empresas Entry Point — B2B Page
 * Ligeira Telecom
 */
import './css/style.css'
import './css/empresas.css'

import {
  createIcons,
  Zap, MapPin, Wifi, Shield, Building2, Instagram, Users, MessageCircle,
  CheckCircle, Check, ArrowRight, Phone, Mail, Headphones, BarChart2,
  Globe, Lock, Clock, Server, Layers, Home
} from 'lucide'

import { initNavbar } from './js/navbar.js'

const ICONS = {
  Zap, MapPin, Wifi, Shield, Building2, Instagram, Users, MessageCircle,
  CheckCircle, Check, ArrowRight, Phone, Mail, Headphones, BarChart2,
  Globe, Lock, Clock, Server, Layers, Home
}

createIcons({ icons: ICONS })
initNavbar()

// WhatsApp B2B form
const submitBtn = document.getElementById('btn-b2b-submit')
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const company = document.getElementById('b2b-empresa')?.value || ''
    const phone = document.getElementById('b2b-phone')?.value || ''
    if (!company || !phone) {
      alert('Por favor, preencha ao menos o nome da empresa e o telefone.')
      return
    }
    const msg = `Olá! Sou da empresa "${company}" e tenho interesse em internet empresarial da Ligeira. Telefone: ${phone}`
    window.open(`https://wa.me/5588963700021?text=${encodeURIComponent(msg)}`, '_blank')
  })
}
