import { card } from './_boiler.js';

export function renderDiscount() {
  const body = `
    <div class="grid md:grid-cols-3 gap-4">
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Original Price</span>
        <input id="price" type="number" class="input mt-1 border-gray-200" placeholder="1000" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Discount %</span>
        <input id="percent" type="number" class="input mt-1 border-gray-200" placeholder="15" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Tax % (optional)</span>
        <input id="tax" type="number" class="input mt-1 border-gray-200" placeholder="0" />
      </label>
    </div>
    <div class="mt-4">
      <button id="calc" class="px-4 py-2 rounded-xl bg-gray-900 text-white">Calculate</button>
    </div>
    <div class="mt-4 space-y-1">
      <div>Discount: <span id="discount" class="font-semibold"></span></div>
      <div>Final Price: <span id="final" class="font-semibold"></span></div>
    </div>
  `;
  const wrap = card("Discount Calculator", body);
  const price = wrap.querySelector('#price');
  const percent = wrap.querySelector('#percent');
  const tax = wrap.querySelector('#tax');
  const discount = wrap.querySelector('#discount');
  const final = wrap.querySelector('#final');

  wrap.querySelector('#calc').addEventListener('click', () => {
    const p = parseFloat(price.value)||0;
    const d = (parseFloat(percent.value)||0)/100;
    const t = (parseFloat(tax.value)||0)/100;
    const disc = p * d;
    const subtotal = p - disc;
    const total = subtotal * (1 + t);
    discount.textContent = disc.toFixed(2);
    final.textContent = total.toFixed(2);
  });

  return wrap;
}
