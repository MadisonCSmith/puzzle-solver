///////////
// to do //
///////////

// are some sudoku games bigger than others- be able to resize game - 16*16 instead of 9*9
// add reset button
// go through all error messages and highlight in red where the error occurs in puzzle, don't just say there's an error

///////////
///////////


var size = 9;
var puzzle = new Array(81);

//////////////////////////
/// gets data from form //
//////////////////////////


var form = document.getElementById('puzzle');

// called when submitted
form.addEventListener('submit', function(event) {

    // goes through all boxes in puzzle
    for (var i = 0; i < 81; i++) {
        var cell = document.getElementById(i.toString()); // gets box where id == i

        // validates - tests that if there's a value and that the value is between 1 and 9, pop up w error message if not
        if (cell.value && (cell.value > 9 || cell.value < 1)) { 
            alert("Please enter values between 1 and 9.");
        }

        if (cell.value) {
            puzzle[i] = parseInt(cell.value); // if value, adds value into array
        } else {
            puzzle[i] = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]); // if no value, adds set into array
        }
    }
    console.log("initial puzzle: " + puzzle);
    event.preventDefault(); // keeps page from refreshing and erasing data
    solvePuzzle();
});


/////////////////////////
/// solves puzzle ///////
/////////////////////////

function solvePuzzle() {
    if (!ifSolvable) {
        alert ("The puzzle is not solveable because there is a repeat of a number inside row, column or square.")
    }

    while (!isSolved) {
        // Delete all possibilities that overlap with values in row, column, square
        // Check if only one possibility left in a value in row, column, square
    }
}

function ifSolved() {
    // if there not an int in puzzle, then return false
    for (var i = 0; i < puzzle.length; i++) {
        if (!Number.isInteger(puzzle[i])) { 
            return false;
        }
    }
    return true;
}

function ifSolvable() {
    // do something
    return true;
}