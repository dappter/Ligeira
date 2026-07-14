/**
 * Coverage Module — Ligeira Telecom
 * Handles: CEP auto-fill (ViaCEP), Leaflet map, Nominatim geocoding, mobile step flow
 */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const COVERED_CEPS = [
  '63010', '63011', '63012', '63013', '63014', '63015', '63016', '63017',
  '63018', '63019', '63040', '63041', '63042', '63043', '63044', '63045',
  '63046', '63047', '63048', '63049', '63050', '63051', '63052',
  '63240', '63250', '63260', '63270', '63280', '63290',
  '63100', '63101', '63102', '63103', '63104', '63105',
  '63170', '63171', '63172', '63173',
];

const DEFAULT_LAT = -7.2095;
const DEFAULT_LON = -39.3175;

let map = null;
let marker = null;
let currentCEP = '';
let cepTimer = null;

export function initCoverage() {
  initMap();
  bindEvents();
  handleURLParams();
}

// ============================================================
// MAP
// ============================================================

function initMap() {
  if (!document.getElementById('cov-map')) return;

  map = L.map('cov-map', {
    center: [DEFAULT_LAT, DEFAULT_LON],
    zoom: 16,
    zoomControl: true,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    maxZoom: 19,
  }).addTo(map);

  const customIcon = L.divIcon({
    className: 'cov-leaflet-icon',
    html: '<div class="cov-pin"><span></span></div>',
    iconSize: [32, 44],
    iconAnchor: [16, 44],
  });

  marker = L.marker([DEFAULT_LAT, DEFAULT_LON], {
    icon: customIcon,
    draggable: true,
  }).addTo(map);

  marker.on('dragend', showConfirmBar);

  setTimeout(() => {
    if (map) map.invalidateSize();
  }, 200);
}

// ============================================================
// EVENTS
// ============================================================

function bindEvents() {
  const cepInput = document.getElementById('cov-cep');
  if (cepInput) cepInput.addEventListener('input', onCEPInput);

  const form = document.getElementById('cov-form');
  if (form) form.addEventListener('submit', onVerify);

  const confirmBtn = document.getElementById('cov-btn-confirm');
  if (confirmBtn) confirmBtn.addEventListener('click', onConfirm);

  const backBtn = document.getElementById('cov-btn-back');
  if (backBtn) backBtn.addEventListener('click', goToStep1);

  const locBtn = document.getElementById('cov-btn-location');
  if (locBtn) locBtn.addEventListener('click', useGeolocation);
}

// ============================================================
// GEOLOCATION
// ============================================================

async function useGeolocation() {
  if (!navigator.geolocation) {
    alert('Geolocalização não é suportada pelo seu navegador.');
    return;
  }
  
  const btn = document.getElementById('cov-btn-location');
  const originalText = btn.innerHTML;
  btn.innerHTML = 'Buscando...';
  btn.disabled = true;

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      
      if (map && marker) {
        map.setView([lat, lon], 17);
        marker.setLatLng([lat, lon]);
      }
      
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data && data.address) {
          const cepInput = document.getElementById('cov-cep');
          const addressInput = document.getElementById('cov-endereco');
          const bairroInput = document.getElementById('cov-bairro');
          const cidadeInput = document.getElementById('cov-cidade');
          
          if (cepInput && data.address.postcode) cepInput.value = data.address.postcode;
          if (addressInput && data.address.road) addressInput.value = data.address.road;
          if (bairroInput) bairroInput.value = data.address.suburb || data.address.neighbourhood || '';
          if (cidadeInput) cidadeInput.value = data.address.city || data.address.town || data.address.village || '';
        }
      } catch (err) {
        console.error('Reverse geocoding failed', err);
      }
      
      btn.innerHTML = originalText;
      btn.disabled = false;
      if (window.lucide) window.lucide.createIcons();
      
      // Go to map step
      const formPanel = document.getElementById('cov-step-form');
      const mapPanel = document.getElementById('cov-step-map');
      if (formPanel) formPanel.classList.add('hide');
      if (mapPanel) mapPanel.classList.add('show');
      
      setTimeout(() => {
        if (map) map.invalidateSize();
      }, 300);
    },
    (err) => {
      console.error(err);
      alert('Não foi possível obter sua localização. Por favor, digite seu CEP.');
      btn.innerHTML = originalText;
      btn.disabled = false;
      if (window.lucide) window.lucide.createIcons();
    },
    { enableHighAccuracy: true, timeout: 10000 }
  );
}

