fetch('products.json')
    .then(response => response.json())

    // INDEX
    .then(data => {
        const productGrid = document.getElementById('product-grid');
        
        function displayProducts(products) {
            productGrid.innerHTML = ''; 
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('col-12', 'col-sm-6', 'col-md-3', 'mb-4', 'product');  
                productCard.setAttribute('data-category', product.category);
                productCard.setAttribute('data-product-id', product.id);
                productCard.innerHTML = `
                    <div class="card position-relative">
                        <span class="tag-card">New</span>
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="price">${product.price}</p>
                            <button class="btn-card">Rent</button>
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
        

        // PRICELIST
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


        // PRODUK DETAIL
        if (window.location.pathname.includes('product-detail.html')) {

            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            const product = data.find(p => p.id == productId);

            if (product) {
                const productInfo = document.getElementById('product-info');
                const breadcrumbProduct = document.getElementById('breadcrumb-product');
                
                breadcrumbProduct.textContent = product.name;

                productInfo.innerHTML = `
                    <div class="col-12 col-md-6">
                        <img src="${product.image}" class="img-fluid" alt="${product.name}">
                    </div>
                    <div class="col-12 col-md-6">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <p class="product-price">${product.price}</p>
                        <button class="btn btn-primary">Rent</button>
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