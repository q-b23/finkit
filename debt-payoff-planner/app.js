// === State ===
let debts = [];
let results = null;

// === DOM Refs ===
const debtList = document.getElementById('debtList');
const emptyState = document.getElementById('emptyState');
const summaryCard = document.getElementById('summaryCard');
const extraPaymentGroup = document.getElementById('extraPaymentGroup');
const btnCalculate = document.getElementById('btnCalculate');
const resultsContent = document.getElementById('resultsContent');
const resultsPlaceholder = document.querySelector('.results-placeholder');
const totalDebtEl = document.getElementById('totalDebt');
const totalMinPaymentEl = document.getElementById('totalMinPayment');
const avgRateEl = document.getElementById('avgRate');
const extraPaymentEl = document.getElementById('extraPayment');

document.getElementById('btnAddDebt').addEventListener('click', addDebt);
btnCalculate.addEventListener('click', calculate);

// === Debt Management ===
function createDebt(name = '') {
  return {
    id: Date.now() + Math.random(),
    name: name || `债务 #${debts.length + 1}`,
    balance: 0,
    rate: 0,
    minPayment: 0
  };
}

function addDebt() {
  debts.push(createDebt());
  render();
}

function removeDebt(id) {
  debts = debts.filter(d => d.id !== id);
  results = null;
  render();
}

function updateDebt(id, field, value) {
  const debt = debts.find(d => d.id === id);
  if (!debt) return;
  debt[field] = field === 'name' ? value : parseFloat(value) || 0;
  results = null;
  renderSummary();
}

// === Rendering ===
function render() {
  renderDebtList();
  renderSummary();
  renderResults();
}

function renderDebtList() {
  debtList.innerHTML = '';
  emptyState.style.display = debts.length === 0 ? 'block' : 'none';

  debts.forEach(debt => {
    const card = document.createElement('div');
    card.className = 'debt-card';
    card.innerHTML = `
      <div class="debt-card-header">
        <input class="debt-name" value="${escapeHtml(debt.name)}"
               onchange="updateDebt(${debt.id}, 'name', this.value)"
               style="background:transparent;border:none;color:var(--text-primary);font-weight:600;font-size:0.95rem;outline:none;width:60%;font-family:var(--font-sans);">
        <button class="btn btn-sm" onclick="removeDebt(${debt.id})">删除</button>
      </div>
      <div class="debt-fields">
        <div class="field">
          <label>本金余额 (¥)</label>
          <div class="input-with-icon">
            <span class="input-icon">¥</span>
            <input type="number" value="${debt.balance || ''}" placeholder="0"
                   onchange="updateDebt(${debt.id}, 'balance', this.value)">
          </div>
        </div>
        <div class="field">
          <label>年利率 (%)</label>
          <div class="input-with-icon">
            <span class="input-icon">%</span>
            <input type="number" value="${debt.rate || ''}" placeholder="0" step="0.1"
                   onchange="updateDebt(${debt.id}, 'rate', this.value)">
          </div>
        </div>
        <div class="field">
          <label>月最低还款 (¥)</label>
          <div class="input-with-icon">
            <span class="input-icon">¥</span>
            <input type="number" value="${debt.minPayment || ''}" placeholder="0"
                   onchange="updateDebt(${debt.id}, 'minPayment', this.value)">
          </div>
        </div>
      </div>
    `;
    debtList.appendChild(card);
  });
}

