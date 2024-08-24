const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// placeholder 
const placeholder = function (word) {
    const placeholderLetters = []; // creates an empty array to store the circle symbols 
    for (const letter of word) { // this loops through each letter of the word 
       // console.log(letter); // optional, just tests to make sure things are appearing in console
        placeholderLetters.push("●"); // push a circle symbol into the array for each letter in the word.
    }
    wordInProgress.innerText = placeholderLetters.join(""); // converts the array of circles into a string and sets it as the innerText of the word-in-progress element  
};

placeholder(word); // calling the function and passing word as an argument 

// event listener for the guess button 
guessLetterButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = ""; // placing it here ensures any previous message is cleared out before new input is validated
    const guess = letterInput.value; // grabbing what was added to the input 
   // console.log(guess);
    const goodGuess = validateInput(guess);
   // console.log(goodGuess); // ensures the language changes if user enters a non-letter
   if (goodGuess) {
    makeGuess(goodGuess); // makeGuess(guess); as in the master code
   }
   letterInput.value = "";
});

const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    //checks if input is empty
    if (input.length === 0) {
        message.innerText = "Please type a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter."; // checks if user added multiple letters 
    } else if (!input.match(acceptedLetter)) { // ! = NOT aka input does NOT match the accepted letters 
        message.innerText = "Please enter a letter from A to Z."; // checks if user added a non A-Z letter
    } else {
        return input;
    }
};

const makeGuess = function (guess) { // the parameter is guess bc it accepts a letter aka the user's input 
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, bitch. Try again.";
    } else {
        guessedLetters.push(guess); // adds the guess to the guessed letters array 
        console.log(guessedLetters);
    }
};