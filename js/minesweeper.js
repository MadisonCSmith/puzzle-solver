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
// make sure only enter numbers 1-6 in cell inputs
// make mobile friendly


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

// have undo button just in case of a mistake

// converts cell to cleared if clicked
function convertToCleared(id) {
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('cleared');
    cell.innerHTML = "<input class='cell-input' type='number'>";
    cell.setAttribute('onClick', "");

}

function convertToCleared(id) {
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('cleared');
    cell.innerHTML = "<input class='cell-input' type='number'>";
    cell.setAttribute('onClick', "");

}

function convertToFlagged(id) {
    event.preventDefault();
    var cell = document.getElementById(id);
    cell.classList.remove('unknown');
    cell.classList.add('flag');
    cell.setAttribute('onClick', "");
}




resizeGrid(); // calls function straight away to create grid - grid is initally empty
resizeGrid(); // I don't know why I have to put this a second time, but for some reason it only works if it's there twice
