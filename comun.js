// Guarda los datos solo en este móvil (localStorage). Nada sale del dispositivo.
const almacen = {
  leer(clave, defecto) { try { const v = localStorage.getItem(clave); return v ? JSON.parse(v) : defecto } catch { return defecto } },
  guardar(clave, valor) { try { localStorage.setItem(clave, JSON.stringify(valor)) } catch {} }
};
const hoyISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10) };
const fechaLarga = iso => new Date(iso + 'T12:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function exportar(clave, nombre) {
  const blob = new Blob([JSON.stringify(almacen.leer(clave, null), null, 2)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nombre; a.click();
}
function importar(clave, alTerminar) {
  const i = document.createElement('input'); i.type = 'file'; i.accept = 'application/json';
  i.onchange = () => i.files[0].text().then(t => { almacen.guardar(clave, JSON.parse(t)); alTerminar() }).catch(() => alert('Archivo no válido'));
  i.click();
}
