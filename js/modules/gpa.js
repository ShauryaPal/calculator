import { card } from './_boiler.js';

const scaleMap = { 'A+':4.0, 'A':4.0, 'A-':3.7, 'B+':3.3, 'B':3.0, 'B-':2.7, 'C+':2.3, 'C':2.0, 'C-':1.7, 'D':1.0, 'F':0 };

export function renderGPA() {
  const body = `
    <div class="space-y-4">
      <div id="rows" class="space-y-2"></div>
      <button id="add" class="px-3 py-2 rounded-xl bg-gray-100">+ Add Course</button>
      <button id="calc" class="px-4 py-2 rounded-xl bg-gray-900 text-white">Calculate GPA</button>
      <div class="text-lg font-semibold">GPA: <span id="gpa" class="font-mono"></span></div>
      <p class="text-sm text-gray-500">4.0 scale by default. Adjust grade points in code if your school differs.</p>
    </div>
  `;
  const wrap = card("GPA Calculator", body);
  const rows = wrap.querySelector('#rows');
  const gpa = wrap.querySelector('#gpa');

  function addRow() {
    const div = document.createElement('div');
    div.className = 'grid grid-cols-12 gap-2';
    div.innerHTML = `
      <input class="col-span-6 input border-gray-200" placeholder="Course name" />
      <input class="col-span-2 input border-gray-200" type="number" placeholder="Credits" />
      <select class="col-span-3 input border-gray-200">
        ${Object.keys(scaleMap).map(k => `<option>${k}</option>`).join('')}
      </select>
      <button class="col-span-1 rounded-xl bg-red-50 hover:bg-red-100" aria-label="Remove">✕</button>
    `;
    div.querySelector('button').addEventListener('click', () => div.remove());
    rows.appendChild(div);
  }

  function calc() {
    let points = 0, credits = 0;
    rows.querySelectorAll('.grid').forEach(row => {
      const c = parseFloat(row.children[1].value)||0;
      const g = scaleMap[row.children[2].value];
      credits += c;
      points += c * g;
    });
    gpa.textContent = credits ? (points/credits).toFixed(3) : '—';
  }

  wrap.querySelector('#add').addEventListener('click', addRow);
  wrap.querySelector('#calc').addEventListener('click', calc);
  addRow(); addRow(); addRow();
  return wrap;
}
