/**
 * Plan Addons — Sistema de personalização de planos
 * Ligeira Telecom
 *
 * Comportamento:
 *  - Desktop (≥ 1024px): painel flutuante lateral dentro do card
 *  - Tablet  (768–1023px): modal lateral com overlay
 *  - Mobile  (< 768px): bottom sheet
 *
 * Tipos de addon:
 *  - 'toggle'  → checkbox (0 ou 1 unidade)
 *  - 'stepper' → contador com botões +/- (0 a max unidades)
 */

// ─────────────────────────────────────────────────────────────
// DADOS
// ─────────────────────────────────────────────────────────────

const ADDONS = [
  {
    id: 'globoplay_basic',
    label: 'Globo Play Sem Anúncios',
    description: 'Todo conteúdo Globo sem anúncios',
    icon: 'tv',
    price: 32.90,
    type: 'toggle',
  },
  {
    id: 'globoplay_premium',
    label: 'Globo Play Premium',
    description: 'Todo conteúdo Globo sem anúncios e com mais canais',
    icon: 'star',
    price: 54.90,
    type: 'toggle',
  },
  {
    id: 'telecine',
    label: 'Telecine',
    description: 'Os melhores filmes',
    icon: 'film',
    price: 23.92,
    type: 'toggle',
  },
  {
    id: 'premiere',
    label: 'Premiere',
    description: 'O melhor do esporte',
    icon: 'trophy',
    price: 49.90,
    type: 'toggle',
  },
  {
    id: 'telemedicina',
    label: 'Telemedicina',
    description: 'Serviço de Telemedicina 24h com Mediquo',
    icon: 'heart',
    price: 10.00,
    type: 'toggle',
  },
  {
    id: 'wifi_ligeiro',
    label: 'Wifi Mais Ligeiro',
    description: 'Roteador adicional para ampliar a cobertura Wi-Fi',
    icon: 'wifi',
    price: 19.90,
    type: 'stepper',
    min: 0,
    max: 5,
  },
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
  return `ligeira-addons-v2-${planId}`
}

/** Retorna { addonId: quantity } — 0 = desmarcado */
function loadSaved(planId) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(planId)) || '{}')
  } catch { return {} }
}

function persistSaved(planId, quantities) {
  localStorage.setItem(storageKey(planId), JSON.stringify(quantities))
}

// ─────────────────────────────────────────────────────────────
// ESTADO GLOBAL — { planId: { addonId: quantity } }
// ─────────────────────────────────────────────────────────────

const state = {}

function getQuantities(planId) {
  if (!state[planId]) state[planId] = loadSaved(planId)
  return state[planId]
}

function getQty(planId, addonId) {
  return getQuantities(planId)[addonId] || 0
}

function setQty(planId, addonId, qty) {
  const addon = ADDONS.find(a => a.id === addonId)
  if (!addon) return
  const min = addon.min ?? 0
  const max = addon.type === 'stepper' ? (addon.max ?? 99) : 1
  qty = Math.max(min, Math.min(max, qty))
  getQuantities(planId)[addonId] = qty
  persistSaved(planId, getQuantities(planId))
}

// ─────────────────────────────────────────────────────────────
// CÁLCULO DE PREÇO
// ─────────────────────────────────────────────────────────────

function calcTotal(planId) {
  const base = PLAN_BASE_PRICES[planId] || 0
  let extra = 0
  const quantities = getQuantities(planId)
  ADDONS.forEach(a => {
    const qty = quantities[a.id] || 0
    extra += a.price * qty
  })
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

  const priceEl = card.querySelector('.plan-price')
  if (priceEl) {
    const intPart = Math.floor(total)
    const decPart = Math.round((total - intPart) * 100).toString().padStart(2, '0')
    priceEl.innerHTML = `R$ ${fmt(intPart).replace(/,\d+$/, '')},<small>${decPart}</small>`
    priceEl.classList.remove('plan-price-pulse')
    void priceEl.offsetWidth
    priceEl.classList.add('plan-price-pulse')
  }

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

  updatePanelBreakdown(planId)
  updateSheetBreakdown(planId)
}

