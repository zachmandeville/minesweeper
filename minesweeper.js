document.addEventListener('DOMContentLoaded', startGame)

var board = {'cells':[]};
var size = 6;
var maxbomb = 33;

function makeBoard(size, maxbomb){
    for (i = 0; i < size; i++)
	for (j = 0; j < size; j++)//This means within each i, you'll iterate through a bunch of j's.
	    board.cells.push({
		row: i,
		col: j,
		isMine: false,
		isMarked: false,
		hidden: true })
    makeBombs(maxbomb) }


function makeBombs(maxBomb){
    var numBombs = 0;
    while (numBombs < maxBomb) {
	var cell = board.cells[randomize()];
	if (cell.isMine)
	    continue;

	cell.isMine = true;
	numBombs += 1;
    }
}

function randomize(){
    var max = size * size;
    return Math.floor(Math.random() * max) }

function startGame () {
    makeBoard(size, maxbomb)
    for (var i = 0; i < board.cells.length; i++)
        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
    lib.initBoard()
    document.addEventListener('click',checkForWin)
    document.addEventListener('contextmenu', checkForWin) }

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
    for (var i = 0; i < board.cells.length; i++){
        if (board.cells[i].isMine && board.cells[i].isMarked == false)
            return;
        else if (board.cells[i].isMine == false  && board.cells[i].hidden)
            return; }
        lib.displayMessage('You win!'); }
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
// var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
    var count = 0;
    var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
    for (i = 0; i < surroundingCells.length; i++)
        if (surroundingCells[i].isMine == true)
	    count++;
    return count; }

