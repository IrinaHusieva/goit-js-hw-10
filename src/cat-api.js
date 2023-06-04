
// const API_KEY = "live_vlX2WyFocOR0XCGkeEDHtl0ZmRcoSJUtj8rF3S6yVXnWT4HN4BwIvsaWnYhdrlwJ";

// function fetchBreeds(breedId) {
//     const url = `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}&breed_ids=${breedId}`;
//     return fetch(url)
//         .then((res) => res.json())
//         .then((breeds) => {
//             return breeds.map((breed) => {
//             // console.log({ id: breed.id, name: breed.name });
//             return { id: breed.id, name: breed.name };
//         });
//     });
// }
export function fetchBreeds() {
    const url = 'https://api.thecatapi.com/v1/breeds';
    const apiKey = "live_vlX2WyFocOR0XCGkeEDHtl0ZmRcoSJUtj8rF3S6yVXnWT4HN4BwIvsaWnYhdrlwJ"; // Замініть на свій унікальний ключ доступу

    // Показати завантажувач
    document.querySelector('.loader').style.display = 'block';

    return fetch(url, {
        headers: {
            'x-api-key': apiKey
        }
    })
        .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds.');
      }
      return response.json();
    })
        .then(data => {
            // Приховати завантажувач
            document.querySelector('.loader').style.display = 'none';
            return data; // Повернути масив порід
        })
        .catch(error => {
            // Відобразити повідомлення про помилку
            document.querySelector('.error').style.display = 'block';
            Notiflix.Notify.failure(error.message);
      throw error;
        });
}

// Функція для виконання запиту на отримання інформації про кота за породою
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  const apiKey = 'live_vlX2WyFocOR0XCGkeEDHtl0ZmRcoSJUtj8rF3S6yVXnWT4HN4BwIvsaWnYhdrlwJ'; // Замініть на свій унікальний ключ доступу

  // Показати завантажувач
  document.querySelector('.loader').style.display = 'block';

  return fetch(url, {
    headers: {
      'x-api-key': apiKey
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat information.');
      }
      return response.json();
    })
    .then(data => {
      // Приховати завантажувач
      document.querySelector('.loader').style.display = 'none';
      return data[0]; // Повернути перший знайдений об'єкт кота
    })
    .catch(error => {
      // Відобразити повідомлення про помилку
      document.querySelector('.error').style.display = 'block';
       Notiflix.Notify.failure(error.message);
      throw error;
    });
}

// Функція для відображення інформації про кота
export function displayCatInfo(cat) {
  const catInfoDiv = document.querySelector('.cat-info');
  catInfoDiv.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <img src="${cat.url}" alt="Cat Image" width="300" />
    <p><b>Origin:</b> ${cat.breeds[0].origin}</p>
    <p><b>Description:</b> ${cat.breeds[0].description}</p>
  `;
}

// Функція для очищення інформації про кота
export function clearCatInfo() {
  document.querySelector('.cat-info').innerHTML = '';
}