
// double check that values in resize grid form have to be numbers, resonable numbers- not 100000000, and can reasonably fit on screen
// do fancy css stuff so it actually looks good
// switch height and width on resize form?
// make puzzle always square 
// make sure only enter numbers 1-8 in cell inputs - no zeros
// make mobile friendly
// write good readMe - for recruiters
// have undo button just in case of a mistake  ---------- wait - right now not worth effort ------------
// add some animation when flagging/clearing so people can see difference more easily
// convert colors to classic gray with black and white (probs will have to add a little color for usability) -- goes better with color scheme
// set default size to 9*9 or some other classic easy puzzle size
// remember game size settings - if want to play multiple games -- don't want to have to reset every game
// easier way to input numbers- pain in the ass to keep entering and entering and entering numbers
// make squares/puzzle stay the same size and in a square the whole time
// what if someone wants change number in square (makes mistake) - should redo entire puzzle with each new entry OR have undo buttons (which will also be good for when things are mistakenly cleared)
// should have undo button (in case clears cell accidently)
// cells that change status through logic should fade transition to new color
// should have logics in place to make sure possible -- something isn't cleared that shouldn't be 
// don't want to ahve to click twice to enter and clear number - make it one click
// if one cell has a logical domino effect (a number placed in one cell allows you to find another cell, which allows you to find another cell, etc.) -- should be found all at once - shouldn't take multiple clicks on body to get all of them
// move reset game button from underneath form to under game -- automatically reset game when changing dimensions
// when click on numbers in resize inputs - should hightlight number automatically so easier to delete
// maybe instead of alert, do red text and set number back to original value


///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// Game Sizing ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

var width = 9;
var height = 9;

// calls resize function when reset button is clicked
document.getElementById('puzzle').addEventListener('submit', function() { 
    event.preventDefault(); // prevent page from refreshing when submitted
    resetGrid();
});

// resets and resizes grid 
function resizeGrid() {
    //resetGrid(); // maybe instead of resetting each cell, just delete and recreate puzzle in new size
    if (document.getElementById("grid-width").value > 1 && document.getElementById("grid-width").value <= 30) {
        width = document.getElementById("grid-width").value;
        document.getElementById("width-error").innerHTML ="";
    } else {
        document.getElementById("width-error").innerHTML = "Values must be between 2 and 30.";
        document.getElementById("grid-width").value = width;
    }

    if (document.getElementById("grid-height").value > 1 && document.getElementById("grid-height").value <= 30) {
        height = document.getElementById("grid-height").value; 
        document.getElementById("height-error").innerHTML ="";
    } else {
        document.getElementById("height-error").innerHTML ="Values must be between 2 and 30."
        document.getElementById("grid-height").value = height;
    }

    var grid = document.getElementById("grid");

    // resizes number of columns
    for (var i = 0; i < grid.rows.length; i++) {
        var rowID = "row-" + i.toString();

        // if number of columns is less than width value, add column
        while (grid.rows[i].cells.length < width) {
            var row = document.getElementById(rowID);
            var cell = row.insertCell(grid.rows[i].cells.length);
            createNewCell(cell, i + '-' + (grid.rows[i].cells.length - 1));
        }

        // if number of columns is more than width value, delete column
        while (grid.rows[i].cells.length > width) {
            var cell = document.getElementById(rowID).deleteCell(grid.rows[i].cells.length - 1);
        }
    }

    // if number of rows is less than height value, add row
    while (grid.rows.length < height) {
        var row = grid.insertRow(grid.rows.length);
        row.setAttribute('id', 'row-' + (grid.rows.length - 1));

        // insert same number of cells as first row into new row
        var cellColIndex = 0;
        while (grid.rows[0].cells.length > grid.rows[grid.rows.length - 1].cells.length) {
            var cell = row.insertCell(grid.rows[grid.rows.length - 1].cells.length);
            createNewCell(cell, grid.rows.length - 1 + '-' + cellColIndex);
            cellColIndex++;
        }
    }

    // if number of rows is more than height value
    while (grid.rows.length > height) {
        var row = grid.deleteRow(grid.rows.length - 1);
    }
} 

