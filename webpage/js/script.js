        // Check if the user is logged in
        if (!sessionStorage.getItem('loggedIn')) {
            window.location.href = 'login.html'; // Redirect to login page if not logged in
        }

        // Definisikan variabel categories, sizes, dan genders yang hilang
        const categories = ["Crewneck", "T-shirt", "Hoodie", "Pants", "Outerwear", "Jacket"];
        const sizes = ["S", "M", "L", "XL", "XXL"];
        const genders = ["Men", "Women", "Unisex"];

        const collectionsData = Array.from({ length: 100000 }, (_, i) => {
        // Data redundan: Menambahkan beberapa entri dengan informasi yang mirip
                if (i % 10 === 0) {
                    return {
                        id: i + 1,
                        title: `Unknown Product`,
                        price: "$100.00",
                        rating: "Invalid Rating",
                        size: "M",
                        gender: "Men",
                        image: `https://picsum.photos/280/350?random=${i + 1}`,
                        colors: 5 // Example color count
                    };
                }

                if (i % 15 === 0) {
                    return {
                        id: i + 1,
                        title: `${categories[i % categories.length]} ${i + 1}`,
                        price: null,
                        rating: null,
                        size: sizes[i % sizes.length],
                        gender: genders[i % genders.length],
                        image: `https://picsum.photos/280/350?random=${i + 1}`,
                        colors: 8 // Example color count
                    };
                }

                // Data kosong: Beberapa entri tidak memiliki harga atau rating
                return {
                    id: i + 1,
                    title: `${categories[i % categories.length]} ${i + 1}`,
                    price: i % 50 === 0 ? "" : `$${(Math.random() * 500 + 50).toFixed(2)}`, // Kosongkan harga pada setiap kelipatan 50
                    rating: i % 50 === 0 ? "" : (Math.random() * 2 + 3).toFixed(1), // Kosongkan rating pada setiap kelipatan 50
                    size: sizes[i % sizes.length],
                    gender: genders[i % genders.length],
                    image: `https://picsum.photos/280/350?random=${i + 1}`,
                    colors: 3 // Example color count
                };
        });

        const params = new URLSearchParams(window.location.search);
        let currentPage = parseInt(params.get('page')) || 1;
        const itemsPerPage = 12; // Jumlah item per halaman, bisa disesuaikan
        const totalPages = Math.ceil(collectionsData.length / itemsPerPage);
        document.getElementById('totalPages').textContent = totalPages;

        function renderCollections(page = 1) {
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const collectionList = document.getElementById('collectionList');
            collectionList.innerHTML = '';

            const pageItems = collectionsData.slice(start, end);
            let rowIndex = 0;
            let itemsInRow = 0;

            pageItems.forEach(collection => {
                const card = document.createElement('div');
                card.className = 'collection-card';

                let saleBadgeHTML = '';
                if (collection.onSale) {
                    saleBadgeHTML = '<div class="sale-badge">SALE</div>';
                }

                // Handle cases where price or rating might be null or undefined
                const displayPrice = collection.price != null ? `<div class="price-container"><span class="price">${collection.price}</span>${collection.oldPrice ? `<span class="old-price">${collection.oldPrice}</span>` : ''}</div>` : '<p class="price">Price Unavailable</p>';
                const displayRating = collection.rating != null ? `<p style="font-size: 14px; color: #777;">Rating: ⭐ ${collection.rating} / 5</p>` : '<p style="font-size: 14px; color: #777;">Rating: Not Rated</p>';
                const displayColors = collection.colors != null ? `<p style="font-size: 14px; color: #777;">${collection.colors} Colors</p>` : '';
                const displaySize = collection.size != null ? `<p style="font-size: 14px; color: #777;">Size: ${collection.size}</p>` : '';
                const displayGender = collection.gender != null ? `<p style="font-size: 14px; color: #777;">Gender: ${collection.gender}</p>` : '';


                const cardHTML = `
                    <div style="position: relative;">
                        <img src="${collection.image}" class="collection-image" alt="${collection.title}">
                        ${saleBadgeHTML}
                    </div>
                    <div class="product-details">
                        <h3 class="product-title">${collection.title}</h3>
                        ${displayPrice}
                        ${displayRating}
                        ${displayColors}
                        ${displaySize}
                        ${displayGender}
                    </div>
                `;
                card.innerHTML = cardHTML;
                collectionList.appendChild(card);

                itemsInRow++;
                // Atur jumlah item per baris berdasarkan rowIndex untuk pola 3-4-3 (contoh kasar)
                let itemsPerRowTarget;
                if (rowIndex === 0 || rowIndex === 2) { // Baris 1 dan 3 (index 0 dan 2)
                    itemsPerRowTarget = 3;
                } else { // Baris 2 (index 1)
                    itemsPerRowTarget = 4;
                }

                if (itemsInRow >= itemsPerRowTarget && collectionList.children.length < pageItems.length) {
                    rowIndex++;
                    itemsInRow = 0;
                }

            });

            document.getElementById('currentPage').textContent = page;
            const prevPageContainer = document.getElementById('prevPageContainer');
            const nextPageContainer = document.getElementById('nextPageContainer');

            if (page === 1) {
                prevPageContainer.classList.add('disabled');
            } else {
                prevPageContainer.classList.remove('disabled');
            }

            if (page === totalPages) {
                nextPageContainer.classList.add('disabled');
            } else {
                nextPageContainer.classList.remove('disabled');
            }

            document.getElementById('prevPage').href = page > 1 ? `?page=${page - 1}` : '#';
            document.getElementById('nextPage').href = page < totalPages ? `?page=${page + 1}` : '#';
        }

        renderCollections(currentPage);

                // Logout Functionality
                document.addEventListener('DOMContentLoaded', function() {
                    const logoutLink = document.getElementById('logoutLink');
        
                    if (logoutLink) { // Check if the logoutLink element exists
                        logoutLink.addEventListener('click', function(event) {
                            event.preventDefault(); // Prevent default link behavior (navigation)
        
                            // Remove login status from sessionStorage
                            sessionStorage.removeItem('loggedIn');
        
                            // Redirect to login page
                            window.location.href = 'login.html'; // Or '/login.html' if login.html is in root
                        });
                    }
                });