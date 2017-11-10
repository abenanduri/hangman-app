var Letter = function(ltr) {
// we store the letter here
  this.letter = ltr;
// boolean if the letter can be shown
  this.appear = false;

// this function returns a _ if the guess is wrong. 
  this.letterRender = function() {
    if(this.letter == ' '){ 
      
      this.appear = true;
      return '  ';
    }if(this.appear === false){ 
      return ' _ ';
    } else{ 
      return this.letter;
    }

  };
};


module.exports = Letter;



