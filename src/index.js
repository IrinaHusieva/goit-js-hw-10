import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import { Loading } from 'notiflix/build/notiflix-loading-aio';


Notiflix.Notify.init({
    position: 'center-top',
    timeout: 3600000
})
let eventError = false;
const refs = {
    select: document.querySelector(".breed-select"),
    divData: document.querySelector(".cat-info")
}

startLoading(refs.select);
fetchBreeds().then((data) => {
    return data.reduce(
        (markup, currentEl) => markup + createSelectElement(currentEl), "");
}).then(updateSelect).catch(onError)
    .finally(endLoading);

refs.select.addEventListener('change', onSelect);

function createSelectElement({id, name}) {
    return `<option value="${id}">${name}</option>`
}

function updateSelect(markup) {
    refs.select.innerHTML = markup;
  refs.select.classList.remove("invisible");
   new SlimSelect({
        select: refs.select
    });
}

function onSelect(e) {
    startLoading(refs.divData);
    fetchCatByBreed(e.target.value).then((data) => {
       return data.reduce(
        (markup, currentEl) => markup + createInfoElement(getArgs(currentEl)), "");
    }).then(updateInfo)
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
    refs.divData.innerHTML = markup;
    refs.divData.classList.remove("invisible");
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
  afterError();
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


