///////////
// to do //
///////////

// add reset button
// throw error if not enough info to solve puzzle (if stop making progress)


/// UI ///
// go through all error messages and highlight in red where the error occurs in puzzle, don't just say there's an error
// make it so when click on box, it highlights everything already there so don't have to highlight/backspace manually
// put everything in screen as they're found
// differentiate by color/boldness things inputted and things found
// stop things from being changed after submitted-- will mess everything up
// add some animations and stuff to make it look better- fade appearing


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
                                80]); // while greater than 0, puzzle is unsolved


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
            document.getElementById(i.toString()).classList.add("given-value");
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

    // after all values and sets have been added to puzzle, delete possiblities that overlap with solved values
    for (var i = 0; i < 81; i++) {
        if (Number.isInteger(puzzle[i])) {
            deletePossibilities(i, puzzle[i]);
        }
    }

    count = 100; // delete later and replace with "progressMade"

    // while puzzles unsolved and progress continues to be made, delete possiblities and convert cells from unsolved sets to solved ints
    while (unsolvedCellIndexes.size > 0 && count > 0) {

        // delete all possibilities that overlap with values in row, column, square
        for (var i = 0; i < 9; i++) {

            var unsolvedCellsColumn = getColumnUnsolved(i);
            var unsolvedCellsRow = getRowUnsolved(i);
            var unsolvedCellsSquare = getSquareUnsolved(i);

            findSinglePossiblities(unsolvedCellsColumn);
            findSinglePossiblities(unsolvedCellsRow);
            findSinglePossiblities(unsolvedCellsSquare);
            findUniquePossiblities(unsolvedCellsColumn);
            findUniquePossiblities(unsolvedCellsRow);
            findUniquePossiblities(unsolvedCellsSquare);
        }

        count--; // delete later and replace with boolean "progressMade"
    }

    console.log("finished puzzle: " + puzzle); //////////////////////// delete later
    for (var j = 0; j < 81; j++) {
        console.log("cell index: " + j);
        console.log(puzzle[j]);
        console.log(" ");

        if (!Number.isInteger(puzzle[j])) { //////////// delete later
            deleteLr = 0;
            puzzle[j].forEach(deleteLater);
            document.getElementById(j.toString()).value = deleteLr;
            document.getElementById(j.toString()).classList.add("unsolved-set"); 
        }
    }
}

var deleteLr = 0; ////////////////////// delete
function deleteLater(values) {
    console.log("testt");
    deleteLr = (deleteLr * 10) + values;
}

// checks if puzzle solveable - no repeats in columns, rows, squares
function ifSolvable() {
    // if getRowSolved contains duplicates
        // return false

    // if getColumnSolved contains duplicates
        // return false

    // if getSquareSolved contains duplicates
        // return false

    return true;
}


// gets unsolved indexes in a column given an index of the column
function getColumnUnsolved(colIndex) {
    var unsolvedIndexes = new Array();
    for (var i = colIndex; i < 81; i = i + 9) { // gets all indexes in column given which column 
        if (!Number.isInteger(puzzle[i])) {
            unsolvedIndexes.push(i); // add i to array or something (unsolved indexes)
        }
    }
    return unsolvedIndexes;
}

// gets unsolved indexes in a row given an index of the row
function getRowUnsolved(rowIndex) {
    //var solvedValues = new Array();
    var unsolvedIndexes = new Array();
    for (var i = rowIndex * 9; i < (rowIndex * 9) + 9; i++) { // gets all indexes in row given which row 
        if (!Number.isInteger(puzzle[i])) {
            unsolvedIndexes.push(i); // add i to array or something (unsolved indexes)
        }
    }
    return unsolvedIndexes;
}

// gets unsolved indexes in a square given an index of the square
function getSquareUnsolved(squIndex) {
    //var solvedValues = new Array();
    var unsolvedIndexes = new Array();

    var indexes = new Array();
    var initialIndexes = new Array(0, 3, 6, 27, 30, 33, 54, 57, 60); // array of indexes of squares

    // gets indexes for the square with index squIndex
    for (var i = 0; i < 27; i = i + 9) {
        for (var j = 0; j < 3; j++) {
            indexes.push(initialIndexes[squIndex] + i + j);
        }
    }

    for (var i = 0; i < 9; i++) { // interates through indexes for indexes array 
        if (!Number.isInteger(puzzle[indexes[i]])) {
            unsolvedIndexes.push(indexes[i]); // add i to array unsolved indexes
        }
    }
    return unsolvedIndexes;
}

// gets solved indexes in a column given an index of the column
function getColumnSolved(colIndex) {
    var solvedIndexes = new Array();
    for (var i = colIndex; i < 81; i = i + 9) { // gets all indexes in column given which column 
        if (!Number.isInteger(puzzle[i])) {
            solvedIndexes.push(i); // add i to array or something (unsolved indexes)
        }
    }
    return solvedIndexes;
}

