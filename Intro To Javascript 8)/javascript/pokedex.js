/*(function (pokeList){*/
let pokeList1 = [];
//list of pokemon name, height, type	
	
/*	return pokeList1;
})();*/

let pokemonRepository = (function () {
  let pokemonList = pokeList1;

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

  return {
    add: add,
    getAll: getAll
  };
  
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
  
})();

// Returns 2 functions, add and Getall

console.log(pokemonRepository);
	
let pokemonInfo = pokemonRepository.getAll();

console.log(pokemonInfo);

//pokemon is the same as pokeList1

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
  console.log(pokemonList); // The actual JSON response
}).catch(function () {
  // Error
});

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
	loadDetails(pokemon).then(function () {
	  console.log(pokemon);
	});
  }
/*
  function add(pokemon) {
	if (typeof pokemon === 'object') {
	return pokemonList.push(pokemon);
	} else {
	document.write("Please insert name of Pokemon");
}
*/