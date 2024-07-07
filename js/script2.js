document.addEventListener('DOMContentLoaded', function() {
    const mainSlide = document.querySelector('.main-slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentSlide = 0;
    const slides = [
        {
            image: 'assets/img/thumbnail1.jpg',
            caption: '<h2>50% OFF</h2><p>EN SUSPENSIONES</p>'
        },
        {
            image: 'assets/img/thumbnail2.jpg',
            caption: '<h2>NUEVOS MODELOS</h2><p>BICICLETAS DE MONTAÑA</p>'
        },
        {
            image: 'assets/img/thumbnail3.jpg',
            caption: '<h2>OFERTAS</h2><p>EN ACCESORIOS</p>'
        }
    ];

    function updateSlide() {
        mainSlide.innerHTML = `
            <img src="${slides[currentSlide].image}" alt="Slide ${currentSlide + 1}">
            <div class="carousel-caption">${slides[currentSlide].caption}</div>
        `;

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });

    // Inicializar el carrusel
    updateSlide();

    // Rotación automática (opcional)
    // setInterval(nextSlide, 5000);
});