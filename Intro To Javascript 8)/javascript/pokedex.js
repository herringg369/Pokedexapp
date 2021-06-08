/*(function (pokeList){*/
	let pokeList1 = [
			{name:"bulbasaur",
			height:0.7,
			type:["grass","poison"]},
			{name:"charizard",
			height:1.7,
			type:["fire","flying"]},
			{name:"beedrill",
			height:1,
			type:["bug","poison"]},
	];
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
/*
function add(pokemon) {
if (typeof pokemon === 'object') {
return pokemonList.push(pokemon);
} else {
document.write("Please insert name of Pokemon");
}
}

function getAll() {
return pokemonList;
*/

	
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