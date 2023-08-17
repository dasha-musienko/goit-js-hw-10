import NiceSelect from "../../node_modules/nice-select2/src/js/nice-select2";
import {fetchBreeds, fetchCatByBreed} from "./cat-api"
import Notiflix from 'notiflix';


const refs = {
  selectEl: document.querySelector(".breed-select"),
  catInfo: document.querySelector(".cat-info"),
  loaderEl: document.querySelector(".loader-wrap"),
}

handlesSelect ()
document.addEventListener("click", pickBreedHandler)


function pickBreedHandler (e) {
    if ( !e.target.closest(".option")) {
      return
    }
  
    refs.catInfo.innerHTML=""
    showsLoader ()
  
    const breedId = e.target.closest(".option").dataset.value;
    fetchCatByBreed(breedId).then(data => {
      createsCatsMarkup(data)
      hidesLoader()
  }).catch(err => {
    
    Notiflix.Notify.failure(`Something went wrong! Try to reload page`)
    document.getElementById("NotiflixNotifyInternalCSS").textContent = ""
    hidesLoader ()
  })
}


function createsBreedsMarkup (id, name) {
  refs.selectEl.insertAdjacentHTML("beforeend", `<option value="${id}">${name}</option>`)
}

function createsCatsMarkup(data) {
  const catUrl = [...data][0].url
  const {name, origin, temperament, description} = [...data][0].breeds[0];

  refs.catInfo.insertAdjacentHTML("beforeend", `
    <div class="img-container">
        <img src="${catUrl}" alt="${name}" width="400px" height="auto">
      </div>
      <div class="info-container">
        <h1 class="breed-name">${name}</h1>
        <p class="breed-info">${description}</p>
        <div class="chars-container">
          <div class="char">
            <h2 class="characteristic-title">Temperament:</h2>
            <p class="characteristic">${temperament}</p>
          </div>
          <div class="char">
            <h2 class="characteristic-title">Origin:</h2>
            <p class="characteristic">${origin}</p>
          </div>
        </div>
    </div>

  `)

}


function handlesSelect () {
  fetchBreeds().then((data) => {
    [...data].map(({id, name}) => createsBreedsMarkup(id, name));
    showsSelect()
    createsNiceSelect()
    hidesLoader()
  }).catch(err => {
    
    Notiflix.Notify.failure(`Something went wrong! Try to reload page`)
    document.getElementById("NotiflixNotifyInternalCSS").textContent = ""
    hidesLoader ()
  })
}

function createsNiceSelect () {
  return new NiceSelect(refs.selectEl);
}

function showsSelect () {
  refs.selectEl.classList.remove("hide")
}

function showsLoader () {
  refs.loaderEl.classList.remove("hidden")
}

function hidesLoader () {
  refs.loaderEl.classList.add("hidden")
}




