// === State ===
let results = null;

// === DOM Refs ===
const btnCalculate = document.getElementById('btnCalculate');
const resultsContent = document.getElementById('resultsContent');
const resultsPlaceholder = document.querySelector('.results-placeholder');

// Inputs
const currentSavingsEl = document.getElementById('currentSavings');
const monthlyContributionEl = document.getElementById('monthlyContribution');
const annualReturnEl = document.getElementById('annualReturn');
const inflationRateEl = document.getElementById('inflationRate');
const annualExpensesEl = document.getElementById('annualExpenses');
const timeHorizonEl = document.getElementById('timeHorizon');

btnCalculate.addEventListener('click', calculate);

function getInputs() {
  return {
    currentSavings: parseFloat(currentSavingsEl.value) || 0,
    monthlyContribution: parseFloat(monthlyContributionEl.value) || 0,
    annualReturn: (parseFloat(annualReturnEl.value) || 0) / 100,
    inflationRate: (parseFloat(inflationRateEl.value) || 0) / 100,
    annualExpenses: parseFloat(annualExpensesEl.value) || 0,
    timeHorizon: parseInt(timeHorizonEl.value) || 30
  };
}

// === Calculation Engine ===
function calculate() {
  const inputs = getInputs();
  const {
    currentSavings, monthlyContribution, annualReturn,
    inflationRate, annualExpenses, timeHorizon
  } = inputs;

  // Real return (inflation-adjusted)
  const realReturn = (1 + annualReturn) / (1 + inflationRate) - 1;
  const monthlyReturn = annualReturn / 12;
  const realMonthlyReturn = realReturn / 12;

  // FIRE number (4% rule, adjusted for inflation)
  const fireNumber = annualExpenses / 0.04;
  const safeWithdrawalRate = 0.04;

  // Year-by-year projection
  const projections = [];
  let balance = currentSavings;
  let totalContributions = currentSavings;

  for (let year = 0; year <= timeHorizon; year++) {
    const yearlyContribution = monthlyContribution * 12;
    totalContributions += yearlyContribution;

    // Inflation-adjusted values
    const realBalance = balance / Math.pow(1 + inflationRate, year);
    const realFireNumber = fireNumber * Math.pow(1 + inflationRate, year);

    projections.push({
      year,
      balance: parseFloat(balance.toFixed(0)),
      realBalance: parseFloat(realBalance.toFixed(0)),
      realFireNumber: parseFloat(realFireNumber.toFixed(0)),
      totalContributions: parseFloat(totalContributions.toFixed(0)),
      pctToFire: parseFloat(((realBalance / realFireNumber) * 100).toFixed(1)),
      isFire: realBalance >= realFireNumber
    });

    // Compound for next year
    if (year < timeHorizon) {
      // Monthly compounding
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + monthlyReturn) + monthlyContribution;
      }
    }
  }

  // Time to FIRE (find year where realBalance >= realFireNumber)
  let fireYear = null;
  for (const p of projections) {
    if (p.realBalance >= p.realFireNumber) {
      fireYear = p.year;
      break;
    }
  }

  // Coast FIRE year: when you can stop contributing
  let coastFireYear = null;
  for (let y = 0; y <= timeHorizon; y++) {
    // If you stop contributing at year y, would the balance grow to FIRE by retirement?
    const balanceAtStop = y === 0 ? currentSavings : projections[Math.min(y, projections.length - 1)].balance;
    const remainingYears = timeHorizon - y;
    const futureNoContribution = balanceAtStop * Math.pow(1 + annualReturn, remainingYears);
    const futureFireNumber = fireNumber * Math.pow(1 + inflationRate, timeHorizon);

    if (futureNoContribution >= futureFireNumber) {
      coastFireYear = y;
      break;
    }
  }

  const finalBalance = projections[projections.length - 1].balance;
  const finalRealBalance = projections[projections.length - 1].realBalance;
  const totalGains = finalBalance - projections[projections.length - 1].totalContributions;

  results = {
    inputs,
    projections,
    fireNumber,
    fireYear,
    coastFireYear,
    finalBalance,
    finalRealBalance,
    totalGains,
    realReturn
  };

  renderResults();
  document.getElementById('resultsPanel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// === Render ===
function renderResults() {
  const r = results;
  if (!r) return;

  resultsPlaceholder.style.display = 'none';
  resultsContent.style.display = 'block';

  const fireYearText = r.fireYear !== null
    ? `${r.fireYear} 年`
    : `超过 ${r.inputs.timeHorizon} 年`;

  const coastFireText = r.coastFireYear !== null
    ? `${r.coastFireYear} 年后`
    : `超过 ${r.inputs.timeHorizon} 年`;

  const monthlyIncomeAtFire = Math.round((r.fireNumber * 0.04) / 12);

  resultsContent.innerHTML = `
    <!-- Key Metrics -->
    <div class="key-metrics">
      <div class="metric-card">
        <div class="metric-value">${formatCurrency(r.fireNumber)}</div>
        <div class="metric-label">FIRE 目标金额<br><small style="color:var(--text-muted)">按4%安全提款率</small></div>
      </div>
      <div class="metric-card${r.fireYear !== null && r.fireYear <= r.inputs.timeHorizon ? ' fire-hit' : ''}">
        <div class="metric-value">${fireYearText}</div>
        <div class="metric-label">预计实现 FIRE</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${formatCurrency(monthlyIncomeAtFire)}/月</div>
        <div class="metric-label">FIRE 后月可支配收入</div>
      </div>
    </div>

    <!-- Chart -->
    <div class="chart-section">
      <h3>资产增长曲线 vs FIRE 目标</h3>
      <canvas id="fireChart" style="width:100%;"></canvas>
      <div class="chart-legend">
        <div class="legend-item"><span class="legend-dot" style="background:var(--accent-gold-bright)"></span> 实际资产</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--accent-amber-bright);border:2px dashed var(--accent-amber-bright);width:0;height:14px;"></span> FIRE 目标线</div>
        <div class="legend-item"><span class="legend-dot" style="background:var(--accent-teal-bright)"></span> 通胀调整后资产</div>
      </div>
    </div>

    <!-- Progress to FIRE -->
    <div class="fire-breakdown">
      <h3>FIRE 进度：${Math.min(r.projections[r.projections.length - 1].pctToFire, 100).toFixed(1)}%</h3>
      <div class="breakdown-bar" style="width:${Math.min(r.projections[r.projections.length - 1].pctToFire, 100)}%">
        ${r.projections[r.projections.length - 1].pctToFire >= 12 ? formatCurrency(r.projections[r.projections.length - 1].realBalance) : ''}
      </div>
      <div class="breakdown-ref">
        <div class="breakdown-target-line" style="left:100%">
          <span class="breakdown-target-label">目标 ${formatCurrency(r.fireNumber)}</span>
        </div>
      </div>
    </div>

    <!-- Milestones -->
    <div class="milestone-grid">
      <div class="milestone-box">
        <h4>📊 关键里程碑</h4>
        <div class="m-row"><span>第 5 年资产</span><span class="m-val">${formatCurrency(r.projections[Math.min(5, r.projections.length - 1)].balance)}</span></div>
        <div class="m-row"><span>第 10 年资产</span><span class="m-val">${formatCurrency(r.projections[Math.min(10, r.projections.length - 1)].balance)}</span></div>
        <div class="m-row"><span>第 20 年资产</span><span class="m-val">${formatCurrency(r.projections[Math.min(20, r.projections.length - 1)].balance)}</span></div>
        <div class="m-row"><span>总投入本金</span><span class="m-val">${formatCurrency(r.projections[r.projections.length - 1].totalContributions)}</span></div>
        <div class="m-row"><span>复利收益</span><span class="m-val">${formatCurrency(r.totalGains)}</span></div>
      </div>
      <div class="milestone-box">
        <h4>🔮 FIRE 路径</h4>
        <div class="m-row"><span>FIRE 目标</span><span class="m-val">${formatCurrency(r.fireNumber)}</span></div>
        <div class="m-row"><span>安全提款率</span><span class="m-val">4%</span></div>
        <div class="m-row"><span>年支出</span><span class="m-val">${formatCurrency(r.inputs.annualExpenses)}</span></div>
        <div class="m-row"><span>实际收益率</span><span class="m-val">${(r.realReturn * 100).toFixed(2)}%</span></div>
        <div class="m-row"><span>Coast FIRE</span><span class="m-val">${coastFireText}</span></div>
      </div>
    </div>

    <p style="font-size:0.75rem;color:var(--text-muted);text-align:center;margin-top:16px;">
      ⚠️ 以上为简化模型，未考虑税收、市场波动、收入变化等。实际投资有风险。
    </p>
  `;

  requestAnimationFrame(() => drawChart());
}

// === Chart ===
function drawChart() {
  const canvas = document.getElementById('fireChart');
  if (!canvas) return;

  const container = canvas.parentElement;
  const dpr = window.devicePixelRatio || 1;
  const width = container.clientWidth;
  const height = 320;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const pad = { top: 20, right: 30, bottom: 40, left: 70 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const { projections, fireNumber, inputs } = results;

  // Max Y: max of all balances and FIRE numbers
  let maxY = 0;
  for (const p of projections) {
    maxY = Math.max(maxY, p.balance, p.realFireNumber);
  }
  maxY *= 1.1; // 10% headroom

  const scaleX = (x) => pad.left + (x / inputs.timeHorizon) * plotW;
  const scaleY = (y) => pad.top + plotH * (1 - y / maxY);

  // Grid
  ctx.strokeStyle = '#1f1d19';
  ctx.lineWidth = 1;
  const gridLines = 5;
  for (let i = 0; i <= gridLines; i++) {
    const y = pad.top + (plotH / gridLines) * i;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(width - pad.right, y);
    ctx.stroke();

    const val = maxY - (maxY / gridLines) * i;
    ctx.fillStyle = '#6b6352';
    ctx.font = '10px SF Mono, monospace';
    ctx.textAlign = 'right';
    ctx.fillText(formatCurrency(val), pad.left - 8, y + 4);
  }

  // X labels
  for (let y = 0; y <= inputs.timeHorizon; y += 5) {
    const x = scaleX(y);
    ctx.fillStyle = '#6b6352';
    ctx.font = '10px SF Mono, monospace';
    ctx.textAlign = 'center';
    ctx.fillText(y + '年', x, height - pad.bottom + 20);
  }

  // FIRE target line (dashed)
  ctx.strokeStyle = '#f09040';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.moveTo(pad.left, scaleY(fireNumber));
  // The FIRE target grows with inflation
  for (let y = 0; y <= inputs.timeHorizon; y++) {
    const fireNumAtYear = fireNumber * Math.pow(1 + inputs.inflationRate, y);
    const fy = scaleY(fireNumAtYear);
    const fx = scaleX(y);
    if (y === 0) ctx.moveTo(fx, Math.min(fy, pad.top + plotH));
    else ctx.lineTo(fx, Math.min(fy, pad.top + plotH));
  }
  ctx.stroke();
  ctx.setLineDash([]);

  // FIRE target label
  ctx.fillStyle = '#f09040';
  ctx.font = '11px SF Mono, monospace';
  ctx.textAlign = 'left';
  ctx.fillText('FIRE 目标线', pad.left + 4, scaleY(fireNumber * Math.pow(1 + inputs.inflationRate, 5)) - 6);

  // Actual balance curve (gold)
  function drawBalanceCurve(key, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    for (let i = 0; i < projections.length; i++) {
      const x = scaleX(projections[i].year);
      const val = key === 'balance' ? projections[i].balance : projections[i].realBalance;
      const y = Math.max(pad.top, Math.min(pad.top + plotH, scaleY(val)));
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Area fill
    ctx.lineTo(scaleX(projections[projections.length - 1].year), pad.top + plotH);
    ctx.lineTo(pad.left, pad.top + plotH);
    ctx.closePath();
    ctx.fillStyle = color + '10';
    ctx.fill();
  }

  drawBalanceCurve('balance', '#f0d060');
  drawBalanceCurve('realBalance', '#4ac0b0');

  // Axis
  ctx.strokeStyle = '#2e2a24';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad.left, pad.top);
  ctx.lineTo(pad.left, pad.top + plotH);
  ctx.lineTo(width - pad.right, pad.top + plotH);
  ctx.stroke();

  // FIRE intersection marker
  const fireYear = results.fireYear;
  if (fireYear !== null && fireYear <= inputs.timeHorizon) {
    const ix = scaleX(fireYear);
    const fireVal = fireNumber * Math.pow(1 + inputs.inflationRate, fireYear);
    const iy = scaleY(fireVal);

    ctx.fillStyle = '#4ac0b0';
    ctx.beginPath();
    ctx.arc(ix, iy, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#4ac0b0';
    ctx.font = 'bold 11px SF Mono, monospace';
    ctx.textAlign = 'left';
    ctx.fillText('🎉 FIRE!', ix + 10, iy + 4);
  }
}

// === Helpers ===
function formatCurrency(n) {
  if (n < 0) return '-¥' + formatCurrency(-n).replace('¥', '');
  if (Math.abs(n) >= 100000000) return '¥' + (n / 100000000).toFixed(2) + '亿';
  if (Math.abs(n) >= 10000) return '¥' + (n / 10000).toFixed(1) + '万';
  return '¥' + n.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
}

// === Init ===
calculate();
