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
				add(pokemon)
				console.log(pokemon)
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

	function add(pokemon) {
		if (typeof pokemon === 'object') {
		return pokemonList.push(pokemon);
		} else {
		document.write("Please insert name of Pokemon");
		}
	}

  function getAll() {
    return pokemonList;
  }

	function loadDetails(){
		
	}

  function addListItem(){
    document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("pokebutton");
    button.addEventListner("click", function(event) {
        showDetails(pokemon);
    });
    listItem.appendChild(button);
    document.querySelector("ul").appendChild(listItem);
  }

  pokemonInfo.forEach (function(pokemon) {
    let container = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.classList.add("pokebutton");
    button.innerHTML = pokemon.name;
    button.addEventListener("click", function showDetails(){
        console.log(pokemon)
        
    });
    listItem.appendChild(button);
    container.appendChild(listItem);
  
  });
  
  //event handling

  fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then
    (function (response) {
      return response.json(); // This returns a promise!
    }).then(function (pokemonList) {
      const results = pokemonList.results
    
      console.log(pokemonList); // The actual JSON response
    }).catch(function () {
      // Error
    });

    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }

	return {
    addListItem: addListItem,
		loadList: loadList,
		add: add,
		loadDetails: loadDetails,
    showDetails: showDetails,
	}
})();

pokemonRepository.loadList();