function renderSummary() {
  const hasDebts = debts.length > 0;
  const hasValid = debts.some(d => d.balance > 0);

  summaryCard.style.display = hasDebts ? 'block' : 'none';
  extraPaymentGroup.style.display = hasValid ? 'block' : 'none';
  btnCalculate.style.display = hasValid ? 'block' : 'none';

  if (!hasDebts) return;

  const totalDebt = debts.reduce((s, d) => s + d.balance, 0);
  const totalMinPayment = debts.reduce((s, d) => s + d.minPayment, 0);
  const totalWeighted = debts.reduce((s, d) => s + d.balance * d.rate, 0);
  const avgRate = totalDebt > 0 ? totalWeighted / totalDebt : 0;

  totalDebtEl.textContent = formatCurrency(totalDebt);
  totalMinPaymentEl.textContent = formatCurrency(totalMinPayment);
  avgRateEl.textContent = avgRate.toFixed(1) + '%';

  if (results) {
    results = null;
    renderResults();
  }
}

function renderResults() {
  if (!results) {
    resultsContent.style.display = 'none';
    if (resultsPlaceholder) resultsPlaceholder.style.display = 'flex';
    return;
  }

  if (resultsPlaceholder) resultsPlaceholder.style.display = 'none';
  resultsContent.style.display = 'block';
  resultsContent.innerHTML = buildResultsHTML();
  requestAnimationFrame(() => {
    drawChart();
    setupTimelineTabs();
  });
}

// === Calculation Engine ===
function simulate(debtsCopy, extraPayment, sortFn) {
  let debts = debtsCopy.map(d => ({
    id: d.id,
    name: d.name,
    balance: d.balance,
    rate: d.rate / 100,
    minPayment: d.minPayment
  }));

  const timeline = [];
  const milestones = [];
  const paidOffIds = new Set();
  let month = 0;
  let totalInterest = 0;

  while (debts.some(d => d.balance > 0.001) && month < 600) {
    month++;
    let remainingExtra = extraPayment;
    const sorted = [...debts].sort(sortFn);

    for (const debt of sorted) {
      if (debt.balance <= 0.001) continue;

      const monthlyRate = debt.rate / 12;
      const interest = debt.balance * monthlyRate;
      totalInterest += interest;
      debt.balance += interest;

      let payment = Math.min(debt.minPayment, debt.balance);
      const extra = remainingExtra > 0 ? Math.min(remainingExtra, debt.balance - payment) : 0;
      payment += extra;
      remainingExtra -= extra;

      debt.balance = Math.max(0, debt.balance - payment);

      timeline.push({
        month,
        debtName: debt.name,
        debtId: debt.id,
        payment: parseFloat(payment.toFixed(2)),
        interest: parseFloat(interest.toFixed(2)),
        remaining: parseFloat(debt.balance.toFixed(2))
      });

      // Track milestone: debt paid off
      if (debt.balance <= 0.001 && !paidOffIds.has(debt.id)) {
        paidOffIds.add(debt.id);
        milestones.push({
          debtName: debt.name,
          debtId: debt.id,
          paidOffMonth: month
        });
      }
    }

    debts = debts.filter(d => d.balance > 0.001);
  }

  return {
    months: month,
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    timeline,
    milestones
  };
}

