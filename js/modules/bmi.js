import { card } from './_boiler.js';

export function renderBMI() {
  const body = `
    <div class="grid md:grid-cols-3 gap-4">
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Height (cm)</span>
        <input id="h" type="number" class="input mt-1 border-gray-200" placeholder="170" />
      </label>
      <label class="block">
        <span class="text-sm font-medium text-gray-700">Weight (kg)</span>
        <input id="w" type="number" class="input mt-1 border-gray-200" placeholder="65" />
      </label>
      <div class="self-end">
        <button id="calc" class="px-4 py-2 rounded-xl bg-gray-900 text-white">Calculate</button>
      </div>
    </div>
    <div class="mt-4 space-y-1">
      <div>BMI: <span id="bmi" class="font-semibold"></span></div>
      <div>Category: <span id="cat" class="font-semibold"></span></div>
    </div>
  `;
  const wrap = card("BMI Calculator", body);
  const h = wrap.querySelector('#h');
  const w = wrap.querySelector('#w');
  const bmi = wrap.querySelector('#bmi');
  const cat = wrap.querySelector('#cat');

  wrap.querySelector('#calc').addEventListener('click', () => {
    const heightM = (parseFloat(h.value)||0)/100;
    const weight = parseFloat(w.value)||0;
    if (!heightM || !weight) { bmi.textContent='—'; cat.textContent=''; return; }
    const val = weight / (heightM*heightM);
    bmi.textContent = val.toFixed(2);
    cat.textContent = val < 18.5 ? 'Underweight' :
                      val < 25 ? 'Normal' :
                      val < 30 ? 'Overweight' : 'Obesity';
  });

  return wrap;
}
