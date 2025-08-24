import "../../css/loadui.css";
import Player from "../player.js";
import Ship from "../ship.js";

// Create global game objects
let player, computer;

// Precompute all coordinates for the computer to attack
const computerTargets = [];
for (let y = 0; y < 10; y++) {
  for (let x = 0; x < 10; x++) {
    computerTargets.push([x, y]);
  }
}

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(computerTargets);

function placeComputerShips() {
  const ships = ["Carrier", "Battleship", "Cruiser", "Destroyer", "Submarine"];

  ships.forEach((shipName) => {
    const ship = new Ship(shipName);
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";

      try {
        computer.gameboard.placeShip(ship, [x, y], orientation);
        placed = true;
      } catch (error) {
        // Try again if placement failed
      }
    }
  });
}

export default function loadui() {
  return new Promise((resolve) => {
    document.body.classList.add("ui");

    // Create player and computer objects
    const playerName = localStorage["name"] || "Player";
    player = new Player(playerName);
    computer = new Player("Computer");

    function createBoard(title, id) {
      const container = document.createElement("div");

      const heading = document.createElement("h1");
      heading.textContent = title;
      container.appendChild(heading);

      const table = document.createElement("table");
      table.id = id;
      for (let i = 0; i < 10; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < 10; j++) {
          const td = document.createElement("td");
          // Add click listener for computer board attacks
          if (id === "computerTable") {
            td.addEventListener("click", () => attackComputer(j, i));
          }
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      container.appendChild(table);

      // Simple info display
      const info = document.createElement("div");
      info.id = `${id}Info`;
      info.innerHTML = `<p>Ships: 5/5</p>`;
      container.appendChild(info);

      document.body.appendChild(container);
    }

    createBoard(playerName, "playerTable");
    createBoard("Computer", "computerTable");

    // Place player ships on gameboard from saved data
    const data = JSON.parse(localStorage["shipdata"]);

    data.forEach(({ shipName, coords, orientation }) => {
      const { x, y } = coords;
      const length = {
        Carrier: 5,
        Battleship: 4,
        Cruiser: 3,
        Destroyer: 2,
        Submarine: 1,
      }[shipName];
      const table = document.getElementById("playerTable");

      const ship = new Ship(shipName);
      const way = orientation.toLowerCase();
      player.gameboard.placeShip(ship, [x, y], way);

      // Update UI
      if (orientation === "Horizontal") {
        for (let i = 0; i < length; i++) {
          const cell = table.rows[y]?.cells[x + i];
          if (!cell) continue;
          cell.classList.add("placed");
          cell.innerText = shipName[0];
        }
      } else {
        for (let i = 0; i < length; i++) {
          const cell = table.rows[y + i]?.cells[x];
          if (!cell) continue;
          cell.classList.add("placed");
          cell.innerText = shipName[0];
        }
      }
    });

    // Place computer ships
    placeComputerShips();
    updateInfo();

    resolve();
  });
}

// Simple info update
function updateInfo() {
  const playerShips = countShips(player.gameboard);
  const computerShips = countShips(computer.gameboard);

  document.getElementById(
    "playerTableInfo"
  ).innerHTML = `<p>Ships: ${playerShips}/5</p>`;
  document.getElementById(
    "computerTableInfo"
  ).innerHTML = `<p>Ships: ${computerShips}/5</p>`;
}

function countShips(gameboard) {
  const ships = new Set();
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = gameboard.board[y][x];
      if (cell && typeof cell.hit === "function" && !cell.isSunk()) {
        ships.add(cell.name);
      }
    }
  }
  return ships.size;
}

// Attack functions
function attackComputer(x, y) {
  const computerTable = document.getElementById("computerTable");
  const cell = computerTable.rows[y].cells[x];

  if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

  computer.gameboard.receiveAttack([x, y]);
  const cellData = computer.gameboard.board[y][x];

  if (cellData?.status === "hit") {
    cell.classList.add("hit");
    cell.innerText = "🚢";
    cell.style.backgroundColor = "red";

    if (computer.gameboard.allShipsSunk()) {
      setTimeout(() => {
        document.getElementById(
          "computerTableInfo"
        ).innerHTML = `<p>Ships: 0/5</p>`;
        if (confirm("You won! Play again?")) location.reload();
      }, 100);
      return;
    }
  } else {
    cell.classList.add("miss");
    cell.innerText = "🌊";
    cell.style.backgroundColor = "lightblue";
  }

  updateInfo();

  // Computer's turn
  setTimeout(computerAttack, 500);
}

function computerAttack() {
  if (computerTargets.length === 0) return; // all cells attacked

  const [x, y] = computerTargets.pop();
  const playerTable = document.getElementById("playerTable");
  const cell = playerTable.rows[y].cells[x];

  player.gameboard.receiveAttack([x, y]);
  const cellData = player.gameboard.board[y][x];

  if (cellData?.status === "hit") {
    cell.classList.add("hit");
    cell.style.backgroundColor = "red";

    if (player.gameboard.allShipsSunk()) {
      document.getElementById(
        "playerTableInfo"
      ).innerHTML = `<p>Ships: 0/5</p>`;
      setTimeout(() => {
        if (confirm("Computer won! Play again?")) location.reload();
      }, 100);
      return;
    }
  } else {
    cell.classList.add("miss");
    cell.style.backgroundColor = "lightblue";
  }

  updateInfo();
}
