// fix nav title font

// update game each time puzzle updated - adding and removing stuff from puzzle
// user just needs to input numbers and clear spaces - game inputs bombs and more clear spaces
// double check that values in resize grid form have to be numbers, resonable numbers- not 100000000, and can reasonably fit on screen
// replace red color with bombs
// do click modes - 
// do color crisscrossed patterns like in other games
// have input field for number of bombs if present in other games
// do fancy css stuff so it actually looks good
// center input fields in resize grid form
// switch height and width on resize form?
// make puzzle always square 
// make sure only enter numbers 1-6 in cell inputs - no zeros
// make mobile friendly
// write good readMe - for recruiters
// maybe could optimize so instead of running through every known cell with number- just cells surrounding unknown cells - recursively - or maybe recursive method would make runtime too long
// have undo button just in case of a mistake

// calls resize function when resize form submitted
document.getElementById('grid-size-form').addEventListener('submit', function() { 
    event.preventDefault(); // prevent page from refreshing when submitted
    resizeGrid();
});

// resets and resizes grid 
function resizeGrid(width, height) {
    resetGrid();

    var width = document.getElementById("grid-width").value;
    var height = document.getElementById("grid-height").value; 
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

}

 // called whenever body of DOM is clicked, applies game logic
 function gameLogic() { // call on click on puzzle

    // runs through every cell
    for (var i = 0; i < grid.rows.length; i++) {
        for (var j = 0; j < grid.rows[i].cells.length; j++) {
            var id = i + "-" + j;
            var cell = document.getElementById(id);

            // if known with a number in it
            if (cell.childNodes.length > 0) { //////////////////////// might have to change this if attach image to flagged cells

                // get value of cell
                var cellValue = cell.childNodes[0].value;

                // get flagged/unknown counts of surrounding cells
                var counts = countSurroundingCells(id);

                // if number of flagged cells equals value in cell AND number of unknown cells is greater than 0
                if ((cellValue == counts[1]) && counts[0] > 0) {
                    // convert all unknown surrounding cells to cleared
                    clearUnknownCells(id)
                }


                // if number of unknown cells is equals to the difference between the value in cell and the number of flagged cells
                if ((cellValue - counts[1]) == counts[0]) {
                    // convert all unknown surrounding cells to flagged

                }
            }

        }
    }
}

// converts cell to cleared if clicked
function convertToCleared(id) {
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('cleared');
    cell.innerHTML = "<input class='cell-input' type='number'>";
    cell.setAttribute('onClick', "");
}

// converts cell with given id to flagged
function convertToFlagged(id) {
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('flag');
    cell.setAttribute('onClick', "");
}

// takes id of cell, counts number of flagged and unknown cells surrounding a cell
function countSurroundingCells(id) {
    // get row and column values
    var row = parseInt(id.substring(0, 2));
    var col = parseInt(id.substring(id.length - 2));
    if (col < 1) { // parseInt sometimes reads dashes (1-1) as -1 instead of 1 -- reverses negative sign
        col = col * -1;
    }

    var surroundingCells = getSurroundingCells(id);

    // create array tracks # unknown cells, # flagged cells
    var counter = [0,0];

    // run through all surrounding cells
    counter = surroundingCells.forEach(element => ifUnknownFlagged(element, counter));

    return counter;        
}

// take cell element and tracker, determines if unknown or flagged cell and increments tracker accordingly
function ifUnknownFlagged(cell, counter) {

    // if unknown, increment # unknown
    if (cell.className.includes("unknown")) {
        counter[0]++;

    // if flagged, increment # flagged
    } else if (cell.className.includes("flag")) {
        counter[1]++
    }
    return counter;
}

// converts all surrounding unknown cells to cleared ////////////////////////////// not finished
function clearUnknownCells(id) {
    // gets surrounding cells
    var surroundingCells = getSurroundingCells(id);

    // runs through all surrounding cells
    surroundingCells.forEach(element => function() {
        if (element.className.includes("unknown")) {
            console.log(element);
        }
    });
}

// converts all surrounding unknown cells to flagged ////////////////////////////// not finished
function flagUnknownCells(id) {
    // gets surrounding cells
    var surroundingCells = getSurroundingCells(id);

    // runs through all surrounding cells
    surroundingCells.forEach(element => function() {
        if (element.className.includes("flag")) {
            console.log(element);
        }
    });
}


// returns array of surrounding cells given cell id
function getSurroundingCells(id) {

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

    if (0 < col && row < grid.rows[0].cells.length) { // if not in first column or last row, look at cell one left and one below
        surroundingCells.push(document.getElementById((row + 1) + "-" + (col - 1)));
    }

    if (col < grid.rows.length) { // if not in the last column, look at cell to the right
        surroundingCells.push(document.getElementById(row + "-" + (col + 1)));
    }

    if (col < grid.rows.length && 0 < row) { // if not in last column or first row, look at cell one right and one up
        surroundingCells.push(document.getElementById((row - 1) + "-" + (col + 1)));
    }

    if (col < grid.rows.length && row < grid.rows[0].cells.length) { // if not in last column or last row, look at cell one down and one right
        surroundingCells.push(document.getElementById((row + 1) + "-" + (col + 1)));
    }

    if (row < grid.rows[0].cells.length) { // if not in last row, look at cell one down
        surroundingCells.push(document.getElementById((row + 1) + "-" + col));
    }

    if (0 < row) { // if not in first row, lok at cell one up
        surroundingCells.push(document.getElementById((row - 1) + "-" + col));
    }

    return surroundingCells;
}


resizeGrid(); // calls function straight away to create grid - grid is initally empty
resizeGrid(); // I don't know why I have to put this a second time, but for some reason it only works if it's there twice
