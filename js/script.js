// fetch('products.json')
//     .then(response => response.json())
//     .then(data => {
//         const productGrid = document.getElementById('product-grid');

//         const featuredProducts = data.slice(0, 8); 

//         featuredProducts.forEach(product => {
//             const productCard = document.createElement('div');
//             productCard.classList.add('col-12', 'col-sm-6', 'col-md-3', 'mb-4');  
            
//             productCard.setAttribute('data-category', product.category);
//             productCard.setAttribute('data-product-id', product.id);
            
//             productCard.innerHTML = `
//                 <div class="card position-relative">
//                     <span class="tag-card">New</span>
//                     <img src="${product.image}" class="card-img-top" alt="${product.name}">
//                     <div class="card-body">
//                         <h5 class="card-title">${product.name}</h5>
//                         <p class="card-text">${product.description}</p>
//                         <p class="price">${product.price}</p>
//                         <button class="btn btn-card">Rent</button>
//                     </div>
//                 </div>
//             `;
            
//             productGrid.appendChild(productCard);
//         });

//         document.querySelectorAll('.card').forEach(function(item) {
//             item.addEventListener('click', function() {
//                 const productId = item.getAttribute('data-product-id');
//                 window.location.href = `product-detail.html?id=${productId}`;
//             });
//         });
//     })
//     .catch(error => console.error('Error loading product data:', error));



    // Mengambil data produk dari file JSON
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const productGrid = document.getElementById('product-grid');

            // Fungsi untuk menampilkan produk
            function displayProducts(products) {
                productGrid.innerHTML = ''; // Kosongkan grid terlebih dahulu
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
                                <button class="btn btn-card">Rent</button>
                            </div>
                        </div>
                    `;
                    
                    productGrid.appendChild(productCard);
                });
            }

            // Menampilkan produk untuk landing page (4 produk pertama)
            if (window.location.pathname.includes('index.html')) {
                const featuredProducts = data.slice(0, 8); 
                displayProducts(featuredProducts);
            }

            // Menampilkan semua produk saat halaman pricelist dimuat
            if (window.location.pathname.includes('pricelist.html')) {
                displayProducts(data);

                // Menambahkan event listener untuk kategori
                document.querySelectorAll('.list-group-item').forEach(function(item) {
                    item.addEventListener('click', function(event) {
                        event.preventDefault();
                        
                        // Ambil kategori yang dipilih
                        const category = item.getAttribute('data-category');
                        
                        // Filter produk berdasarkan kategori yang dipilih
                        const filteredProducts = category === 'all' 
                            ? data 
                            : data.filter(product => product.category === category);

                        // Tunggu beberapa saat agar transisi selesai sebelum filter produk
                    setTimeout(() => {
                        // Filter produk berdasarkan kategori yang dipilih
                        const filteredProducts = category === 'all' 
                            ? data 
                            : data.filter(product => product.category === category);

                        // Tampilkan produk yang sesuai kategori
                        displayProducts(filteredProducts);
                    }, 300); 
                    });
                });
            }

            // Menambahkan event listener untuk mengarahkan ke halaman detail produk
            document.querySelectorAll('.product').forEach(function(item) {
                item.addEventListener('click', function() {
                    const productId = item.getAttribute('data-product-id');
                    window.location.href = `product-detail.html?id=${productId}`;
                });
            });
        })
        .catch(error => console.error('Error loading product data:', error));

