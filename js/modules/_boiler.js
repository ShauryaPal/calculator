
export function card(title, body) {
  const wrap = document.createElement('div');
  wrap.className = 'card p-5';
  wrap.innerHTML = `
    <h2 class="section-title">${title}</h2>
    <div class="space-y-4">${body}</div>
  `;
  return wrap;
}
function inputRow(label, id, type='number', placeholder='') {
  return `
    <label class="block">
      <span class="text-sm font-medium text-gray-700">${label}</span>
      <input id="${id}" type="${type}" inputmode="decimal" placeholder="${placeholder}"
             class="input mt-1 border-gray-200 focus:ring-blue-500" />
    </label>
  `;
}
export const ui = { inputRow };
