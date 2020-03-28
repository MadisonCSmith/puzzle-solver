///////////
// to do //
///////////

// are some sudoku games bigger than others- be able to resize game - 16*16 instead of 9*9
// add reset button

///////////
///////////


var size = 9;

///////////
/// get data //
///////////

var test = document.getElementById('0');
var form = document.getElementById('puzzle');

// 
form.addEventListener('submit', function(event) {
    if (test.value && (test.value > 9 || test.value < 1)) {  // tests that if there's a value, value is between 1 and 9, pop up w error message if not
        alert("Please make sure all values are between 1 and 9.");
    }
    console.log(parseInt(test.value));
    event.preventDefault(); // keeps page from refreshing and erasing data
});


///////////
///////////

/*function solve() {
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
}*/