// ============================================================
// CEP AUTO-FILL
// ============================================================

function onCEPInput(e) {
  let val = e.target.value.replace(/\D/g, '');
  if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8);
  e.target.value = val;

  const digits = val.replace(/\D/g, '');
  currentCEP = digits;

  clearTimeout(cepTimer);

  if (digits.length === 8) {
    setCEPStatus('Buscando endereco...', '');
    cepTimer = setTimeout(() => lookupCEP(digits), 500);
  } else {
    setCEPStatus('', '');
  }
}

async function lookupCEP(cep) {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    if (data.erro) {
      setCEPStatus('CEP nao encontrado. Verifique e tente novamente.', 'error');
      clearAutoFields();
      return;
    }

    fillField('cov-endereco', data.logradouro || '');
    fillField('cov-bairro', data.bairro || '');
    fillField('cov-cidade', data.localidade || '');
    fillField('cov-estado', data.uf || '');

    setCEPStatus('Endereco encontrado!', 'success');

    const numEl = document.getElementById('cov-numero');
    if (numEl) setTimeout(() => numEl.focus(), 120);
  } catch {
    setCEPStatus('Erro ao buscar CEP. Verifique sua conexao.', 'error');
  }
}

function fillField(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.value = value;
  el.classList.toggle('filled', Boolean(value));
}

function clearAutoFields() {
  ['cov-endereco', 'cov-bairro', 'cov-cidade', 'cov-estado'].forEach(id =>
    fillField(id, '')
  );
}

function setCEPStatus(msg, type) {
  const el = document.getElementById('cov-cep-status');
  if (!el) return;
  el.textContent = msg;
  el.className = `cov-cep-status${type ? ' ' + type : ''}`;
}

// ============================================================
// VERIFY (geocode + show map)
// ============================================================

