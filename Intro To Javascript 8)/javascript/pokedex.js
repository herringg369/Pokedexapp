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
  $(button).addClass("btn btn-primary")

  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);

  button.addEventListener("pointerdown", function(event) {
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

function loadDetails(item) {
  let url = item.detailsUrl;
  let name = item.name;

  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {

    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
    console.error(e);
  });
}

//console logs the details of each pokemon

function showDetails(pokemon) {
  pokemonRepository.loadDetails(pokemon).then(function () {
    console.log(pokemon);

    pokemonName = pokemon.name;
    pokemonHeight = pokemon.height;
    pokemonImg = pokemon.imageUrl;
    showModal();
  });
}

$('#exampleModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

//allows for the modal to show on screen whenever pokemon is clicked

function showModal(title, text) {

  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let pokeName = document.createElement('h1');
  pokeName.innerText = pokemonName;

  let pokeHeight = document.createElement('p');
  pokeHeight.innerText = ("Height:" + pokemonHeight);

  let pokeImg = document.createElement('div');
  pokeImg.innerHTML = ("<img src=' " + pokemonImg + "'/>");

  modal.appendChild(closeButtonElement);
  modal.appendChild(pokeName);
  modal.appendChild(pokeHeight);
  modal.appendChild(pokeImg);
  modalContainer.appendChild(modal);


  modalContainer.classList.add('is-visible');
} 

//changes the class in order to hide the modal


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

document.querySelector(".pokemon-list").addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
});


//ready's the functions for later so that all functions are called at once

return {
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  add: add,
  getAll: getAll
  };

})()

//invokes the functions

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  })
})