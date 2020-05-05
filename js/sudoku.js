///////////
// to do //
///////////

// are some sudoku games bigger than others- be able to resize game - 16*16 instead of 9*9
// add reset button
// go through all error messages and highlight in red where the error occurs in puzzle, don't just say there's an error
// throw error if not enough info to solve puzzle (if stop making progress)
// make it so when click on box, it highlights everything already there so don't have to highlight/backspace manually

///////////
///////////


var size = 9;
var puzzle = new Array(81);
var unsolvedCellIndexes = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                                10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                                20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                                30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                                40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
                                50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
                                60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
                                70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
                                80]);


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
            unsolvedCellIndexes.delete(i); // removes value from unsolved cell indexes set
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
    count = 100; // delete later and replace with "progressMade"
    while (unsolvedCellIndexes.size > 0 && count > 0) {
        // Delete all possibilities that overlap with values in row, column, square
        for (var i = 0; i < 9; i++) {
            deletePossibilities(getColumn(i));
            deletePossibilities(getRow(i));
            deletePossibilities(getSquare(i));
        }

        // for each unsolvedCellIndexes call function checkPossibilities (check if only one possibility left for cell and replace as solved)
        //unsolvedCellIndexes.forEach(checkPossibilities); // --> called as going through cells

        count--; // delete later and replace with boolean "progressMade"
    }
    console.log("finished puzzle: " + puzzle);
}

// checks if puzzle solveable - no repeats in columns, rows, squares
function ifSolvable() {
    // do something
    return true;
}

// gets solved values and indexes on unsolved indexes in a column given an index of the column
function getColumn(colIndex) {
    var solvedValues = new Array();
    var unsolvedIndexes = new Array();
    for (var i = colIndex; i < 81; i = i + 9) { // gets all indexes in column given which column 
        if (Number.isInteger(puzzle[i])) {
            solvedValues.push(puzzle[i]); // add puzzle[i] to array or something (solved values)
        } else {
            unsolvedIndexes.push(i); // add i to array or something (unsolved indexes)
        }
    }
    return [solvedValues, unsolvedIndexes];
}

// gets solved values and indexes on unsolved indexes in a row given an index of the row
function getRow(rowIndex) {
    var solvedValues = new Array();
    var unsolvedIndexes = new Array();
    for (var i = rowIndex * 9; i < (rowIndex * 9) + 9; i++) { // gets all indexes in row given which row 
        if (Number.isInteger(puzzle[i])) {
            solvedValues.push(puzzle[i]); // add puzzle[i] to array or something (solved values)
        } else {
            unsolvedIndexes.push(i); // add i to array or something (unsolved indexes)
        }
    }
    return [solvedValues, unsolvedIndexes];
}

// gets solved values and indexes on unsolved indexes in a square given an index of the square
function getSquare(squIndex) {
    var solvedValues = new Array();
    var unsolvedIndexes = new Array();

    var indexes = new Array();
    var initialIndexes = new Array(0, 3, 6, 27, 30, 33, 54, 57, 60); // array of indexes of squares

    // gets indexes for the square with index squIndex
    for (var i = 0; i < 27; i = i + 9) {
        for (var j = 0; j < 3; j++) {
            indexes.push(initialIndexes[squIndex] + i + j) ;
        }
    }

    for (var i = 0; i < 9; i++) { // interates through indexes for indexes array 
        if (Number.isInteger(puzzle[indexes[i]])) {
            solvedValues.push(puzzle[indexes[i]]); // add puzzle[i] to array solved values
        } else {
            unsolvedIndexes.push(indexes[i]); // add i to array unsolved indexes
        }
    }
    return [solvedValues, unsolvedIndexes];
}

// deletes solved values from sets at unsolved indexes
function deletePossibilities(currentStatus) {
    var solvedValues = currentStatus[0];
    var unsolvedIndexes = currentStatus[1];

    // if the sets at unsolvedIndexes contains solvedValues, delete value in set
    for (var i = 0; i < unsolvedIndexes.length; i++) { // loops through unsolved indexes
        for (var j = 0; j < solvedValues.length; j++) { // loops through solved values
            
            // if solved value is in unsolved set, delete value
            if (puzzle[unsolvedIndexes[i]].has(solvedValues[j])) {
                puzzle[unsolvedIndexes[i]].delete(solvedValues[j]);
                
                // if set only has one thing in it, convert cell to solved 
                if (puzzle[unsolvedIndexes[i]].size == 1) {
                    changeToSolved(unsolvedIndexes[i]);
                }
            }  
        }
    }
}

// change cell from unsolved to solved -- replace set with value and removed from unsolved indices
function changeToSolved(cellIndex) {
    var value = puzzle[cellIndex].values().next().value;
    puzzle[cellIndex] = value;
    unsolvedCellIndexes.delete(cellIndex);
}