async function onVerify(e) {
  e.preventDefault();

  if (currentCEP.length < 8) {
    setCEPStatus('Por favor, informe um CEP valido.', 'error');
    document.getElementById('cov-cep')?.focus();
    return;
  }

  const endereco = document.getElementById('cov-endereco')?.value || '';
  const numero   = document.getElementById('cov-numero')?.value   || '';
  const bairro   = document.getElementById('cov-bairro')?.value   || '';
  const cidade   = document.getElementById('cov-cidade')?.value   || '';
  const estado   = document.getElementById('cov-estado')?.value   || '';

  const btn = document.getElementById('cov-btn-verify');
  if (btn) { btn.disabled = true; btn.textContent = 'Localizando...'; }

  try {
    const parts = [endereco, numero, bairro, cidade, estado, 'Brasil'].filter(Boolean);
    let coords = await geocode(parts.join(', '));

    if (!coords && cidade) {
      coords = await geocode(`${cidade}, ${estado}, Brasil`);
    }

    if (coords && map && marker) {
      marker.setLatLng([coords.lat, coords.lon]);
      map.flyTo([coords.lat, coords.lon], 16, { duration: 1.2, easeLinearity: 0.25 });
    }
  } catch {
    // Continue even if geocoding fails
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i data-lucide="map-pin"></i> Verificar Viabilidade';
      if (typeof lucide !== 'undefined') lucide.createIcons();
    }
  }

  showConfirmBar();
  goToStep2();
}

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&countrycodes=br`;
  const res = await fetch(url, { headers: { 'Accept-Language': 'pt-BR,pt;q=0.9' } });
  const data = await res.json();
  if (data && data.length > 0) {
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }
  return null;
}

// ============================================================
// CONFIRM
// ============================================================

function onConfirm() {
  const prefix  = currentCEP.slice(0, 5);
  const covered = COVERED_CEPS.some(c => prefix === c || c.startsWith(prefix) || prefix.startsWith(c));

  hideConfirmBar();
  goToStep1();

  setTimeout(() => showResult(covered), isMobile() ? 380 : 0);
}

function showResult(covered) {
  const el = document.getElementById('cov-result');
  if (!el) return;

  if (covered) {
    el.className = 'cov-result success';
    el.innerHTML = `
      <div class="cov-result-icon">🎉</div>
      <div class="cov-result-title">Boa noticia! Sua regiao tem cobertura Ligeira.</div>
      <div class="cov-result-desc">A fibra Ligeira ja atende sua rua. Escolha seu plano agora!</div>
      <a href="index.html#planos" class="cov-btn-plan">Ver planos disponiveis →</a>
    `;
  } else {
    el.className = 'cov-result error';
    el.innerHTML = `
      <div class="cov-result-icon">😕</div>
      <div class="cov-result-title">Ainda nao chegamos ai.</div>
      <div class="cov-result-desc">Sua regiao ainda nao possui cobertura, mas estamos expandindo! Deixe seu contato e te avisamos assim que chegar.</div>
      <div class="cov-lead-form">
        <input id="lead-name"  class="cov-input cov-lead-inp" placeholder="Seu nome" />
        <input id="lead-phone" class="cov-input cov-lead-inp" placeholder="WhatsApp (88) 9..." inputmode="tel" />
        <button class="cov-btn-lead" id="cov-btn-lead">Me avisar quando chegar</button>
      </div>
    `;
    document.getElementById('cov-btn-lead')?.addEventListener('click', () => {
      const name  = document.getElementById('lead-name')?.value.trim();
      const phone = document.getElementById('lead-phone')?.value.trim();
      if (!name || !phone) {
        alert('Por favor, preencha seu nome e WhatsApp.');
        return;
      }
      alert(`Obrigado, ${name}! Avisaremos no WhatsApp quando a Ligeira chegar na sua rua.`);
    });
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================================
// STEP CONTROL
// ============================================================

function isMobile() {
  return window.innerWidth < 900;
}

function goToStep2() {
  if (isMobile()) {
    const mapPanel = document.getElementById('cov-step-map');
    if (mapPanel) {
      mapPanel.classList.add('active');
      setTimeout(() => map?.invalidateSize(), 200);
    }
  } else {
    setTimeout(() => map?.invalidateSize(), 100);
  }
}

function goToStep1() {
  const mapPanel = document.getElementById('cov-step-map');
  if (mapPanel) mapPanel.classList.remove('active');
}

function showConfirmBar() {
  const bar = document.getElementById('cov-confirm-bar');
  if (bar) bar.classList.add('visible');
}

function hideConfirmBar() {
  const bar = document.getElementById('cov-confirm-bar');
  if (bar) bar.classList.remove('visible');
}

// ============================================================
// URL PARAMS (?cep=XXXXX from hero bar)
// ============================================================

function handleURLParams() {
  const params = new URLSearchParams(window.location.search);
  const cepParam = params.get('cep');
  if (!cepParam) return;

  const digits = cepParam.replace(/\D/g, '');
  if (!digits) return;

  currentCEP = digits;
  const input = document.getElementById('cov-cep');
  if (input) {
    let formatted = digits;
    if (digits.length > 5) formatted = digits.slice(0, 5) + '-' + digits.slice(5, 8);
    input.value = formatted;
  }

  if (digits.length === 8) {
    setTimeout(() => lookupCEP(digits), 700);
  }
}
