// === State ===
let loans = [];
let results = null;

// DOM
const loanList = document.getElementById('loanList');
const emptyState = document.getElementById('emptyState');
const btnCompare = document.getElementById('btnCompare');
const resultsContent = document.getElementById('resultsContent');
const resultsPlaceholder = document.querySelector('.results-placeholder');

document.getElementById('btnAddLoan').addEventListener('click', addLoan);
btnCompare.addEventListener('click', compare);

function createLoan() {
  return {
    id: Date.now() + Math.random(),
    name: `方案 ${String.fromCharCode(64 + loans.length + 1)}`,
    principal: 0,
    rate: 0,
    termMonths: 12
  };
}

function addLoan() {
  loans.push(createLoan());
  render();
}

function removeLoan(id) {
  loans = loans.filter(l => l.id !== id);
  results = null;
  render();
}

function updateLoan(id, field, value) {
  const loan = loans.find(l => l.id === id);
  if (!loan) return;
  loan[field] = field === 'name' ? value : parseFloat(value) || 0;
  results = null;
  renderSummary();
}

function render() {
  renderLoanList();
  renderSummary();
  renderResults();
}

function renderLoanList() {
  if (loans.length === 0) {
    loanList.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  loanList.innerHTML = loans.map(loan => `
    <div class="loan-card">
      <div class="loan-card-header">
        <input class="loan-name" value="${escapeHtml(loan.name)}"
               onchange="updateLoan(${loan.id}, 'name', this.value)">
        <button class="btn btn-sm" onclick="removeLoan(${loan.id})">删除</button>
      </div>
      <div class="loan-fields">
        <div class="field">
          <label>贷款金额 (¥)</label>
          <div class="input-with-icon">
            <span class="input-icon">¥</span>
            <input type="number" value="${loan.principal || ''}" placeholder="0"
                   onchange="updateLoan(${loan.id}, 'principal', this.value)">
          </div>
        </div>
        <div class="field">
          <label>年利率 (%)</label>
          <div class="input-with-icon">
            <span class="input-icon">%</span>
            <input type="number" value="${loan.rate || ''}" placeholder="0" step="0.01"
                   onchange="updateLoan(${loan.id}, 'rate', this.value)">
          </div>
        </div>
        <div class="field">
          <label>贷款期限 (月)</label>
          <div class="input-with-icon">
            <span class="input-icon">📅</span>
            <input type="number" value="${loan.termMonths || ''}" placeholder="12"
                   onchange="updateLoan(${loan.id}, 'termMonths', this.value)">
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderSummary() {
  const hasValid = loans.filter(l => l.principal > 0 && l.rate > 0 && l.termMonths > 0).length >= 2;
  btnCompare.style.display = loans.length >= 2 ? 'block' : 'none';

  if (results) {
    results = null;
    renderResults();
  }
}

function renderResults() {
  if (!results) {
    resultsContent.style.display = 'none';
    resultsPlaceholder.style.display = 'flex';
    return;
  }
  resultsPlaceholder.style.display = 'none';
  resultsContent.style.display = 'block';
  resultsContent.innerHTML = buildResultsHTML();
  requestAnimationFrame(() => drawChart());
}

// === PMT Formula ===
function calcPMT(principal, annualRate, termMonths) {
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / termMonths;
  return principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths) /
         (Math.pow(1 + monthlyRate, termMonths) - 1);
}

function calcLoan(loan) {
  const monthlyPayment = calcPMT(loan.principal, loan.rate, loan.termMonths);
  const totalPaid = monthlyPayment * loan.termMonths;
  const totalInterest = totalPaid - loan.principal;
  return {
    ...loan,
    monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
    totalPaid: parseFloat(totalPaid.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    ratePerMonth: parseFloat((loan.rate / 12).toFixed(4))
  };
}

// === Compare ===
function compare() {
  const valid = loans.filter(l => l.principal > 0 && l.rate > 0 && l.termMonths > 0);
  if (valid.length < 2) {
    alert('请至少添加两个完整的贷款方案（金额、利率、期限都需填写）');
    return;
  }

  const computed = valid.map(calcLoan);

  // Find best in each category
  const bestMonthly = computed.reduce((a, b) => a.monthlyPayment < b.monthlyPayment ? a : b);
  const bestTotal = computed.reduce((a, b) => a.totalPaid < b.totalPaid ? a : b);
  const bestInterest = computed.reduce((a, b) => a.totalInterest < b.totalInterest ? a : b);

  // Overall score: weighted rank
  const rankBy = (arr, key, asc) => {
    const sorted = [...arr].sort((a, b) => asc ? a[key] - b[key] : b[key] - a[key]);
    const map = new Map();
    sorted.forEach((item, i) => map.set(item.id, i + 1));
    return map;
  };

  const monthlyRanks = rankBy(computed, 'monthlyPayment', true);
  const totalRanks = rankBy(computed, 'totalPaid', true);
  const interestRanks = rankBy(computed, 'totalInterest', true);

  computed.forEach(l => {
    l.totalScore = (monthlyRanks.get(l.id) || 0) + (totalRanks.get(l.id) || 0) + (interestRanks.get(l.id) || 0);
  });
  computed.sort((a, b) => a.totalScore - b.totalScore);

  const overallBest = computed[0];

  results = {
    loans: computed,
    bestMonthly,
    bestTotal,
    bestInterest,
    overallBest
  };

  renderResults();
  document.getElementById('resultsPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// === Results HTML ===
function buildResultsHTML() {
  const { loans, bestMonthly, bestTotal, bestInterest, overallBest } = results;

  const isBest = (loan, cat) => loan.id === cat.id;
  const bestClass = (loan, cat) => isBest(loan, cat) ? 'best' : '';

  // Comparison table
  const tableHTML = `
    <div class="compare-table-wrap">
      <table class="compare-table">
        <thead>
          <tr>
            <th>指标</th>
            ${loans.map((l, i) => `<th class="${l.id === overallBest.id ? 'col-winner' : ''}"><span class="col-name">${escapeHtml(l.name)}</span>${l.id === overallBest.id ? ' 🏆' : ''}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>贷款金额</td>
            ${loans.map(l => `<td>${formatCurrency(l.principal)}</td>`).join('')}
          </tr>
          <tr>
            <td>年利率</td>
            ${loans.map(l => `<td>${l.rate.toFixed(2)}%</td>`).join('')}
          </tr>
          <tr>
            <td>期限</td>
            ${loans.map(l => `<td>${formatTerm(l.termMonths)}</td>`).join('')}
          </tr>
          <tr>
            <td>月还款额</td>
            ${loans.map(l => `<td class="${bestClass(l, bestMonthly)}">${formatCurrency(l.monthlyPayment)}</td>`).join('')}
          </tr>
          <tr>
            <td>总利息</td>
            ${loans.map(l => `<td class="${bestClass(l, bestInterest)}">${formatCurrency(l.totalInterest)}</td>`).join('')}
          </tr>
          <tr>
            <td>总还款额</td>
            ${loans.map(l => `<td class="${bestClass(l, bestTotal)}">${formatCurrency(l.totalPaid)}</td>`).join('')}
          </tr>
          <tr>
            <td>利息占比</td>
            ${loans.map(l => `<td>${((l.totalInterest / l.totalPaid) * 100).toFixed(1)}%</td>`).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  // Recommendation
  const monthlyDiff = formatCurrency(Math.abs(loans[0].monthlyPayment - loans[loans.length - 1].monthlyPayment));
  const totalDiff = formatCurrency(Math.abs(loans[0].totalPaid - loans[loans.length - 1].totalPaid));

  const recHTML = `
    <div class="recommendation">
      <div class="rec-icon">💡</div>
      <div>
        <strong>推荐方案：${escapeHtml(overallBest.name)}</strong>
        <p style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px;">
          月供 ${formatCurrency(overallBest.monthlyPayment)}，总还款 ${formatCurrency(overallBest.totalPaid)}，
          综合评分最优。
          ${loans.length > 1 ? `方案间最大月供差 ${monthlyDiff}，最大总还款差 ${totalDiff}。` : ''}
        </p>
      </div>
    </div>
  `;

  // Breakdown cards
  const breakdownHTML = `
    <div class="chart-section">
      <h3>总成本对比（本金 + 利息）</h3>
      <canvas id="costChart" style="width:100%;"></canvas>
    </div>
  `;

  const detailHTML = `
    <div class="breakdown-grid">
      ${loans.map(l => `
        <div class="breakdown-card">
          <h4>${escapeHtml(l.name)} ${l.id === overallBest.id ? '🏆' : ''}</h4>
          <div class="breakdown-row"><span>月还款</span><span class="br-val">${formatCurrency(l.monthlyPayment)}</span></div>
          <div class="breakdown-row"><span>月利率</span><span class="br-val">${l.ratePerMonth.toFixed(4)}%</span></div>
          <div class="breakdown-row"><span>总利息</span><span class="br-val">${formatCurrency(l.totalInterest)}</span></div>
          <div class="breakdown-row"><span>总还款</span><span class="br-val">${formatCurrency(l.totalPaid)}</span></div>
          <div class="breakdown-row"><span>利息倍数</span><span class="br-val">${(l.totalInterest / l.principal).toFixed(2)}x</span></div>
        </div>
      `).join('')}
    </div>
  `;

  return tableHTML + recHTML + breakdownHTML + detailHTML;
}

// === Chart ===
function drawChart() {
  const canvas = document.getElementById('costChart');
  if (!canvas) return;

  const container = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const width = container.clientWidth;
  const height = 280;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const { loans } = results;
  const pad = { top: 10, right: 20, bottom: 60, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const barGap = 16;
  const barWidth = Math.min(60, (plotW - barGap * (loans.length + 1)) / loans.length);
  const totalBarW = barWidth * loans.length + barGap * (loans.length - 1);
  const offsetX = pad.left + (plotW - totalBarW) / 2;

  const maxVal = Math.max(...loans.map(l => l.totalPaid)) * 1.15;

  // Grid
  ctx.strokeStyle = '#1a202e';
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + (plotH / 4) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();

    const val = maxVal - (maxVal / 4) * i;
    ctx.fillStyle = '#586585';
    ctx.font = '10px SF Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(val), pad.left - 8, y + 4);
  }

  // Bars
  const colors = ['#4a7fce', '#5b8cce', '#3a9eb0', '#6ea8fe', '#50c8dc', '#7eb8f0'];
  const interestColors = ['#2a5fae', '#3b6cae', '#2a7e90', '#4e88de', '#30a8bc', '#5e98d0'];

  loans.forEach((loan, i) => {
    const x = offsetX + i * (barWidth + barGap);
    const principalH = (loan.principal / maxVal) * plotH;
    const interestH = (loan.totalInterest / maxVal) * plotH;

    // Principal bar
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, pad.top + plotH - principalH - interestH, barWidth, principalH);

    // Interest bar on top
    ctx.fillStyle = interestColors[i % interestColors.length];
    ctx.fillRect(x, pad.top + plotH - interestH, barWidth, interestH);

    // Label
    ctx.fillStyle = '#8896b4';
    ctx.font = '11px SF Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(escapeHtml(loan.name), x + barWidth / 2, height - pad.bottom + 30);

    // Total on top
    ctx.fillStyle = '#e2e6f0';
    ctx.font = 'bold 10px SF Mono, monospace';
    ctx.fillText(formatCurrency(loan.totalPaid), x + barWidth / 2, pad.top + plotH - principalH - interestH - 6);
  });

  // Legend
  ctx.fillStyle = colors[0];
  ctx.fillRect(pad.left + 10, height - 12, 10, 10);
  ctx.fillStyle = '#8896b4';
  ctx.font = '10px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('本金', pad.left + 26, height - 1);

  ctx.fillStyle = interestColors[0];
  ctx.fillRect(pad.left + 70, height - 12, 10, 10);
  ctx.fillText('利息', pad.left + 86, height - 1);
}

// === Helpers ===
function formatCurrency(n) {
  if (Math.abs(n) >= 10000) return '¥' + (n / 10000).toFixed(1) + '万';
  return '¥' + n.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
}

function formatTerm(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y > 0 && m > 0) return `${y}年${m}个月`;
  if (y > 0) return `${y}年`;
  return `${m}个月`;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// === Init ===
loans = [
  { id: 1, name: '银行 A (房贷)', principal: 1000000, rate: 3.85, termMonths: 360 },
  { id: 2, name: '银行 B (房贷)', principal: 1000000, rate: 4.10, termMonths: 360 },
  { id: 3, name: '银行 C (房贷)', principal: 1000000, rate: 3.65, termMonths: 360 }
];
render();
