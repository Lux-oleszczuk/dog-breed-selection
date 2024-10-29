const breedSelect = document.getElementById("breed-select");
const subBreedSelect = document.getElementById("sub-breed-select");

async function fetchBreedPossibilities() {
    const breedListUrl = "https://dog.ceo/api/breeds/list";

    try {
        const response = await fetch(breedListUrl);

        if(!response.ok) {
            throw new error("response status: " + response.status);
        }

        const json = await response.json();

        const breedList = json.message;

        for(const breed of breedList) {
            const newOption = document.createElement("option");
            newOption.text = breed;
            breedSelect.options.add(newOption, breed);
        }

        console.log(json);
    } catch(error) {
        console.error(error);
    }
}

fetchBreedPossibilities();