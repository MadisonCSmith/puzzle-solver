
// does the number of players affect it?
// did I get the terminology right?
// number of card in current deck is wrong
// can random value be 0, not be max value?
// add more complicated rules to thing - insurance and double down and whatever
// can the dealer also chose between 1 and 11?
// when players hand has more than one value- when first or second value is bigger than X?
// get value from range
// what if player gets a blackjack

var dealersHand = [];
var playersHand = [];
var currentDeck = [{cardSuit:"Clubs", cardRank:"Ace", cardValue:[1, 11]}, {cardSuit:"Diamonds", cardRank:"Ace", cardValue:[1, 11]}, {cardSuit:"Hearts", cardRank:"Ace", cardValue:[1, 11]}, {cardSuit:"Spades", cardRank:"Ace", cardValue:[1, 11]},
{cardSuit:"Clubs", cardRank:"one", cardValue:[1]}, {cardSuit:"Diamonds", cardRank:"one", cardValue:[1]}, {cardSuit:"Hearts", cardRank:"one", cardValue:[1]}, {cardSuit:"Spades", cardRank:"one", cardValue:[1]},
{cardSuit:"Clubs", cardRank:"two", cardValue:[2]}, {cardSuit:"Diamonds", cardRank:"two", cardValue:[2]}, {cardSuit:"Hearts", cardRank:"two", cardValue:[2]}, {cardSuit:"Spades", cardRank:"two", cardValue:[2]},
{cardSuit:"Clubs", cardRank:"three", cardValue:[3]}, {cardSuit:"Diamonds", cardRank:"three", cardValue:[3]}, {cardSuit:"Hearts", cardRank:"three", cardValue:[3]}, {cardSuit:"Spades", cardRank:"three", cardValue:[3]},
{cardSuit:"Clubs", cardRank:"four", cardValue:[4]}, {cardSuit:"Diamonds", cardRank:"four", cardValue:[4]}, {cardSuit:"Hearts", cardRank:"four", cardValue:[4]}, {cardSuit:"Spades", cardRank:"four", cardValue:[4]},
{cardSuit:"Clubs", cardRank:"five", cardValue:[5]}, {cardSuit:"Diamonds", cardRank:"five", cardValue:[5]}, {cardSuit:"Hearts", cardRank:"five", cardValue:[5]}, {cardSuit:"Spades", cardRank:"five", cardValue:[5]},
{cardSuit:"Clubs", cardRank:"six", cardValue:[6]}, {cardSuit:"Diamonds", cardRank:"six", cardValue:[6]}, {cardSuit:"Hearts", cardRank:"six", cardValue:[6]}, {cardSuit:"Spades", cardRank:"six", cardValue:[6]},
{cardSuit:"Clubs", cardRank:"seven", cardValue:[7]}, {cardSuit:"Diamonds", cardRank:"seven", cardValue:[7]}, {cardSuit:"Hearts", cardRank:"seven", cardValue:[7]}, {cardSuit:"Spades", cardRank:"seven", cardValue:[7]},
{cardSuit:"Clubs", cardRank:"eight", cardValue:[8]}, {cardSuit:"Diamonds", cardRank:"eight", cardValue:[8]}, {cardSuit:"Hearts", cardRank:"eight", cardValue:[8]}, {cardSuit:"Spades", cardRank:"eight", cardValue:[8]},
{cardSuit:"Clubs", cardRank:"nine", cardValue:[9]}, {cardSuit:"Diamonds", cardRank:"nine", cardValue:[9]}, {cardSuit:"Hearts", cardRank:"nine", cardValue:[9]}, {cardSuit:"Spades", cardRank:"nine", cardValue:[9]},
{cardSuit:"Clubs", cardRank:"ten", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"ten", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"ten", cardValue:[10]}, {cardSuit:"Spades", cardRank:"ten", cardValue:[10]},
{cardSuit:"Clubs", cardRank:"Jack", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"Jack", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"Jack", cardValue:[10]}, {cardSuit:"Spades", cardRank:"Jack", cardValue:[10]},
{cardSuit:"Clubs", cardRank:"Queen", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"Queen", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"Queen", cardValue:[10]}, {cardSuit:"Spades", cardRank:"Queen", cardValue:[10]},
{cardSuit:"Clubs", cardRank:"King", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"King", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"King", cardValue:[10]}, {cardSuit:"Spades", cardRank:"King", cardValue:[10]}]



