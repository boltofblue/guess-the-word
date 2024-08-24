const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();   
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// start the game
getWord();

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
        message.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess); // adds the guess to the guessed letters array 
       // console.log(guessedLetters);
       updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = ""; // clears existing list 
    for (const letter of guessedLetters) {
        const li = document.createElement("li"); // creates new list 
        li.innerText = letter;
        guessedLettersElement.append(li); 
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase(); 
    const wordArray = wordUpper.split("");
    const revealWord = [];
   // console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
   // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Womp womp, this word has no ${guess}. Try again.`
        remainingGuesses -= 1;
    } else {
        message.innerText = `Hell yeah, the letter ${guess} exists in this word.`
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else { 
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`
    }
};

const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
    guessLetterButton.classList.add("hide");
    letterInput.disabled = true; // disable input field when game ends 
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () { 
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";
    getWord(); // gets a new word to guess

    letterInput.disabled = false; // re-enables the input field and shows game elements again 
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});