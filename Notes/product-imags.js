/*
======================================================
WEEK 2 ADD-ON — PRODUCT IMAGES INSTRUCTIONS
File name: week2-product-images.js
======================================================
Goal:
Add real product images to your Store page.
You will create a folder, add .jpg files, and
update your store.js to display them in each card.

Files you’ll work with:
  1) App/images/products/
  2) App/js/store.js
------------------------------------------------------
*/


/*
------------------------------------------------------
1️⃣  CREATE THE PRODUCT IMAGES FOLDER
------------------------------------------------------
STEP 1:
Inside your App folder, create a new folder called "images"
(if it doesn't already exist).

STEP 2:
Inside "images", create another folder called "products".

Your folder structure should look like this:
------------------------------------------------------
App/
 ├─ store.html
 ├─ js/
 │   └─ store.js
 └─ images/
     └─ products/
------------------------------------------------------

STEP 3:
Add your product images inside "products" folder.
Name each image exactly as shown below:
------------------------------------------------------
pro-diver.jpg
expedition-scout.jpg
seascape-auto.jpg
trail-runner.jpg
city-classic.jpg
aero-chrono.jpg
------------------------------------------------------
Make sure the file names are lowercase, use hyphens,
and have the .jpg extension.
*/


/*
------------------------------------------------------
2️⃣  UPDATE YOUR PRODUCTS ARRAY IN store.js
------------------------------------------------------
Open: App/js/store.js

STEP 1:
Find the PRODUCTS array near the top of the file.
It should look similar to this:
------------------------------------------------------
export const PRODUCTS = [
  { id: 1, name: "Pro Diver", price: 74, tag: "Dress" },
  { id: 2, name: "Expedition Scout", price: 40, tag: "Sport" },
  ...
];
------------------------------------------------------

STEP 2:
Add an img property to each product using the correct path.
TYPE THIS UPDATED ARRAY:
------------------------------------------------------
export const PRODUCTS = [
  { id: 1, name: "Pro Diver", price: 74, tag: "Dress", img: "./images/products/pro-diver.jpg" },
  { id: 2, name: "Expedition Scout", price: 40, tag: "Sport", img: "./images/products/expedition-scout.jpg" },
  { id: 3, name: "Seascape Auto", price: 199, tag: "Dress", img: "./images/products/seascape-auto.jpg" },
  { id: 4, name: "Trail Runner", price: 89, tag: "Sport", img: "./images/products/trail-runner.jpg" },
  { id: 5, name: "City Classic", price: 129, tag: "Dress", img: "./images/products/city-classic.jpg" },
  { id: 6, name: "Aero Chrono", price: 159, tag: "Sport", img: "./images/products/aero-chrono.jpg" },
];
------------------------------------------------------

NOTE:
The path starts with "./images/products/" because
store.html and images/ are in the same App folder.
*/


/*
------------------------------------------------------
3️⃣  ADD IMAGES TO EACH PRODUCT CARD
------------------------------------------------------
Find your renderGrid() function in store.js.
You will see a line that starts with:
------------------------------------------------------
card.innerHTML = `
------------------------------------------------------

Replace the inside of the template with this version:
------------------------------------------------------
card.innerHTML = `
  <img src="${p.img}" alt="${p.name}" class="product-img"
       style="width:100%;height:auto;border-radius:12px;
       margin-bottom:8px;object-fit:cover;" />
  <h4>${p.name}</h4>
  <p>$${p.price}</p>
  <p class="xsmall">Category: ${p.tag}</p>
  <button class="btn btn--accent btn--sm" data-add="${p.id}">
    Add to cart
  </button>
`;
------------------------------------------------------

This adds an image to the top of each product card.
*/


/*
------------------------------------------------------
4️⃣  TEST YOUR STORE PAGE
------------------------------------------------------
1) Open App/index2.html in Live Server.
2) Click "Store" in the navigation.
3) Each product should now show an image above its name.
4) Check that Add to Cart still works correctly.
5) If an image is missing, check:
   - File names and extensions
   - Folder location (inside App/images/products)
   - The img path in store.js
------------------------------------------------------

🎉 You have now added product images to your store!
------------------------------------------------------
*/
