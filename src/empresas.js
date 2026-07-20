/**
 * Empresas Entry Point — B2B Page
 * Ligeira Telecom
 *
 * Formulário B2B integrado com EmailJS para envio de e-mail sem backend.
 *
 * CONFIGURAÇÃO (somente uma vez):
 * 1. Crie uma conta gratuita em https://www.emailjs.com
 * 2. Adicione um serviço de e-mail (Gmail, Outlook ou SMTP da Ligeira)
 * 3. Crie um template com as variáveis: {{company}}, {{segment}}, {{contact_name}}, {{phone}}, {{email}}, {{needs}}, {{timestamp}}
 *    Configure o template para enviar para: admin@ligeira.net, com-b2b@ligeira.net, com-marketing@ligeira.net
 * 4. Substitua os valores abaixo com suas credenciais reais
 */

import './css/style.css'
import './css/empresas.css'

import {
  createIcons,
  Zap, MapPin, Wifi, Shield, Building2, Instagram, Users, MessageCircle,
  CheckCircle, Check, ArrowRight, Phone, Mail, Headphones, BarChart2,
  Globe, Lock, Clock, Server, Layers, Home, X
} from 'lucide'

import { initNavbar } from './js/navbar.js'
import { initMobileCarousels } from './js/mobile-carousel.js'

const ICONS = {
  Zap, MapPin, Wifi, Shield, Building2, Instagram, Users, MessageCircle,
  CheckCircle, Check, ArrowRight, Phone, Mail, Headphones, BarChart2,
  Globe, Lock, Clock, Server, Layers, Home, X
}

// ─────────────────────────────────────────────────────────────
// EMAILJS CONFIG
// Substitua com suas credenciais do EmailJS
// ─────────────────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY'   // Account > API Keys > Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'            // Email Services > Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'           // Email Templates > Template ID

const WA_NUMBER  = '5588997810100'
const WA_MESSAGE = 'Vim pelo site e gostaria de saber mais sobre a Ligeira Telecom.'

// ─────────────────────────────────────────────────────────────
// LOAD EMAILJS SDK
// ─────────────────────────────────────────────────────────────
function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) { resolve(); return }
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
    script.onload = () => {
      window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY })
      resolve()
    }
    script.onerror = reject
    document.head.appendChild(script)
  })
}

