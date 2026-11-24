// Highlights the section tab for the section currently at the top of the page.
export function trackTabs() {
  const links = [...document.querySelectorAll(".tabs a[href^='#']")];
  const secs = links.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const update = () => {
    let cur = secs[0];
    for (const s of secs) if (s.getBoundingClientRect().top <= 120) cur = s;
    links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + cur.id));
  };
  addEventListener("scroll", update, { passive: true });
  update();
}

export async function text(path) {
  const r = await fetch(path);
  if (!r.ok) throw new Error(path + " " + r.status);
  return r.text();
}

export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
