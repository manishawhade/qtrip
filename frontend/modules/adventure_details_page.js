import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  return search.split('=')[1];
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    return fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`)
    .then(res => { return res.json() })
    .catch(error => { return null })
  } catch (error) {
    return null
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  if(adventure){
    document.getElementById('adventure-name').textContent = adventure.name
    document.getElementById('adventure-subtitle').textContent = adventure.subtitle
    document.getElementById('adventure-content').textContent = adventure.content
    document.getElementById('reservation-person-cost').textContent = adventure.costPerHead
    adventure.images.forEach(x => {
      document.getElementById('photo-gallery').innerHTML += `<img class='activity-card-image' src=${x}>`
    })
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById('photo-gallery').innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>`
  images.forEach((x,index) => {
    let div = document.createElement('div')
    div.className = index === 0 ? 'carousel-item active' : 'carousel-item'
    div.innerHTML = `<img class="activity-card-image" src=${x} class="d-block w-100" >`
    document.querySelector('.carousel-inner').append(div);
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById('reservation-panel-sold-out').style.display = 'none'
    document.getElementById('reservation-panel-available').style.display = 'block'
    document.getElementById('reservation-person-cost').textContent = adventure.costPerHead
  }else{
    document.getElementById('reservation-panel-sold-out').style.display = 'block'
    document.getElementById('reservation-panel-available').style.display = 'none'
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let personsCount = parseInt(persons)
  document.getElementById('reservation-cost').textContent = adventure.costPerHead * personsCount
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const form = document.getElementById('myForm')
  form.addEventListener('submit', async (event) =>{
    event.preventDefault()
    const data = new FormData(event.target);
    const value = Object.fromEntries(data.entries());
    value.adventure = adventure.id;
     const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    };
    fetch(config.backendEndpoint+`/reservations/new`, options)
      .then(async res => {
        if(res.ok){
          alert("Success!");
          location.reload();
        }else{
          let data = await res.json();
          alert(`Failed! - ${data.message}`);
        }
      })
      .catch(error => { console.log(error) })
  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById('reserved-banner').style.display = 'block'
  }else{
    document.getElementById('reserved-banner').style.display = 'none'
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
