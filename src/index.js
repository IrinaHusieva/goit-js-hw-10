import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
// import { fetchBreeds } from "./cat-api.js";

import { fetchBreeds, fetchCatByBreed, displayCatInfo, clearCatInfo } from './cat-api.js';

document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = new SlimSelect('.breed-select', {
  placeholder: 'Select a breed',
  allowDeselect: true,
});


  breedSelect.onChange = breedId => {
    if (breedId) {
      fetchCatByBreed(breedId)
        .then(cat => {
          displayCatInfo(cat);
        })
        .catch(error => {
          console.error('Error fetching cat info:', error);
        });
    } else {
      clearCatInfo();
    }
  };
Notiflix.Notify.init({ position: 'right-bottom' });

  fetchBreeds()
    .then(breeds => {
      const breedOptions = breeds.map(breed => ({
        value: breed.id,
        text: breed.name,
      }));
      breedSelect.setData(breedOptions);
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message);
      throw error;
    });
});


// export async function fetchBreeds() {
//   try {
//     const response = await fetch('https://api.thecatapi.com/v1/breeds', {
//       headers: {
//         'x-api-key': 'YOUR_API_KEY' // Замініть на свій унікальний ключ доступу
//       }
//     });
//     const breeds = await response.json();
//     return breeds;
//   } catch (error) {
//     throw new Error('Failed to fetch breeds');
//   }
// }

// export async function fetchCatByBreed(breedId) {
//   try {
//     const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
//       headers: {
//         'x-api-key': 'YOUR_API_KEY' // Замініть на свій унікальний ключ доступу
//       }
//     });
//     const catData = await response.json();
//     return catData[0];
//   } catch (error) {
//     throw new Error('Failed to fetch cat by breed');
//   }
// }
// new SlimSelect({
//   select: '.breed-select',
//    data: [
//     {text: 'Human'}, // regular option
//     {
//       label: 'Animals',
//       options: [
//         {text: 'Cat'},
//         {text: 'Dog'},
//         {text: 'Bird'}
//       ]
//     }
//   ]
// })

// const breedSelect = document.querySelector(".breed-select");
// const catInfoDiv = document.querySelector(".cat-info");
// fetchBreeds();

// const renderBreeds = (breed) => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.textContent = breed.name;
//     console.log(breed);
//     return option;
// };
// renderBreeds();



