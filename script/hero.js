document.addEventListener('DOMContentLoaded', async () => {
    const nextDom = document.getElementById('next');
    const prevDom = document.getElementById('prev');
    const sliderList = document.querySelector('.carousel .list');
    const thumbnailContainer = document.querySelector('.carousel .thumbnail');

    const timeRunning = 3000; // Vreme tranzicije
    const timeAutoNext = 7000; // Automatska rotacija

    let currentSlideIndex = 0;
    let runNextAuto;

    // Preuzimanje podataka sa API-ja
    async function fetchRestaurants() {
        try {
            const response = await fetch(
                'https://rezotest-dkg4dsdze2c3e7c5.italynorth-01.azurewebsites.net/api/Restaurant/all'
            );
            if (!response.ok) {
                throw new Error('Greška prilikom povlačenja podataka.');
            }
            return await response.json();
        } catch (error) {
            console.error('Greška:', error);
            return [];
        }
    }

    // Prikazivanje slajdera sa podacima
    async function renderSlider() {
        const restaurants = await fetchRestaurants();

        if (!restaurants.length) {
            sliderList.innerHTML = '<p>Nema dostupnih restorana.</p>';
            return;
        }

        // Kreiranje elemenata slajdera
        sliderList.innerHTML = '';
        thumbnailContainer.innerHTML = '';

        restaurants.forEach((restaurant, index) => {
            // Glavni slajd
            const slideItem = document.createElement('div');
            slideItem.classList.add('item');
            if (index === 0) slideItem.classList.add('active');

            slideItem.innerHTML = `
                <img src="${restaurant.profilePictureUrl || 'img/default.jpg'}" alt="${restaurant.name}">
                <div class="content">
                    <div class="author">${restaurant.name}</div>
                    <div class="title">${restaurant.description || 'Opis nije dostupan.'}</div>
                    <div class="des">${restaurant.address || 'Adresa nije dostupna.'}</div>
                </div>
            `;
            sliderList.appendChild(slideItem);

            // Thumbnail slajd
            const thumbnailItem = document.createElement('div');
            thumbnailItem.classList.add('item');
            thumbnailItem.innerHTML = `
                <img src="${restaurant.profilePictureUrl || 'img/default.jpg'}" alt="${restaurant.name}">
                <div class="content">
                    <div class="title">${restaurant.name}</div>
                </div>
            `;
            thumbnailContainer.appendChild(thumbnailItem);
        });

        setupSliderEvents(restaurants.length);
    }

    // Navigacija slajdera
    function setupSliderEvents(totalSlides) {
        const sliderItems = sliderList.querySelectorAll('.item');
        const thumbnailItems = thumbnailContainer.querySelectorAll('.item');

        function updateSlider(direction) {
            sliderItems[currentSlideIndex].classList.remove('active');
            thumbnailItems[currentSlideIndex].classList.remove('active');

            if (direction === 'next') {
                currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            } else {
                currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
            }

            sliderItems[currentSlideIndex].classList.add('active');
            thumbnailItems[currentSlideIndex].classList.add('active');
        }

        nextDom.onclick = () => {
            clearTimeout(runNextAuto);
            updateSlider('next');
        };

        prevDom.onclick = () => {
            clearTimeout(runNextAuto);
            updateSlider('prev');
        };

        runNextAuto = setInterval(() => {
            updateSlider('next');
        }, timeAutoNext);
    }

    // Početno učitavanje slajdera
    renderSlider();
});