// ─────────────────────────────────────────────────────────────
// RENDER — ITENS DE ADDON
// ─────────────────────────────────────────────────────────────

function buildAddonItemHTML(a, planId, prefix) {
  const qty = getQty(planId, a.id)

  if (a.type === 'stepper') {
    const unitLabel = qty === 1 ? 'unidade' : 'unidades'
    const priceStr  = qty > 0 ? `R$ ${fmt(a.price * qty)}/mês` : `R$ ${fmt(a.price)}/un.`
    return `
      <div class="addon-item addon-stepper-item ${qty > 0 ? 'addon-item--active' : ''}" data-addon-id="${a.id}" data-plan-id="${planId}" data-prefix="${prefix}">
        <span class="addon-item-icon"><i data-lucide="${a.icon}"></i></span>
        <div class="addon-item-info">
          <span class="addon-item-label">${a.label}</span>
        </div>
        <div class="addon-stepper-ctrl">
          <button
            class="stepper-btn stepper-dec"
            aria-label="Remover unidade de ${a.label}"
            data-action="dec"
            data-addon-id="${a.id}"
            data-plan-id="${planId}"
            data-prefix="${prefix}"
            ${qty <= (a.min ?? 0) ? 'disabled' : ''}
          >−</button>
          <span class="stepper-qty" id="${prefix}-qty-${planId}-${a.id}">${qty}</span>
          <button
            class="stepper-btn stepper-inc"
            aria-label="Adicionar unidade de ${a.label}"
            data-action="inc"
            data-addon-id="${a.id}"
            data-plan-id="${planId}"
            data-prefix="${prefix}"
            ${qty >= (a.max ?? 99) ? 'disabled' : ''}
          >+</button>
        </div>
        <span class="addon-item-price" id="${prefix}-price-${planId}-${a.id}">${priceStr}</span>
      </div>
    `
  }

  // toggle (checkbox)
  return `
    <label class="addon-item ${qty > 0 ? 'addon-item--active' : ''}" for="${prefix}-addon-${planId}-${a.id}">
      <input
        type="checkbox"
        class="addon-checkbox"
        id="${prefix}-addon-${planId}-${a.id}"
        data-addon-id="${a.id}"
        data-plan-id="${planId}"
        data-prefix="${prefix}"
        aria-label="Adicionar ${a.label} por R$ ${fmt(a.price)}/mês"
        ${qty > 0 ? 'checked' : ''}
      />
      <span class="addon-item-icon"><i data-lucide="${a.icon}"></i></span>
      <div class="addon-item-info">
        <span class="addon-item-label">${a.label}</span>
      </div>
      <span class="addon-item-price">R$ ${fmt(a.price)}/mês</span>
    </label>
  `
}

// ─────────────────────────────────────────────────────────────
// RENDER — BREAKDOWN (RESUMO DE PREÇOS)
// ─────────────────────────────────────────────────────────────

