let pokemonRepository = (function () {
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


(function (pokeList){
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
	return pokeList1;
})();

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
	
let pokemonInfo = pokemonRepository.getAll();

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