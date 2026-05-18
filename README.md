<!DOCTYPE html>
<html lang="hi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>SIP Calculator — Mutual Fund</title>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0f1e;
      --card: #111827;
      --card2: #1a2238;
      --accent: #00e5a0;
      --accent2: #00b8d9;
      --gold: #f5c842;
      --text: #e8edf7;
      --muted: #7a88a8;
      --border: rgba(255,255,255,0.07);
      --glow: 0 0 40px rgba(0,229,160,0.15);
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* Animated background mesh */
    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 50% at 20% 0%, rgba(0,229,160,0.07) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 80% 100%, rgba(0,184,217,0.07) 0%, transparent 60%);
      pointer-events: none;
      z-index: 0;
    }

    .wrapper {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px 60px;
    }

    /* Header */
    .header {
      text-align: center;
      margin-bottom: 48px;
      animation: fadeDown 0.7s ease both;
    }
    .header .badge {
      display: inline-block;
      background: rgba(0,229,160,0.12);
      color: var(--accent);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 5px 14px;
      border-radius: 20px;
      border: 1px solid rgba(0,229,160,0.25);
      margin-bottom: 16px;
    }
    .header h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
    }
    .header h1 span { color: var(--accent); }
    .header p {
      margin-top: 12px;
      color: var(--muted);
      font-size: 15px;
    }

    /* Main grid */
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }

    /* Card */
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px;
      animation: fadeUp 0.7s ease both;
    }
    .card:nth-child(2) { animation-delay: 0.1s; }
    .card.full { grid-column: 1 / -1; animation-delay: 0.2s; }

    .card-title {
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 24px;
    }

    /* Inputs */
    .field { margin-bottom: 24px; }
    .field:last-child { margin-bottom: 0; }
    .field label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 10px;
    }
    .field label .val {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 15px;
      color: var(--accent);
    }

    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      background: var(--card2);
      border-radius: 4px;
      outline: none;
      cursor: pointer;
      position: relative;
    }
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 20px; height: 20px;
      background: var(--accent);
      border-radius: 50%;
      border: 3px solid var(--bg);
      box-shadow: 0 0 0 2px var(--accent), 0 4px 12px rgba(0,229,160,0.4);
      transition: transform 0.15s;
    }
    input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); }
    input[type="range"]::-moz-range-thumb {
      width: 20px; height: 20px;
      background: var(--accent);
      border-radius: 50%;
      border: 3px solid var(--bg);
      cursor: pointer;
    }

    .range-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: var(--muted);
      margin-top: 6px;
    }

    /* Results */
    .results-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    @media (max-width: 500px) { .results-grid { grid-template-columns: 1fr; } }

    .result-box {
      background: var(--card2);
      border-radius: 14px;
      padding: 20px 16px;
      border: 1px solid var(--border);
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .result-box:hover { transform: translateY(-3px); box-shadow: var(--glow); }
    .result-box .label {
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 8px;
    }
    .result-box .amount {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.3rem, 3vw, 1.8rem);
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .result-box.invested .amount { color: var(--text); }
    .result-box.returns .amount  { color: var(--accent2); }
    .result-box.total .amount    { color: var(--accent); }

    /* Donut chart */
    .chart-wrap {
      display: flex;
      align-items: center;
      gap: 32px;
      flex-wrap: wrap;
    }
    .donut-container {
      position: relative;
      width: 160px;
      height: 160px;
      flex-shrink: 0;
    }
    .donut-container svg { transform: rotate(-90deg); }
    .donut-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .donut-center .dc-label { font-size: 10px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; }
    .donut-center .dc-val { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800; color: var(--accent); }

    .legend { flex: 1; min-width: 160px; }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 14px;
    }
    .legend-dot {
      width: 12px; height: 12px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .legend-item .li-label { font-size: 12px; color: var(--muted); }
    .legend-item .li-val { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-top: 1px; }

    /* Year breakdown table */
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; }
    thead th {
      text-align: left;
      padding: 10px 12px;
      color: var(--muted);
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-bottom: 1px solid var(--border);
    }
    tbody tr { transition: background 0.15s; }
    tbody tr:hover { background: rgba(255,255,255,0.03); }
    tbody td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
    tbody td:first-child { color: var(--muted); }
    tbody td.green { color: var(--accent); font-weight: 500; }
    tbody td.blue  { color: var(--accent2); }
    tbody tr:last-child td { border-bottom: none; }

    /* Zerodha CTA */
    .zerodha-cta {
      margin-top: 20px;
      background: linear-gradient(135deg, #1a1f35, #0d1529);
      border: 1px solid rgba(255,184,0,0.2);
      border-radius: 20px;
      padding: 28px 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      animation: fadeUp 0.7s 0.4s ease both;
      position: relative;
      overflow: hidden;
    }
    .zerodha-cta::before {
      content: '';
      position: absolute;
      top: -40px; right: -40px;
      width: 200px; height: 200px;
      background: radial-gradient(circle, rgba(245,200,66,0.08), transparent 70%);
      pointer-events: none;
    }
    .zcta-left { flex: 1; min-width: 200px; }
    .zcta-left .ztag {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 6px;
    }
    .zcta-left h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.2rem;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .zcta-left p { font-size: 13px; color: var(--muted); line-height: 1.5; }

    .zcta-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: var(--gold);
      color: #0a0f1e;
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 14px;
      padding: 14px 24px;
      border-radius: 12px;
      text-decoration: none;
      transition: transform 0.2s, box-shadow 0.2s, filter 0.2s;
      white-space: nowrap;
      box-shadow: 0 4px 20px rgba(245,200,66,0.3);
    }
    .zcta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(245,200,66,0.5);
      filter: brightness(1.08);
    }
    .zcta-btn svg { width: 16px; height: 16px; }

    .zcta-features {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 10px;
    }
    .zcta-features span {
      font-size: 11px;
      background: rgba(245,200,66,0.08);
      color: var(--gold);
      border: 1px solid rgba(245,200,66,0.2);
      padding: 3px 10px;
      border-radius: 20px;
    }

    /* Footer */
    footer {
      text-align: center;
      margin-top: 36px;
      color: var(--muted);
      font-size: 12px;
      animation: fadeUp 0.7s 0.5s ease both;
    }

    @keyframes fadeDown {
      from { opacity:0; transform: translateY(-20px); }
      to   { opacity:1; transform: translateY(0); }
    }
    @keyframes fadeUp {
      from { opacity:0; transform: translateY(20px); }
      to   { opacity:1; transform: translateY(0); }
    }

    /* Number animate */
    .amount { transition: all 0.3s ease; }
  </style>
