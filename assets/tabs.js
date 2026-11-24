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

// Renders a repo Markdown file into el. Relative links point at the file on GitHub,
// resolved from the Markdown file's own folder, so they never break on the Pages site.
export async function renderMd(el, marked, repo) {
  const path = el.dataset.md;
  el.innerHTML = marked.parse(await text(path));
  const base = new URL(path, "https://x.invalid/");
  for (const a of el.querySelectorAll("a[href]")) {
    const href = a.getAttribute("href");
    if (/^([a-z]+:|#|\/\/)/i.test(href)) continue;
    const u = new URL(href, base);
    a.href = `https://github.com/jkelleman/${repo}/blob/main${u.pathname}${u.hash}`;
  }
  for (const img of el.querySelectorAll("img[src]")) {
    const src = img.getAttribute("src");
    if (/^([a-z]+:|\/\/)/i.test(src)) continue;
    img.src = new URL(src, new URL(path, location.href)).href;
  }
}
