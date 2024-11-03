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

async function fetchRandomDog() {
    //define randon dog url
    let randomDogUrl = "https://dog.ceo/api/breeds/image/random";
    
    if(breedSelect.value !== "any") {
        randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "images/random";
    }
        const imageSource = await fetchFromAPI(randomUrl);
        dogImage.src = imageSource;   
}


async function fetchBreedPossibilities() {
    while (subBreedSelect.options.length > 0) {
        subBreedSelect.remove(0);
    }
    const newOption = documentr.createElement("option");
    newOption.text = "any";
    subBreedSelect.options.add(newOption, "any");
                                
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