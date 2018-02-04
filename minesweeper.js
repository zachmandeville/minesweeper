document.addEventListener('DOMContentLoaded', startGame)

//default values for board size and # of bombs
var board = {'cells':[]};
var size = 4;
var maxbomb = 4;

function startGame () {
// Make a board, for each non-mine display a number for surrounding mines.
    makeBoard(size)
    makeBombs(maxbomb);
    for (var i = 0; i < board.cells.length; i++){
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
    }
    lib.initBoard()
    document.addEventListener('click',checkForWin)
    document.addEventListener('contextmenu', checkForWin) 
} 

function makeBoard(size){
//create a new object within the cells array, holding 5 default values.
    for (var i = 0; i < size; i++){
	for (var j = 0; j < size; j++){  
	    board.cells.push({
		row: i,
		col: j,
		isMine: false,
		isMarked: false,
		hidden: true })
	}
    }
}

//    makeBombs(maxbomb)

function makeBombs(maxbomb){
    var numBombs = 0;
    while (numBombs < maxbomb) {
    var theCell = board.cells[randomize()];
	if (theCell.isMine == true){
	    continue;}
	theCell.isMine = true;
	numBombs++;
    }
}

function randomize(){
//Return a random whole number from 0 to max # of cells
    var max = size * size;
    return Math.floor(Math.random() * max);
}


function checkForWin () {
// Looks for a win condition then display 'You win!'
// Conditions are:
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
    for (var i = 0; i < board.cells.length; i++){
        if (board.cells[i].isMine && board.cells[i].isMarked == false)
            return;
        else if (board.cells[i].isMine == false  && board.cells[i].hidden)
            return; 
        lib.displayMessage('You win!'); }
}


// This function counts the number of mines around a cell
// (there could be as many as 8). 
function countSurroundingMines (cell) {
    var count = 0;
    var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);

    for (i = 0; i < surroundingCells.length; i++){
        if (surroundingCells[i].isMine == true)
	    count++; }

    return count;
}

