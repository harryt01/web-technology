// ex4/script.js

// --- DOM element references ---
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

const productsGrid = document.getElementById('products-grid');

const addProductBtn = document.getElementById('addProductBtn');
const addProductForm = document.getElementById('addProductForm');
const cancelBtn = document.getElementById('cancelBtn');
const errorMsg = document.getElementById('errorMsg');

const contactForm = document.getElementById('contactForm');

// Helper: always read current product item elements from the DOM
function getProductItems() {
  return Array.from(document.querySelectorAll('#products-grid article'));
}

// Basic escaping to avoid injecting raw HTML from user inputs
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

// --- Event listeners for search ---
searchBtn.addEventListener('click', () => {
  filterProducts(searchInput.value.trim());
});

searchInput.addEventListener('keyup', () => {
  filterProducts(searchInput.value.trim());
});

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
    errorMsg.textContent = '';
  }
}

addProductBtn.addEventListener('click', () => {
  const isHidden = addProductForm.classList.contains('hidden');
  showAddForm(isHidden);
});

// Cancel button hides the form and clears inputs
cancelBtn.addEventListener('click', () => {
  addProductForm.reset();
  showAddForm(false);
  errorMsg.textContent = '';
});

// --- Handle add product submit: validation, create element, insert ---
// When user submits the addProductForm we validate and then add the product
addProductForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent page reload

  // Get values
  const name = document.getElementById('newName').value.trim();
  const priceRaw = document.getElementById('newPrice').value.trim();
  const desc = document.getElementById('newDesc').value.trim();
  const img = document.getElementById('newImg').value.trim();

  // Validate name
  if (!name) {
    errorMsg.textContent = 'Tên sản phẩm không được để trống.';
    return;
  }

  // Validate price: must be number > 0
  const price = Number(priceRaw);
  if (!priceRaw || isNaN(price) || price <= 0) {
    errorMsg.textContent = 'Giá phải là số dương hợp lệ.';
    return;
  }

  // Passed validation: create product article
  const article = document.createElement('article');
  article.className = ''; // keep default; CSS selects by #products-grid article

  // Escape user-provided strings before inserting into innerHTML
  const safeName = escapeHtml(name);
  const safeDesc = escapeHtml(desc);
  const safeImg = img ? escapeHtml(img) : 'https://via.placeholder.com/300x180?text=No+Image';

  // Build inner HTML for the card (consistent structure with existing cards)
  article.innerHTML = `
    <div class="product-content">
      <h3>${safeName}</h3>
      <img src="${safeImg}" alt="${safeName} cover">
      <p>${safeDesc}</p>
    </div>
    <div class="product-footer">Giá: ${price.toLocaleString()}₫</div>
  `;

  // Prepend to the products grid so new items appear first
  productsGrid.prepend(article);

  // Reset form, hide it, clear error
  addProductForm.reset();
  errorMsg.textContent = '';
  showAddForm(false);

  // Re-run filter so if user had a search active the new item will be filtered correctly
  filterProducts(searchInput.value.trim());
});

// --- Contact form: simple demo handling (no server) ---
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  alert(`Cảm ơn ${name}! Chúng tôi đã nhận thông tin (${email}).`);
  contactForm.reset();
});
