import { card, ui } from './_boiler.js';

export function renderBasic() {
  const body = `
    <div class="grid gap-3">
      <input id="display" class="input border-gray-200 text-right text-2xl" placeholder="0" readonly />
      <div class="grid grid-cols-4 gap-2">
        ${["C","÷","×","⌫","7","8","9","−","4","5","6","+","1","2","3","=","0",".","(",")"].map(k => `
          <button data-k="${k}" class="px-3 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 font-medium">${k}</button>
        `).join('')}
      </div>
    </div>
  `;
  const wrap = card("Basic Calculator", body);
  const display = () => wrap.querySelector('#display');
  function insert(ch) {
    if (ch === 'C') { display().value=''; return; }
    if (ch === '⌫') { display().value = display().value.slice(0,-1); return; }
    if (ch === '=') {
      try {
        const expr = display().value.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-');
        // Safe eval: only math characters
        if (/^[0-9+\-*/().\s]+$/.test(expr)) {
          display().value = String(Function(`"use strict";return (${expr})`)());
        } else {
          alert('Invalid expression');
        }
      } catch { alert('Invalid expression'); }
      return;
    }
    display().value += ch;
  }
  wrap.querySelectorAll('button[data-k]').forEach(b => b.addEventListener('click', () => insert(b.dataset.k)));
  return wrap;
}
