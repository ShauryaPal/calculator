import { card } from './_boiler.js';

export function renderTip() {
  const body = `
    <div class="grid md:grid-cols-3 gap-4">
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Bill Amount</span>
        <input id="bill" type="number" class="input mt-1 border-gray-200" placeholder="1500" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Tip %</span>
        <input id="tipPct" type="number" class="input mt-1 border-gray-200" placeholder="10" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Split Between</span>
        <input id="people" type="number" class="input mt-1 border-gray-200" placeholder="1" />
      </label>
    </div>
    <div class="mt-4">
      <button id="calc" class="px-4 py-2 rounded-xl bg-gray-900 text-white">Calculate</button>
    </div>
    <div class="mt-4 space-y-1">
      <div>Tip: <span id="tip" class="font-semibold"></span></div>
      <div>Total: <span id="total" class="font-semibold"></span></div>
      <div>Per Person: <span id="per" class="font-semibold"></span></div>
    </div>
  `;
  const wrap = card("Tip Calculator", body);
  const bill = wrap.querySelector('#bill');
  const tipPct = wrap.querySelector('#tipPct');
  const people = wrap.querySelector('#people');
  const tip = wrap.querySelector('#tip');
  const total = wrap.querySelector('#total');
  const per = wrap.querySelector('#per');

  wrap.querySelector('#calc').addEventListener('click', () => {
    const b = parseFloat(bill.value)||0;
    const pct = (parseFloat(tipPct.value)||0)/100;
    const n = Math.max(1, Math.floor(parseFloat(people.value)||1));
    const t = b * pct;
    const tot = b + t;
    tip.textContent = t.toFixed(2);
    total.textContent = tot.toFixed(2);
    per.textContent = (tot/n).toFixed(2);
  });

  return wrap;
}
