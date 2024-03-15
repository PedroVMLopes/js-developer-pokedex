
// Após a execução da nova sheet HTML o código apresenta 2 erros no console
// Esses erros são ocorrencia de elementos que não são encontrados quando o script é executado, pois a página em execução não é mais a mesma
// Os erros não interferem na funcionalidade do sistema, portanto serão resolvidos depois


function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.number}`;

    return pokemon
}




function loadPokemonInfo(pokeNumber) {
    pokeApi.getPokemons(pokeNumber).then((pokemons = []) => {
        console.log('aqui!');
        const newHtml = pokemons.map(convertPokeApiDetailToPokemon)
        pokemonList.innerHTML += newHtml
    })
}




pokeApi.getPokemonInfo = (pokeNumber) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.number}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


function convertPokemonToHTML(pokemon) {

}

const pokemonInfo = document.getElementById('pokemonInfo')

function showPokemonInfo(pokemon) {
    return `
    <button id="btnLoadPokemonInformation" class="btnLoadPokemonInformation" type="button">
        <a href="pokemonInfo.html">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        </a>
    </button>
    `
}