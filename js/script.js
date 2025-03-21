fetch('products.json')
    .then(response => response.json())
    .then(data => {

        function displayProducts(products) {
            const productGrid = document.getElementById('product-grid');
            productGrid.innerHTML = ''; 

            const isPricelistPage = window.location.pathname.includes('pricelist.html');
            const isProductDetailPage = window.location.pathname.includes('product-detail.html');

            const colClass = isPricelistPage ? 'col-4' : 'col-3'; 

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add(colClass, 'mb-4', 'product');  
                productCard.setAttribute('data-category', product.category);
                productCard.setAttribute('data-product-id', product.id);

                const tagHtml = product.tag ? `<span class="tag-card">${product.tag}</span>` : '';

                const includeHtml = isProductDetailPage && product.include 
                    ? `<p><strong>Include:</strong> ${product.include}</p>` 
                    : '';

                productCard.innerHTML = `
                    <div class="card position-relative">
                        ${tagHtml} 
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="heading-card">${product.name}</h5>
                            <p class="body-card">${product.description}</p>
                            ${includeHtml}  
                            <div class="price-button-wrapper" >
                                <p class="price-card">${product.price}</p>
                                <button class="btn-card mt-auto">Rent</button>
                            </div>
                        </div>
                    </div>
                `;

                productGrid.appendChild(productCard);
            });
        }

        if (window.location.pathname.includes('index.html')) {
            const featuredProducts = data.slice(0, 8); 
            displayProducts(featuredProducts);
        }

        // PRICELIST CATEGORY
        if (window.location.pathname.includes('pricelist.html')) {
            displayProducts(data);

            document.querySelectorAll('.list-group-item').forEach(function(item) {
                item.addEventListener('click', function(event) {
                    event.preventDefault();

                    const category = item.getAttribute('data-category');
                    const filteredProducts = category === 'all' 
                        ? data 
                        : data.filter(product => product.category === category);

                    setTimeout(() => {
                        displayProducts(filteredProducts);
                    }, 300); 
                });
            });
        }

        document.querySelectorAll('.product').forEach(function(item) {
            item.addEventListener('click', function() {
                const productId = item.getAttribute('data-product-id');
                window.location.href = `product-detail.html?id=${productId}`;
            });
        });

        // PRODUCT DETAIL PAGE
        if (window.location.pathname.includes('product-detail.html')) {

            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            const product = data.find(p => p.id == productId);

            if (product) {
                const productInfo = document.getElementById('product-info');
                const breadcrumbProduct = document.getElementById('breadcrumb-product');

                breadcrumbProduct.textContent = product.name;

                const includeHtml = product.include 
                    ? `<p class="heading-3"><strong>Include :</strong> ${product.include}</p>` 
                    : '<p>No additional items included.</p>'; 

                productInfo.innerHTML = `
                    <div class="col-12 col-md-6 image-column">
                        <div class="image-frame">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 text-column">
                        <h3 class="heading-1">${product.name}</h3>
                        <p class="heading-3">${product.description}</p>
                        ${includeHtml} 
                        <p class="heading-2 pt-5">${product.price}</p>
                        
                        <button class="btn btn-primary fw-bold" style="width: 50%;">RENT</button>
                    </div>
                `;
            } else {
                productInfo.innerHTML = '<p>Product not found</p>';
            }
        }

    })
    .catch(error => {
        console.error('Error loading product data:', error);
    });
