function rollDice(n) {
    document.getElementById('dice').style.display = 'flex';
    document.querySelector('.lightbox-background').style.backgroundImage = `url(${imageUrl})`;
    document.getElementById('lightbox-img').src = imageUrl;
}

/*ANIMATION DICE ROLL FUNCTION*/
// Define an array to store the paths of dice images
var diceImages = [
    "./dice1.png",
    "./dice2.png",
    "./dice3.png",
    "./dice4.png",
    "./dice5.png",
    "./dice6.png"
];

// SIMULATES DICE ROLL:
function rollDicePairAnimation() {
    var diceImage1 = document.getElementById("diceImage1");
    var diceImage2 = document.getElementById("diceImage2");
    var interval = 250; 

    // LOOP Through Animation//
    for (var i = 0; i < diceImages.length; i++) {
        (function(i) {
            setTimeout(function() {
                diceImage1.src = diceImages[Math.floor(Math.random() * 6)];
                diceImage2.src = diceImages[Math.floor(Math.random() * 6)];
            }, interval * i++);
        })(i);
    }

    // Calls rollDicePair function after the animation completes
    setTimeout(rollDicePair, interval * diceImages.length);
}


// Define the rollDicePair function to set the final result
function rollDicePair() {
    var d1 = Math.floor(Math.random() * 6); // Generate a random number between 0 and 5
    var d2 = Math.floor(Math.random() * 6);
    var point = d1 + d2 + 2;

    document.getElementById('ready').innerHTML = point;
    document.getElementById('ready').style.fontSize = '10rem';
    document.getElementById('ready').style.marginTop = '0px';
    document.getElementById('ready').style.color = 'white';
    
    
    console.log("Die 1:", d1 + 1);
    console.log("Die 2:", d2 + 1);

    outputPoints.push(point);
    console.log(outputPoints);
    
    // Gets IMG Element.
    var diceImage1 = document.getElementById("diceImage1");
    var diceImage2 = document.getElementById("diceImage2");
    // SETS source of FINAL Result
    diceImage1.src = diceImages[d1];
    diceImage2.src = diceImages[d2];
    pointTable(point);
}
var outputPoints = [];
var losingPoints = [12,2,3];
var win1Points = [7,11];
var winPoint = 0;
/*conditionals for scoreTable */
function pointTable(point) {

    if (outputPoints.length === 1 && outputPoints.every(num => !win1Points.includes(num)) && outputPoints.every(num => !losingPoints.includes(num))) {
        winPoint = outputPoints[0];
        outputPoints.push(point);
        document.querySelector('#score').style.color = 'white';
        document.querySelector("#score").style.borderColor = '#fac504';
        document.querySelector('#score').style.fontSize = '4rem';
        document.querySelector('#score').innerHTML = winPoint + " to win!";
    } else {
        var lastPoint = outputPoints[outputPoints.length - 1];
        if (outputPoints.length === 1 && outputPoints.some(num => win1Points.includes(num))) {
            document.querySelector('#ready').style.color = 'limegreen';
            document.querySelector('#score').style.color = 'white';
            document.querySelector('#score').style.fontSize = '4rem';
            document.querySelector("#score").style.borderColor = 'limegreen';
            document.querySelector('#score').innerHTML = "YOU WIN!";
            lastPoint = 0;
            outputPoints = [];
        } else if (outputPoints.length >=2  && lastPoint === winPoint) {
            document.querySelector('#score').style.fontSize = '4rem';
            document.getElementById('ready').style.color = 'limegreen';
            document.querySelector("#score").style.borderColor = 'limegreen';
            document.querySelector('#score').innerHTML = "You Won!";
            lastPoint = 0;
            outputPoints = [];
        } else if (outputPoints.length >= 2 && outputPoints.indexOf(7) !== -1) {
            document.querySelector('#score').style.borderColor = 'red';
            document.querySelector('#score').innerHTML = "YOU LOST!";
            document.querySelector('#ready').style.color = 'red';
            lastPoint = 0;
            outputPoints = [];
        } else if (outputPoints.length === 1 && outputPoints.every(num => losingPoints.includes(num))) {
            document.querySelector('#score').style.fontSize = '4rem';
            document.querySelector("#score").style.borderColor = 'red';
            document.querySelector('#ready').style.color = 'red';
            document.querySelector('#score').innerHTML = "YOU LOSE!";
            lastPoint = 0;
            outputPoints = [];
        }
    }
}

/*to check if winning/losing numbers are inside of outputPoints
outputPoints.some(num => numbers.includes(losingPoints)) 
*/

/*to check if winning/losing numbers are NOT! inside of outputPoints
outputPoints.every(num => !numbers.includes(win1Points));
*/