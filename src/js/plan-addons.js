/**
 * Plan Addons — Sistema de personalização de planos
 * Ligeira Telecom
 *
 * Comportamento:
 *  - Desktop (≥ 1024px): painel flutuante lateral dentro do card
 *  - Tablet  (768–1023px): modal lateral com overlay
 *  - Mobile  (<768px): bottom sheet
 */

// ─────────────────────────────────────────────────────────────
// DADOS
// ─────────────────────────────────────────────────────────────

const ADDONS = [
  { id: 'telefone',   label: 'Telefone fixo',        icon: 'phone',    price: 15 },
  { id: 'wifi2p',     label: '2º ponto Wi-Fi 5G',    icon: 'wifi',     price: 10 },
  { id: 'wifi6',      label: 'Wi-Fi 6',               icon: 'signal',   price: 20 },
  { id: 'cameras',    label: 'Câmeras de segurança',  icon: 'shield',   price: 25 },
  { id: 'suporte',    label: 'Suporte premium',       icon: 'star',     price: 12 },
  { id: 'instalacao', label: 'Instalação expressa',   icon: 'zap',      price: 18 },
  { id: 'protecao',   label: 'Proteção digital',      icon: 'lock',     price:  8 },
  { id: 'ipfixo',     label: 'IP fixo',               icon: 'hash',     price: 30 },
]

const PLAN_BASE_PRICES = {
  '300': 69.90,
  '400': 74.90,
  '600': 83.90,
  '800': 99.90,
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function fmt(value) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function getBreakpoint() {
  const w = window.innerWidth
  if (w >= 1024) return 'desktop'
  if (w >= 768)  return 'tablet'
  return 'mobile'
}

function storageKey(planId) {
  return `ligeira-addons-${planId}`
}

function loadSaved(planId) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(planId)) || '[]')
  } catch { return [] }
}

function persistSaved(planId, ids) {
  localStorage.setItem(storageKey(planId), JSON.stringify(ids))
}

// ─────────────────────────────────────────────────────────────
// ESTADO GLOBAL
// ─────────────────────────────────────────────────────────────

const state = {}   // { planId: Set<addonId> }

function getSelected(planId) {
  if (!state[planId]) state[planId] = new Set(loadSaved(planId))
  return state[planId]
}

// ─────────────────────────────────────────────────────────────
// CÁLCULO DE PREÇO
// ─────────────────────────────────────────────────────────────

function calcTotal(planId) {
  const base = PLAN_BASE_PRICES[planId] || 0
  const extra = ADDONS
    .filter(a => getSelected(planId).has(a.id))
    .reduce((sum, a) => sum + a.price, 0)
  return { base, extra, total: base + extra }
}

// ─────────────────────────────────────────────────────────────
// ATUALIZAÇÃO DE PREÇO NO CARD PRINCIPAL
// ─────────────────────────────────────────────────────────────

function updateCardPrice(planId) {
  const card = document.querySelector(`.plan-card[data-plan-id="${planId}"]`)
  if (!card) return

  const { base, extra, total } = calcTotal(planId)
  const hasExtras = extra > 0

  // Atualiza o preço exibido no card
  const priceEl = card.querySelector('.plan-price')
  if (priceEl) {
    const intPart = Math.floor(total)
    const decPart = Math.round((total - intPart) * 100).toString().padStart(2, '0')
    priceEl.innerHTML = `R$ ${fmt(intPart).replace(/,\d+$/, '')},<small>${decPart}</small>`

    // Animação de destaque
    priceEl.classList.remove('plan-price-pulse')
    void priceEl.offsetWidth // force reflow
    priceEl.classList.add('plan-price-pulse')
  }

  // Badge de status
  const badge = card.querySelector('.plan-addon-status-badge')
  if (badge) {
    if (hasExtras) {
      badge.innerHTML = '✦ Plano Personalizado <span class="reset-plan-btn" onclick="window.__planAddons.resetPlan(event, \'' + planId + '\')" aria-label="Voltar para plano base"><i data-lucide="x"></i></span>'
    } else {
      badge.textContent = 'Plano Base'
    }
    badge.classList.toggle('plan-addon-status-badge--active', hasExtras)
    if (window.lucide && hasExtras) window.lucide.createIcons()
  }

  // Atualiza breakdown dentro do painel (desktop)
  updatePanelBreakdown(planId)

  // Atualiza bottom sheet / modal tablet se abertos
  updateSheetBreakdown(planId)
}