</head>
<body>
<div class="wrapper">

  <!-- Header -->
  <div class="header">
    <div class="badge">💹 Mutual Fund Tool</div>
    <h1>SIP <span>Calculator</span></h1>
    <p>Apne investment ke returns calculate karein — instantly</p>
  </div>

  <!-- Inputs + Summary -->
  <div class="grid">

    <!-- Sliders -->
    <div class="card">
      <div class="card-title">📊 Investment Details</div>

      <div class="field">
        <label>
          Monthly SIP Amount
          <span class="val" id="lbl-sip">₹5,000</span>
        </label>
        <input type="range" id="sip" min="500" max="100000" step="500" value="5000"/>
        <div class="range-labels"><span>₹500</span><span>₹1,00,000</span></div>
      </div>

      <div class="field">
        <label>
          Expected Return (p.a.)
          <span class="val" id="lbl-rate">12%</span>
        </label>
        <input type="range" id="rate" min="1" max="30" step="0.5" value="12"/>
        <div class="range-labels"><span>1%</span><span>30%</span></div>
      </div>

      <div class="field">
        <label>
          Investment Duration
          <span class="val" id="lbl-years">10 Yrs</span>
        </label>
        <input type="range" id="years" min="1" max="40" step="1" value="10"/>
        <div class="range-labels"><span>1 Yr</span><span>40 Yrs</span></div>
      </div>
    </div>

    <!-- Results -->
    <div class="card">
      <div class="card-title">💰 Result Summary</div>
      <div class="results-grid">
        <div class="result-box invested">
          <div class="label">Invested</div>
          <div class="amount" id="r-invested">₹6.00 L</div>
        </div>
        <div class="result-box returns">
          <div class="label">Returns</div>
          <div class="amount" id="r-returns">₹5.16 L</div>
        </div>
        <div class="result-box total">
          <div class="label">Total Value</div>
          <div class="amount" id="r-total">₹11.16 L</div>
        </div>
      </div>

      <!-- Donut -->
      <div class="chart-wrap" style="margin-top:24px;">
        <div class="donut-container">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle id="c-bg" cx="80" cy="80" r="60" fill="none" stroke="#1a2238" stroke-width="22"/>
            <circle id="c-inv" cx="80" cy="80" r="60" fill="none"
              stroke="#e8edf7" stroke-width="22"
              stroke-dasharray="377" stroke-dashoffset="0"
              stroke-linecap="round"/>
            <circle id="c-ret" cx="80" cy="80" r="60" fill="none"
              stroke="#00b8d9" stroke-width="22"
              stroke-dasharray="377" stroke-dashoffset="188"
              stroke-linecap="round"/>
          </svg>
          <div class="donut-center">
            <div class="dc-label">XIRR est.</div>
            <div class="dc-val" id="d-xirr">12%</div>
          </div>
        </div>
        <div class="legend">
          <div class="legend-item">
            <div class="legend-dot" style="background:#e8edf7;"></div>
            <div>
              <div class="li-label">Invested Amount</div>
              <div class="li-val" id="leg-inv">₹6.00 L</div>
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background:#00b8d9;"></div>
            <div>
              <div class="li-label">Est. Returns</div>
              <div class="li-val" id="leg-ret" style="color:var(--accent2)">₹5.16 L</div>
            </div>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background:#00e5a0;"></div>
            <div>
              <div class="li-label">Total Corpus</div>
              <div class="li-val" id="leg-tot" style="color:var(--accent)">₹11.16 L</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Year-by-Year Breakdown -->
    <div class="card full">
      <div class="card-title">📅 Year-by-Year Growth</div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Invested (₹)</th>
              <th>Est. Returns (₹)</th>
              <th>Total Value (₹)</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody id="table-body">
          </tbody>
        </table>
      </div>
    </div>

  </div><!-- /grid -->

  <!-- Zerodha CTA -->
  <div class="zerodha-cta">
    <div class="zcta-left">
      <div class="ztag">⚡ Sponsored — Referral Link</div>
      <h3>Zerodha par invest karna shuru karein!</h3>
      <p>India ka #1 stock broker. Mutual funds, SIP, Stocks — sab ek jagah. Zero commission on direct mutual funds.</p>
      <div class="zcta-features">
        <span>✔ Free Demat Account</span>
        <span>✔ Direct Mutual Funds</span>
        <span>✔ ₹0 Commission</span>
        <span>✔ Trusted by 1.5 Cr+</span>
      </div>
    </div>
    <a class="zcta-btn" href="https://zerodha.com/open-account?c=RRA920" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
      Account Kholein
    </a>
  </div>

  <footer>
    ⚠️ Disclaimer: Ye calculator sirf estimate ke liye hai. Actual returns market conditions par depend karte hain.<br/>
    Mutual Fund investments are subject to market risks.
  </footer>

