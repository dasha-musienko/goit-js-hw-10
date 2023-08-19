import {urlData} from "./urls-storage"

 function fetchBreeds() {
  return fetch(`${urlData.url}breeds`,{headers: {
    'x-api-key': urlData.api_key
  }})
  .then((response) => {
    if(response.status!==200) 
      throw new Error(response.status);
    else
      return response.json();
  }).catch(error => error)
}

 function fetchCatByBreed(breedId) {
  return fetch(`${urlData.url}images/search?breed_ids=${breedId}`,{headers: {
    'x-api-key': urlData.api_key
  }})
  .then((response) => {
  return response.json();
  }).catch(error => error)
}

export {fetchBreeds, fetchCatByBreed}