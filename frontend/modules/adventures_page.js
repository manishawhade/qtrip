
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let cityId = search.split('=')[1];
  return cityId
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  return fetch(config.backendEndpoint+`/adventures?city=${city}`)
  .then(res => { return res.json() })
  .catch(err => { return null })
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  if(adventures){
    adventures.forEach((key) => {
      const {id, name, costPerHead, currency, image, duration, category} = key
      let sectiondiv = document.getElementById('data')
      let div = document.createElement('div')
      div.className = 'col-6 col-md-6 col-lg-3 my-2'
      
      let a = document.createElement('a')
      a.id = id
      a.href = 'detail/?adventure='+id
      
      let tileDiv = document.createElement('div')
      tileDiv.className = 'activity-card'

      let banner = document.createElement('div')
      banner.className = 'category-banner me-auto'
      banner.textContent = category
      
      let img = document.createElement('img')
      img.src = image
      img.alt = name

      let tileTextDiv = document.createElement('div')
      tileTextDiv.className = 'd-flex justify-content-between'

      let h5 = document.createElement('h5')
      h5.textContent = name
      let p = document.createElement('p')
      p.textContent = `${currency} ${costPerHead}`
      
      tileTextDiv.appendChild(h5)
      tileTextDiv.appendChild(p)

      let tileTextDiv1 = document.createElement('div')
      tileTextDiv1.className = 'd-flex justify-content-between'

      let h51 = document.createElement('h5')
      h51.textContent = "Duration"
      let p1 = document.createElement('p')
      p1.textContent = duration
      
      tileTextDiv1.appendChild(h51)
      tileTextDiv1.appendChild(p1)

      tileDiv.append(img)
      tileDiv.append(banner)
      tileDiv.append(tileTextDiv)
      tileDiv.append(tileTextDiv1)
      div.appendChild(a)
      a.appendChild(tileDiv)
      sectiondiv.appendChild(div)
    })
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(x => x.duration >= low && x.duration <= high)
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let lst = []
  categoryList.forEach(categoryItem => {
    let a = list.filter(x => x.category == categoryItem)
    lst.push(...a)
  })
  return lst;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters['category'].length > 0 && filters['duration'] != ""){
    let duration = filters['duration'].split('-')
    let filteredList = filterByDuration(list, parseInt(duration[0]), parseInt(duration[1]))
    return filterByCategory(filteredList, filters['category'])
  }else if(filters['category'].length > 0){
    return filterByCategory(list,filters['category'])
  }else if(filters['duration'] != ""){
    let duration = filters['duration'].split('-')
    return filterByDuration(list, parseInt(duration[0]), parseInt(duration[1]))
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem('filters'))

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filtersDiv = document.getElementById('category-list');
  filters['category'].forEach(x => {
    filtersDiv.innerHTML += `<p class='border border-warning mx-2 rounded-3 p-2'>${x}</p>`
  })
  document.getElementById('duration-select').value = filters['duration']
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
