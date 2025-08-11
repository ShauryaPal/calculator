import { card, ui } from './_boiler.js';

const units = {
  length: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.34, yd: 0.9144, ft: 0.3048, in: 0.0254 },
  mass: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
  temperature: {} // handled separately
};

function convertLengthMass(value, fromUnit, toUnit, table) {
  const base = value * table[fromUnit];
  return base / table[toUnit];
}

function convertTemp(value, from, to) {
  // Convert to Celsius
  let C;
  if (from === 'C') C = value;
  else if (from === 'F') C = (value - 32) * 5/9;
  else if (from === 'K') C = value - 273.15;
  // From Celsius
  if (to === 'C') return C;
  if (to === 'F') return (C * 9/5) + 32;
  if (to === 'K') return C + 273.15;
}

export function renderUnit() {
  const body = `
    <div class="grid gap-6">
      <div class="grid md:grid-cols-2 gap-4">
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Category</span>
          <select id="category" class="input mt-1 border-gray-200 focus:ring-blue-500">
            <option value="length">Length</option>
            <option value="mass">Mass</option>
            <option value="temperature">Temperature</option>
          </select>
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">Value</span>
          <input id="value" type="number" class="input mt-1 border-gray-200" placeholder="Enter value" />
        </label>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <label class="block">
          <span class="text-sm font-medium text-gray-700">From</span>
          <select id="from" class="input mt-1 border-gray-200 focus:ring-blue-500"></select>
        </label>
        <label class="block">
          <span class="text-sm font-medium text-gray-700">To</span>
          <select id="to" class="input mt-1 border-gray-200 focus:ring-blue-500"></select>
        </label>
      </div>
      <div>
        <button id="convert" class="px-4 py-2 rounded-xl bg-gray-900 text-white">Convert</button>
      </div>
      <div class="text-lg font-semibold">Result: <span id="result" class="font-mono"></span></div>
    </div>
  `;
  const wrap = card("Unit Converter", body);
  const cat = wrap.querySelector('#category');
  const from = wrap.querySelector('#from');
  const to = wrap.querySelector('#to');
  const value = wrap.querySelector('#value');
  const result = wrap.querySelector('#result');

  function populateOptions() {
    const c = cat.value;
    let opts = [];
    if (c === 'length') opts = Object.keys(units.length);
    if (c === 'mass') opts = Object.keys(units.mass);
    if (c === 'temperature') opts = ['C','F','K'];
    from.innerHTML = opts.map(u => `<option value="${u}">${u}</option>`).join('');
    to.innerHTML = opts.map(u => `<option value="${u}">${u}</option>`).join('');
  }

  function doConvert() {
    const v = parseFloat(value.value);
    if (Number.isNaN(v)) { result.textContent = '—'; return; }
    const c = cat.value; const f = from.value; const t = to.value;
    let out = 0;
    if (c === 'temperature') out = convertTemp(v, f, t);
    else out = convertLengthMass(v, f, t, units[c]);
    result.textContent = `${out.toFixed(6)} ${t}`;
  }

  cat.addEventListener('change', () => { populateOptions(); doConvert(); });
  wrap.querySelector('#convert').addEventListener('click', doConvert);

  populateOptions();
  return wrap;
}
