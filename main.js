function createGameboard (player1="player1", player2="player2") {
    const grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    let enablePlay = true;

    let player1Turn = true;

    const changeTurn = () => {
        player1Turn = !player1Turn;
    }

    const generateGrid = () => {
        const tttGrid = document.getElementById("ttt-grid");
        tttGrid.innerHTML = grid.reduce((acc1, row, rowIndex) => {
            acc1 += row.reduce((acc2, col, colIndex) => {
                acc2 += `
                <button id="${rowIndex}-${colIndex}-input">${grid[rowIndex][colIndex]}</button>
                `
                return acc2
            }, "")
            return acc1;
        }, "")
    }

    const play = (row, col) => {
        if (grid[row][col] === "" && enablePlay) {
            grid[row][col] = player1Turn ? "X" : "O";
            if (checkForWin(player1Turn ? "X" : "O")) {
                celebrateWin(player1Turn ? player1 : player2)
            } else {
            changeTurn();
            }
        }
        console.log(grid.map(row => [...row]));
        generateGrid();
    }

    const checkForWin = (mark) => {
        grid.forEach(row => {
            if (row.every(cell => cell === mark)) {
                return true;
            }
        })

        for (let col = 0; col < 3; col++) {
            if (grid[0][col] === mark &&
                grid[1][col] === mark &&
                grid[2][col] === mark) {
                    return true;
                }
        }

        if (grid[0][0] === mark && grid[1][1] === mark && grid[2][2] === mark) {
            return true;
        }

        if (grid[2][0] === mark && grid[1][1] === mark && grid[0][2] === mark) {
            return true;
        }

        return false;
    }

    const celebrateWin = (player) => {
        enablePlay = false
    }


    return { player1, player2, grid, player1Turn, play};
}


const gameboard = createGameboard();
console.log(gameboard);
gameboard.play(0, 0);
gameboard.play(1, 0);
gameboard.play(1, 0);
gameboard.play(1, 1);
gameboard.play(2, 0);
gameboard.play(2, 2);
gameboard.play(0, 2);