function generateWinningNumber() {
    min = 1;
    max = 100;
    //return Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(Math.random() * 100 + 1)

}
// function shuffle(array) {
//     var i = array.length;
//     var temp;
//     while (i) {
//         var j = Math.floor(Math.random() * (i +1));
//         i--
//         temp = array[i];
//         array[i] = array[j];
//         array[i] = temp;

//     }
//     return array;
// }
function shuffle(array){

    for(var i= array.length -1;i > 0; i--){
        // j or randomIndex
        var j = Math.floor(Math.random() * (i +1)); 
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

function Game(playersGuess, pastGuesses, winningNumber) {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function () {
    if (this.playersGuess > this.winningNumber) {
        return this.playersGuess - this.winningNumber;
    }
    return this.winningNumber - this.playersGuess;

}
Game.prototype.isLower = function () {
    if (this.playersGuess > this.winningNumber) {
        return false
    }
    return true;
    // return this.playerGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function (guess) {
    if (typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();

}
Game.prototype.checkGuess = function () {
    if (this.playersGuess === this.winningNumber) {
        return "You Win!";
    } else {
        if (this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return "You have already guessed that number.";
        } else {
            this.pastGuesses.push(this.playersGuess)
            if (this.pastGuesses.length === 5) {
                return "You Lose.";
            } else {
                //alert(this.difference());
                if (this.difference() < 10) {
                    return "You\'re burning up!"
                }
                if (this.difference() < 25) {
                    return "You\'re lukewarm.";
                }
                if (this.difference() < 50) {
                    return "You\'re a bit chilly."
                }
                if (this.difference() < 100) {
                    return "You\'re ice cold!";
                }
            }
        }
    }
}

Game.prototype.provideHint = function () {
    var arr = [];
    arr.push(this.winningNumber, generateWinningNumber(), generateWinningNumber())
    return shuffle(arr);
}
function newGame() {
    return new Game();
}