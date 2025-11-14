/*
======================================================
WEEK 4 — HOMEPAGE PRODUCT CAROUSEL (Student Instructions + Explanations)
======================================================
Follow carefully. You will TYPE the code exactly as written below.
Keep everything commented out for now; we’ll uncomment together in class.
Each section includes a plain-English explanation so you understand
what the code does and how it renders to the page.
======================================================
*/



/*
-------------------------------------------------------
1️⃣  CAROUSEL MARKUP ON THE HOMEPAGE  (HTML)
-------------------------------------------------------
FILE: App/index2.html
LOCATION: RIGHT AFTER the Hero section </section> and BEFORE the Features section.

💡 What this does:
- Adds a new <section> on the homepage called “Featured Products”.
- Inside it we create a “viewport” that will show ONE featured product at a time.
- The left ‹ and right › buttons let the user move through the featured products.
- The “dots” below show how many slides there are and which one is active.
- The <a id="carouselLink"...> wraps the image and text so the entire slide is clickable,
  sending the user to the Store page.
- We only create empty containers here; JavaScript will fill in the current product’s
  image, name, and price by setting element properties (src, text, etc.).

🧠 Key idea:
HTML creates the placeholders; JavaScript injects the actual product data at runtime.

--- TYPE the following block into App/index2.html (keep it commented for now) ---
<!--
<section class="section" id="featured">
  <div class="container">
    <header class="section__header">
      <h2>Featured Products</h2>
      <p>Browse a rotating selection from the store</p>
    </header>

    <div id="productCarousel" class="carousel">
      <button class="carousel__nav prev" aria-label="Previous slide">‹</button>

      <div class="carousel__viewport">
        <a id="carouselLink" href="./store.html" class="carousel__slide">
          <img id="carouselImg" src="" alt="" class="carousel__img" />
          <div class="carousel__meta">
            <h3 id="carouselTitle"></h3>
            <p id="carouselPrice" class="price"></p>
          </div>
        </a>
      </div>

      <button class="carousel__nav next" aria-label="Next slide">›</button>
    </div>

    <div id="carouselDots" class="carousel__dots"></div>
  </div>
</section>
-->
-------------------------------------------------------
*/



/*
-------------------------------------------------------
2️⃣  LOAD THE CAROUSEL SCRIPT ON THE HOMEPAGE  (HTML)
-------------------------------------------------------
FILE: App/index2.html
LOCATION: At the VERY BOTTOM of the file, with the other <script> tags,
          and BEFORE the closing </body> tag.

💡 What this does:
- Tells the browser to load our JavaScript file for the carousel.
- “type='module'” means we can use ES Module features like import/export.
- This script will find the HTML elements you created above and fill in the data.

🧠 Key idea:
HTML must exist in the page BEFORE the script runs, so we put scripts at the end.

--- TYPE this single line at the bottom of App/index2.html (keep it commented) ---
<!-- <script type="module" src="./js/home-carousel.js"></script> -->
-------------------------------------------------------
*/



/*
-------------------------------------------------------
3️⃣  CAROUSEL STYLES  (CSS)
-------------------------------------------------------
FILE: App/style2.css
LOCATION: Bottom of the file (add at the end)

💡 What this does:
- .carousel lays out 3 columns: a left button, the main viewport, and a right button.
- .carousel__viewport is a rounded box that hides overflow so only one slide shows.
- .carousel__img controls the visible size of the product image (we set 240px height
  to make it smaller than store cards).
- .carousel__dots builds small circles; the active one gets a brighter color.

🧠 Key idea:
CSS controls the look and layout; JavaScript only swaps the content.

--- TYPE the following rules at the bottom of App/style2.css (keep commented) ---
/*
.carousel {
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.carousel__viewport {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: var(--content-bg);
  box-shadow: 0 6px 24px rgba(0,0,0,.12);
}

.carousel__slide {
  display: grid;
  grid-template-columns: 1fr;
  text-decoration: none;
  color: inherit;
}

.carousel__img {
  width: 100%;
  height: 240px;  /* ¾ size of store images */
  object-fit: cover;
  border-bottom: 1px solid rgba(0,0,0,.08);
}

.carousel__meta {
  padding: 8px 12px;  /* slightly smaller text area */
}

.carousel__nav {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,.12);
  background: transparent;
  color: inherit;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.carousel__nav:hover { transform: translateY(-1px); }

.carousel__dots {
  margin-top: 10px;
  display: flex;
  gap: 6px;
  justify-content: center;
}

.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3a3f47;
  opacity: .6;
  cursor: pointer;
}

