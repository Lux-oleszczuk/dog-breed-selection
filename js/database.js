const randomDogButton = document.getElementById("random-button");
const dogImage = document.getElementById("image");
const breedSelect = document.getElementById("breed-select");
const subBreedSelect = document.getElementById("sub-breed-select");

/**
 * 
 * @param {string} url url to be fetched
 */

async function fetchFromAPI(url) {
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error("response status: " + response.status);
        }
        const json = await response.json();

        return json.message;

    } catch (error) {
        console.log(error);
    }

}

async function fetchRandomDog() {
    const randomUrl = "https://dog.ceo/api/breeds/image/random";

    const response = await fetch(randomUrl);

    if(!response.ok) {
        throw new error("response status: " + response.status);
    }

    const json = await response.json();
    const message = json.message;

    dogImage.src = message;
}


async function fetchBreedPossibilities() {
    const breedListUrl = "https://dog.ceo/api/breeds/list";

    const breedList = await fetchFromAPI(breedListUrl);

    for(const breed of breedList) {
        const newOption = document.createElement("option");
        newOption.text = breed;
        breedSelect.options.add(newOption, breed);
    }


}
// link buttons to events
randomDogButton.onclick = fetchRandomDog;

fetchRandomDog();
fetchBreedPossibilities();