// gets solved indexes in a row given an index of the row
function getRowSolved(rowIndex) {
    var solvedIndexes = new Array();
    for (var i = rowIndex * 9; i < (rowIndex * 9) + 9; i++) { // gets all indexes in row given which row 
        if (!Number.isInteger(puzzle[i])) {
            solvedIndexes.push(i); // add i to array or something (unsolved indexes)
        }
    }
    return solvedIndexes;
}

// gets solved indexes in a square given an index of the square
function getSquareSolved(squIndex) {
    var solvedIndexes = new Array();

    var indexes = new Array();
    var initialIndexes = new Array(0, 3, 6, 27, 30, 33, 54, 57, 60); // array of indexes of squares

    // gets indexes for the square with index squIndex
    for (var i = 0; i < 27; i = i + 9) {
        for (var j = 0; j < 3; j++) {
            indexes.push(initialIndexes[squIndex] + i + j);
        }
    }

    for (var i = 0; i < 9; i++) { // interates through indexes for indexes array 
        if (!Number.isInteger(puzzle[indexes[i]])) {
            solvedIndexes.push(indexes[i]); // add i to array unsolved indexes
        }
    }
    return solvedIndexes;
}

// finds sets with single values in unsolved cell sets, and converts cell to solved
function findSinglePossiblities(unsolvedIndexes) {

    // loops through unsolved indexes
    for (var i = 0; i < unsolvedIndexes.length; i++) { 
        var currentSet = puzzle[unsolvedIndexes[i]];
        
        // if set only has one value, convert to solved cell
        if (currentSet.size == 1) {
            changeToSolved(unsolvedIndexes[i], puzzle[unsolvedIndexes[i]].values().next().value);
        }
    }
}

// find unique values in unsolved cell sets, and converts cell to solved
function findUniquePossiblities(unsolvedIndexes) {
    var counts = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var countsIndexes = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1);

    // loops through unsolved indexes
    for (var i = 0; i < unsolvedIndexes.length; i++) { 
        if (!Number.isInteger(puzzle[unsolvedIndexes[i]])) {
            var currentSet = puzzle[unsolvedIndexes[i]];
            var iteratorMaybe = currentSet.values();

            // loops through values in unsolved indexes
            for (var j = 0; j < currentSet.size; j++) { 
                var value = iteratorMaybe.next().value;
                counts[value - 1] = counts[value - 1] + 1; // increments count array
                countsIndexes[value - 1] = unsolvedIndexes[i]; // replace index with last value added to count array
            }
        }
    }


    for (var k = 0; k < 9; k++) {
        if (counts[k] == 1) {
            changeToSolved(countsIndexes[k], k + 1);
        }
    }
}

// given solved value, deletes that value from the possiblities in cell's row, column, and square
function deletePossibilities(cellIndex, value) {

    // given cell index, gets index of row/col/square
    var rowIndex = Math.floor(cellIndex / 9);
    var colIndex = Math.floor(cellIndex % 9);
    var squIndex = Math.floor((Math.floor(rowIndex / 3) * 3) + (colIndex / 3));
    
    // gets indexes of unsolved cells in row/col/square given index of row/col/square
    var rowUnsolved = getRowUnsolved(rowIndex);
    var colUnsolved = getColumnUnsolved(colIndex);
    var squUnsolved = getSquareUnsolved(squIndex);

    // iterates through unsolved cells in row
    for (var i = 0; i < rowUnsolved.length; i++) {

        // if set in unsolved cell hasn't already been solved and set contains value, deletes value
        if (!Number.isInteger(puzzle[rowUnsolved[i]]) && puzzle[rowUnsolved[i]].size > 1 && puzzle[rowUnsolved[i]].has(value)) { 
            puzzle[rowUnsolved[i]].delete(value);
        }
    }

    // iterates through unsolved cells in column
    for (var i = 0; i < colUnsolved.length; i++) {

        // if set in unsolved cell hasn't already been solved and set contains value, deletes value
        if (!Number.isInteger(puzzle[colUnsolved[i]]) && puzzle[colUnsolved[i]].size > 1 && puzzle[colUnsolved[i]].has(value)) { 
            puzzle[colUnsolved[i]].delete(value);
        }
    }

    // iterates through unsolved cells in square
    for (var i = 0; i < squUnsolved.length; i++) {

        // if set in unsolved cell hasn't already been solved and set contains value, deletes value
        if (!Number.isInteger(puzzle[squUnsolved[i]]) && puzzle[squUnsolved[i]].size > 1 && puzzle[squUnsolved[i]].has(value)) { 
            puzzle[squUnsolved[i]].delete(value);
        }
    }
}

// change cell from unsolved to solved -- replace set with value and removed from unsolved indices
function changeToSolved(cellIndex, value) {

    puzzle[cellIndex] = value; // removes set of possibilities at cell index and replaces with value

    unsolvedCellIndexes.delete(cellIndex); // deletes cell index from unsolvedCellIndexes set

    document.getElementById(cellIndex.toString()).value = value; // puts solved value onto DOM
    document.getElementById(cellIndex.toString()).classList.add("solved-value"); // adds css to solved cells

    deletePossibilities(cellIndex, value); // deletes value from possibilities in cell's rows, columns, and squares
}


