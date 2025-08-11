import { card } from './_boiler.js';

export function renderDateCalc() {
  const body = `
    <div class="grid gap-6">
      <div class="card p-4 space-y-3">
        <h3 class="font-semibold">Difference Between Dates</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <label class="block">
            <span class="text-sm font-medium text-gray-700">Start</span>
            <input id="start" type="date" class="input mt-1 border-gray-200" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-gray-700">End</span>
            <input id="end" type="date" class="input mt-1 border-gray-200" />
          </label>
          <button id="diff" class="self-end px-4 py-2 rounded-xl bg-gray-900 text-white">Calculate</button>
        </div>
        <div>Days: <span id="days" class="font-semibold"></span></div>
      </div>

      <div class="card p-4 space-y-3">
        <h3 class="font-semibold">Add/Subtract Days</h3>
        <div class="grid md:grid-cols-3 gap-4">
          <label class="block">
            <span class="text-sm font-medium text-gray-700">Date</span>
            <input id="base" type="date" class="input mt-1 border-gray-200" />
          </label>
          <label class="block">
            <span class="text-sm font-medium text-gray-700">Days (+/-)</span>
            <input id="offset" type="number" class="input mt-1 border-gray-200" placeholder="30" />
          </label>
          <button id="shift" class="self-end px-4 py-2 rounded-xl bg-gray-900 text-white">Apply</button>
        </div>
        <div>Result: <span id="res" class="font-semibold"></span></div>
      </div>
    </div>
  `;
  const wrap = card("Date Calculator", body);
  const start = wrap.querySelector('#start');
  const end = wrap.querySelector('#end');
  const days = wrap.querySelector('#days');
  const base = wrap.querySelector('#base');
  const offset = wrap.querySelector('#offset');
  const res = wrap.querySelector('#res');

  wrap.querySelector('#diff').addEventListener('click', () => {
    const s = new Date(start.value);
    const e = new Date(end.value);
    if (isNaN(s) || isNaN(e)) { days.textContent = '—'; return; }
    const d = Math.round((e - s) / (1000*60*60*24));
    days.textContent = String(d);
  });

  wrap.querySelector('#shift').addEventListener('click', () => {
    const b = new Date(base.value);
    const o = parseInt(offset.value, 10);
    if (isNaN(b) || isNaN(o)) { res.textContent = '—'; return; }
    const r = new Date(b);
    r.setDate(r.getDate() + o);
    res.textContent = r.toISOString().slice(0,10);
  });

  return wrap;
}
