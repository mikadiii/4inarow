"use strict";

var player = 'X';
var columns;
var boxes;

//<NOTES>
/*
currently working 
*/
//</NOTES>




// executes when html has finished loading
document.addEventListener("DOMContentLoaded", function () {									
	columns = document.getElementsByClassName('col');
	for (let i = 0; i < columns.length; i++) {
		columns[i].addEventListener('click', (event) => {
			var isValid = false;
			for (let i = 5; i > -1; i--) {
				if (event.target.parentNode.children[i].innerText !== '') {
					continue;
				} else {
					event.target.parentNode.children[i].innerText = player;					//"set" a field
					isValid = true;
					switch (player) {														//change text color
						case "X":
							event.target.parentNode.children[i].classList.add('playerX');
							//console.log
							break;
						case "O":
							event.target.parentNode.children[i].classList.add('playerO');
							break;
						default:
							event.target.parentNode.children[i].className = "box";
							break;
					}
					break;
				}
			}
			if (isValid) {																	//change current player
				if (player === 'X') {
					player = 'O';
				} else {
					player = 'X';
				}
			}
			checkWinner();
		});
	}
});

function checkWinner() {
	for (let i = 0; i < columns.length; i++) {						//winner columns
		checkWinnerCol(i);
	}
	for (let i = 0; i < 6; i++) {									//winner rows
		checkWinnerRow(i);
	}

	checkWinnerDia1(0, 0, 6);											//winner diagonal upperleft->lowerright
	checkWinnerDia1(1, 0, 6);
	checkWinnerDia1(2, 0, 5);
	checkWinnerDia1(3, 0, 4);
	checkWinnerDia1(0, 1, 5);
	checkWinnerDia1(0, 2, 4);

	checkWinnerDia2(6, 0, 6);											//winner diagonal upperright->lowerleft
	checkWinnerDia2(5, 0, 6);
	checkWinnerDia2(4, 0, 5);
	checkWinnerDia2(3, 0, 4);
	checkWinnerDia2(6, 1, 5);
	checkWinnerDia2(6, 2, 4);

	checkEnd(); 													//all fields filled

	function checkWinnerCol(colNumber) {
		var field;
		var possibleWinner;
		var count;
		for (let i = 0; i < 6; i++) {
			field = columns[colNumber].children[i].innerText;
			if (possibleWinner === field && field !== "") {
				count++
			} else {
				possibleWinner = field;
				count = 1;
			}
			if (count === 4) {
				markBoxes("c", colNumber, i, possibleWinner);
				Winner(possibleWinner);
			}
		}
	}

	function checkWinnerRow(rowNumber) {
		var field;
		var possibleWinner;
		var count;
		for (let i = 0; i < 7; i++) {
			field = columns[i].children[rowNumber].innerText;
			if (possibleWinner === field && field !== "") {
				count++
			} else {
				possibleWinner = field;
				count = 1;
			}
			if (count === 4) {
				markBoxes("r", i, rowNumber, possibleWinner);
				Winner(possibleWinner);
			}
		}
	}


	function checkWinnerDia1(x, y, limit) {
		let field;
		let possibleWinner;
		let count;
		for (let i = 0; i < limit; i++) {
			field = columns[x].children[y].innerText;
			if (possibleWinner === field && field !== "") {
				count++
			} else {
				possibleWinner = field;
				count = 1;
			}
			if (count === 4) {
				markBoxes("1", x, y, possibleWinner);
				Winner(possibleWinner);
			}
			x++;
			y++;
		}
	}

	function checkWinnerDia2(x, y, limit) {
		let field;
		let possibleWinner;
		let count;
		for (let i = 0; i < limit; i++) {
			field = columns[x].children[y].innerText;
			if (possibleWinner === field && field !== "") {
				count++
			} else {
				possibleWinner = field;
				count = 1;
			}
			if (count === 4) {
				markBoxes("2", x, y, possibleWinner);
				Winner(possibleWinner);
			}
			x--;
			y++;
		}
	}

	function checkEnd() {
		let i;
		let full = true;
		for (i = 0; i < 7; i++) {
			if (columns[i].children[0].innerText === "") {
				full = false;
			}
		}
		if (full) { End(); }
	}

	function End() {
		alert("HOW DARE YOU")
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 6; y++) {
				columns[x].children[y].innerText = "";
				player = "X";
			}
		}
	}

	function markBoxes(type, var1, var2, winner) { 								//highlight the four tiles that are in a row
		let i;
		for (i = 0; i < 4; i++) {
			columns[var1].children[var2].className = "box"
			columns[var1].children[var2].classList.add("winner" + winner);
			switch (type) {
				case "c":
					var2--;
					break;
				case "r":
					var1--;
					break;
				case "1":
					var1--;
					var2--;
					break;
				case "2":
					var1++;
					var2--;
				default:
					break;
			}
		}
	}

	function Winner(name) {
		alert("Winner: " + name)
		for (let x = 0; x < 7; x++) {
			for (let y = 0; y < 6; y++) {
				columns[x].children[y].innerText = "";
				columns[x].children[y].className = "box";
				player = "X";
			}
		}
	}
}