function buildBreakdownHTML(planId) {
  const quantities = getQuantities(planId)
  const { base, extra, total } = calcTotal(planId)
  const hasExtras = extra > 0

  const extraLines = ADDONS
    .filter(a => (quantities[a.id] || 0) > 0)
    .map(a => {
      const qty = quantities[a.id]
      const label = a.type === 'stepper' && qty > 1 ? `${a.label} ×${qty}` : a.label
      return `<div class="breakdown-line extra"><span>${label}</span><span>+ R$ ${fmt(a.price * qty)}</span></div>`
    })
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

// ─────────────────────────────────────────────────────────────
// EVENT BINDING — CHECKBOXES E STEPPERS
// ─────────────────────────────────────────────────────────────

function bindAddonEvents(container, planId, prefix, onChangeCallback) {
  // Checkboxes
  container.querySelectorAll('.addon-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const addonId = cb.dataset.addonId
      setQty(planId, addonId, cb.checked ? 1 : 0)
      // Toggle active class on parent label
      cb.closest('.addon-item')?.classList.toggle('addon-item--active', cb.checked)
      updateCardPrice(planId)
      if (onChangeCallback) onChangeCallback(planId)
    })
  })

  // Stepper buttons
  container.querySelectorAll('.stepper-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const addonId = btn.dataset.addonId
      const action  = btn.dataset.action
      const addon   = ADDONS.find(a => a.id === addonId)
      if (!addon) return

      const currentQty = getQty(planId, addonId)
      const newQty = action === 'inc' ? currentQty + 1 : currentQty - 1
      setQty(planId, addonId, newQty)
      const finalQty = getQty(planId, addonId)

      // Update qty display
      const qtyEl = document.getElementById(`${prefix}-qty-${planId}-${addonId}`)
      if (qtyEl) qtyEl.textContent = finalQty

      // Update price display
      const priceEl = document.getElementById(`${prefix}-price-${planId}-${addonId}`)
      if (priceEl) {
        priceEl.textContent = finalQty > 0
          ? `R$ ${fmt(addon.price * finalQty)}/mês`
          : `R$ ${fmt(addon.price)}/un.`
      }

      // Update button states
      const stepperItem = btn.closest('.addon-stepper-item')
      if (stepperItem) {
        stepperItem.classList.toggle('addon-item--active', finalQty > 0)
        stepperItem.querySelector('.stepper-dec').disabled = finalQty <= (addon.min ?? 0)
        stepperItem.querySelector('.stepper-inc').disabled = finalQty >= (addon.max ?? 99)
      }

      updateCardPrice(planId)
      if (onChangeCallback) onChangeCallback(planId)
    })
  })
}

// ─────────────────────────────────────────────────────────────
// PAINEL DE ADICIONAIS — DESKTOP (dentro do card)
// ─────────────────────────────────────────────────────────────

function buildAddonPanel(planId, container) {
  container.innerHTML = buildPanelHTML(planId)
  bindAddonEvents(container, planId, 'panel', null)
  if (window.lucide) window.lucide.createIcons()
}

