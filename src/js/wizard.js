/**
 * Wizard Modal Module — Ligeira Telecom
 * Handles: 4-step subscription wizard with plan selection, personal data, address, and confirmation
 * Plans updated: 300/400/600/800 MEGA — pontualidade pricing
 */

// ======================== PLAN DATA ========================
const PLANS = {
  '300': {
    name: 'Plano 300 MEGA',
    speed: '300 MEGA download',
    price: 'R$ 69,90',
    priceDisplay: 'R$ 69,<small>90</small><span>/mês</span>',
    note: 'pagando até o vencimento',
  },
  '400': {
    name: 'Plano 400 MEGA',
    speed: '400 MEGA download',
    price: 'R$ 74,90',
    priceDisplay: 'R$ 74,<small>90</small><span>/mês</span>',
    note: 'pagando até o vencimento',
  },
  '600': {
    name: 'Plano 600 MEGA',
    speed: '600 MEGA download',
    price: 'R$ 83,90',
    priceDisplay: 'R$ 83,<small>90</small><span>/mês</span>',
    note: 'pagando até o vencimento',
  },
  '800': {
    name: 'Plano 800 MEGA',
    speed: '800 MEGA download',
    price: 'R$ 99,90',
    priceDisplay: 'R$ 99,<small>90</small><span>/mês</span>',
    note: 'pagando até o vencimento',
  },
};

// ======================== STATE ========================
let selectedPlan = '600';
let currentStep = 1;
const TOTAL_STEPS = 5;

// ======================== DOM HELPERS ========================
const $ = (id) => document.getElementById(id);

// ======================== OPEN / CLOSE ========================
function openWizard(planId = '600', step = 1) {
  selectedPlan = planId && PLANS[planId] ? planId : '600';
  currentStep = step;
  renderWizard();
  const overlay = $('wizard-overlay');
  if (overlay) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeWizard() {
  const overlay = $('wizard-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    currentStep = 1;
  }
}

// ======================== NAVIGATION ========================
function nextStep() {
  if (currentStep < TOTAL_STEPS) {
    currentStep++;
    renderWizard();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    renderWizard();
  }
}

// ======================== RENDER ========================
function getDynamicPlanInfo(planId) {
  const basePlan = PLANS[planId];
  if (!basePlan) return null;
  
  if (window.__planAddons && window.__planAddons.calcTotal) {
    const { total, extra } = window.__planAddons.calcTotal(planId);
    if (extra > 0) {
      const intPart = Math.floor(total);
      const decPart = Math.round((total - intPart) * 100).toString().padStart(2, '0');
      const fmtStr = total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/,\d+$/, '');
      return {
        ...basePlan,
        name: basePlan.name + ' (Personalizado)',
        price: `R$ ${fmtStr},${decPart}`,
        priceDisplay: `R$ ${fmtStr},<small>${decPart}</small><span>/mês</span>`
      };
    }
  }
  return basePlan;
}

