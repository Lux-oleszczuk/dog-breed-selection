const randomDogButton = document.getElementById("random-button");
const dogImage = document.getElementById("image");
const breedSelect = document.getElementById("breed-select");
const subBreedSelect = document.getElementById("sub-breed-select");

async function fetchRandomDog() {
    try {
        const randomUrl = "https://dog.ceo/api/breeds/image/random";

        const response = await fetch(randomUrl);

        if(!response.ok) {
            throw new error("response status: " + response.status);
        }

        const json = await response.json();
        const message = json.message;

        dogImage.src = message;
    }
    catch (error) { 
        console.log(error);
    }
}

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
// link buttons to events
randomDogButton.onclick = fetchRandomDog;

fetchRandomDog();
fetchBreedPossibilities();