function buildPanelHTML(planId) {
  const items = ADDONS.map(a => buildAddonItemHTML(a, planId, 'panel')).join('')

  return `
    <div class="addon-panel-inner">
      <div class="addon-panel-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div class="addon-panel-title" style="margin-bottom: 0;">Personalize seu plano</div>
        <button class="panel-close-btn" onclick="window.__planAddons.closeDesktopPanel('${planId}')" aria-label="Voltar ao plano" style="background: none; border: none; cursor: pointer; color: var(--purple-mid); display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 50%; padding: 0;"><i data-lucide="x" style="width:16px; height:16px;"></i></button>
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

// ─────────────────────────────────────────────────────────────
// TOGGLE DO PAINEL (DESKTOP)
// ─────────────────────────────────────────────────────────────

function openDesktopPanel(planId) {
  const card = document.querySelector(`.plan-card[data-plan-id="${planId}"]`)
  if (!card) return

  const panel = card.querySelector('.plan-addon-panel')

  if (!panel.dataset.rendered) {
    buildAddonPanel(planId, panel)
    panel.dataset.rendered = '1'
  } else {
    // Re-render to reflect current state
    buildAddonPanel(planId, panel)
  }

  const isOpen = card.classList.contains('addon-open')

  if (isOpen) {
    card.classList.remove('addon-open')
  } else {
    document.querySelectorAll('.plan-card.addon-open').forEach(c => {
      if (c !== card) closeDesktopPanel(c.dataset.planId)
    })
    card.classList.add('addon-open')
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
  const items = ADDONS.map(a => buildAddonItemHTML(a, planId, 'sheet')).join('')
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
  closeSheet()

  const bp = getBreakpoint()
  const type = (bp === 'tablet' || bp === 'desktop') ? 'tablet' : 'mobile'
  activeSheetPlanId = planId

  const wrapper = document.createElement('div')
  wrapper.id = `addon-sheet-wrapper-${planId}`
  wrapper.innerHTML = buildSheetHTML(planId, type)
  document.body.appendChild(wrapper)

  bindAddonEvents(wrapper, planId, 'sheet', updateSheetBreakdownFromState)

  const overlay = wrapper.querySelector('.addon-sheet-overlay')
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeSheet(planId)
  })

  document.body.classList.add('addon-sheet-open')

  if (window.lucide) window.lucide.createIcons()

  requestAnimationFrame(() => {
    const sheet = wrapper.querySelector('.addon-bottom-sheet, .addon-tablet-modal')
    if (sheet) sheet.classList.add('sheet-visible')
    overlay.classList.add('overlay-visible')
  })

  setTimeout(() => {
    const firstCb = wrapper.querySelector('.addon-checkbox')
    if (firstCb) firstCb.focus()
  }, 350)

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

  setTimeout(() => {
    if (wrapper._escHandler) {
      document.removeEventListener('keydown', wrapper._escHandler)
    }
    wrapper.remove()
  }, 350)

  document.body.classList.remove('addon-sheet-open')
  activeSheetPlanId = null
}

function updateSheetBreakdownFromState(planId) {
  updateSheetBreakdown(planId)
}

function updateSheetBreakdown(planId) {
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
  state[planId] = {}
  persistSaved(planId, {})
  updateCardPrice(planId)

  // Re-render desktop panel if open
  const card = document.querySelector(`.plan-card[data-plan-id="${planId}"]`)
  if (card && card.classList.contains('addon-open')) {
    const panel = card.querySelector('.plan-addon-panel')
    if (panel) {
      buildAddonPanel(planId, panel)
    }
  }
}

// ─────────────────────────────────────────────────────────────
// WIZARD INTEGRATION
// ─────────────────────────────────────────────────────────────

function buildWizardAddonsHTML(planId) {
  const items = ADDONS.map(a => buildAddonItemHTML(a, planId, 'wizard')).join('')

  return `
    <div class="addon-items-list" id="wizard-addons-list-${planId}">
      ${items}
    </div>
    <div class="addon-breakdown" id="wizard-addon-breakdown">
      ${buildBreakdownHTML(planId)}
    </div>
  `
}

function initWizardAddonsEvents(planId) {
  const container = document.getElementById(`wizard-addons-list-${planId}`)
  if (!container) return

  bindAddonEvents(container, planId, 'wizard', (pid) => {
    const breakdownEl = document.getElementById('wizard-addon-breakdown')
    if (breakdownEl) breakdownEl.innerHTML = buildBreakdownHTML(pid)
    if (window.renderWizardSummary) window.renderWizardSummary(pid)
  })

  if (window.lucide) window.lucide.createIcons()
}

// Legacy compatibility — called by wizard.js via onchange inline (não mais usado, mantido por segurança)
function handleWizardCheckboxChange(cb, planId) {
  const addonId = cb.dataset.addonId
  setQty(planId, addonId, cb.checked ? 1 : 0)
  updateCardPrice(planId)
  const breakdownEl = document.getElementById('wizard-addon-breakdown')
  if (breakdownEl) breakdownEl.innerHTML = buildBreakdownHTML(planId)
  if (window.renderWizardSummary) window.renderWizardSummary(planId)
}

// ─────────────────────────────────────────────────────────────
// INICIALIZAÇÃO
// ─────────────────────────────────────────────────────────────

export function initPlanAddons() {
  // Bind toggle buttons via onclick no HTML (já conectados pelo HTML inline)
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
    getQuantities(planId) // inicializa do localStorage
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
  window.__planAddons = {
    handleToggle,
    closeSheet,
    closeDesktopPanel,
    applyPlan,
    calcTotal,
    resetPlan,
    buildWizardAddonsHTML,
    initWizardAddonsEvents,
    handleWizardCheckboxChange,
  }
}
