import "../../css/placeShips.css";
import Ship from "../ship.js";

export default function placeShips() {
  return new Promise(() => {
    document.body.classList.add("placeShips");

    const heading = Object.assign(document.createElement("h1"), {
      textContent: "Place Your Ships",
    });
    document.body.appendChild(heading);

    let horizontal = true;
    const orientationBtn = Object.assign(document.createElement("button"), {
      textContent: "Orientation: Horizontal",
      className: "toggle-btn",
      onclick() {
        horizontal = !horizontal;
        this.textContent = `Orientation: ${
          horizontal ? "Horizontal" : "Vertical"
        }`;
      },
    });
    document.body.appendChild(orientationBtn);

    const ships = [
      "Carrier",
      "Battleship",
      "Cruiser",
      "Destroyer",
      "Submarine",
    ];
    let selectedShip = ships[0];

    const dropdown = document.createElement("div");
    dropdown.className = "custom-dropdown";

    const dropBtn = Object.assign(document.createElement("button"), {
      textContent: `${selectedShip} ▼`,
      className: "dropdown-btn",
      onclick() {
        dropList.style.display =
          dropList.style.display === "block" ? "none" : "block";
      },
    });
    dropdown.appendChild(dropBtn);

    const dropList = document.createElement("div");
    dropList.className = "dropdown-list";
    dropList.style.display = "none";

    ships.forEach((ship) => {
      const option = Object.assign(document.createElement("div"), {
        textContent: ship,
        className: "dropdown-option",
        onclick() {
          selectedShip = ship;
          dropBtn.textContent = `${ship} ▼`;
          dropList.style.display = "none";
        },
      });
      dropList.appendChild(option);
    });

    dropdown.appendChild(dropList);
    document.body.appendChild(dropdown);

    const table = document.createElement("table");
    for (let i = 0; i < 10; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 10; j++) tr.appendChild(document.createElement("td"));
      table.appendChild(tr);
    }
    const container = document.createElement("div");
    container.appendChild(table);
    document.body.appendChild(container);

    function highlightCells(length, x, y, horizontal) {
      const cells = [];
      let outOfBounds = false;

      for (let i = 0; i < length; i++) {
        const cell = horizontal
          ? table.rows[x]?.cells[y + i]
          : table.rows[x + i]?.cells[y];
        if (!cell) {
          outOfBounds = true;
          break;
        }
        cells.push(cell);
      }

      cells.forEach((cell) => {
        cell.classList.add(outOfBounds ? "hover-red" : "hover");
      });
    }

    table.querySelectorAll("td").forEach((td) =>
      td.addEventListener("mouseover", () => {
        table.querySelectorAll("td").forEach((c) => {
          c.classList.remove("hover", "hover-red");
        });
        const length = new Ship(selectedShip).length;
        const x = td.parentElement.rowIndex;
        const y = td.cellIndex;
        highlightCells(length, x, y, horizontal);
      })
    );
  });
}
