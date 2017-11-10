
var inquirer = require('inquirer');
var isLetter = require('is-letter');

var Word = require('./word.js');
var Game = require('./game.js');


//set the maxListener...i am still not sure what exclty this does
require('events').EventEmitter.prototype._maxListeners = 100;


var hangman = {
  wordBank: Game.newWord.wordList,
  guessesRemaining: 10,
  // empty array to push guessed letters 
  guessedLetters: [],
  
  display: 0,
  currentWord: null,
  
  startGame: function() {
    var that = this;
    //empties guessed letters array at the start
    if(this.guessedLetters.length > 0){
      this.guessedLetters = [];
    }
// using inquirer to start the game by asking using a confirm. if yes, call new 
//function, if not, another time then pops up. 
    inquirer.prompt([{
      name: "play",
      type: "confirm",
      message: "Ready to play?"
    }]).then(function(answer) {
      if(answer.play){
        that.newGame();
      } else{
        console.log("Another time then!");
      }
    })},
  //function that runs the game
  //if the words if fully gets the newgame function gets called again, 
  //and it resets the guess with the resetguessremaining funciton.
  //if not, then it keeps promting the user to keep guessing a letter
  //
  newGame: function() {
    if(this.guessesRemaining === 10) {
      console.log("Good Luck!");
      console.log('==================');
      //generates random number based on the wordBank and it picks a random word
      var randNum = Math.floor(Math.random()*this.wordBank.length);
      this.currentWord = new Word(this.wordBank[randNum]);
      this.currentWord.getLets();
      
      console.log(this.currentWord.wordRender());
      this.keepPromptingUser();
    } else{
      this.resetGuessesRemaining();
      this.newGame();
    }
  },
  resetGuessesRemaining: function() {
    this.guessesRemaining = 10;
  },
  keepPromptingUser : function(){
    var that = this;
    //asks player for a letter
    inquirer.prompt([{
      name: "chosenLtr",
      type: "input",
      message: "Choose a letter:",
      validate: function(value) {
        if(isLetter(value)){
          return true;
        } else{
          return false;
        }
      }
    }]).then(function(ltr) {
      //toUpperCase because words to guess are in all caps
      var letterReturned = (ltr.chosenLtr).toUpperCase();
      //adds to the guessed letter array
      var guessedAlready = false;
        for(var i = 0; i<that.guessedLetters.length; i++){
          if(letterReturned === that.guessedLetters[i]){
            guessedAlready = true;
          }
        }
        
        if(guessedAlready === false){
          that.guessedLetters.push(letterReturned);

          var found = that.currentWord.checkIfLetterFound(letterReturned);
          //if letter not found in word, then return wrong and show the amount of guesses
          //remaining after decreasing count by one
          if(found === 0){
            console.log('You guessed wrong!');
            that.guessesRemaining--;
            that.display++;
            console.log('Guesses remaining: ' + that.guessesRemaining);
           

            console.log('\n===============');
            console.log(that.currentWord.wordRender());
            console.log('\n===============');

            console.log("Letters guessed: " + that.guessedLetters);
          } else{
            console.log('Yes! You guessed right!');
              //checks to see if guessed the word
              if(that.currentWord.didWeFindTheWord() === true){
                console.log(that.currentWord.wordRender());
                console.log('You guessed the word!!!');
                // that.startGame();
              } else{
                //or else it shows the guesses left again, and shows the letter that were guessed
                console.log('Guesses remaining: ' + that.guessesRemaining);
                console.log(that.currentWord.wordRender());
                console.log('\n===============');
                console.log("Letters guessed: " + that.guessedLetters);
              }
          }
          if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
            that.keepPromptingUser();
          }else if(that.guessesRemaining === 0){
            console.log('Game over!');
            console.log('The word you were guessing was: ' + that.currentWord.word);
          }
        } else{
            console.log("You've guessed that letter already. Try again.")
            that.keepPromptingUser();
          }
    });
  }
}

hangman.startGame();

