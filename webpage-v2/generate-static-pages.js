const fs = require('fs');

// Configuration
const itemsPerPage = 20; // Number of products per page
const templateHtmlFile = 'template.html'; // Path to your HTML template file
const productJsonFile = 'product.json';   // Path to your product JSON file
const outputDir = 'static-pages';         // Directory to output generated HTML files

async function generateStaticPages() {
    try {
        // 1. Read product data from JSON file
        const rawData = fs.readFileSync(productJsonFile);
        const products = JSON.parse(rawData);
        const totalProducts = products.length;

        // 2. Calculate total pages
        const totalPages = Math.ceil(totalProducts / itemsPerPage);

        // 3. Read HTML template
        let templateHtml = fs.readFileSync(templateHtmlFile, 'utf-8');

        // 4. Create output directory if it doesn't exist
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // 5. Generate HTML for each page
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const start = (pageNumber - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageProducts = products.slice(start, end);

            // Generate product cards HTML
            let productCardsHTML = '';
            pageProducts.forEach(collection => {
                let saleBadgeHTML = collection.onSale ? '<div class="sale-badge">SALE</div>' : '';

                const displayPrice = collection.price != null ? 
                    `<div class="price-container"><span class="price">${collection.price}</span>${collection.oldPrice ? `<span class="old-price">${collection.oldPrice}</span>` : ''}</div>` 
                    : '<p class="price">Price Unavailable</p>';
                
                const displayRating = collection.rating != null ? 
                    `<p style="font-size: 14px; color: #777;">Rating: ⭐ ${collection.rating} / 5</p>` 
                    : '<p style="font-size: 14px; color: #777;">Rating: Not Rated</p>';
                
                const displayColors = collection.colors ? `<p style="font-size: 14px; color: #777;">${collection.colors} Colors</p>` : '';
                const displaySize = collection.size ? `<p style="font-size: 14px; color: #777;">Size: ${collection.size}</p>` : '';
                const displayGender = collection.gender ? `<p style="font-size: 14px; color: #777;">Gender: ${collection.gender}</p>` : '';

                productCardsHTML += `
                    <div class="collection-card">
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
                    </div>
                `;
            });

            // Generate pagination HTML
            let prevPage = pageNumber > 1 ? `<li class="page-item previous"><a class="page-link" href="${pageNumber === 2 ? 'index.html' : `page${pageNumber - 1}.html`}">Previous</a></li>` : '<li class="page-item previous disabled"><span class="page-link">Previous</span></li>';
            let nextPage = pageNumber < totalPages ? `<li class="page-item next"><a class="page-link" href="page${pageNumber + 1}.html">Next</a></li>` : '<li class="page-item next disabled"><span class="page-link">Next</span></li>';
            let currentPageSpan = `<li class="page-item current"><span class="page-link">${pageNumber} of ${totalPages}</span></li>`;

            let paginationHTML = `<nav aria-label="Product pagination">
                <ul class="pager pagination">
                    ${prevPage}
                    ${currentPageSpan}
                    ${nextPage}
                </ul>
            </nav>`;

            // Replace placeholders in template
            let pageHtml = templateHtml.replace('<!-- Product cards will be inserted here -->', productCardsHTML);
            pageHtml = pageHtml.replace('<span id="currentPage">1</span> of <span id="totalPages">1</span>', `${pageNumber} of ${totalPages}`);
            pageHtml = pageHtml.replace(/<nav aria-label="Product pagination">[\s\S]*?<\/nav>/, paginationHTML);

            // Determine output file name
            const outputFileName = pageNumber === 1 ? 'index.html' : `page${pageNumber}.html`;
            const outputPath = `${outputDir}/${outputFileName}`;

            // Write HTML file
            fs.writeFileSync(outputPath, pageHtml);
            console.log(`Page ${pageNumber} generated at: ${outputPath}`);
        }

        console.log('Static pages generated successfully!');

    } catch (error) {
        console.error('Error generating static pages:', error);
    }
}

generateStaticPages();
