// fix nav title font

// update game each time puzzle updated - adding and removing stuff from puzzle
// user just needs to input numbers and clear spaces - game inputs bombs and more clear spaces
// double check that values in resize grid form have to be numbers, resonable numbers- not 100000000, and can reasonably fit on screen


// called when submitted
document.getElementById('grid-size-form').addEventListener('submit', resizeGrid);


// resets and resizes grid 
function resizeGrid() {
    event.preventDefault(); // prevent page from refreshing when submitted
    resetGrid();

    var width = document.getElementById("grid-width").value;
    var height = document.getElementById("grid-height").value; 
    var grid = document.getElementById("grid");

    console.log(grid.rows.length);

    // resizes number of columns
    for (var i = 0; i < grid.rows.length; i++) {
        var rowID = "row-" + i.toString();

        // if number of columns is less than width value, add column
        while (grid.rows[i].cells.length < width) {
            var row = document.getElementById(rowID);
            var cell = row.insertCell(grid.rows[i].cells.length);
            cell.innerHTML = "<input value='' id='width' type='text' class='validate'>";
            cell.setAttribute('id', 'col-' + grid.rows[i].cells.length);
        }

        // if number of columns is more than width value, delete column
        while (grid.rows[i].cells.length > width) {
            var cell = document.getElementById(rowID).deleteCell(grid.rows[i].cells.length - 1);
        }
    }

    // if number of rows is less than height value
    while (grid.rows.length < height) {
        var row = grid.insertRow(grid.rows.length);
        row.setAttribute('id', 'row-' + (grid.rows.length - 1));

        // insert same number of cells as first row
        while (grid.rows[0].cells.length > grid.rows[grid.rows.length - 1].cells.length) {
            var cell = row.insertCell(grid.rows[grid.rows.length - 1].cells.length);
            cell.innerHTML = "<input value='' id='width' type='text' class='validate'>";
            cell.setAttribute('id', 'col-' + grid.rows[i].cells.length);
        }
    }

    // if number of rows is more than height value
    while (grid.rows.length > height) {
        var row = grid.deleteRow(grid.rows.length - 1);
    }
} 

// resets values in grid 
function resetGrid() {

}
