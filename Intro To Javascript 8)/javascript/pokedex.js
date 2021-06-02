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

pokemonInfo.forEach (function(pokemon) {
document.write(pokemon.name + " " + pokemon.type + " " + " (" + "height " + pokemon.height + ") <br />");
});

/*
Old Code
	let (i=0; i < pokeList.length; i++){
	
	if(pokeList[i].height >= 2){
	document.write(pokeList[i].name + " (" + "height " + pokeList[i].height + ") " + " Wow what a large pokemon!");
	
}	else{
	document.write(pokeList[i].name + " (" + "height " + pokeList[i].height + ") ");
  }
 }
*/