// selects and returns random card
function selectCard() {
    var deckLength = currentDeck.length;
    return Math.floor((Math.random() * deckLength));
}

// calculates value of hand
function handValue(hand) {
    var total = [0];

    // for every card in hand
    for (var i = 0; i < hand.length; i++) {
        arrayLength = total.length;

        // for every value in array
        for (var j = 0; j < arrayLength; j++) {
            if (hand[i]['cardValue'].length < 2) {
                total[j] = total[j] + hand[i]['cardValue'][0];
            } else {
                total[total.length] = total[j] + hand[i]['cardValue'][1];
                total[j] = total[j] + hand[i]['cardValue'][0];
            }

        }
    }

    // removes duplicates from values
    total = total.filter(function(item, index){
        return total.indexOf(item) >= index;
    });

    // if there's a value under 21 and value over 21, takes out values higher than 21
    var valueUnderTwentyOne = false;
    var valueOverTwentyOne = false;
    for (var i = 0; i < total.length; i++) {
        if (total[i] <= 21) {
            valueUnderTwentyOne = true;
        }
        if (total[i] <= 21) {
            valueOverTwentyOne = true;
        }
    }

    if (valueUnderTwentyOne == true && valueOverTwentyOne == true) {
        for (var i = 0; i < total.length; i++) {
            if (total[i] > 21) {
                total.splice(i, 1);
                i = i - 1;
            } 
        }
    }

    return total;
}

// player hits
function hit(playersHand, currentDeck) {
    index = selectCard();
    playersHand.push(currentDeck[index]);
    currentDeck.splice(index, 1); 
}

// plays single round
function playRound() {
    // get value when dealer stands from range 
    var X = 16;

    // get value that the player stands down
    var Y = 16;

    while (handValue(playersHand)[handValue(playersHand).length - 1] < Y) {
        hit(playersHand, currentDeck);
    } 

    while (handValue(dealersHand)[handValue(dealersHand).length - 1] < X) {
        hit(dealersHand, currentDeck);
        console.log(currentDeck);
    }

    console.log(currentDeck);

    // 1 is win, 0 is loss, 2 is draw
    if (handValue(playersHand)[0] > 21 ) {
        return 0;
    } else if (handValue(dealersHand)[0] > 21) {
        return 1;
    } else if (handValue(playersHand)[handValue(playersHand).length - 1] == handValue(dealersHand)[handValue(dealersHand).length - 1]) {
        return 2;
    } else if (handValue(playersHand)[handValue(playersHand).length - 1] > handValue(dealersHand)[handValue(dealersHand).length - 1]) {
        return 1;
    } else if (handValue(playersHand)[handValue(playersHand).length - 1] < handValue(dealersHand)[handValue(dealersHand).length - 1]) {
        return 0;
    }
}

function playGame() {
    // reset hands
    var dealersHand = [];
    var playersHand = [];

    /*while (currentDeck.length > 5) {
        playRound()
        console.log(currentDeck);
    } */

    for (var i = 0; i < currentDeck.length; i++) {
        playRound()
        console.log(currentDeck);
    }

}

function collectResults() {
    var winCount = 0;
    var drawCount = 0;
    var lossCount = 0;

    for (var i = 0; i < 100; i++) {
        result = playGame();
        console.log(result)

        if (result == 1) {
            winCount = winCount + 1;
        } else if (result == 0) { 
            lossCount = lossCount + 1;
        } else if (result == 2) {
            drawCount = drawCount + 1;
        }
    }
    
    console.log(winCount, lossCount, drawCount)

    // print results to confole
    resetGame();
}