function calculate() {
  const validDebts = debts.filter(d => d.balance > 0 && d.minPayment > 0);
  if (validDebts.length === 0) {
    alert('请至少添加一条有效的债务（本金 > 0 且最低还款 > 0）');
    return;
  }

  const extraPayment = parseFloat(extraPaymentEl.value) || 0;

  const snowball = simulate(validDebts, extraPayment, (a, b) => a.balance - b.balance);
  const avalanche = simulate(validDebts, extraPayment, (a, b) => b.rate - a.rate);

  const totalPrincipal = validDebts.reduce((s, d) => s + d.balance, 0);
  const totalPaidSnowball = totalPrincipal + snowball.totalInterest;
  const totalPaidAvalanche = totalPrincipal + avalanche.totalInterest;

  results = {
    snowball: { ...snowball, totalPaid: parseFloat(totalPaidSnowball.toFixed(2)) },
    avalanche: { ...avalanche, totalPaid: parseFloat(totalPaidAvalanche.toFixed(2)) },
    totalPrincipal,
    extraPayment,
    winner: totalPaidSnowball <= totalPaidAvalanche ? 'snowball' : 'avalanche'
  };

  renderResults();

  // Scroll to results
  document.getElementById('resultsPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// === Results HTML ===
function buildResultsHTML() {
  const { snowball, avalanche, winner } = results;
  const savings = Math.abs(snowball.totalPaid - avalanche.totalPaid);
  const winnerClass = (method) => method === winner ? ' winner' : '';

  const cardHTML = (data, method, label, desc) => `
    <div class="strategy-card${winnerClass(method)}">
      <h3>${label}</h3>
      <p class="strategy-desc">${desc}</p>
      <div class="strategy-stats">
        <div class="stat">
          <div class="stat-value">${data.months} 个月</div>
          <div class="stat-label">还清用时</div>
        </div>
        <div class="stat">
          <div class="stat-value">${formatCurrency(data.totalInterest)}</div>
          <div class="stat-label">总利息支出</div>
        </div>
        <div class="stat">
          <div class="stat-value">${formatCurrency(data.totalPaid)}</div>
          <div class="stat-label">总还款额</div>
        </div>
        <div class="stat">
          <div class="stat-value">${formatCurrency(savings)}</div>
          <div class="stat-label">${method === winner ? '节省' : '多付'}</div>
        </div>
      </div>
    </div>
  `;

  const monthLabel = (m) => {
    const years = Math.floor(m / 12);
    const months = m % 12;
    if (years > 0 && months > 0) return `${years}年${months}个月`;
    if (years > 0) return `${years}年`;
    return `${months}个月`;
  };

  const recommendationHTML = winner === 'avalanche' && savings > 0
    ? `<div class="recommendation-card">
        <div class="rec-icon">💡</div>
        <div class="rec-body">
          <strong>推荐使用雪崩法</strong>
          <p>可节省 <em>${formatCurrency(savings)}</em> 利息，${snowball.months > avalanche.months ? `且提前 ${snowball.months - avalanche.months} 个月还清` : '还清时间相同'}。如果你更需要心理激励，雪球法能让你更快看到小债务清零。</p>
        </div>
      </div>`
    : savings === 0
      ? `<div class="recommendation-card neutral">
          <div class="rec-icon">✅</div>
          <div class="rec-body">
            <strong>两种策略效果相同</strong>
            <p>在当前债务结构下，雪球法和雪崩法的还款顺序一致。选择任何一种，坚持执行即可。</p>
          </div>
        </div>`
      : `<div class="recommendation-card neutral">
          <div class="rec-icon">⚖️</div>
          <div class="rec-body">
            <strong>雪球法略优</strong>
            <p>在当前条件下，雪球法总支出稍低。这种情况较少见，通常发生在小额债务利率也较高时。</p>
          </div>
        </div>`;

  return `
    <div class="strategy-cards">
      ${cardHTML(snowball, 'snowball', '❄️ 雪球法 (Snowball)',
        '优先偿还余额最小的债务，获得心理成就感')}
      ${cardHTML(avalanche, 'avalanche', '🏔️ 雪崩法 (Avalanche)',
        '优先偿还利率最高的债务，数学上通常最优')}
    </div>

    ${recommendationHTML}

    <div class="milestones-section">
      <h3>📅 债务还清里程碑</h3>
      <div class="milestone-cards">
        <div class="milestone-col">
          <h4>雪球法</h4>
          ${buildMilestoneCards(snowball.milestones, snowball.months)}
        </div>
        <div class="milestone-col">
          <h4>雪崩法</h4>
          ${buildMilestoneCards(avalanche.milestones, avalanche.months)}
        </div>
      </div>
    </div>

    <div class="chart-section">
      <h3>还款进度对比</h3>
      <div class="chart-container">
        <canvas id="progressChart"></canvas>
      </div>
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--accent-green-bright)"></span> 雪球法</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--accent-gold-bright)"></span> 雪崩法</div>
      </div>
    </div>

    <div class="timeline-section">
      <h3>还款时间线</h3>
      <div class="timeline-tabs">
        <button class="timeline-tab active" data-method="snowball">雪球法</button>
        <button class="timeline-tab" data-method="avalanche">雪崩法</button>
      </div>
      <div class="table-scroll">
        <table class="timeline-table" id="timelineTable">
          ${buildTimelineRows(snowball.timeline)}
        </table>
      </div>
    </div>

    <div class="export-row">
      <button class="btn btn-export" onclick="exportCSV()">📥 导出 CSV</button>
      <button class="btn btn-export" onclick="printReport()">🖨️ 打印报表</button>
    </div>
  `;
}

function buildMilestoneCards(milestones, totalMonths) {
  if (milestones.length === 0) return '<p class="no-milestones">无数据</p>';

  // Sort by paid-off month
  const sorted = [...milestones].sort((a, b) => a.paidOffMonth - b.paidOffMonth);

  return sorted.map((m, i) => {
    const barPct = (m.paidOffMonth / totalMonths) * 100;
    const monthLabel = m.paidOffMonth >= 12
      ? `${Math.floor(m.paidOffMonth / 12)}年${m.paidOffMonth % 12 > 0 ? (m.paidOffMonth % 12) + '个月' : ''}`
      : `${m.paidOffMonth}个月`;

    return `
      <div class="milestone-item">
        <div class="milestone-rank">#${i + 1}</div>
        <div class="milestone-info">
          <span class="milestone-name">${escapeHtml(m.debtName)}</span>
          <span class="milestone-date">${monthLabel}</span>
        </div>
        <div class="milestone-bar-track">
          <div class="milestone-bar-fill" style="width:${barPct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

function buildTimelineRows(timeline) {
  let rows = `<thead><tr>
    <th>月份</th><th>债务</th><th>还款额</th><th>利息</th><th>剩余本金</th>
  </tr></thead><tbody>`;

  const byMonth = {};
  for (const entry of timeline) {
    if (!byMonth[entry.month]) byMonth[entry.month] = [];
    byMonth[entry.month].push(entry);
  }

  for (const month of Object.keys(byMonth).sort((a, b) => a - b)) {
    for (const entry of byMonth[month]) {
      const paidOff = entry.remaining < 0.01;
      rows += `<tr class="${paidOff ? 'paid-off' : ''}">
        <td>第 ${month} 月</td>
        <td>${escapeHtml(entry.debtName)}</td>
        <td>${formatCurrency(entry.payment)}</td>
        <td>${formatCurrency(entry.interest)}</td>
        <td>${paidOff ? '✅ 已还清' : formatCurrency(entry.remaining)}</td>
      </tr>`;
    }
  }

  rows += '</tbody>';
  return rows;
}

// === Timeline Tabs ===
function setupTimelineTabs() {
  const tabs = document.querySelectorAll('.timeline-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const method = tab.dataset.method;
      const timeline = results[method].timeline;
      document.getElementById('timelineTable').innerHTML = buildTimelineRows(timeline);
    });
  });
}

// === Chart ===
function drawChart() {
  const canvas = document.getElementById('progressChart');
  if (!canvas) return;

  const container = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const width = container.clientWidth;
  const height = 300;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const pad = { top: 20, right: 30, bottom: 40, left: 60 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const { snowball, avalanche, totalPrincipal } = results;

  function buildBalanceCurve(timeline, maxMonths) {
    const balances = new Array(maxMonths + 1).fill(0);
    balances[0] = totalPrincipal;

    const byMonth = {};
    for (const e of timeline) {
      if (!byMonth[e.month]) byMonth[e.month] = 0;
      byMonth[e.month] += e.remaining;
    }

    for (let m = 0; m < maxMonths; m++) {
      if (byMonth[m + 1] !== undefined) {
        balances[m + 1] = byMonth[m + 1];
      } else {
        let last = 0;
        for (let k = m; k >= 0; k--) {
          if (balances[k] > 0) { last = balances[k]; break; }
        }
        balances[m + 1] = last;
      }
    }

    return balances;
  }

  const maxMonths = Math.max(snowball.months, avalanche.months);
  const snowBalances = buildBalanceCurve(snowball.timeline, maxMonths);
  const avaBalances = buildBalanceCurve(avalanche.timeline, maxMonths);

  // Background grid
  ctx.strokeStyle = '#1a2028';
  ctx.lineWidth = 1;
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (plotH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();

    const val = totalPrincipal - (totalPrincipal / gridLines) * i;
    ctx.fillStyle = '#5a6377';
    ctx.font = '10px SF Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(val), pad.left - 8, y + 4);
  }

  // X axis labels
  const xSteps = Math.min(6, maxMonths);
  ctx.textAlign = 'center';
  for (let i = 0; i <= xSteps; i++) {
    const m = Math.round((maxMonths / xSteps) * i);
    const x = pad.left + (plotW / maxMonths) * m;
    ctx.fillText(m + '月', x, height - pad.bottom + 20);
  }

  function drawCurve(balances, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.beginPath();

    let started = false;
    for (let m = 0; m < balances.length; m++) {
      const x = pad.left + (plotW / maxMonths) * m;
      const y = pad.top + plotH * (1 - balances[m] / totalPrincipal);

      if (!started) { ctx.moveTo(x, y); started = true; }
      else { ctx.lineTo(x, y); }
    }
    ctx.stroke();

    // Area fill
    ctx.lineTo(pad.left + (plotW / maxMonths) * (balances.length - 1), pad.top + plotH);
    ctx.lineTo(pad.left, pad.top + plotH);
    ctx.closePath();
    ctx.fillStyle = color + '14';
    ctx.fill();
  }

  drawCurve(snowBalances, '#4ae08a');
  drawCurve(avaBalances, '#f0d060');

  // Axis lines
  ctx.strokeStyle = '#252d3a';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, pad.top + plotH);
  ctx.lineTo(width - pad.right, pad.top + plotH);
  ctx.stroke();
}

// === Export ===
function exportCSV() {
  if (!results) return;

  const rows = [['策略', '月份', '债务', '还款额', '利息', '剩余本金']];

  for (const method of ['snowball', 'avalanche']) {
    const label = method === 'snowball' ? '雪球法' : '雪崩法';
    for (const e of results[method].timeline) {
      rows.push([label, e.month, e.debtName, e.payment, e.interest, e.remaining]);
    }
  }

  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g, '""') + '"').join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'debt-payoff-plan.csv';
  a.click();
  URL.revokeObjectURL(url);
}

// === Print Report ===
function printReport() {
  if (!results) return;

  const { snowball, avalanche, winner } = results;
  const savings = Math.abs(snowball.totalPaid - avalanche.totalPaid);

  const printWindow = window.open('', '_blank', 'width=800,height=600');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>DebtPayoff Planner — 还款策略报告</title>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 40px; color: #1a1a1a; line-height: 1.6; }
        h1 { font-size: 1.6rem; margin-bottom: 4px; }
        .date { color: #888; font-size: 0.85rem; margin-bottom: 24px; }
        h2 { font-size: 1.1rem; margin: 20px 0 12px; padding-bottom: 6px; border-bottom: 2px solid #3a7d5f; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 0.85rem; }
        th, td { padding: 8px 10px; text-align: left; border-bottom: 1px solid #e0e0e0; }
        th { background: #f5f5f5; font-weight: 600; }
        .summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .summary-box { border: 1px solid #ddd; border-radius: 8px; padding: 16px; }
        .summary-box h3 { font-size: 0.95rem; margin-bottom: 8px; }
        .summary-box .big { font-size: 1.4rem; font-weight: 700; color: #3a7d5f; }
        .summary-box .label { font-size: 0.8rem; color: #888; }
        .winner-badge { background: #3a7d5f; color: #fff; font-size: 0.75rem; padding: 2px 10px; border-radius: 10px; margin-left: 8px; }
        .milestone { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        .milestone .rank { font-weight: 700; color: #3a7d5f; min-width: 28px; }
        .rec-box { background: #f0faf4; border-left: 4px solid #3a7d5f; padding: 14px 18px; margin: 16px 0; border-radius: 0 8px 8px 0; }
        .rec-box strong { color: #2a5d44; }
        @media print { body { padding: 20px; } .no-print { display: none; } }
      </style>
    </head>
    <body>
      <h1>DebtPayoff Planner 还款策略报告</h1>
      <p class="date">生成日期：${new Date().toLocaleDateString('zh-CN')}</p>

      <h2>策略对比</h2>
      <div class="summary-grid">
        <div class="summary-box">
          <h3>❄️ 雪球法 ${winner === 'snowball' ? '<span class="winner-badge">最优</span>' : ''}</h3>
          <div class="big">${snowball.months} 个月</div>
          <div class="label">还清用时</div>
          <p style="margin-top:4px;">总利息：${formatCurrency(snowball.totalInterest)}<br>总还款：${formatCurrency(snowball.totalPaid)}</p>
        </div>
        <div class="summary-box">
          <h3>🏔️ 雪崩法 ${winner === 'avalanche' ? '<span class="winner-badge">最优</span>' : ''}</h3>
          <div class="big">${avalanche.months} 个月</div>
          <div class="label">还清用时</div>
          <p style="margin-top:4px;">总利息：${formatCurrency(avalanche.totalInterest)}<br>总还款：${formatCurrency(avalanche.totalPaid)}</p>
        </div>
      </div>

      ${savings > 0 ? `<div class="rec-box">
        <strong>💡 推荐使用${winner === 'avalanche' ? '雪崩法' : '雪球法'}</strong> — 可节省 <strong>${formatCurrency(savings)}</strong>
      </div>` : ''}

      <h2>债务还清里程碑 — 雪球法</h2>
      ${buildPrintMilestones(snowball.milestones)}

      <h2>债务还清里程碑 — 雪崩法</h2>
      ${buildPrintMilestones(avalanche.milestones)}

      <h2>详细还款计划</h2>
      <p style="font-size:0.85rem;color:#888;">（因篇幅限制，请查看完整时间线或导出 CSV）</p>

      <p class="no-print" style="margin-top:24px;text-align:center;">
        <button onclick="window.print()" style="padding:10px 24px;font-size:1rem;cursor:pointer;background:#3a7d5f;color:#fff;border:none;border-radius:6px;">🖨️ 打印此报告</button>
      </p>
    </body></html>
  `);
  printWindow.document.close();
}

function buildPrintMilestones(milestones) {
  if (milestones.length === 0) return '<p>无数据</p>';
  const sorted = [...milestones].sort((a, b) => a.paidOffMonth - b.paidOffMonth);
  return sorted.map((m, i) => `
    <div class="milestone">
      <span class="rank">#${i + 1}</span>
      <span>${escapeHtml(m.debtName)} — 第 ${m.paidOffMonth} 个月还清</span>
    </div>
  `).join('');
}

// === Helpers ===
function formatCurrency(n) {
  if (Math.abs(n) >= 10000) {
    return '¥' + (n / 10000).toFixed(1) + '万';
  }
  return '¥' + n.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// === Init ===
debts = [
  { id: 1, name: '信用卡 A', balance: 30000, rate: 25, minPayment: 900 },
  { id: 2, name: '消费贷', balance: 80000, rate: 12, minPayment: 2000 },
  { id: 3, name: '信用卡 B', balance: 15000, rate: 18, minPayment: 450 }
];
extraPaymentEl.value = 2000;
render();