// ─────────────────────────────────────────────────────────────
// PAINEL DE ADICIONAIS — DESKTOP (dentro do card)
// ─────────────────────────────────────────────────────────────

function buildAddonPanel(planId, container) {
  container.innerHTML = buildPanelHTML(planId)
  bindPanelCheckboxes(planId, container)
  if (window.lucide) window.lucide.createIcons()
}

function buildPanelHTML(planId) {
  const selected = getSelected(planId)
  const { base, extra, total } = calcTotal(planId)

  const items = ADDONS.map(a => `
    <label class="addon-item" for="addon-${planId}-${a.id}">
      <input
        type="checkbox"
        class="addon-checkbox"
        id="addon-${planId}-${a.id}"
        data-addon-id="${a.id}"
        data-addon-price="${a.price}"
        aria-label="Adicionar ${a.label} por R$ ${fmt(a.price)}/mês"
        ${selected.has(a.id) ? 'checked' : ''}
      />
      <span class="addon-item-icon"><i data-lucide="${a.icon}"></i></span>
      <span class="addon-item-label">${a.label}</span>
      <span class="addon-item-price">+R$ ${fmt(a.price)}</span>
    </label>
  `).join('')

  return `
    <div class="addon-panel-inner">
      <div class="addon-panel-header">
        <div class="addon-panel-title">Personalize seu plano</div>
        <p class="addon-panel-subtitle">Adicione serviços extras e monte o plano ideal para você</p>
      </div>
      <div class="addon-items-list">
        ${items}
      </div>
      <div class="addon-breakdown" data-plan-breakdown="${planId}">
        ${buildBreakdownHTML(planId)}
      </div>
      <button
        class="addon-apply-btn"
        onclick="window.__planAddons.applyPlan('${planId}')"
        aria-label="Aplicar alterações e contratar plano ${planId} MEGA"
      >
        Aplicar alterações
      </button>
    </div>
  `
}

function buildBreakdownHTML(planId) {
  const selected = getSelected(planId)
  const { base, extra, total } = calcTotal(planId)
  const hasExtras = extra > 0

  const extraLines = ADDONS
    .filter(a => selected.has(a.id))
    .map(a => `<div class="breakdown-line extra"><span>${a.label}</span><span>+ R$ ${fmt(a.price)}</span></div>`)
    .join('')

  return `
    <div class="breakdown-line base">
      <span>Plano Base</span>
      <span>R$ ${fmt(base)}</span>
    </div>
    ${extraLines}
    <div class="breakdown-divider"></div>
    <div class="breakdown-line total">
      <span>Total</span>
      <span class="${hasExtras ? 'breakdown-total-highlight' : ''}">R$ ${fmt(total)}<small>/mês</small></span>
    </div>
  `
}

function updatePanelBreakdown(planId) {
  const el = document.querySelector(`[data-plan-breakdown="${planId}"]`)
  if (el) el.innerHTML = buildBreakdownHTML(planId)
}

function bindPanelCheckboxes(planId, container) {
  container.querySelectorAll('.addon-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const addonId = cb.dataset.addonId
      if (cb.checked) {
        getSelected(planId).add(addonId)
      } else {
        getSelected(planId).delete(addonId)
      }
      persistSaved(planId, [...getSelected(planId)])
      updateCardPrice(planId)
    })
  })
}

// ─────────────────────────────────────────────────────────────
// TOGGLE DO PAINEL (DESKTOP)
// ─────────────────────────────────────────────────────────────

