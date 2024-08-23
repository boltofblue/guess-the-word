const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";

// placeholder 
const placeholder = function (word) {
    const placeholderLetters = []; // creates an empty array to store the circle symbols 
    for (const letter of word) { // this loops through each letter of the word 
        console.log(letter); // optional, just tests to make sure things are appearing in console
        placeholderLetters.push("●"); // push a circle symbol into the array for each letter in the word.
    }

    wordInProgress.innerText = placeholderLetters.join(""); // converts the array of circles into a string and sets it as the innerText of the word-in-progress element  
};

placeholder(word); // calling the function and passing word as an argument 

guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = letterInput.value;
    console.log(guess);
});