// fix nav title font

// update game each time puzzle updated - adding and removing stuff from puzzle
// user just needs to input numbers and clear spaces - game inputs bombs and more clear spaces
// double check that values in resize grid form have to be numbers, resonable numbers- not 100000000


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

    // if number of columns is less than width value
    while (grid.rows[0].cells.length < width) {
        for (var i = 0; i < grid.rows.length; i++) {
            var row = document.getElementById('1');
        }
    }

    // if number of rows is less than height value
    while (grid.rows.length < height) {
        var row = grid.insertRow(0);

        var test = row.insertCell(0);

        test.innerHTML = "a;lskjf";

        var tes = row.insertCell(1);

        tes.innerHTML = "kjf";

        var tes = row.insertCell(2);

        tes.innerHTML = "<input value='' id='width' type='text' class='validate'>";
    }

    console.log(grid.rows.length);
} 

// resets values in grid 
function resetGrid() {

}
