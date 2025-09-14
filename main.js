function createGameboard () {
    let player1 = "Player 1";
    let player2 = "Player 2";
    let grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    let inPlay = true;

    let player1Turn = true;

    let turnCounter = 0;

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

        grid.map((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                document.getElementById(`${rowIndex}-${colIndex}-input`)
                    .addEventListener("click", () => {
                        play(rowIndex, colIndex);
                    })
            })
        })
    }

    const play = (row, col) => {
        if (grid[row][col] === "" && inPlay) {
            grid[row][col] = player1Turn ? "X" : "O";
            if (checkForWin(player1Turn ? "X" : "O")) {
                celebrateWin(player1Turn ? player1 : player2)
                console.log("winnnnn");
            } else {
            changeTurn();
            }
            turnCounter++;
        }
        console.log(grid.map(row => [...row]));
        generateGrid();
        inPlay = true;
        console.log(turnCounter);
        if (turnCounter === 9) {
            celebrateWin("")
        }
    }

    const checkForWin = (mark) => {
        // check rows
        for (let row of grid) {
            if (row.every(cell => cell === mark)) return true;
        }

        // check columns
        for (let col = 0; col < 3; col++) {
            if (grid[0][col] === mark &&
                grid[1][col] === mark &&
                grid[2][col] === mark) return true;
        }

        // check diagonals
        if (grid[0][0] === mark && grid[1][1] === mark && grid[2][2] === mark) return true;
        if (grid[2][0] === mark && grid[1][1] === mark && grid[0][2] === mark) return true;

        return false;
    }

    const celebrateWin = (player) => {
        inPlay = false;
        document.getElementById("game-over").showModal();
        document.getElementById("game-over-msg").innerText = player ? `${player} has won!!!` : "Game ends in a Draw.";

        document.getElementById("new-game").addEventListener("click", () => {
            document.getElementById("game-over").close();
            document.getElementById("settings").showModal();
        })
    }

    const startGame = () => {
        grid = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]

        turnCounter = 0;

        player1Turn = true;

        inPlay = true;

        const player1Name = document.getElementById("player1Name");
        const player2Name = document.getElementById("player2Name");

        player1 = player1Name.value ? player1Name.value : player1;
        player2 = player2Name.value ? player2Name.value : player2;

        generateGrid();
        
        document.getElementById("settings").close();
    }

    // modal control
    document.getElementById("settings").showModal();
    document.getElementById("start-game").addEventListener("click", () => {
        startGame();
    })

    return { player1, player2, grid, player1Turn, play};
}


const gameboard = createGameboard();

