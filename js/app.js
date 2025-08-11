import { renderBasic } from './modules/basic.js';
import { renderUnit } from './modules/unit.js';
import { renderCurrency } from './modules/currency.js';
import { renderDiscount } from './modules/discount.js';
import { renderTip } from './modules/tip.js';
import { renderDateCalc } from './modules/datecalc.js';
import { renderGPA } from './modules/gpa.js';
import { renderLoan } from './modules/loan.js';
import { renderBMI } from './modules/bmi.js';

const container = document.getElementById('viewContainer');
const yearEl = document.getElementById('year');
yearEl.textContent = new Date().getFullYear();

const views = {
  basic: renderBasic,
  unit: renderUnit,
  currency: renderCurrency,
  discount: renderDiscount,
  tip: renderTip,
  date: renderDateCalc,
  gpa: renderGPA,
  loan: renderLoan,
  bmi: renderBMI,
};

function show(view = 'basic') {
  container.innerHTML = '';
  const node = views[view]();
  container.appendChild(node);
  document.querySelectorAll('.nav-btn').forEach(btn => {
    if (btn.dataset.view === view) {
      btn.classList.add('bg-gray-900','text-white');
    } else {
      btn.classList.remove('bg-gray-900','text-white');
    }
  });
  window.location.hash = view;
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => show(btn.dataset.view));
});

document.getElementById('menuBtn')?.addEventListener('click', () => {
  const m = document.getElementById('mobileNav');
  m.classList.toggle('hidden');
});

window.addEventListener('hashchange', () => {
  const view = location.hash.replace('#', '') || 'basic';
  if (views[view]) show(view);
});

// Initial render
const initial = location.hash.replace('#', '') || 'basic';
show(views[initial] ? initial : 'basic');