function openDesktopPanel(planId) {
  const card = document.querySelector(`.plan-card[data-plan-id="${planId}"]`)
  if (!card) return

  const panel = card.querySelector('.plan-addon-panel')

  // Lazy render
  if (!panel.dataset.rendered) {
    buildAddonPanel(planId, panel)
    panel.dataset.rendered = '1'
  }

  const isOpen = card.classList.contains('addon-open')

  if (isOpen) {
    card.classList.remove('addon-open')
  } else {
    // Fechar qualquer outro aberto no desktop
    document.querySelectorAll('.plan-card.addon-open').forEach(c => {
      if (c !== card) closeDesktopPanel(c.dataset.planId)
    })
    card.classList.add('addon-open')

    // Focus no primeiro checkbox
    setTimeout(() => {
      const first = panel.querySelector('.addon-checkbox')
      if (first) first.focus()
    }, 350)
  }
}

function closeDesktopPanel(planId) {
  const card = document.querySelector(`.plan-card[data-plan-id="${planId}"]`)
  if (!card) return
  card.classList.remove('addon-open')
}

// ─────────────────────────────────────────────────────────────
// MODAL TABLET + BOTTOM SHEET MOBILE
// ─────────────────────────────────────────────────────────────

let activeSheetPlanId = null

function buildSheetHTML(planId, type) {
  const selected = getSelected(planId)

  const items = ADDONS.map(a => `
    <label class="addon-item" for="sheet-addon-${planId}-${a.id}">
      <input
        type="checkbox"
        class="addon-checkbox"
        id="sheet-addon-${planId}-${a.id}"
        data-addon-id="${a.id}"
        data-addon-price="${a.price}"
        aria-label="Adicionar ${a.label} por R$ ${fmt(a.price)}/mês"
        ${selected.has(a.id) ? 'checked' : ''}
      />
      <span class="addon-item-icon"><i data-lucide="${a.icon}"></i></span>
      <span class="addon-item-label">${a.label}</span>
      <span class="addon-item-price">+R$ ${fmt(a.price)}</span>
    </label>
  `).join('')

  const sheetClass = type === 'mobile' ? 'addon-bottom-sheet' : 'addon-tablet-modal'

  return `
    <div class="addon-sheet-overlay" role="presentation" id="addon-sheet-overlay-${planId}">
      <div
        class="${sheetClass}"
        role="dialog"
        aria-modal="true"
        aria-label="Personalizar plano ${planId} MEGA"
        id="addon-sheet-${planId}"
      >
        ${type === 'mobile' ? '<div class="sheet-handle" aria-hidden="true"></div>' : ''}
        <div class="sheet-header">
          <div>
            <div class="addon-panel-title">Personalize seu plano</div>
            <p class="addon-panel-subtitle">Monte o plano ideal para você</p>
          </div>
          <button
            class="sheet-close-btn"
            onclick="window.__planAddons.closeSheet('${planId}')"
            aria-label="Fechar painel de personalização"
          >×</button>
        </div>
        <div class="sheet-body">
          <div class="addon-items-list">
            ${items}
          </div>
          <div class="addon-breakdown" data-plan-breakdown="${planId}">
            ${buildBreakdownHTML(planId)}
          </div>
        </div>
        <div class="sheet-footer">
          <button
            class="addon-apply-btn"
            onclick="window.__planAddons.applyPlan('${planId}')"
            aria-label="Aplicar alterações e contratar plano ${planId} MEGA"
          >
            Aplicar alterações
          </button>
        </div>
      </div>
    </div>
  `
}

