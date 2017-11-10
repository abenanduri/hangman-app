
var Letter = require('./letter.js');
// we create a function that stores the word, we created an array to store letter objects
// the function below creates the letter object and pushes into the array
function Word(wrd) {
  var that = this;
  
  this.word = wrd;
  
  this.letters = [];
  this.wordFound = false;

  this.getLets = function() {
    
    for(var i = 0; i<that.word.length; i++){
      var newLetter = new Letter(that.word[i]);
      this.letters.push(newLetter);
    }
  };

  //checking to see if we found the word we are trying to guess
  this.didWeFindTheWord = function() {
    if(this.letters.every(function(lttr){
      return lttr.appear === true;
    })){
      this.wordFound = true;
      return true;
    }

  };
// this checks to see if the letter we guess matches to the letters in the word 
  this.checkIfLetterFound = function(guessedLetter) {
    var whatToReturn = 0;
    
    this.letters.forEach(function(lttr){
      if(lttr.letter === guessedLetter){
        lttr.appear = true;
        whatToReturn++;
      }
    })
    
    return whatToReturn;
  };

  this.wordRender = function() {
    var display = '';
   // this makes sure the word is rendered if the letter is guessed 
    that.letters.forEach(function(lttr){
      var currentLetter = lttr.letterRender();
      display+= currentLetter;
    });

    return display;
  };
}

module.exports = Word;

