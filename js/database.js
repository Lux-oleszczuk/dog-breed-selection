//variables of image generator part
const randomDogButton = document.getElementById("random-button");
const dogImage = document.getElementById("image");

//variables of selection part
const breedSelect = document.getElementById("breed-select");
const subBreedSelect = document.getElementById("sub-breed-select");

/**
 * fetch information from an API and return the data in a message
 * @param {string} url url to be fetched
 */

async function fetchFromAPI(url) {
    try {
        //get response from API
        const response = await fetch(url);
        //check response
        if(!response.ok) {
            throw new Error("response status: " + response.status);
        }
        //get json from response
        const json = await response.json();

        return json.message;

    } catch (error) {
        console.log(error);
    }
}

async function fetchBreedPossibilities() {                           
    const breedListUrl = "https://dog.ceo/api/breeds/list";

    const breedList = await fetchFromAPI(breedListUrl);

    for (const breed of breedList) {
        //popular breed selection
        const newOption = document.createElement("option");
        newOption.text = breed;
        breedSelect.options.add(newOption, breed);
    }
}

async function fetchSubBreedPossibilithes() {
    while (subBreedSelect.options.length > 0) {
        subBreedSelect.remove(0); //rempves the option at position 0
    }

    const newOption = document.createElement("option");
    newOption.text = "any";
    subBreedSelect.options.add(newOption, "any");

    if(breedSelect.value === "any") return;

    const breedListUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/list";

    const breedList = await fetchFromAPI(breedListUrl);

    for (const breed of breedList) {
        //populate breed select
        const newOption = document.createElement("option");
        newOption.text = breed;
        subBreedSelect.options.add(newOption, breed);
    }
}

async function fetchRandomDog() {
    //define randon dog url
    let randomDogUrl = "https://dog.ceo/api/breeds/image/random";
    //breed selection when needed
    if(breedSelect.value !== "any") {
        randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "images/random";
        if(subBreedSelect.value !== "any") {
            randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/" +subBreedSelect.value + "/images/random";
        }
    }
    //get image source from API
    const imageSource = await fetchFromAPI(randomDogUrl);

    //update image with received source
    currentImage = imageSource;
    dogImage.src = imageSource;
}

// link buttons to events
randomDogButton.onclick = fetchRandomDog;
breedSelect.onchange = fetchSubBreedPossibilithes;

//functions to be executed at the beginning of the code
fetchRandomDog();
fetchBreedPossibilities();