/*
======================================================
WEEK 2 ADD-ON — CART MODAL FEATURE (Instructions)
File name: week2-cart-feature.js
======================================================
Goal:
Add a visible Cart modal to the Store page so users can
view items, change quantities, clear cart, and see a total.
Builds on Week 2 Store Lite (store.html, cart.js, store.js).

You will edit:
  1) App/store.html
  2) App/js/cart.js
  3) App/js/store.js
  4) App/style2.css  (dark text fix for modal)

Follow each step and TYPE the code where indicated.
------------------------------------------------------
*/


/*
------------------------------------------------------
1) App/store.html — Add the Cart Modal markup
Place this block INSIDE <main class="section"> … </main>,
ideally near the bottom, before </main>.
------------------------------------------------------
TYPE THIS:
------------------------------------------------------
<!-- Cart Modal -->
<dialog id="cartModal" class="card" style="max-width:680px;width:96%;border:none;border-radius:16px;padding:16px">
  <header style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
    <h3 style="margin:0">Your Cart</h3>
    <button id="closeCartBtn" class="btn btn--sm btn--outline">Close</button>
  </header>

  <div id="cartEmpty" class="xsmall" style="display:none;margin:8px 0">Your cart is empty.</div>

  <div id="cartList" style="display:grid;gap:8px;margin:8px 0"></div>

  <footer style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
    <strong>Total: $<span id="cartTotal">0.00</span></strong>
    <div style="display:flex;gap:8px">
      <button id="clearCartBtn" class="btn btn--outline btn--sm">Clear Cart</button>
      <button id="checkoutBtn" class="btn btn--primary btn--sm">Checkout (mock)</button>
    </div>
  </footer>
</dialog>
------------------------------------------------------
NOTE: The header already shows a "Cart (0)" badge in nav.
That badge will OPEN this modal.
*/
 


/*
------------------------------------------------------
2) App/js/cart.js — Add helpers for removing & clearing
Scroll to the END of cart.js and TYPE these functions.
(Keep your existing exports.)
------------------------------------------------------
TYPE THIS:
------------------------------------------------------
export function removeFromCart(productId, qty = 1) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.productId === productId);
  if (idx === -1) return;
  cart[idx].qty -= qty;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}
*/
 


/*
------------------------------------------------------
3) App/js/store.js — Wire up the modal behavior
A) IMPORTS — add the missing imports to your existing line.
Find the line: `import { addToCart, getCartCount } from "./cart.js";`
Replace it with the line below.
------------------------------------------------------
TYPE THIS (replace the existing import):
------------------------------------------------------
import { addToCart, getCartCount, getCart, clearCart, removeFromCart } from "./cart.js";
------------------------------------------------------

B) HELPERS — add these right BELOW your PRODUCTS array.
------------------------------------------------------
TYPE THIS:
------------------------------------------------------
function findProduct(productId) {
  return PRODUCTS.find(p => p.id === productId);
}

function formatMoney(n) {
  return Number(n).toFixed(2);
}

function renderCartModal() {
  const modal = document.getElementById("cartModal");
  const listEl = document.getElementById("cartList");
  const emptyEl = document.getElementById("cartEmpty");
  const totalEl = document.getElementById("cartTotal");
  if (!modal || !listEl || !emptyEl || !totalEl) return;

  const items = getCart();
  listEl.innerHTML = "";
  let total = 0;

  if (!items.length) {
    emptyEl.style.display = "block";
  } else {
    emptyEl.style.display = "none";
    for (let line of items) {
      const p = findProduct(line.productId);
      if (!p) continue;
      const lineTotal = p.price * line.qty;
      total += lineTotal;

      const row = document.createElement("div");
      row.className = "card";
      row.style.padding = "8px 12px";
      row.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr auto auto;gap:8px;align-items:center">
          <div>
            <strong>${p.name}</strong>
            <div class="xsmall">Price: $${formatMoney(p.price)} · Qty: ${line.qty}</div>
          </div>
          <div>$${formatMoney(lineTotal)}</div>
          <div style="display:flex;gap:6px">
            <button class="btn btn--sm btn--outline" data-dec="${p.id}">−</button>
            <button class="btn btn--sm btn--outline" data-inc="${p.id}">+</button>
            <button class="btn btn--sm btn--accent" data-rem="${p.id}">Remove</button>
          </div>
        </div>
      `;
      listEl.appendChild(row);
    }
  }

  totalEl.textContent = formatMoney(total);

  // Row actions (event delegation)
  listEl.onclick = (e) => {
    const dec = e.target.closest("[data-dec]");
    const inc = e.target.closest("[data-inc]");
    const rem = e.target.closest("[data-rem]");
    if (dec) {
      const id = Number(dec.getAttribute("data-dec"));
      removeFromCart(id, 1);
      setCartBadge();
      renderCartModal();
    } else if (inc) {
      const id = Number(inc.getAttribute("data-inc"));
      addToCart(id, 1);
      setCartBadge();
      renderCartModal();
    } else if (rem) {
      const id = Number(rem.getAttribute("data-rem"));
      const current = getCart().find(i => i.productId === id)?.qty || 1;
      removeFromCart(id, current); // remove entire line
      setCartBadge();
      renderCartModal();
    }
  };

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.style.display = "block"; // fallback
  }
}
------------------------------------------------------

C) INIT — hook up open/close/clear/checkout.
Inside your existing init() function, ADD these lines at the END.
------------------------------------------------------
TYPE THIS:
------------------------------------------------------
  // Open modal from the Cart badge
  const cartBadge = document.getElementById("cart-badge");
  if (cartBadge) {
    cartBadge.addEventListener("click", renderCartModal);
  }

  // Close modal
  const closeBtn = document.getElementById("closeCartBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      const modal = document.getElementById("cartModal");
      if (!modal) return;
      if (typeof modal.close === "function") modal.close();
      else modal.style.display = "none";
    });
  }

  // Clear cart
  const clearBtn = document.getElementById("clearCartBtn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearCart();
      setCartBadge();
      renderCartModal();
    });
  }

  // Mock checkout
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Checkout coming in Week 3 🙂");
    });
  }
*/
 


/*
------------------------------------------------------
4) App/style2.css — Ensure white text in dark modal
SCROLL to the END of style2.css and TYPE this override.
If you already added it, you can keep it as-is.
------------------------------------------------------
TYPE THIS:
------------------------------------------------------
/* Cart Modal Dark Theme */
/*
#cartModal,
#cartModal * {
  color: var(--color-text);
}

#cartModal .card {
  background: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

#cartModal strong,
#cartModal h3 {
  color: var(--color-text);
}

#cartModal button {
  color: var(--color-text);
}
*/
 


/*
------------------------------------------------------
5) TEST CHECKLIST (Students)
Open App/store.html in Live Server and verify:
------------------------------------------------------
[ ] Click "Add to cart" on a product → Cart badge increments
[ ] Click "Cart (N)" badge → Modal opens
[ ] Items render with name, price, qty, line total
[ ] + and − buttons update quantities and totals
[ ] Remove deletes the line item
[ ] Clear Cart empties everything and badge resets
[ ] Text is readable (white on dark modal)
[ ] Modal can be closed with "Close" button
------------------------------------------------------
🎉 Done! You now have a visible Cart feature without leaving the Store page.
*/