// applies given id, classes, and other attributes to new cells
function createNewCell(cell, id) {
    cell.setAttribute('class', "unknown");
    cell.setAttribute('id', id);
    cell.setAttribute('onClick', "convertToCleared(this.id)");
    if ((parseInt(id.substring(0, 2)) + parseInt(id.substring(id.length - 2, id.length))) % 2 == 0) {
        cell.className += " light";
    } else {
        cell.className += " dark";
    }
}

// resets values in grid 
function resetGrid() {
    console.log("reset grid")
    var grid = document.getElementById("grid");
    if (grid.rows.length > 0) {
        var row = grid.rows.length;
        var col = grid.rows[0].cells.length;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                convertToUnsolved(i + "-" + j);
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// Game Logic ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

 // called whenever body of DOM is clicked, applies game logic
 function gameLogic() { // call on click on puzzle
    console.log("game logic");

    resizeGrid(); // resize grid each time if necessary
    
    // runs through every cell
    for (var i = 0; i < grid.rows.length; i++) {
        for (var j = 0; j < grid.rows[i].cells.length; j++) {
            var id = i + "-" + j;/////////////////////////////////////////
            var cell = document.getElementById(id);

            // if cleared cell with a number in it
            if (cell.className.includes("cleared") && cell.children[0].value != "") { //////////////////////// might have to change this if attach image to flagged cells
                console.log("apparently cleared with number");
                // get value of cell
                var cellValue = cell.childNodes[0].value;

                // get flagged/unknown counts of surrounding cells
                var surroundingCells = getSurroundingCells(id);

                // create array to track # unknown cells, # flagged cells
                var counter = [0,0];

                // runs through all surrounding cells, determines if unknown or flagged cell and increments counter accordingly
                surroundingCells.forEach(function(element){

                    // if unknown, increment # unknown
                    if (element.className.includes("unknown")) {
                        counter[0] = counter[0] + 1;

                    // if flagged, increment # flagged
                    } else if (element.className.includes("flag")) {
                        counter[1] = counter[1] + 1; 
                    }
                });

                // if number of flagged cells equals value in cell AND number of unknown cells is greater than 0
                if ((cellValue == counter[1]) && counter[0] > 0) {
                    // convert all unknown surrounding cells to cleared
                    clearUnknownCells(id)
                }


                // if number of unknown cells is equals to the difference between the value in cell and the number of flagged cells
                if ((cellValue - counter[1]) == counter[0]) {
                    // convert all unknown surrounding cells to flagged
                    flagUnknownCells(id);
                }
            }

            // adds border around cleared and uncleared areas
            if (cell.className.includes("cleared")) {
                console.log(cell);
                if (j < grid.rows[i].cells.length - 1 && (document.getElementById(i + "-" + (j + 1)).className.includes("unknown") || document.getElementById(i + "-" + (j + 1)).className.includes("flag"))) {
                    cell.classList.add('border-right');
                } else {
                    cell.classList.remove('border-right');
                }

                if (j > 0 && (document.getElementById(i + "-" + (j - 1)).className.includes("unknown") || document.getElementById(i + "-" + (j - 1)).className.includes("flag"))) {
                    cell.classList.add('border-left');
                } else {
                    cell.classList.remove('border-left');
                }

                if (i < grid.rows.length - 1 && (document.getElementById((i + 1) + "-" + j).className.includes("unknown") || document.getElementById((i + 1) + "-" + j).className.includes("flag"))) {
                    cell.classList.add('border-bottom');
                } else {
                    cell.classList.remove('border-bottom');
                }

                if (i > 0 && (document.getElementById((i - 1) + "-" + j).className.includes("unknown") || document.getElementById((i - 1) + "-" + j).className.includes("flag"))) {
                    cell.classList.add('border-top');
                } else {
                    cell.classList.remove('border-top');
                }
            }
        }
    }
}

// converts cell with given id to cleared
function convertToCleared(id) {
    console.log("convert to cleared");
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('cleared');
    cell.innerHTML = "<input class='cell-input' type='number'>";
    cell.setAttribute('onClick', "");
}

// converts cell with given id to flagged
function convertToFlagged(id) {
    console.log("convert to flagged");
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('flag');
    cell.setAttribute('onClick', "");
}

// converts cell with given id to flagged
function convertToUnsolved(id) {
    console.log("convert to unsolved");
    event.preventDefault();
    var cell = document.getElementById(id);
    if (cell.className.includes('flag')) {
        cell.classList.remove('flag');
    }
    if (cell.className.includes('cleared')) {
        cell.classList.remove('cleared');
    }
    cell.classList.add('unknown');
    cell.setAttribute('onClick', "convertToCleared(this.id)");
}


// converts all surrounding unknown cells to cleared ////////////////////////////// not finished
function clearUnknownCells(id) {
    console.log("clear unknown cells");
    // gets surrounding cells
    var surroundingCells = getSurroundingCells(id);

    // runs through all surrounding cells
    surroundingCells.forEach(function(element){

        // if unknown cell, convert to cleared
        if (element.className.includes("unknown")) {
            convertToCleared(element.id);
        }
    });
}

// converts all surrounding unknown cells to flagged 
function flagUnknownCells(id) {
    console.log("flag unknown cells");
    // gets surrounding cells
    var surroundingCells = getSurroundingCells(id);

    // runs through all surrounding cells
    surroundingCells.forEach(function(element){
        if (element.className.includes("unknown")) {
            convertToFlagged(element.id);
        }
    });
}


// returns array of surrounding cells given cell id  /////////////////////// returns null values /////////
function getSurroundingCells(id) {
    console.log("get surrounding cells");
    // array of surrounding cells
    var surroundingCells = new Array();

    // get row and column values
    var row = parseInt(id.substring(0, 2));
    var col = parseInt(id.substring(id.length - 2));
    if (col < 1) { // parseInt sometimes reads dashes (1-1) as -1 instead of 1 -- reverses negative sign
        col = col * -1;
    }

    // run through all surrounding cells
    if (0 < col) { // if not in first column, look at cell one to the left
        surroundingCells.push(document.getElementById(row + "-" + (col - 1)))
    }

    if (0 < col && 0 < row) { // if not in first column or row, look at cell one left and one above
        surroundingCells.push(document.getElementById((row - 1) + "-" + (col - 1)));
    }

    if (0 < col && (row + 1) < grid.rows.length) { // if not in first column or last row, look at cell one left and one below
        surroundingCells.push(document.getElementById((row + 1) + "-" + (col - 1)));
    }

    if ((col + 1) < grid.rows[0].cells.length) { // if not in the last column, look at cell to the right
        surroundingCells.push(document.getElementById(row + "-" + (col + 1)));
    }

    if ((col + 1) < grid.rows[0].cells.length && 0 < row) { // if not in last column or first row, look at cell one right and one up
        surroundingCells.push(document.getElementById((row - 1) + "-" + (col + 1)));
    }

    if ((col + 1) < grid.rows[0].cells.length && (row + 1) < grid.rows.length) { // if not in last column or last row, look at cell one down and one right
        surroundingCells.push(document.getElementById((row + 1) + "-" + (col + 1)));
    }

    if ((row + 1) < grid.rows.length) { // if not in last row, look at cell one down
        surroundingCells.push(document.getElementById((row + 1) + "-" + col));
    }

    if (0 < row) { // if not in first row, lok at cell one up
        surroundingCells.push(document.getElementById((row - 1) + "-" + col));
    }

    return surroundingCells;
}



resizeGrid(); // calls function straight away to create grid - grid is initally empty
resizeGrid(); // I don't know why I have to put this a second time, but for some reason it only works if it's there twice
