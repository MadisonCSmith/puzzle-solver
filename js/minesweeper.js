///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// To Do ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

// do fancy css stuff so it actually looks good
// make mobile friendly
// write good readMe - for recruiters
// have undo button just in case of a mistake  ---------- wait - right now not worth effort ------------
// if one cell has a logical domino effect (a number placed in one cell allows you to find another cell, which allows you to find another cell, etc.) -- should be found all at once - shouldn't take multiple clicks on body to get all of them
// organize css file - look up how to
// make it so grid size 2*22 isn't scrolling
// get rid of console logs
// fix the jumping around on input focus when new cells cleared/flagged
// delete random comments/commented out code
// edit text



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
        document.getElementById("height-error").innerHTML ="Grid dimensions must be between 2 and 30."
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
                id = i + "-" + j;
                convertToUnsolved(id);
                document.getElementById(id).classList.remove('border-left');
                document.getElementById(id).classList.remove('border-right');
                document.getElementById(id).classList.remove('border-top');
                document.getElementById(id).classList.remove('border-bottom');
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// Game Logic ////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////

// keeps calling game logic while progress is being made (cells cleared or flagged) - helps dominio effect
var makeProgress = false; // 

 // called whenever body of DOM is clicked, applies game logic
 function gameLogic() { // call on click on puzzle
    console.log("game logic");

    resizeGrid(); // resize grid each time if necessary

    makeProgress = false; // resets to false each time gameLogic method called 
    
    // runs through every cell
    for (var i = 0; i < grid.rows.length; i++) {
        for (var j = 0; j < grid.rows[i].cells.length; j++) {
            var id = i + "-" + j;
            var cell = document.getElementById(id);

            // if cleared cell with a number in it than is between 1 and number of unknown cells
            if (cell.className.includes("cleared") && cell.children[0].value != "") { 
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

                // if value in cell is not between 1 and number of unknown + flagged cells
                if (cell.className.includes("cleared") && cell.children[0].value != "" && (cell.children[0].value > (counter[0] + counter[1]) || cell.children[0].value < 0)) {
                    console.log("weird value in cell");
                    console.log(counter[0] + " is more than " + cell.children[0].value);

                    document.getElementById("value-error").innerHTML ="Cell values must be between 1 and the number of unknown and flagged cells surrounding each cell."
                    cell.classList.add("error-cell");

                // if value in cell is between 1 and number of unknown cells
                } else {
                    cell.classList.remove("error-cell");
                    document.getElementById("value-error").innerHTML ="";


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

            // goes through logic again as long as cells keep getting cleared/flagged
            if (makeProgress == true) {
                console.log("made progress is true");
                gameLogic();
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
    cell.firstChild.setAttribute("onclick", "this.select()");
    cell.firstChild.focus(); // causes text cursor to occur when cell is cleared
    makeProgress = true; // resets to true if cell cleared - keeps track if game logic needs to be called again
}

// converts cell with given id to flagged
function convertToFlagged(id) {
    console.log("convert to flagged");
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('flag');
    cell.setAttribute('onClick', "");
    makeProgress = true; // resets to true if cell cleared - keeps track if game logic needs to be called again
}

// converts cell with given id to unsolved
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

    cell.innerHTML = ""; // removed input field from cell
    cell.classList.add('unknown');
    cell.setAttribute('onClick', "convertToCleared(this.id)");
}


// converts all surrounding unknown cells to cleared
function clearUnknownCells(id) {
    console.log("clear unknown cells");

    // gets surrounding cells
    var surroundingCells = getSurroundingCells(id);

    // runs through all surrounding cells
    surroundingCells.forEach(function(element){

        // if unknown cell, convert to cleared
        if (element.className.includes("unknown")) {
            element.classList.add("transition");
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
            element.classList.add("transition");
            convertToFlagged(element.id);
        }
    });
}


// returns array of surrounding cells given cell id 
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

    if (0 < row) { // if not in first row, look at cell one up
        surroundingCells.push(document.getElementById((row - 1) + "-" + col));
    }

    return surroundingCells;
}



resizeGrid(); // calls function straight away to create grid - grid is initally empty
resizeGrid(); // I don't know why I have to put this a second time, but for some reason it only works if it's there twice
