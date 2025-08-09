document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (productId) {
    // Show product details
    const productDetailsDiv = document.getElementById('product-details');

   fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(response => response.json())
  .then(product => {
    const productDetailsDiv = document.getElementById('product-details');
    productDetailsDiv.innerHTML = `
      <div class="ecard" align="center">
        <div class="price">$${product.price}</div>
        <img class="image" src="${product.image}" alt="${product.title}" width="300" height="300">
        <div class="title">${product.title}</div>
        <p class="description">${product.description}</p>
        <p class="category"><strong>Category:</strong> ${product.category}</p>
        <p><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count} reviews)</p>
        <button class="button" onclick="window.history.back()">Back to Products</button>
        <button class="button1" onclick="window.history.back()">Add to cart</button>
      </div>, 
    `;
  })
      .catch(error => {
        console.error('Error fetching product details:', error);
        productDetailsDiv.innerHTML = '<p>Sorry, product details could not be loaded.</p>';
      });

  } else {
    // Show all products
    const productsDiv = document.getElementById('products');

    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(data => {
        data.forEach(item => {
          let card = document.createElement('div');
          card.className = "card";
          

          let eprice = document.createElement('div');
          eprice.className = "eprice";
          eprice.innerText = `$${item.price}`;

          let etitle = document.createElement('div');
          etitle.className = "etitle";
          etitle.innerText = item.title;

          let eimage = document.createElement('img');
          eimage.className = "eimage";
          eimage.src = item.image;
          eimage.alt = item.title;
          eimage.width = 200;
          eimage.height = 200;

          let ebutton = document.createElement('button');
          ebutton.className = "ebutton";
          ebutton.type = "button";
          ebutton.innerText = "View Details";
          ebutton.addEventListener('click', () => {
            window.location.href = `?id=${item.id}`;
          });

          card.append(eprice, eimage, etitle, ebutton);
          productsDiv.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        productsDiv.innerHTML = "<p>Failed to load products.</p>";
      });
  }
});
