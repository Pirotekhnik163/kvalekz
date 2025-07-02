document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');
    const applyFilterBtn = document.getElementById('apply-filter');
    const sortRatingBtn = document.getElementById('sort-rating');
    const totalCountSpan = document.getElementById('total-count');
    const avgRatingSpan = document.getElementById('avg-rating');
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');

    const images = [
        {
            "id": 1,
            "title": "Закат в горах",
            "category": "Природа",
            "rating": 4.8,
            "url": "image/zakat.jpeg"
        },
        {
            "id": 2,
            "title": "Мост",
            "category": "Города",
            "rating": 4.5,
            "url": "image/most.jpeg"
        },
        {
            "id": 3,
            "title": "Лесной водопад",
            "category": "Природа",
            "rating": 4.9,
            "url": "image/vodopad.jpeg"
        },
        {
            "id": 4,
            "title": "Город",
            "category": "Города",
            "rating": 4.2,
            "url": "image/gorod.jpeg"
        },
        {
            "id": 5,
            "title": "Озеро в горах",
            "category": "Природа",
            "rating": 4.7,
            "url": "image/ozerovgorah.jpeg"
        },
        {
            "id": 6,
            "title": "Улицы Парижа",
            "category": "Города",
            "rating": 4.4,
            "url": "image/parish.jpeg"
        },
        {
            "id": 7,
            "title": "Тольятти",
            "category": "Города",
            "rating": 5.0,
            "url": "image/tlt.jpg"
        }
    ];

    let filteredImages = [...images];
    let sortDirection = 'desc';

    function init() {
        renderGallery();
        updateStats();
    }

    function renderGallery() {
        gallery.innerHTML = '';
        
        if (filteredImages.length === 0) {
            gallery.innerHTML = '<div class="no-results">Нет изображений, соответствующих фильтрам</div>';
            return;
        }
        
        filteredImages.forEach(image => {
            const card = document.createElement('div');
            card.className = 'image-card';
            card.innerHTML = `
                <img src="${image.url}" alt="${image.title}" loading="lazy">
                <div class="image-info">
                    <div class="image-title" title="${image.title}">${image.title}</div>
                    <div class="image-rating">${formatRating(image.rating)}</div>
                </div>
            `;
            
            card.addEventListener('click', () => showModal(image));
            gallery.appendChild(card);
        });
    }

    function formatRating(rating) {
        const stars = '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
        return `${stars} ${rating.toFixed(1)}`;
    }

    function showModal(image) {
        document.getElementById('modal-title').textContent = image.title;
        document.getElementById('modal-image').src = image.url;
        document.getElementById('modal-image').alt = image.title;
        document.getElementById('modal-category').textContent = image.category;
        document.getElementById('modal-rating').textContent = formatRating(image.rating);
        document.getElementById('modal-url').href = image.url;
        document.getElementById('modal-url').textContent = image.url;
        
        modal.style.display = 'block';
    }

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function updateStats() {
        totalCountSpan.textContent = filteredImages.length;
        
        if (filteredImages.length > 0) {
            const avgRating = filteredImages.reduce((sum, img) => sum + img.rating, 0) / filteredImages.length;
            avgRatingSpan.textContent = avgRating.toFixed(1);
        } else {
            avgRatingSpan.textContent = '0.0';
        }
    }

    function filterImages() {
        const category = categorySelect.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        filteredImages = images.filter(image => {
            const matchesCategory = !category || image.category === category;
            const matchesSearch = !searchTerm || image.title.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });
        
        sortImages();
    }

    function sortImages() {
        filteredImages.sort((a, b) => {
            return sortDirection === 'desc' ? b.rating - a.rating : a.rating - b.rating;
        });
    }

    applyFilterBtn.addEventListener('click', () => {
        filterImages();
        renderGallery();
        updateStats();
    });

    searchInput.addEventListener('input', () => {
        filterImages();
        renderGallery();
        updateStats();
    });
    
    sortRatingBtn.addEventListener('click', () => {
        sortDirection = sortDirection === 'desc' ? 'asc' : 'desc';
        sortRatingBtn.textContent = `Сортировать по рейтингу ${sortDirection === 'desc' ? '▼' : '▲'}`;
        
        sortImages();
        renderGallery();
    });
    
    init();
});