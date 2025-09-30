console.log("product list loaded");

const container = document.querySelector(".product_list");

// valgfrit filter: productlist.html?category=Apparel
const params = new URLSearchParams(location.search);
const category = params.get("category");

const url = category ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}` : `https://kea-alt-del.dk/t7/api/products`;

fetch(url)
  .then((res) => res.json())
  .then(showProducts)
  .catch((err) => {
    console.error(err);
    container.innerHTML = "<p>Kunne ikke hente produkter.</p>";
  });

function showProducts(products) {
  container.innerHTML = products
    .map((p) => {
      const sold = Number(p.soldout) === 1;
      const hasDiscount = Number(p.discount) > 0;

      const priceBlock = hasDiscount
        ? `<span class="price-old">Prev. DKK ${p.price},-</span>
           <span class="price-new">Now DKK ${Math.round(p.price * (1 - p.discount / 100))},-</span>
           <span class="badge badge--discount">-${p.discount}%</span>`
        : `<span class="price">DKK ${p.price},-</span>`;

      return `
<article class="card${sold ? " card--soldout" : ""}${hasDiscount ? " card--discount" : ""}">
  <h3 class="card__title">${p.productdisplayname}</h3>

  <figure class="card__media">
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${p.id}.webp" alt="${p.productdisplayname}">
    ${sold ? '<span class="flag">Sold out</span>' : ""}
  </figure>

  <p class="card__meta">${p.articletype} • ${p.brandname}</p>

  <div class="card__price">
    ${priceBlock}
  </div>

  <a class="card__more" href="product.html?id=${p.id}">Read more</a>
</article>`;
    })
    .join("");
}
