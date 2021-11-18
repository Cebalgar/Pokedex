const pokedex= document.getElementById("pokedex");

console.log(pokedex);

const pokes = [];

function buscarPokemon(){

  
    for ( let i=1; i<=150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
   
        pokes.push(fetch(url) 
        
        .then((response) => response.json()));
    }
    Promise.all(pokes).then( results=>{

        const pokemon = results.map(result=>({
            name: result.name,
            id: result.id,
            imagen: result.sprites["front_default"],
            height: result.height,
            weight:result.weight,
            type:result.types.map((type) => 
            type.type.name).join(', ')


        }));
        MostrarPokemon(pokemon);
    })
    
}

const MostrarPokemon = (pokemon)=>{
    console.log(pokemon);
    
    const pokemonDom = pokemon.map ( pokemons=>`
        <li class="card">
            <img class="card-imagen" src="${pokemons.imagen}"/>
            <h2 class= "card-title">${pokemons.id}.${pokemons.name}</h2>
            <p class= "card-subtitle">Type: ${pokemons.type}</p>
            <p class= "small"><small>Height: </small>${pokemons.height}</p>
            <p class= "small"><small>Weight: </small>${pokemons.weight}</p>
        </li>`)
        .join("");
    pokedex.innerHTML = pokemonDom;

}


buscarPokemon();