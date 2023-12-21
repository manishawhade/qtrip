import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  return fetch(config.backendEndpoint+'/cities')
  .then(res => { return res.json() })
  .catch(err => { return null })
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let sectiondiv = document.getElementById('data')
  let div = document.createElement('div')
  div.className = 'col-12 col-md-4 col-lg-3 my-2'
  
  let a = document.createElement('a')
  a.id = id
  a.href = 'pages/adventures/?city='+id
  
  let tileDiv = document.createElement('div')
  tileDiv.className = 'tile'
  
  let img = document.createElement('img')
  img.src = image
  img.alt = city

  let tileTextDiv = document.createElement('div')
  tileTextDiv.className = 'tile-text text-center'

  let h5 = document.createElement('h5')
  h5.textContent = city
  let p = document.createElement('p')
  p.textContent = description
  
  tileTextDiv.appendChild(h5)
  tileTextDiv.appendChild(p)
  tileDiv.append(tileTextDiv)
  tileDiv.append(img)  
  div.appendChild(a)
  a.appendChild(tileDiv)
  sectiondiv.appendChild(div)
}

export { init, fetchCities, addCityToDOM };
