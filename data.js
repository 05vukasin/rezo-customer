async function fetchRestaurants() {
    const response = await fetch('https://rezotest-dkg4dsdze2c3e7c5.italynorth-01.azurewebsites.net/api/Restaurant/all', {
        method: 'GET',
        headers: {
            'accept': '*/*',
        },
    });

    if (!response.ok) {
        console.error('Greška prilikom povlačenja podataka:', response.statusText);
        return [];
    }

    const data = await response.json();
    return data;
}
