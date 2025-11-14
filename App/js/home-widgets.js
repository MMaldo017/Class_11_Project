// App/js/home-widgets.js
import { PRODUCTS } from "./store.js";
import { getCartCount } from "./cart.js";

// ---------- helpers ----------
function money(n) {
  return `$${Number(n).toFixed(2)}`;
}
function avg(nums) {
  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}
function byTag(list) {
  return list.reduce((acc, p) => {
    acc[p.tag] = (acc[p.tag] || 0) + 1;
    return acc;
  }, {});
}

// ---------- 1) FEATURES: quick category summary line ----------
function renderFeatureSummary() {
  const featuresSection = document.getElementById("features");
  if (!featuresSection) return;

  const counts = byTag(PRODUCTS);
  const prices = PRODUCTS.map(p => p.price);
  const avgPrice = avg(prices);

  // inject under the last .container within #features (fallback to section)
  const containers = featuresSection.querySelectorAll(".container");
  const target = containers[containers.length - 1] || featuresSection;

  const note = document.createElement("p");
  note.className = "xsmall";
  note.style.margin = "8px 0 0";
  const dress = counts["Dress"] || 0;
  const sport = counts["Sport"] || 0;
  note.textContent =
    `Live store snapshot — Categories: Dress (${dress}), Sport (${sport}) · Avg Price: ${money(avgPrice)}`;

  target.appendChild(note);
}

// ---------- 2) ABOUT: live product stats card ----------
function renderAboutStats() {
  const about = document.getElementById("about");
  if (!about) return;

  // try to append in the left column; fallback to the section
  const leftCol =
    about.querySelector(".grid > div:first-child") ||
    about.querySelector(".grid .container") ||
    about;
  const target = leftCol || about;

  const prices = PRODUCTS.map(p => p.price).sort((a, b) => a - b);
  if (!prices.length) return;

  const total = PRODUCTS.length;
  const min = prices[0];
  const max = prices[prices.length - 1];
  const avgPrice = avg(prices);

  const box = document.createElement("div");
  box.className = "card";
  box.style.marginTop = "12px";
  box.style.padding = "12px 16px";
  box.innerHTML = `
    <h3 style="margin:0 0 6px 0;">Store Stats (Live)</h3>
    <dl style="display:grid;grid-template-columns:auto 1fr;gap:6px;margin:0;">
      <dt>Total Products:</dt><dd>${total}</dd>
      <dt>Lowest Price:</dt><dd>${money(min)}</dd>
      <dt>Highest Price:</dt><dd>${money(max)}</dd>
      <dt>Average Price:</dt><dd>${money(avgPrice)}</dd>
    </dl>
  `;
  target.appendChild(box);
}

// ---------- 3) TESTIMONIALS: simple rotator ----------
function initTestimonials() {
  const host = document.getElementById("testimonials");
  if (!host) return;

  const quotes = host.querySelectorAll("blockquote.quote");
  if (!quotes.length) return;

  let i = 0;
  const hide = q => (q.style.display = "none");
  const show = q => (q.style.display = "");

  quotes.forEach(hide);
  show(quotes[0]);

  setInterval(() => {
    hide(quotes[i]);
    i = (i + 1) % quotes.length;
    show(quotes[i]);
  }, 4000);
}

// ---------- 4) CONTACT: save messages to localStorage ----------
function initContactForm() {
  const form = document.querySelector("#contact form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.querySelector("#name")?.value.trim();
    const email = form.querySelector("#email")?.value.trim();
    const message = form.querySelector("#message")?.value.trim();

    if (!name || !email) {
      alert("Please enter your name and email.");
      return;
    }

    const record = {
      name, email, message,
      ts: new Date().toISOString()
    };

    const KEY = "contact_messages";
    const existing = JSON.parse(localStorage.getItem(KEY) || "[]");
    existing.push(record);
    localStorage.setItem(KEY, JSON.stringify(existing));

    alert("Thanks! Your message has been saved.");
    form.reset();
  });
}

// ---------- 5) CART BADGE: reflect current count ----------
function updateCartBadge() {
  const el = document.getElementById("cart-badge");
  if (!el) return;
  el.textContent = `Cart (${getCartCount()})`;
}

// ---------- Initialize all widgets ----------
document.addEventListener("DOMContentLoaded", () => {
  try {
    renderFeatureSummary();
    renderAboutStats();
    initTestimonials();
    initContactForm();
    updateCartBadge();
  } catch (err) {
    console.error("Home widgets error:", err);
  }
});
