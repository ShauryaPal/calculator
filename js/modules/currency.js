import { card } from './_boiler.js';

// Primary: frankfurter.app (very CORS-friendly)
// Fallback: exchangerate.host /convert
const API_FRANKFURTER = 'https://api.frankfurter.app/latest';
const API_EXHOST_CONVERT = 'https://api.exchangerate.host/convert';

export function renderCurrency() {
  const currencies = ['USD','EUR','INR','GBP','JPY','AUD','CAD','CNY','SGD','AED'];
  const body = `
    <div class="grid gap-6">
      <div class="grid md:grid-cols-3 gap-4">
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Amount</span>
          <input id="amount" type="number" class="input mt-1 border-gray-200" placeholder="100" />
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">From</span>
          <select id="from" class="input mt-1 border-gray-200">
            ${currencies.map(c => `<option>${c}</option>`).join('')}
          </select>
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">To</span>
          <select id="to" class="input mt-1 border-gray-200">
            ${currencies.map(c => `<option>${c}</option>`).join('')}
          </select>
        </label>
      </div>
      <div class="flex gap-3 items-center">
        <button id="convert" class="px-4 py-2 rounded-xl bg-gray-900 text-white">Convert</button>
        <button id="swap" class="px-3 py-2 rounded-xl bg-gray-100">Swap</button>
      </div>
      <div class="text-lg font-semibold">Result: <span id="result" class="font-mono"></span></div>
      <p class="text-sm text-gray-500">Uses frankfurter.app with exchangerate.host fallback. Requires internet.</p>
    </div>
  `;
  const wrap = card("Currency Converter", body);
  const amount = wrap.querySelector('#amount');
  const from = wrap.querySelector('#from');
  const to = wrap.querySelector('#to');
  const result = wrap.querySelector('#result');

  async function convert() {
    result.textContent = '…';
    const a = parseFloat(amount.value);
    if (Number.isNaN(a)) { result.textContent = 'Enter an amount'; return; }
    const base = from.value;
    const tgt = to.value;

    if (base === tgt) {
      result.textContent = `${a.toFixed(2)} ${tgt}`;
      return;
    }

    // Try frankfurter first
    try {
      const url = `${API_FRANKFURTER}?amount=${encodeURIComponent(a)}&from=${encodeURIComponent(base)}&to=${encodeURIComponent(tgt)}`;
      const resp = await fetch(url, { cache: 'no-store' });
      if (!resp.ok) throw new Error('frankfurter fetch failed');
      const data = await resp.json();
      const rateVal = data?.rates?.[tgt];
      if (typeof rateVal === 'number') {
        result.textContent = `${rateVal.toFixed(2)} ${tgt}`;
        return;
      }
      throw new Error('frankfurter missing rate');
    } catch (e) {
      // fall back
    }

    // Fallback: exchangerate.host /convert
    try {
      const url2 = `${API_EXHOST_CONVERT}?from=${encodeURIComponent(base)}&to=${encodeURIComponent(tgt)}&amount=${encodeURIComponent(a)}`;
      const resp2 = await fetch(url2, { cache: 'no-store' });
      if (!resp2.ok) throw new Error('exchangerate.host fetch failed');
      const data2 = await resp2.json();
      if (typeof data2?.result === 'number') {
        result.textContent = `${data2.result.toFixed(2)} ${tgt}`;
        return;
      }
      throw new Error('exhost missing result');
    } catch (e2) {
      result.textContent = 'Failed to fetch rates. Check internet/CORS.';
    }
  }

  wrap.querySelector('#convert').addEventListener('click', convert);
  wrap.querySelector('#swap').addEventListener('click', () => {
    const f = from.value;
    from.value = to.value; to.value = f;
  });

  return wrap;
}
