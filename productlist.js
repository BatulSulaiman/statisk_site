console.log("product list loaded");

const heading = document.querySelector(".category-title");
const productContainer = document.querySelector(".product_list");

const params = new URLSearchParams(window.location.search);
const category = params.get("category");

if (heading) heading.textContent = category || "Products";

const apiUrl = category ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}` : "https://kea-alt-del.dk/t7/api/products";

fetch(apiUrl)
  .then((res) => res.json())
  .then(showProducts)
  .catch((err) => {
    console.error(err);
    if (productContainer) productContainer.innerHTML = "<p>Kunne ikke hente produkter.</p>";
  });

function showProducts(products) {
  if (!productContainer) return;
  productContainer.innerHTML = "";
  products.forEach((product) => {
    productContainer.innerHTML += `
      <article class="card">
        <div class="card__media">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
        </div>
        <h2 class="card__title">${product.productdisplayname}</h2>
        <h3 class="card__price">DKK ${product.price},-</h3>
        <a class="card__more" href="product.html?id=${product.id}">
          <h4>Read More</h4>
        </a>
      </article>
    `;
  });
}
