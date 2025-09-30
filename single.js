console.log("product page loaded");

const params = new URLSearchParams(window.location.search);
const id = params.get("id") || 1915; // fallback
const productUrl = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch(productUrl)
  .then((res) => res.json())
  .then(show)
  .catch((err) => {
    console.error(err);
    document.querySelector(".produkt").textContent = "Kunne ikke hente produktet.";
  });

function show(data) {
  document.querySelector(".produkt").innerHTML = `
    <article class="ps">
      <figure class="ps-media">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" alt="${data.productdisplayname}">
      </figure>
      <section class="ps-info">
        <h2 class="ps-title">${data.productdisplayname}</h2>
        <p class="ps-meta">${data.brandname} • ${data.articletype}</p>
        <dl class="ps-specs">
          <div><dt>Model</dt><dd>${data.productdisplayname}</dd></div>
          <div><dt>Farve</dt><dd>${data.basecolour || "—"}</dd></div>
          <div><dt>Varenr.</dt><dd>${data.id}</dd></div>
        </dl>
      </section>
      <aside class="ps-buy">
        <h3 class="ps-buy-title">${data.productdisplayname}</h3>
        <p class="ps-buy-meta">${data.brandname} • ${data.articletype}</p>
        <div class="ps-price"><span class="price">DKK ${data.price},-</span></div>
        <label class="ps-field"><span>Vælg størrelse</span>
          <select><option>One Size</option></select>
        </label>
        <button class="btn ps-btn" type="button">Add to basket</button>
      </aside>
    </article>`;
}
