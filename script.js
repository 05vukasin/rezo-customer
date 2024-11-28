document.addEventListener('DOMContentLoaded', async () => {
    const carouselContainer = document.getElementById('restaurants-carousel');
    const restaurants = await fetchRestaurants();

    if (!restaurants || restaurants.length === 0) {
        console.error('Nema dostupnih restorana.');
        return;
    }

    // Uzimamo prvih 5 restorana
    let currentRestaurants = restaurants
        .sort((a, b) => b.monthlyReservationCount - a.monthlyReservationCount)
        .slice(0, 5);

    function renderCarousel() {
        carouselContainer.innerHTML = ''; // Očistimo prethodni prikaz

        currentRestaurants.forEach((restaurant, index) => {
            const restaurantCircle = document.createElement('div');
            restaurantCircle.classList.add('restaurant-circle');
            if (index === 0) restaurantCircle.classList.add('selected');

            restaurantCircle.innerHTML = `
                <img src="${restaurant.profilePictureUrl || 'img/default.jpg'}" alt="${restaurant.name}">
                <h2>${restaurant.name}</h2>
            `;

            // Klikom na restoran menjamo rotaciju
            restaurantCircle.addEventListener('click', () => {
                rotateRestaurants(index);
            });

            carouselContainer.appendChild(restaurantCircle);
        });
    }

    function rotateRestaurants(newIndex) {
        // Rotiramo tako da novi selektovani restoran postane prvi
        currentRestaurants = [
            ...currentRestaurants.slice(newIndex),
            ...currentRestaurants.slice(0, newIndex),
        ];
        renderCarousel();
    }

    renderCarousel();
});

document.addEventListener('DOMContentLoaded', async () => {
    const allRestaurantsContainer = document.getElementById('all-restaurants');
    const restaurants = await fetchRestaurants();

    if (!restaurants || restaurants.length === 0) {
        allRestaurantsContainer.innerHTML = '<p>Nema dostupnih restorana.</p>';
        return;
    }

    // Kreiranje kartica za sve restorane
    restaurants.forEach((restaurant) => {
        const card = document.createElement('div');
        card.classList.add('restaurant-card');
        card.innerHTML = `
            <img src="${restaurant.profilePictureUrl || 'img/default.jpg'}" alt="${restaurant.name}">
            <div class="info">
                <h3>${restaurant.name}</h3>
            </div>
            <button class="reserve-btn" data-id="${restaurant.id}">Rezerviši</button>
        `;

        allRestaurantsContainer.appendChild(card);
    });

    // Dodavanje funkcionalnosti za dugme "Rezerviši"
    const reserveButtons = document.querySelectorAll('.reserve-btn');
    reserveButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const restaurantId = event.target.dataset.id;
            alert(`Izabrali ste restoran sa ID: ${restaurantId}. Implementacija rezervacije ide ovde.`);
        });
    });
});