function renderWizard() {
  const plan = getDynamicPlanInfo(selectedPlan);

  // Update step label & progress
  const stepLabel = document.querySelector('.wizard-step-label');
  const progressFill = document.querySelector('.wizard-progress-fill');
  const wizardTitle = document.querySelector('.wizard-title');

  if (stepLabel) stepLabel.textContent = `Passo ${currentStep} de ${TOTAL_STEPS}`;
  if (progressFill) progressFill.style.width = `${(currentStep / TOTAL_STEPS) * 100}%`;

  // Update plan summary
  const planNameEl = document.querySelector('.wizard-plan-name');
  const planSpeedEl = document.querySelector('.wizard-plan-speed');
  const planPriceEl = document.querySelector('.wizard-plan-price');

  if (planNameEl) planNameEl.textContent = plan.name;
  if (planSpeedEl) planSpeedEl.textContent = plan.speed;
  if (planPriceEl) planPriceEl.innerHTML = plan.priceDisplay;

  // Render step content
  const wizardBody = document.querySelector('.wizard-body');
  if (!wizardBody) return;

  const summaryHtml = `
    <div class="wizard-plan-summary">
      <div>
        <div class="wizard-plan-name">${plan.name}</div>
        <div class="wizard-plan-speed">${plan.speed}</div>
      </div>
      <div style="text-align:right;">
        <div class="wizard-plan-price">${plan.priceDisplay}</div>
        <div style="font-size:11px;color:var(--gray-400);margin-top:2px;">${plan.note}</div>
      </div>
      <div style="display:flex; gap:8px; margin-top:8px;">
        <button class="wizard-change" onclick="window.wizardChangePlan()">Trocar plano</button>
        <button class="wizard-change" style="color:var(--purple-mid)" onclick="window.__planAddons.handleToggle('${selectedPlan}')">Personalizar plano</button>
      </div>
    </div>
  `;

  window.renderWizardSummary = function(planId) {
    if (planId !== selectedPlan) return;
    const plan = getDynamicPlanInfo(planId);
    const planNameEl = document.querySelector('.wizard-plan-name');
    const planPriceEl = document.querySelector('.wizard-plan-price');
    if (planNameEl) planNameEl.textContent = plan.name;
    if (planPriceEl) planPriceEl.innerHTML = plan.priceDisplay;
  };

  switch (currentStep) {
    case 1:
      if (wizardTitle) wizardTitle.textContent = 'Escolha seu plano';
      wizardBody.innerHTML = renderStep1();
      break;
    case 2:
      if (wizardTitle) wizardTitle.textContent = 'Seus dados';
      wizardBody.innerHTML = summaryHtml + renderStep2();
      break;
    case 3:
      if (wizardTitle) wizardTitle.textContent = 'Endereço de instalação';
      wizardBody.innerHTML = summaryHtml + renderStep3();
      applyAddressMask();
      break;
    case 4:
      if (wizardTitle) wizardTitle.textContent = 'Personalize seu plano';
      wizardBody.innerHTML = summaryHtml + renderStep4();
      if (window.lucide) window.lucide.createIcons();
      break;
    case 5:
      if (wizardTitle) wizardTitle.textContent = 'Confirmação';
      wizardBody.innerHTML = renderStep5();
      break;
  }
}

