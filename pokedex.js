const pokemonListElement = document.getElementById("pokemonList");
const modalElement = document.getElementById("modal");
const searchInput = document.getElementById("searchInput");
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'pokemons.json'; // Relative path to the JSON file


// Fetch the Pokemon data from the JSON file
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Function to create a Pokemon card
        function createPokemonCard(pokemon) {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");

            card.innerHTML = `
                <img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}">
                <h2>${pokemon.name}</h2>
                <p>Type: ${pokemon.type}</p>
            `;

            // Add a click event to show the modal with more information
            card.addEventListener("click", () => {
                showPokemonDetails(pokemon);
            });

            return card;
        }

        // Function to show the modal with Pokemon details
        function showPokemonDetails(pokemon) {
            modalElement.innerHTML = `
                <div id="modal-content">
                    <h2>${pokemon.name}</h2>
                    <img src="${pokemon.ThumbnailImage}" alt="${pokemon.name}">
                    <p>Type: ${pokemon.type}</p>
                    <p>Weight: ${pokemon.weight}</p>
                    <p>Abilities:</p>
                    <ul>
                        ${pokemon.abilities.map(move => `<li>${move}</li>`).join("")}
                    </ul>
                    <p>Weakness:</p>
                    <ul>
                        ${pokemon.weakness.map(move => `<li>${move}</li>`).join("")}
                    </ul>
                </div>
            `;

            modalElement.style.display = "flex";
        }

        // Render the list of Pokemon cards
        data.forEach(pokemon => {
            const card = createPokemonCard(pokemon);
            pokemonListElement.appendChild(card);
        });

        // Add search functionality
        searchInput.addEventListener("input", () => {
            const searchValue = searchInput.value.toLowerCase();
            const cards = document.querySelectorAll(".pokemon-card");

            cards.forEach(card => {
                const name = card.querySelector("h2").textContent.toLowerCase();
                if (name.includes(searchValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    })
    .catch(error => console.error(error));

