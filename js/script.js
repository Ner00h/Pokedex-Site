const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }



}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Procurando...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];

        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Não encontrado.';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }

}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());


})

buttonPrev.addEventListener('click', () => {
    pokemonInfoContainer.innerHTML = '';
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }

})

buttonNext.addEventListener('click', () => {
    // Limpa as informações do Pokémon anterior
    pokemonInfoContainer.innerHTML = '';
    
    // Avança para o próximo Pokémon
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})

const infoButton = document.querySelector('.btn-info');

const pokemonInfoContainer = document.querySelector('.pokemon_info');

const renderPokemonInfo = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if (data) {
        const abilities = data.abilities.map(ability => ability.ability.name).join(', ');

        pokemonInfoContainer.innerHTML = `
            <p><strong>Experiencia Base:</strong> ${data.base_experience}</p>
            <p><strong>Altura (m):</strong> ${data.height}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <p><strong>Habilities usuais:</strong> ${abilities}</p>
        `;
    } else {
        pokemonInfoContainer.innerHTML = '<p>Informações não encontradas.</p>';
    }
}

infoButton.addEventListener('click', () => {
    renderPokemonInfo(searchPokemon);
});

renderPokemon(searchPokemon);