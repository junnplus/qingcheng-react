export function escape(html) {
  html = html || '';
  return html
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');
}

export function shake(el) {
  el.className = el.className + ' shake';
  setTimeout(() => {
    el.className = el.className.replace(' shake', '');
  }, 650);
}

export function errorMessage(formError) {
  for (var k in formError) {
    if (formError[k].length) {
      return formError[k][0];
    }
  }
}
