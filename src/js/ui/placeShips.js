import "../../css/placeShips.css";
import "../ship.js";
import Ship from "../ship.js";

export default function placeShips() {
  return new Promise(() => {
    document.body.classList.add("placeShips");

    const heading = document.createElement("h1");
    heading.textContent = "Place Your Ships";
    document.body.appendChild(heading);

    const orientationBtn = document.createElement("button");
    orientationBtn.textContent = "Orientation: Horizontal";
    orientationBtn.className = "toggle-btn";
    let horizontal = true;
    orientationBtn.onclick = () => {
      horizontal = !horizontal;
      orientationBtn.textContent =
        "Orientation: " + (horizontal ? "Horizontal" : "Vertical");
    };
    document.body.appendChild(orientationBtn);

    const dropdown = document.createElement("div");
    dropdown.className = "custom-dropdown";

    const dropBtn = document.createElement("button");
    dropBtn.textContent = "Select Ship ▼";
    dropBtn.className = "dropdown-btn";
    dropdown.appendChild(dropBtn);

    const dropList = document.createElement("div");
    dropList.className = "dropdown-list";
    dropList.style.display = "none";

    const ships = [
      "Carrier",
      "Battleship",
      "Cruiser",
      "Destroyer",
      "Submarine",
    ];
    let selectedShip = null;

    ships.forEach((ship) => {
      const option = document.createElement("div");
      option.textContent = ship;
      option.className = "dropdown-option";
      option.onclick = () => {
        selectedShip = ship;
        dropBtn.textContent = ship + " ▼";
        dropList.style.display = "none";
      };
      dropBtn.textContent = "Carrier" + " ▼";
      dropList.appendChild(option);
    });

    dropdown.appendChild(dropList);
    document.body.appendChild(dropdown);

    dropBtn.onclick = () => {
      dropList.style.display =
        dropList.style.display === "block" ? "none" : "block";
    };

    const table = document.createElement("table");
    for (let i = 0; i < 10; i++) {
      const tr = document.createElement("tr");
      for (let j = 0; j < 10; j++) {
        const td = document.createElement("td");
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    const div = document.createElement("div");
    div.appendChild(table);
    document.body.appendChild(div);

    // acual placement

    document.querySelectorAll("td").forEach((td) => {
      td.addEventListener("mouseover", () => {
        let shipName = document
          .getElementsByClassName("dropdown-btn")[0]
          .innerText.split(" ")[0];
        let orientation = document
          .getElementsByClassName("toggle-btn")[0]
          .innerText.split(" ")[1];

        //
        document.querySelectorAll("td").forEach((td) => {
          td.classList.remove("hover");
          td.classList.remove("hover-red");
        });

        switch (shipName) {
          case "Carrier":
          case "Battleship":
          case "Cruiser":
          case "Destroyer":
          case "Submarine": {
            function highlightCells(length, x, y, orientation) {
              const table = document.getElementsByTagName("table")[0];
              let outOfBounds = false;

              if (orientation === "Horizontal") {
                for (let i = 0; i < length; i++) {
                  if (!table.rows[x] || !table.rows[x].cells[y + i]) {
                    outOfBounds = true;
                    break;
                  }
                }
                for (let i = 0; i < length; i++) {
                  const cell = table.rows[x]?.cells[y + i];
                  if (cell) {
                    cell.classList.add(outOfBounds ? "hover-red" : "hover");
                  }
                }
              } else {
                for (let i = 0; i < length; i++) {
                  if (!table.rows[x + i] || !table.rows[x + i].cells[y]) {
                    outOfBounds = true;
                    break;
                  }
                }
                for (let i = 0; i < length; i++) {
                  const cell = table.rows[x + i]?.cells[y];
                  if (cell) {
                    cell.classList.add(outOfBounds ? "hover-red" : "hover");
                  }
                }
              }
            }

            let length = new Ship(shipName).length;
            let x = td.parentElement.rowIndex;
            let y = td.cellIndex;

            highlightCells(length, x, y, orientation);
            break;
          }
        }
      });
    });
  });
}
