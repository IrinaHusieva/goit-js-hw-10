import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

import Notiflix, { Loading } from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';


Notiflix.Notify.init({
    position: 'center-top',
    timeout: 3600000
})
let eventError = false;

const refs = {
  select: document.querySelector('.breed-select'),
  div: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(data => {
    return data.reduce(
      (acum, currentElement) => acum + createElements(currentElement),
      ''
    );
  })
  .then(updateSelect)
  .catch(onError)
  .finally(endLoading);

refs.select.addEventListener('change', onSelect);

function createElements({ id, name }) {
  return `<option value="${id}">${name}</option>`;
}

function updateSelect(acum) {
  refs.select.innerHTML = acum;
  refs.select.classList.remove('invisible');
  new SlimSelect({
    select: refs.select,
  });
}

function onError() {
  eventError = true;
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function endLoading() {
  Notiflix.Loading.remove();
  afterError();
}

function onSelect(evt) {
  startLoading(refs.div);
  fetchCatByBreed(evt.target.value)
    .then(data => {
      if (!data.length) throw new Error('Data not found');
      return data.reduce(
        (acum, currentEl) => acum + createInfoElement(getArgs(currentEl)),
        ''
      );
    })
    .then(updateInfo)
    .catch(onError)
    .finally(endLoading);
}


function createInfoElement({url,  name, description, temperament}) {    
   return ` <img
      class="cat_image"
      src="${url}"
      alt="${name}"
    />
    <div class="cat-info-text">
    <h2>${name}</h2>
    <p>${description}</p>
    <p><b>Temperament: </b>${temperament}</p>
    </div>`
}

function updateInfo(markup) {
    refs.div.innerHTML = markup;
    refs.div.classList.remove("invisible");
}

function getArgs({ url, breeds }) {
    const { name, description, temperament } = breeds[0];
    return {
        url,
        name,
        description,
        temperament
    }
}

function startLoading(element) {
  if (eventError) afterError();
  element.classList.add("invisible");
  
  Notiflix.Loading.dots('Loading data, please wait...', {
    backgroundColor: 'rgba(0,0,0,0.4)',});
}
function endLoading() {
  Notiflix.Loading.remove();
//   afterError();
}
function onError() {
    eventError = true;
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
}
function afterError() {
    const notify = document.querySelector(".notiflix-notify-failure");
    if (notify) notify.remove();
    eventError = false;
}