// ─────────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────────
function init() {
  createIcons({ icons: ICONS })
  initNavbar()
  initMobileCarousels()
  loadEmailJS().catch(() => {
    // Falha silenciosa — o formulário ainda funciona via WhatsApp (fallback)
    console.warn('[Ligeira] EmailJS não carregado. Formulário usará fallback WhatsApp.')
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}

// ─────────────────────────────────────────────────────────────
// HELPERS DE UI
// ─────────────────────────────────────────────────────────────

function setButtonState(btn, state) {
  if (state === 'loading') {
    btn.disabled = true
    btn.dataset.originalText = btn.innerHTML
    btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>Enviando...</span>'
  } else {
    btn.disabled = false
    btn.innerHTML = btn.dataset.originalText || '<i data-lucide="arrow-right"></i> Enviar proposta pelo WhatsApp'
  }
}

function showFormMessage(type, text) {
  let msgEl = document.getElementById('b2b-form-message')

  if (!msgEl) {
    msgEl = document.createElement('div')
    msgEl.id = 'b2b-form-message'
    msgEl.style.cssText = 'margin-top:16px;padding:14px 20px;border-radius:10px;font-size:14px;font-weight:600;text-align:center;transition:all 0.3s ease;'
    const btn = document.getElementById('btn-b2b-submit')
    if (btn) btn.parentNode.insertBefore(msgEl, btn.nextSibling)
  }

  if (type === 'success') {
    msgEl.style.background = 'rgba(16,185,129,0.12)'
    msgEl.style.border = '1px solid rgba(16,185,129,0.3)'
    msgEl.style.color = '#10B981'
    msgEl.innerHTML = '✅ ' + text
  } else if (type === 'error') {
    msgEl.style.background = 'rgba(239,68,68,0.1)'
    msgEl.style.border = '1px solid rgba(239,68,68,0.25)'
    msgEl.style.color = '#EF4444'
    msgEl.innerHTML = '⚠️ ' + text
  }

  msgEl.style.display = 'block'
  setTimeout(() => {
    if (msgEl) msgEl.style.display = 'none'
  }, 6000)
}

function buildWALink(data) {
  const msg = [
    '🏢 *Nova proposta B2B — Ligeira Telecom*',
    '',
    `*Empresa:* ${data.company}`,
    `*Segmento:* ${data.segment || 'Não informado'}`,
    `*Responsável:* ${data.contactName}`,
    `*WhatsApp:* ${data.phone}`,
    `*E-mail:* ${data.email || 'Não informado'}`,
    '',
    `*Necessidades:* ${data.needs || 'Não informado'}`,
  ].join('\n')

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`
}

// ─────────────────────────────────────────────────────────────
// FORMULÁRIO B2B
// ─────────────────────────────────────────────────────────────

const submitBtn = document.getElementById('btn-b2b-submit')

if (submitBtn) {
  // Aplicar máscara de telefone
  const phoneInput = document.getElementById('b2b-phone')
  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      let v = this.value.replace(/\D/g, '').slice(0, 11)
      if (v.length >= 7) v = '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7)
      else if (v.length >= 3) v = '(' + v.slice(0,2) + ') ' + v.slice(2)
      else if (v.length >= 1) v = '(' + v
      this.value = v
    })
  }

  submitBtn.addEventListener('click', async () => {
    // Coletar dados
    const company     = document.getElementById('b2b-empresa')?.value?.trim() || ''
    const segment     = document.getElementById('b2b-segment')?.value || ''
    const contactName = document.getElementById('b2b-contact-name')?.value?.trim() || ''
    const phone       = document.getElementById('b2b-phone')?.value?.trim() || ''
    const email       = document.getElementById('b2b-email')?.value?.trim() || ''
    const needs       = document.getElementById('b2b-needs')?.value?.trim() || ''

    // Validação
    if (!company) {
      showFormMessage('error', 'Por favor, informe o nome da empresa.')
      document.getElementById('b2b-empresa')?.focus()
      return
    }
    if (!contactName) {
      showFormMessage('error', 'Por favor, informe o nome do responsável.')
      document.getElementById('b2b-contact-name')?.focus()
      return
    }
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      showFormMessage('error', 'Por favor, informe um WhatsApp válido.')
      document.getElementById('b2b-phone')?.focus()
      return
    }

    const data = { company, segment, contactName, phone, email, needs }
    setButtonState(submitBtn, 'loading')

    // Tentar enviar via EmailJS
    const emailJSConfigured = EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY'

    if (emailJSConfigured && window.emailjs) {
      try {
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          company,
          segment: segment || 'Não informado',
          contact_name: contactName,
          phone,
          email: email || 'Não informado',
          needs: needs || 'Não informado',
          timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza' }),
        })

        setButtonState(submitBtn, 'reset')
        showFormMessage('success', 'Proposta enviada! Nossa equipe entrará em contato em breve.')

        // Limpar formulário
        ;['b2b-empresa','b2b-segment','b2b-contact-name','b2b-phone','b2b-email','b2b-needs'].forEach(id => {
          const el = document.getElementById(id)
          if (el) el.value = ''
        })

        // Abrir WhatsApp como confirmação adicional
        setTimeout(() => {
          window.open(buildWALink(data), '_blank')
        }, 1000)

      } catch (err) {
        console.error('[Ligeira] Erro no EmailJS:', err)
        setButtonState(submitBtn, 'reset')
        showFormMessage('error', 'Erro ao enviar e-mail. Redirecionando para o WhatsApp...')
        setTimeout(() => window.open(buildWALink(data), '_blank'), 1500)
      }
    } else {
      // Fallback: abrir WhatsApp diretamente
      setButtonState(submitBtn, 'reset')
      window.open(buildWALink(data), '_blank')
    }
  })
}

// Adicionar keyframe para animação de spin (EmailJS loading)
;(function() {
  if (document.getElementById('ligeira-spin-style')) return
  const style = document.createElement('style')
  style.id = 'ligeira-spin-style'
  style.textContent = '@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'
  document.head.appendChild(style)
})()
