/**
 * Coverage Module — Ligeira Telecom
 * Handles: CEP / address / GPS coverage check flow
 */

const COVERED_CITIES = [
  'juazeiro do norte', 'brejo santo', 'mauriti', 'milagres', 'penaforte'
];

const COVERED_CEPS = [
  '63010', '63011', '63012', '63013', '63014', '63015', '63016', '63017',
  '63018', '63019', '63040', '63041', '63042', '63043', '63044', '63045',
  '63046', '63047', '63048', '63049', '63050', '63051', '63052',
  '63240', '63250', '63260', '63270', '63280', '63290',
  '63100', '63101', '63102', '63103', '63104', '63105',
  '63170', '63171', '63172', '63173',
];

let currentMethod = 'cep';

export function initCoverage() {
  // Method tabs
  const methodBtns = document.querySelectorAll('[data-method]');
  const cepInput = document.getElementById('coverage-cep-input');
  const addressInput = document.getElementById('coverage-address-input');
  const gpsInput = document.getElementById('coverage-gps-input');

  methodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      methodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMethod = btn.dataset.method;

      if (cepInput) cepInput.style.display = currentMethod === 'cep' ? 'flex' : 'none';
      if (addressInput) addressInput.style.display = currentMethod === 'address' ? 'flex' : 'none';
      if (gpsInput) gpsInput.style.display = currentMethod === 'gps' ? 'flex' : 'none';
    });
  });

  // CEP masking
  const cepField = document.getElementById('cep-input');
  if (cepField) {
    cepField.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '');
      if (val.length > 5) val = val.slice(0, 5) + '-' + val.slice(5, 8);
      e.target.value = val;
    });
  }

  // Search buttons
  const searchBtns = document.querySelectorAll('.btn-coverage-search');
  searchBtns.forEach(btn => {
    btn.addEventListener('click', handleSearch);
  });

  // GPS button
  const gpsBtn = document.getElementById('use-gps-btn');
  if (gpsBtn) gpsBtn.addEventListener('click', useGPS);
}

function handleSearch() {
  const resultArea = document.getElementById('coverage-result');
  if (!resultArea) return;

  if (currentMethod === 'cep') {
    const cep = document.getElementById('cep-input')?.value.replace(/\D/g, '') || '';
    if (cep.length < 5) {
      showResult('error', 'CEP inválido', 'Digite pelo menos os 5 primeiros dígitos do CEP.');
      return;
    }
    const prefix = cep.slice(0, 5);
    if (COVERED_CEPS.some(c => prefix.startsWith(c.slice(0, 5)))) {
      showResult('success', 'Boa notícia! Sua região tem cobertura Ligeira.', 'A Ligeira Fibra já atende sua região. Clique abaixo para escolher seu plano.');
    } else {
      showResult('error', 'Ops! Ainda não chegamos aí.', 'Infelizmente sua região ainda não possui cobertura. Deixe seu contato e avisamos quando chegar.');
    }
  } else if (currentMethod === 'address') {
    const addr = document.getElementById('address-input')?.value.toLowerCase() || '';
    const covered = COVERED_CITIES.some(city => addr.includes(city));
    if (covered) {
      showResult('success', 'Boa notícia! Sua região tem cobertura Ligeira.', 'A Ligeira Fibra atende sua cidade. Clique abaixo para escolher seu plano.');
    } else {
      showResult('error', 'Ops! Ainda não chegamos aí.', 'Sua cidade ainda não possui cobertura. Deixe seu contato e avisamos quando chegar.');
    }
  }
}

function useGPS() {
  const gpsStatus = document.getElementById('gps-status');
  if (!navigator.geolocation) {
    if (gpsStatus) gpsStatus.textContent = 'Geolocalização não suportada neste navegador.';
    return;
  }
  if (gpsStatus) gpsStatus.textContent = 'Obtendo sua localização...';
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      // Rough bounding box for Cariri region
      const inCariri =
        latitude >= -7.5 && latitude <= -6.5 &&
        longitude >= -40.0 && longitude <= -38.5;
      if (gpsStatus) gpsStatus.textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
      if (inCariri) {
        showResult('success', 'Boa notícia! Sua região tem cobertura Ligeira.', 'A Ligeira Fibra atende sua área. Clique abaixo para escolher seu plano.');
      } else {
        showResult('error', 'Ops! Ainda não chegamos aí.', 'Sua localização está fora da nossa área de cobertura atual.');
      }
    },
    () => {
      if (gpsStatus) gpsStatus.textContent = 'Não foi possível obter sua localização. Verifique as permissões.';
    }
  );
}

function showResult(type, title, description) {
  const resultArea = document.getElementById('coverage-result');
  if (!resultArea) return;

  resultArea.className = `coverage-result-box ${type}`;

  const iconName = type === 'success' ? 'check-circle' : 'alert-circle';
  resultArea.innerHTML = `
    <div class="result-icon">
      <i data-lucide="${iconName}"></i>
    </div>
    <div>
      <div class="result-title">${title}</div>
      <div class="result-desc">${description}</div>
      ${type === 'success'
        ? `<button class="btn-orange" style="margin-top:14px;" onclick="window.location.href='index.html#planos'">Escolher plano</button>`
        : `<div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
             <input id="lead-name" placeholder="Seu nome" style="padding:8px 12px;border:1.5px solid var(--gray-300);border-radius:8px;font-size:13px;flex:1;min-width:120px;font-family:Montserrat,sans-serif;" />
             <input id="lead-phone" placeholder="WhatsApp" style="padding:8px 12px;border:1.5px solid var(--gray-300);border-radius:8px;font-size:13px;flex:1;min-width:120px;font-family:Montserrat,sans-serif;" />
             <button onclick="alert('Cadastro realizado! Entraremos em contato.')" style="padding:8px 14px;background:var(--orange);border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:Montserrat,sans-serif;">Avisar-me</button>
           </div>`
      }
    </div>
  `;

  // Re-initialize Lucide icons for dynamically added icons
  if (typeof lucide !== 'undefined') lucide.createIcons();
}