function openSheet(planId) {
  closeSheet()  // fecha qualquer sheet aberta

  const bp = getBreakpoint()
  const type = (bp === 'tablet' || bp === 'desktop') ? 'tablet' : 'mobile'
  activeSheetPlanId = planId

  const wrapper = document.createElement('div')
  wrapper.id = `addon-sheet-wrapper-${planId}`
  wrapper.innerHTML = buildSheetHTML(planId, type)
  document.body.appendChild(wrapper)

  // Bind checkboxes
  wrapper.querySelectorAll('.addon-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const addonId = cb.dataset.addonId
      if (cb.checked) {
        getSelected(planId).add(addonId)
      } else {
        getSelected(planId).delete(addonId)
      }
      persistSaved(planId, [...getSelected(planId)])
      updateCardPrice(planId)
      // Sync checkboxes between possible duplicate sheet and card
      syncSheetCheckboxes(planId)
    })
  })

  // Click overlay to close
  const overlay = wrapper.querySelector('.addon-sheet-overlay')
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSheet(planId)
  })

  // Lock body scroll
  document.body.classList.add('addon-sheet-open')

  if (window.lucide) window.lucide.createIcons()

  // Trigger animation
  requestAnimationFrame(() => {
    const sheet = wrapper.querySelector('.addon-bottom-sheet, .addon-tablet-modal')
    if (sheet) sheet.classList.add('sheet-visible')
    overlay.classList.add('overlay-visible')
  })

  // Focus trap
  setTimeout(() => {
    const firstCb = wrapper.querySelector('.addon-checkbox')
    if (firstCb) firstCb.focus()
  }, 350)

  // ESC key
  wrapper._escHandler = (e) => {
    if (e.key === 'Escape') closeSheet(planId)
  }
  document.addEventListener('keydown', wrapper._escHandler)
}

function closeSheet(planId) {
  const id = planId || activeSheetPlanId
  if (!id) return

  const wrapper = document.getElementById(`addon-sheet-wrapper-${id}`)
  if (!wrapper) return

  const overlay = wrapper.querySelector('.addon-sheet-overlay')
  const sheet   = wrapper.querySelector('.addon-bottom-sheet, .addon-tablet-modal')

  if (overlay) overlay.classList.remove('overlay-visible')
  if (sheet)   sheet.classList.remove('sheet-visible')

  // Remove after animation
  setTimeout(() => {
    if (wrapper._escHandler) {
      document.removeEventListener('keydown', wrapper._escHandler)
    }
    wrapper.remove()
  }, 350)

  document.body.classList.remove('addon-sheet-open')
  activeSheetPlanId = null
}

function syncSheetCheckboxes(planId) {
  // Sync sheet checkboxes to match current state
  const wrapper = document.getElementById(`addon-sheet-wrapper-${planId}`)
  if (!wrapper) return
  const selected = getSelected(planId)
  wrapper.querySelectorAll('.addon-checkbox').forEach(cb => {
    cb.checked = selected.has(cb.dataset.addonId)
  })
  updateSheetBreakdown(planId)
}

function updateSheetBreakdown(planId) {
  // Update breakdown inside open sheet
  const wrapper = document.getElementById(`addon-sheet-wrapper-${planId}`)
  if (!wrapper) return
  const el = wrapper.querySelector(`[data-plan-breakdown="${planId}"]`)
  if (el) el.innerHTML = buildBreakdownHTML(planId)
}

// ─────────────────────────────────────────────────────────────
// HANDLER PRINCIPAL DO TOGGLE
// ─────────────────────────────────────────────────────────────

function handleToggle(planId) {
  const bp = getBreakpoint()
  const isWizardOpen = document.querySelector('.wizard-overlay')?.classList.contains('open')

  if (bp === 'desktop' && !isWizardOpen) {
    openDesktopPanel(planId)
  } else {
    // tablet, mobile ou wizard aberto → sheet
    const sheetWrapper = document.getElementById(`addon-sheet-wrapper-${planId}`)
    if (sheetWrapper) {
      closeSheet(planId)
    } else {
      openSheet(planId)
    }
  }
}

// ─────────────────────────────────────────────────────────────
// APLICAR ALTERAÇÕES (CTA)
// ─────────────────────────────────────────────────────────────

