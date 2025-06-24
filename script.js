// Hero Image Gallery Functionality
function changeHeroImage(newImageSrc, clickedThumbnail) {
    // Change main image
    document.getElementById('main-hero-image').src = newImageSrc;

    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    thumbnails.forEach(thumb => {
        thumb.style.border = 'none';
        thumb.style.opacity = '0.8';
    });

    if (clickedThumbnail) {
        clickedThumbnail.style.border = '2px solid #303030';
        clickedThumbnail.style.opacity = '1';
    }

    // Reset auto-rotation
    clearInterval(rotationInterval);
    currentImageIndex = imageSources.findIndex(src => src === newImageSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;
    rotationInterval = setInterval(rotateHeroImages, 5000);
}

// Auto-rotate images
let currentImageIndex = 0;
const imageSources = [
    'img/GAMBAR1.png',
    'img/GAMBAR2.png',
    'img/GAMBAR3.png'
];
let rotationInterval = setInterval(rotateHeroImages, 5000);

function rotateHeroImages() {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    document.getElementById('main-hero-image').src = imageSources[currentImageIndex];

    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.thumbnail-list img');
    thumbnails.forEach((thumb, index) => {
        if (index === currentImageIndex) {
            thumb.style.border = '2px solid #303030';
            thumb.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
            thumb.style.opacity = '1';
        } else {
            thumb.style.border = 'none';
            thumb.style.opacity = '0.8';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Scroll Animation Functionality
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            } else {
                entry.target.classList.remove('animate-in'); // Reset saat keluar viewport
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe semua elemen dengan class animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        // Set initial state
        el.classList.add('animate-ready');
        scrollObserver.observe(el);
    });

    // Thumbnail Animation on Scroll
    const thumbnailObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const thumbnails = entry.target.querySelectorAll('.thumbnail-list img');
            thumbnails.forEach((thumb, index) => {
                if (entry.isIntersecting) {
                    // Animasikan dengan delay bertahap
                    thumb.style.transition = `opacity 0.5s ease ${index * 0.1}s, border 0.3s ease`;
                    thumb.style.opacity = '1';

                    // Highlight thumbnail pertama
                    if (index === 0) {
                        thumb.style.border = '2px solid #303030';
                    }
                } else {
                    // Reset saat keluar viewport
                    thumb.style.opacity = '0';
                    thumb.style.border = '2px solid transparent';
                    thumb.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
                }
            });
        });
    }, { threshold: 0.1 });

    // Observe thumbnail containers
    document.querySelectorAll('.thumbnail-container').forEach(container => {
        thumbnailObserver.observe(container);
    });
});