document.addEventListener('DOMContentLoaded', async () => {
    const allRestaurantsContainer = document.getElementById('all-restaurants');

    // Funkcija za renderovanje restorana
    async function renderRestaurants() {
        try {
            // Pozivamo funkciju iz data.js
            const restaurants = await fetchRestaurants();

            if (!restaurants || restaurants.length === 0) {
                allRestaurantsContainer.innerHTML = '<p>Nema dostupnih restorana.</p>';
                return;
            }

            // Kreiramo HTML kartice za svaki restoran
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

            // Dodajemo funkcionalnost dugmadi "Rezerviši"
            setupReservationButtons();
        } catch (error) {
            console.error('Greška prilikom prikazivanja restorana:', error);
            allRestaurantsContainer.innerHTML = '<p>Došlo je do greške prilikom učitavanja restorana.</p>';
        }
    }

    // Funkcija za dodavanje funkcionalnosti dugmadi "Rezerviši"
    function setupReservationButtons() {
        const reserveButtons = document.querySelectorAll('.reserve-btn');
        reserveButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const restaurantId = event.target.dataset.id;
                alert(`Izabrali ste restoran sa ID: ${restaurantId}. Implementacija rezervacije ide ovde.`);
            });
        });
    }

    // Pozivamo render funkciju
    renderRestaurants();
});