function resetGame() {
    dealersHand = [];
    playersHand = [];
    currentDeck = [{cardSuit:"Clubs", cardRank:"Ace", cardValue:[1, 11]}, {cardSuit:"Diamonds", cardRank:"Ace", cardValue:[1, 11]}, {cardSuit:"Hearts", cardRank:"Ace", cardValue:[1, 11]}, {cardSuit:"Spades", cardRank:"Ace", cardValue:[1, 11]},
    {cardSuit:"Clubs", cardRank:"one", cardValue:[1]}, {cardSuit:"Diamonds", cardRank:"one", cardValue:[1]}, {cardSuit:"Hearts", cardRank:"one", cardValue:[1]}, {cardSuit:"Spades", cardRank:"one", cardValue:[1]},
    {cardSuit:"Clubs", cardRank:"two", cardValue:[2]}, {cardSuit:"Diamonds", cardRank:"two", cardValue:[2]}, {cardSuit:"Hearts", cardRank:"two", cardValue:[2]}, {cardSuit:"Spades", cardRank:"two", cardValue:[2]},
    {cardSuit:"Clubs", cardRank:"three", cardValue:[3]}, {cardSuit:"Diamonds", cardRank:"three", cardValue:[3]}, {cardSuit:"Hearts", cardRank:"three", cardValue:[3]}, {cardSuit:"Spades", cardRank:"three", cardValue:[3]},
    {cardSuit:"Clubs", cardRank:"four", cardValue:[4]}, {cardSuit:"Diamonds", cardRank:"four", cardValue:[4]}, {cardSuit:"Hearts", cardRank:"four", cardValue:[4]}, {cardSuit:"Spades", cardRank:"four", cardValue:[4]},
    {cardSuit:"Clubs", cardRank:"five", cardValue:[5]}, {cardSuit:"Diamonds", cardRank:"five", cardValue:[5]}, {cardSuit:"Hearts", cardRank:"five", cardValue:[5]}, {cardSuit:"Spades", cardRank:"five", cardValue:[5]},
    {cardSuit:"Clubs", cardRank:"six", cardValue:[6]}, {cardSuit:"Diamonds", cardRank:"six", cardValue:[6]}, {cardSuit:"Hearts", cardRank:"six", cardValue:[6]}, {cardSuit:"Spades", cardRank:"six", cardValue:[6]},
    {cardSuit:"Clubs", cardRank:"seven", cardValue:[7]}, {cardSuit:"Diamonds", cardRank:"seven", cardValue:[7]}, {cardSuit:"Hearts", cardRank:"seven", cardValue:[7]}, {cardSuit:"Spades", cardRank:"seven", cardValue:[7]},
    {cardSuit:"Clubs", cardRank:"eight", cardValue:[8]}, {cardSuit:"Diamonds", cardRank:"eight", cardValue:[8]}, {cardSuit:"Hearts", cardRank:"eight", cardValue:[8]}, {cardSuit:"Spades", cardRank:"eight", cardValue:[8]},
    {cardSuit:"Clubs", cardRank:"nine", cardValue:[9]}, {cardSuit:"Diamonds", cardRank:"nine", cardValue:[9]}, {cardSuit:"Hearts", cardRank:"nine", cardValue:[9]}, {cardSuit:"Spades", cardRank:"nine", cardValue:[9]},
    {cardSuit:"Clubs", cardRank:"ten", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"ten", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"ten", cardValue:[10]}, {cardSuit:"Spades", cardRank:"ten", cardValue:[10]},
    {cardSuit:"Clubs", cardRank:"Jack", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"Jack", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"Jack", cardValue:[10]}, {cardSuit:"Spades", cardRank:"Jack", cardValue:[10]},
    {cardSuit:"Clubs", cardRank:"Queen", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"Queen", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"Queen", cardValue:[10]}, {cardSuit:"Spades", cardRank:"Queen", cardValue:[10]},
    {cardSuit:"Clubs", cardRank:"King", cardValue:[10]}, {cardSuit:"Diamonds", cardRank:"King", cardValue:[10]}, {cardSuit:"Hearts", cardRank:"King", cardValue:[10]}, {cardSuit:"Spades", cardRank:"King", cardValue:[10]}]

}

collectResults()