[data-theme="dark"] .carousel__dot { background: #6b7280; }
.carousel__dot.is-active { opacity: 1; background: #4a90e2; }

.price { opacity: .85; }
*/
-------------------------------------------------------
*/



/*
-------------------------------------------------------
4️⃣  CREATE THE CAROUSEL SCRIPT  (JavaScript)
-------------------------------------------------------
FILE: App/js/home-carousel.js   ← Create this file

💡 What this does (big picture):
- Imports PRODUCTS (the same array you already use in the Store page).
- Picks a small set of items to feature on the homepage (first 5).
- Finds the HTML elements you created (image, title, price, dots, buttons).
- Keeps track of which product is currently shown (index).
- Renders the current product’s info into the page.
- Listens for clicks on the ‹ and › buttons and on the dots.
- Auto-advances every 4 seconds; pauses when mouse hovers the image area.

🧠 Key ideas line-by-line:
- import { PRODUCTS } from "./store.js";  → lets us reuse the same data.
- const FEATURED = PRODUCTS.slice(0, 5);  → choose 5 products to showcase.
- document.getElementById(...)           → grab HTML elements by id.
- renderSlide(i)                         → fills in the image src, alt,
                                            text for title/price, and updates dots.
- go(), next(), prev()                   → change the index safely (wrap around).
- setInterval(next, 4000)                → automatically move to the next slide.

--- TYPE the following file at App/js/home-carousel.js (keep commented) ---
/*
import { PRODUCTS } from "./store.js";

// Choose which products to feature.
// We are using the first 5 items for this carousel.
// Optional: filter by tag or category if desired (e.g., only "Dress" items).
const FEATURED = PRODUCTS.slice(0, 5);

const els = {
  img: document.getElementById("carouselImg"),
  title: document.getElementById("carouselTitle"),
  price: document.getElementById("carouselPrice"),
  link: document.getElementById("carouselLink"),
  prev: document.querySelector(".carousel .prev"),
  next: document.querySelector(".carousel .next"),
  dots: document.getElementById("carouselDots"),
};

let index = 0;            // which slide we are on (0, 1, 2, ...)
let timerId = null;       // will hold the setInterval id so we can stop/restart it
const AUTOPLAY_MS = 4000; // 4 seconds per slide

// Format a number like 129 → "$129.00"
function money(n) {
  return `$${Number(n).toFixed(2)}`;
}

// Build the small clickable dots below the slide.
// The active slide’s dot gets the "is-active" class so it’s highlighted.
function renderDots() {
  if (!els.dots) return;
  els.dots.innerHTML = "";
  FEATURED.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "carousel__dot" + (i === index ? " is-active" : "");
    dot.dataset.go = String(i); // store the index we should go to if clicked
    els.dots.appendChild(dot);
  });
}

// Show slide #i by placing that product’s data into the HTML elements.
// - Set image src/alt so the picture appears.
// - Set the title text and the price text.
// - Update the dots so the correct one is marked active.
function renderSlide(i) {
  const item = FEATURED[i];
  if (!item || !els.img || !els.title || !els.price || !els.link) return;

  els.img.src = item.img;
  els.img.alt = item.name;
  els.title.textContent = item.name;
  els.price.textContent = money(item.price);
  els.link.href = "./store.html";  // clicking the slide goes to the Store page
  renderDots();
}

// Change the current index safely and then render it.
// The modulo (%) keeps us in range so we “wrap around” if we go past the ends.
function go(newIndex) {
  index = (newIndex + FEATURED.length) % FEATURED.length;
  renderSlide(index);
}

// Helpers for next/previous to keep code readable.
function next() { go(index + 1); }
function prev() { go(index - 1); }

// Start the automatic slide show (every AUTOPLAY_MS milliseconds).
function startAutoplay() {
  stopAutoplay();                 // avoid stacking multiple timers
  timerId = setInterval(next, AUTOPLAY_MS);
}

// Stop the automatic slide show (clears the timer).
function stopAutoplay() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

// Connect buttons and dots to our functions.
// - Clicking prev/next moves slides and restarts the autoplay.
// - Clicking a dot jumps to that slide and restarts the autoplay.
// - Hovering over the image pauses autoplay; leaving restarts it.
function bindEvents() {
  if (els.prev) els.prev.addEventListener("click", () => { prev(); startAutoplay(); });
  if (els.next) els.next.addEventListener("click", () => { next(); startAutoplay(); });

  if (els.dots) {
    els.dots.addEventListener("click", (e) => {
      const dot = e.target.closest("[data-go]");
      if (!dot) return;
      const i = Number(dot.dataset.go);
      go(i);
      startAutoplay();
    });
  }

  const viewport = document.querySelector(".carousel__viewport");
  if (viewport) {
    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);
  }
}

// This runs after the HTML has loaded.
// - If we have products, render the first slide.
// - Attach the event listeners.
// - Start the autoplay so it advances automatically.
function initCarousel() {
  if (!FEATURED.length) return;
  renderSlide(index);
  bindEvents();
  startAutoplay();
}

document.addEventListener("DOMContentLoaded", initCarousel);
*/
-------------------------------------------------------
*/



/*
-------------------------------------------------------
5️⃣  VERIFY MODULE LOADING  (HTML sanity check)
-------------------------------------------------------
FILE: App/index2.html
LOCATION: Bottom of the file, with other scripts.

💡 What this does:
- Ensures both cart and carousel scripts are loaded as ES modules.
- Without these lines, the carousel’s JavaScript will not run.

--- TYPE these lines at the bottom (keep commented) ---
<!--
<script type="module" src="./js/cart.js"></script>
<script type="module" src="./js/home-carousel.js"></script>
-->
-------------------------------------------------------
*/



/*
-------------------------------------------------------
6️⃣  QUICK TEST CHECKLIST  (What you should see)
-------------------------------------------------------
1) Open App/index2.html with Live Server.
2) “Featured Products” section appears under the Hero.
3) The image, title, and price show for one product at a time.
4) Clicking ‹ or › moves to the previous/next product.
5) The dots indicate which product is shown; clicking a dot jumps to it.
6) The carousel advances automatically every ~4 seconds.
7) Hovering over the image pauses autoplay; moving the mouse off resumes it.
8) Images are smaller (height: 240px). To resize, change in style2.css:
     .carousel__img { height: 240px; }

🧠 Reminder:
- HTML creates placeholders.
- CSS controls layout/look.
- JavaScript finds elements and fills them with product data at runtime.
-------------------------------------------------------
*/



/*
🎉 DONE!
-------------------------------------------------------
You just built a Homepage Product Carousel that:
✅ Uses PRODUCTS from store.js (shared site data)
✅ Practices arrays, DOM selection, event listeners, timers
✅ Renders cleanly with small, separate responsibilities:
   - HTML = structure
   - CSS  = presentation
   - JS   = behavior/data
Keep this commented for now—we’ll uncomment and test together in class.
-------------------------------------------------------
*/