function applyPlan(planId) {
  closeSheet(planId)
  closeDesktopPanel(planId)

  // Dispara o wizard com o plano selecionado direto no passo 2
  if (typeof window.abrirWizard === 'function') {
    window.abrirWizard(planId, 2)
  }
}

// ─────────────────────────────────────────────────────────────
// RESET PLAN
// ─────────────────────────────────────────────────────────────

function resetPlan(e, planId) {
  if (e) {
    e.stopPropagation()
    e.preventDefault()
  }
  getSelected(planId).clear()
  persistSaved(planId, [])
  updateCardPrice(planId)
  syncSheetCheckboxes(planId)

  const card = document.querySelector(`.plan-card[data-plan-id="${planId}"]`)
  if (card) {
    const panel = card.querySelector('.plan-addon-panel')
    if (panel && panel.dataset.rendered) {
      panel.querySelectorAll('.addon-checkbox').forEach(cb => cb.checked = false)
      updatePanelBreakdown(planId)
    }
  }
}

// ─────────────────────────────────────────────────────────────
// WIZARD INTEGRATION
// ─────────────────────────────────────────────────────────────

function buildWizardAddonsHTML(planId) {
  const selected = getSelected(planId)
  
  const items = ADDONS.map(a => `
    <label class="addon-item" for="wizard-addon-${planId}-${a.id}">
      <input
        type="checkbox"
        class="addon-checkbox"
        id="wizard-addon-${planId}-${a.id}"
        data-addon-id="${a.id}"
        data-addon-price="${a.price}"
        aria-label="Adicionar ${a.label} por R$ ${fmt(a.price)}/mês"
        ${selected.has(a.id) ? 'checked' : ''}
        onchange="window.__planAddons.handleWizardCheckboxChange(this, '${planId}')"
      />
      <span class="addon-item-icon"><i data-lucide="${a.icon}"></i></span>
      <span class="addon-item-label">${a.label}</span>
      <span class="addon-item-price">+R$ ${fmt(a.price)}</span>
    </label>
  `).join('')

  return `
    <div class="addon-items-list">
      ${items}
    </div>
    <div class="addon-breakdown" id="wizard-addon-breakdown">
      ${buildBreakdownHTML(planId)}
    </div>
  `
}

function handleWizardCheckboxChange(cb, planId) {
  const addonId = cb.dataset.addonId
  if (cb.checked) {
    getSelected(planId).add(addonId)
  } else {
    getSelected(planId).delete(addonId)
  }
  persistSaved(planId, [...getSelected(planId)])
  updateCardPrice(planId)
  
  const breakdownEl = document.getElementById('wizard-addon-breakdown')
  if (breakdownEl) breakdownEl.innerHTML = buildBreakdownHTML(planId)
  
  if (window.renderWizardSummary) window.renderWizardSummary(planId)
}

// ─────────────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────────────

export function initPlanAddons() {
  // Bind toggle buttons
  document.querySelectorAll('.plan-addon-toggle').forEach(btn => {
    const planId = btn.dataset.planId
    btn.addEventListener('click', () => handleToggle(planId))
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleToggle(planId)
      }
    })
  })

  // Restore saved selections e atualiza preços iniciais
  document.querySelectorAll('.plan-card[data-plan-id]').forEach(card => {
    const planId = card.dataset.planId
    // Inicializa o state a partir do localStorage
    getSelected(planId)
    // Atualiza preço e badge se houver adicionais salvos
    updateCardPrice(planId)
  })

  // Fechar painel desktop ao clicar fora
  document.addEventListener('click', (e) => {
    if (getBreakpoint() !== 'desktop') return
    const openCards = document.querySelectorAll('.plan-card.addon-open')
    openCards.forEach(card => {
      if (!card.contains(e.target)) {
        closeDesktopPanel(card.dataset.planId)
      }
    })
  })

  // Expor API global para atributos onclick inline no HTML
  window.__planAddons = { handleToggle, closeSheet, applyPlan, calcTotal, resetPlan, buildWizardAddonsHTML, handleWizardCheckboxChange }
}
