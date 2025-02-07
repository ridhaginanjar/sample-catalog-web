const fs = require('fs');

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

// Ubah data JavaScript menjadi format JSON
const productJson = JSON.stringify(collectionsData, null, 4); // gunakan 4 spasi untuk indentasi yang lebih mudah dibaca

// Tulis JSON ke file product.json
fs.writeFileSync('product.json', productJson);

console.log('product.json berhasil dibuat dengan ' + collectionsData.length + ' produk.');