// ======================== STEP RENDERERS ========================
function renderStep1() {
  return `
    <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px;">
      ${Object.entries(PLANS).map(([id, p]) => `
        <div class="wizard-plan-option ${selectedPlan === id ? 'active' : ''}"
             style="border:2px solid ${selectedPlan === id ? 'var(--purple-mid)' : 'var(--gray-200)'};
                    border-radius:var(--radius-md);padding:16px 20px;cursor:pointer;
                    background:${selectedPlan === id ? 'rgba(74,43,154,0.06)' : 'white'};
                    transition:all 0.15s;display:flex;align-items:center;justify-content:space-between;"
             onclick="window.wizardSelectPlan('${id}')">
          <div>
            <div style="font-size:16px;font-weight:800;color:var(--gray-900)">${id} MEGA</div>
            <div style="font-size:12px;color:var(--gray-400);margin-top:2px;">Fibra óptica · download</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:18px;font-weight:900;color:${selectedPlan === id ? 'var(--purple-dark)' : 'var(--gray-700)'};">${p.price}</div>
            <div style="font-size:11px;color:var(--gray-400);">/${p.note.replace('pagando até o vencimento', 'mês')}</div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="wizard-footer">
      <button class="wizard-btn-next" onclick="window.wizardNext()">Continuar</button>
    </div>
  `;
}

function renderStep2() {
  return `
    <div class="wizard-field"><label>Nome completo</label><input id="w-name" type="text" placeholder="Seu nome completo" /></div>
    <div class="wizard-grid">
      <div class="wizard-field"><label>CPF</label><input id="w-cpf" type="text" placeholder="000.000.000-00" maxlength="14" oninput="applyCpfMask(this)" /></div>
      <div class="wizard-field"><label>Data de nascimento</label><input id="w-birth" type="date" /></div>
    </div>
    <div class="wizard-grid">
      <div class="wizard-field"><label>WhatsApp</label><input id="w-phone" type="tel" placeholder="(88) 99999-9999" maxlength="15" oninput="applyPhoneMask(this)" /></div>
      <div class="wizard-field"><label>E-mail</label><input id="w-email" type="email" placeholder="seu@email.com" /></div>
    </div>
    <div class="wizard-privacy">
      <input type="checkbox" id="w-privacy" />
      <label for="w-privacy">Li e aceito os <a href="#">Termos de Uso</a> e a <a href="#">Política de Privacidade</a> da Ligeira Telecom.</label>
    </div>
    <div class="wizard-footer">
      <button class="wizard-btn-back" onclick="window.wizardPrev()">Voltar</button>
      <button class="wizard-btn-next" onclick="window.wizardNext()">Continuar</button>
    </div>
  `;
}

function renderStep3() {
  return `
    <div class="wizard-grid">
      <div class="wizard-field"><label>CEP</label><input id="w-cep" type="text" placeholder="00000-000" maxlength="9" oninput="applyWizardCepMask(this)" /></div>
      <div class="wizard-field"><label>Número</label><input id="w-num" type="text" placeholder="Ex: 123" /></div>
    </div>
    <div class="wizard-field"><label>Rua / Logradouro</label><input id="w-street" type="text" placeholder="Nome da rua" /></div>
    <div class="wizard-grid">
      <div class="wizard-field"><label>Bairro</label><input id="w-neighborhood" type="text" placeholder="Bairro" /></div>
      <div class="wizard-field"><label>Complemento</label><input id="w-complement" type="text" placeholder="Apto, casa... (opcional)" /></div>
    </div>
    <div class="wizard-grid">
      <div class="wizard-field"><label>Cidade</label><input id="w-city" type="text" placeholder="Cidade" /></div>
      <div class="wizard-field"><label>Estado</label><select id="w-state"><option value="">Estado</option><option selected>CE</option><option>PE</option><option>PB</option><option>RN</option></select></div>
    </div>
    <div class="wizard-footer">
      <button class="wizard-btn-back" onclick="window.wizardPrev()">Voltar</button>
      <button class="wizard-btn-next" onclick="window.wizardNext()">Continuar</button>
    </div>
  `;
}

function renderStep4() {
  const addonsHtml = window.__planAddons && window.__planAddons.buildWizardAddonsHTML 
                     ? window.__planAddons.buildWizardAddonsHTML(selectedPlan) 
                     : '<p>Serviço de personalização indisponível.</p>';
  return `
    <div style="margin-bottom:24px;">
      ${addonsHtml}
    </div>
    <div class="wizard-footer">
      <button class="wizard-btn-back" onclick="window.wizardPrev()">Voltar</button>
      <button class="wizard-btn-next" onclick="window.wizardNext()">Confirmar pedido</button>
    </div>
  `;
}

function renderStep5() {
  const plan = getDynamicPlanInfo(selectedPlan);
  return `
    <div style="text-align:center;padding:20px 0 32px;">
      <div style="width:80px;height:80px;background:rgba(16,185,129,0.12);border:2px solid rgba(16,185,129,0.3);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
      </div>
      <h3 style="font-size:24px;font-weight:900;color:var(--gray-900);margin-bottom:8px;">Solicitação enviada!</h3>
      <p style="font-size:15px;color:var(--gray-600);line-height:1.6;max-width:380px;margin:0 auto 24px;">
        Seu pedido para o <strong>${plan.name}</strong> foi registrado com sucesso.<br>
        Nossa equipe entrará em contato em breve via WhatsApp.
      </p>
      <div style="background:var(--gray-50);border:1px solid var(--gray-200);border-radius:var(--radius-lg);padding:16px 20px;margin-bottom:28px;display:inline-block;text-align:left;">
        <div style="font-size:13px;color:var(--gray-500);margin-bottom:4px;">Plano selecionado</div>
        <div style="font-size:20px;font-weight:900;color:var(--purple-dark);">${plan.name}</div>
        <div style="font-size:14px;color:var(--gray-600);margin-top:4px;">${plan.price}<span style="font-size:12px;color:var(--gray-400);">/mês · ${plan.note}</span></div>
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <a href="https://wa.me/5588963700021?text=Ol%C3%A1!%20Acabei%20de%20solicitar%20o%20${encodeURIComponent(plan.name)}%20e%20quero%20confirmar%20o%20pedido."
           target="_blank" class="btn-whatsapp-lg" style="font-size:14px;padding:12px 22px;">
          <i data-lucide="message-circle"></i> Confirmar pelo WhatsApp
        </a>
        <button class="wizard-btn-back" onclick="window.closeWizard()" style="padding:12px 22px;">Fechar</button>
      </div>
    </div>
  `;
}

// ======================== MASKS ========================
function applyAddressMask() {
  const cepField = document.getElementById('w-cep');
  if (!cepField) return;
  cepField.addEventListener('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 5) v = v.slice(0, 5) + '-' + v.slice(5, 8);
    this.value = v;

    if (v.replace(/\D/g, '').length === 8) {
      fetchCepData(v.replace(/\D/g, ''));
    }
  });
}

async function fetchCepData(cep) {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if (!data.erro) {
      const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
      setVal('w-street', data.logradouro);
      setVal('w-neighborhood', data.bairro);
      setVal('w-city', data.localidade);
      setVal('w-state', data.uf);
    }
  } catch {}
}

// Expose masks to global scope for inline HTML handlers
window.applyCpfMask = function (el) {
  let v = el.value.replace(/\D/g, '');
  v = v.slice(0, 11);
  if (v.length > 9) v = v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6,9)+'-'+v.slice(9);
  else if (v.length > 6) v = v.slice(0,3)+'.'+v.slice(3,6)+'.'+v.slice(6);
  else if (v.length > 3) v = v.slice(0,3)+'.'+v.slice(3);
  el.value = v;
};

window.applyPhoneMask = function (el) {
  let v = el.value.replace(/\D/g, '').slice(0, 11);
  if (v.length >= 7) v = '(' + v.slice(0,2) + ') ' + v.slice(2,7) + '-' + v.slice(7);
  else if (v.length >= 3) v = '(' + v.slice(0,2) + ') ' + v.slice(2);
  else if (v.length >= 1) v = '(' + v;
  el.value = v;
};

window.applyWizardCepMask = function (el) {
  let v = el.value.replace(/\D/g, '').slice(0,8);
  if (v.length > 5) v = v.slice(0,5) + '-' + v.slice(5);
  el.value = v;
};

// ======================== INIT ========================
export function initWizard() {
  // Expose methods globally so HTML onclick attributes work
  window.abrirWizard = openWizard;
  window.closeWizard = closeWizard;
  window.wizardNext = nextStep;
  window.wizardPrev = prevStep;
  window.wizardSelectPlan = (planId) => {
    selectedPlan = planId;
    document.querySelectorAll('.wizard-plan-option').forEach(opt => {
      const isSelected = opt.getAttribute('onclick')?.includes(`'${planId}'`);
      opt.style.borderColor = isSelected ? 'var(--purple-mid)' : 'var(--gray-200)';
      opt.style.background = isSelected ? 'rgba(74,43,154,0.06)' : 'white';
    });
  };
  window.wizardChangePlan = () => {
    currentStep = 1;
    renderWizard();
  };

  // Close on overlay click
  const overlay = document.getElementById('wizard-overlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeWizard();
    });
  }

  // Close button
  const closeBtn = document.querySelector('.wizard-close');
  if (closeBtn) closeBtn.addEventListener('click', closeWizard);

  // Mobile bar plan button
  const mobilePlanBtn = document.getElementById('mobile-btn-planos');
  if (mobilePlanBtn) mobilePlanBtn.addEventListener('click', () => openWizard());
}
