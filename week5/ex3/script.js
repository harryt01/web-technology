// ex3/script.js

// --- DOM element references ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

const productList = document.getElementById('products-grid');

const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');

// Helper: always read current product item elements from the DOM
function getProductItems() {
  return Array.from(document.querySelectorAll('#products-grid article'));
}

// Filter products by keyword (case-insensitive).
// If keyword is empty, all products are shown.
function filterProducts(keyword) {
  const q = (keyword || '').toLowerCase();
  getProductItems().forEach(item => {
    const titleEl = item.querySelector('.product-content h3');
    const title = titleEl ? titleEl.textContent.toLowerCase() : '';
    // match if title includes the query substring
    if (title.includes(q)) {
      item.style.display = ''; // show
    } else {
      item.style.display = 'none'; // hide
    }
  });
}

// --- Event listeners ---

// Search button: run filter once using current input value
searchBtn.addEventListener('click', () => {
  filterProducts(searchInput.value.trim());
});

// Live search: filter as user types (keyup)
searchInput.addEventListener('keyup', (e) => {
  // Optional: perform only on certain keys if you prefer (e.g., Enter)
  filterProducts(searchInput.value.trim());
});

// Clear button: reset search input and show all items
clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterProducts('');
});

// Toggle Add Product form visibility
function showAddForm(show) {
  if (show) {
    addProductForm.classList.remove('hidden');
    addProductForm.setAttribute('aria-hidden', 'false');
  } else {
    addProductForm.classList.add('hidden');
    addProductForm.setAttribute('aria-hidden', 'true');
  }
}

// Add Product button toggles the form
addProductBtn.addEventListener('click', () => {
  const isHidden = addProductForm.classList.contains('hidden');
  showAddForm(isHidden);
});

// Cancel button hides the form and clears inputs
cancelBtn.addEventListener('click', () => {
  addProductForm.reset();
  showAddForm(false);
});

// prevent form from submitting
addProductForm.addEventListener('submit', (e) => {
  // prevent default submit behavior (no real submission in EX3)
  e.preventDefault();
  // Inform user. EX4 implements actual add logic.
  alert('this form is demo-only. implementation of adding is in ex4.');
  // showAddForm(false);
});