</div>

<script>
  const sipEl   = document.getElementById('sip');
  const rateEl  = document.getElementById('rate');
  const yearsEl = document.getElementById('years');

  const lblSip   = document.getElementById('lbl-sip');
  const lblRate  = document.getElementById('lbl-rate');
  const lblYears = document.getElementById('lbl-years');

  const rInv  = document.getElementById('r-invested');
  const rRet  = document.getElementById('r-returns');
  const rTot  = document.getElementById('r-total');
  const legInv = document.getElementById('leg-inv');
  const legRet = document.getElementById('leg-ret');
  const legTot = document.getElementById('leg-tot');
  const dXirr  = document.getElementById('d-xirr');
  const cInv   = document.getElementById('c-inv');
  const cRet   = document.getElementById('c-ret');
  const tbody  = document.getElementById('table-body');

  const CIRC = 2 * Math.PI * 60; // ~376.99

  function fmt(n) {
    if (n >= 1e7) return '₹' + (n/1e7).toFixed(2) + ' Cr';
    if (n >= 1e5) return '₹' + (n/1e5).toFixed(2) + ' L';
    return '₹' + n.toLocaleString('en-IN');
  }

  function fmtTable(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function calcSIP(monthly, annualRate, months) {
    const r = annualRate / 12 / 100;
    if (r === 0) return monthly * months;
    return monthly * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
  }

  function updateSliderTrack(el) {
    const pct = (el.value - el.min) / (el.max - el.min) * 100;
    el.style.background = `linear-gradient(to right, var(--accent) ${pct}%, var(--card2) ${pct}%)`;
  }

  function calculate() {
    const sip   = +sipEl.value;
    const rate  = +rateEl.value;
    const yrs   = +yearsEl.value;
    const months = yrs * 12;

    lblSip.textContent   = '₹' + sip.toLocaleString('en-IN');
    lblRate.textContent  = rate + '%';
    lblYears.textContent = yrs + (yrs === 1 ? ' Yr' : ' Yrs');

    updateSliderTrack(sipEl);
    updateSliderTrack(rateEl);
    updateSliderTrack(yearsEl);

    const totalInv = sip * months;
    const totalVal = calcSIP(sip, rate, months);
    const totalRet = totalVal - totalInv;

    rInv.textContent = fmt(totalInv);
    rRet.textContent = fmt(totalRet);
    rTot.textContent = fmt(totalVal);
    legInv.textContent = fmt(totalInv);
    legRet.textContent = fmt(totalRet);
    legTot.textContent = fmt(totalVal);
    dXirr.textContent = rate + '%';

    // Donut
    const invRatio = totalInv / totalVal;
    const retRatio = totalRet / totalVal;

    const invDash = invRatio * CIRC;
    const retDash = retRatio * CIRC;

    cInv.style.strokeDasharray  = `${invDash} ${CIRC}`;
    cInv.style.strokeDashoffset = '0';
    cRet.style.strokeDasharray  = `${retDash} ${CIRC}`;
    cRet.style.strokeDashoffset = `${-invDash}`;

    // Year table
    tbody.innerHTML = '';
    for (let y = 1; y <= yrs; y++) {
      const inv   = sip * y * 12;
      const val   = calcSIP(sip, rate, y * 12);
      const ret   = val - inv;
      const grow  = ((val - inv) / inv * 100).toFixed(1);
      const tr    = document.createElement('tr');
      tr.innerHTML = `
        <td>${y} Yr${y > 1 ? 's' : ''}</td>
        <td>${fmtTable(inv)}</td>
        <td class="blue">${fmtTable(ret)}</td>
        <td class="green">${fmtTable(val)}</td>
        <td class="green">+${grow}%</td>
      `;
      tbody.appendChild(tr);
    }
  }

  [sipEl, rateEl, yearsEl].forEach(el => el.addEventListener('input', calculate));
  calculate();
</script>
</body>
</html>
