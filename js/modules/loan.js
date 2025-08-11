import { card } from './_boiler.js';

function monthlyPayment(P, annualRatePct, years) {
  const r = (annualRatePct/100) / 12;
  const n = years * 12;
  if (r === 0) return P / n;
  const m = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return m;
}

export function renderLoan() {
  const body = `
    <div class="grid md:grid-cols-4 gap-4">
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Principal</span>
        <input id="P" type="number" class="input mt-1 border-gray-200" placeholder="500000" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Interest % (APR)</span>
        <input id="R" type="number" class="input mt-1 border-gray-200" placeholder="8" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Term (years)</span>
        <input id="Y" type="number" class="input mt-1 border-gray-200" placeholder="20" />
      </label>
      <div class="self-end">
        <button id="calc" class="px-4 py-2 rounded-xl bg-gray-900 text-white">Calculate</button>
      </div>
    </div>
    <div class="mt-4 space-y-1">
      <div>Monthly Payment: <span id="M" class="font-semibold"></span></div>
      <div>Total Payment: <span id="TP" class="font-semibold"></span></div>
      <div>Total Interest: <span id="TI" class="font-semibold"></span></div>
    </div>
  `;
  const wrap = card("Loan Calculator", body);
  const P = wrap.querySelector('#P');
  const R = wrap.querySelector('#R');
  const Y = wrap.querySelector('#Y');
  const M = wrap.querySelector('#M');
  const TP = wrap.querySelector('#TP');
  const TI = wrap.querySelector('#TI');

  wrap.querySelector('#calc').addEventListener('click', () => {
    const p = parseFloat(P.value)||0;
    const r = parseFloat(R.value)||0;
    const y = parseFloat(Y.value)||0;
    const m = monthlyPayment(p, r, y);
    const total = m * (y*12);
    const interest = total - p;
    M.textContent = m.toFixed(2);
    TP.textContent = total.toFixed(2);
    TI.textContent = interest.toFixed(2);
  });

  return wrap;
}
