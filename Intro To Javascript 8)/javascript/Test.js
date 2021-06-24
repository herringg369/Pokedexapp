let pokemonRepository = (function() {
    let pokemonList = []
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?=200"
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
    function getAll (){
      console.log(pokemonList)
      return pokemonList
    }
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
    function loadDetails(item) {
      let url = item.detailsUrl;
      let name = item.name;
      return fetch(url)
        .then(function(response) {
          return response.json();
        })
        .then(function(details) {
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        })
        .catch(function(e) {
          console.error(e);
        });
    }
    function showDetails(pokemon){
      loadDetails(pokemon).then((data) => {
        console.log(pokemon)
      })
    }
    return {
      addListItem: addListItem,
      loadList: loadList,
      add: add,
      loadDetails: loadDetails,
      getAll: getAll
    }
  })()
  pokemonRepository.loadList().then(() => {
    pokemonRepository.getAll().forEach((pokemon) => {
      pokemonRepository.addListItem(pokemon)
    })
  })