let pokemonRepository = (function() {
  let pokemonList = []
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150;"

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
  let button = document.createElement("button");
  button.innerText = pokemon.name;

  listPokemon.appendChild(button);
  pokemonList.appendChild(listPokemon);

  button.addEventListener("click", function(event) {
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
  });
}

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