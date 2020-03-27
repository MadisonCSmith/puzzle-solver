///////////
// to do //
///////////

// are some sudoku games bigger than others- be able to resize game - 16*16 instead of 9*9
// add reset button

///////////
///////////


var size = 9;

///////////
/// data //
///////////



// for (var i = 0; i < data.length; i++) { 
//     var possibilities = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

//     data[i] = [newSet];  
// } 


///////////
///////////

function solve() {
    readData();
}

function readData() {
    data = new Array(size);

    for (var i = 0; i < data.length; i++) { 
        data[i] = new Array(size); 
    } 
    console.log(data);
}


function validateForm() { // fix to be on screen and highlight problem boxes in red
    var x = document.forms["sudoku-grid"]["1-1"].value;
    if (x != '' && (x < 1 || x > 9)) {
      alert("Numbers must between 1 and 9.");
      return false;
    }
}