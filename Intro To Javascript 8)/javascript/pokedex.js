let pokemonRepository = (function() {
  let pokemonList = []
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150;"
  let modalContainer = document.querySelector('#modal-container');


  //moves fetch data into pokemonList in the correct form
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        pokemonList.push(pokemon)
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //adds a button for each pokemon in the list
function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");

  let listPokemon = document.createElement("li");
  $(listPokemon).addClass("group-list-item");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.setAttribute("name", "pokeButton");
  button.setAttribute("data-target", "#pokeModal");
  button.setAttribute("data-toggle", "modal");
  $(button).addClass("btn btn-primary");

  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);

  button.addEventListener("pointerdown", function() {
    showDetails(pokemon);
  });
}

//makes it so that pokemon list is the same as pokemonRepository

function getAll (){
  console.log(pokemonList)
  return pokemonList
}

//adds pokemon to the pokemonlist
function add(pokemon){
  pokemonList.push(pokemon);
}

//loads the individual details regarding each pokemon for later

function loadDetails(pokemon) {
  let url = pokemon.detailsUrl;
  let name = pokemon.name;

  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {

    pokemon.imageUrl = details.sprites.front_default;
    pokemon.height = details.height;
    pokemon.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

//console logs the details of each pokemon

function showDetails(pokemon){
loadDetails(pokemon).then(function() {
  showModal(pokemon);
});
}

function showModal(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function (){
  
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  
  modalTitle.empty();
  modalBody.empty();
  
  let pokemonName = $('<h1>' + pokemon.name + '</h1>');
  let pokemonImage = $('<img class="modal-img" style="width:50%">');
  pokemonImage.attr('src' , pokemon.imageUrl);
  let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
  let pokemonTypes = document.createElement('span');
  let types = 'Type: ';
  pokemon.types.forEach(function (item) {
  types += item.type.name + ' ';
  });
  pokemonTypes.innerHTML = types;
  
  modalTitle.append(pokemonName);
  modalBody.append(pokemonImage);
  modalBody.append(pokemonHeight);
  modalBody.append(pokemonTypes);
  
  $('#pokeModal').modal('toggle');
  });
  }

//allows for the modal to show on screen whenever pokemon is clicked


//changes the class in order to hide the modal

/*
function hideModal() {
  modalContainer.classList.remove('is-visible');
}

//allows for the escape key to close the modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});
modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});
*/ 

//ready's the functions for later so that all functions are called at once

return {
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  add: add,
  getAll: getAll,
  showModal: showModal
  };

})()

//invokes the functions

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})