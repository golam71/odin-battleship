import "../../css/placeShips.css";
import Ship from "../ship.js";

export default function placeShips() {
  return new Promise((resolve) => {
    document.body.classList.add("placeShips");
    let shipsArray = [];
    // Heading
    const heading = document.createElement("h1");
    heading.textContent = "Place Your Ships";
    document.body.appendChild(heading);

    // Orientation toggle
    let horizontal = true;
    const orientationBtn = document.createElement("button");
    orientationBtn.textContent = "Orientation: Horizontal";
    orientationBtn.className = "toggle-btn";
    orientationBtn.onclick = () => {
      horizontal = !horizontal;
      orientationBtn.textContent = `Orientation: ${
        horizontal ? "Horizontal" : "Vertical"
      }`;
    };
    document.body.appendChild(orientationBtn);

    // Dropdown
    const dropdown = document.createElement("div");
    dropdown.className = "custom-dropdown";

    const dropBtn = document.createElement("button");
    dropBtn.textContent = "Select Ship ▼";
    dropBtn.className = "dropdown-btn";
    dropdown.appendChild(dropBtn);

    const dropList = document.createElement("div");
    dropList.className = "dropdown-list";
    dropList.style.display = "none";
    dropdown.appendChild(dropList);
    document.body.appendChild(dropdown);

    const ships = [
      "Carrier",
      "Battleship",
      "Cruiser",
      "Destroyer",
      "Submarine",
    ];
    let selectedShip = null;

    ships.forEach((ship, index) => {
      const option = document.createElement("div");
      option.textContent = ship;
      option.className = "dropdown-option";
      option.onclick = () => {
        selectedShip = ship;
        dropBtn.textContent = `${ship} ▼`;
        dropList.style.display = "none";
      };
      dropList.appendChild(option);
      if (index === 0) option.click(); // default to first ship
    });

    dropBtn.onclick = () => {
      dropList.style.display =
        dropList.style.display === "block" ? "none" : "block";
    };

    // Table grid
    const table = document.createElement("table");
    for (let y = 0; y < 10; y++) {
      const tr = document.createElement("tr");
      for (let x = 0; x < 10; x++) {
        tr.appendChild(document.createElement("td"));
      }
      table.appendChild(tr);
    }
    document.body.appendChild(table);

    // Helpers
    function isPositionValid(x, y, length, orientation) {
      if (orientation === "Horizontal") {
        if (x + length > 10) return false;
        return [...Array(length)].every(
          (_, i) => !table.rows[y].cells[x + i].classList.contains("placed")
        );
      } else {
        if (y + length > 10) return false;
        return [...Array(length)].every(
          (_, i) => !table.rows[y + i].cells[x].classList.contains("placed")
        );
      }
    }

    function highlightCells(x, y, length, orientation) {
      document
        .querySelectorAll("td")
        .forEach((td) => td.classList.remove("hover"));
      if (orientation === "Horizontal") {
        for (let i = 0; i < length; i++)
          table.rows[y].cells[x + i].classList.add("hover");
      } else {
        for (let i = 0; i < length; i++)
          table.rows[y + i].cells[x].classList.add("hover");
      }
    }

    function placeShip(x, y, length, orientation, shipName) {
      if (orientation === "Horizontal") {
        for (let i = 0; i < length; i++) {
          table.rows[y].cells[x + i].classList.add("placed");
          table.rows[y].cells[x + i].innerText = shipName[0];
        }
      } else {
        for (let i = 0; i < length; i++) {
          table.rows[y + i].cells[x].classList.add("placed");
          table.rows[y + i].cells[x].innerText = shipName[0];
        }
      }
      // remove from dropdown
      [...dropList.childNodes].forEach((item) => {
        if (item.innerText === shipName) item.remove();
      });
      dropList.childNodes[0]?.click();
      if (dropList.childNodes.length === 0) {
        console.log("All placed");
        console.log(shipsArray);
        localStorage.setItem("shipdata", JSON.stringify(shipsArray));
        resolve();
      }
    }

    // Event listeners
    document.querySelectorAll("td").forEach((td) => {
      td.addEventListener("mouseleave", () => {
        document
          .querySelectorAll("td")
          .forEach((cell) => cell.classList.remove("hover"));
      });

      td.addEventListener("mouseover", (e) => {
        const x = e.target.cellIndex;
        const y = e.target.parentNode.rowIndex;
        const shipName = dropBtn.innerText.split(" ")[0];
        const orientation = horizontal ? "Horizontal" : "Vertical";
        const length = new Ship(shipName).length;
        if (isPositionValid(x, y, length, orientation)) {
          highlightCells(x, y, length, orientation);
        }
      });

      td.addEventListener("click", (e) => {
        const x = e.target.cellIndex;
        const y = e.target.parentNode.rowIndex;
        const shipName = dropBtn.innerText.split(" ")[0];
        const orientation = horizontal ? "Horizontal" : "Vertical";
        const length = new Ship(shipName).length;
        if (isPositionValid(x, y, length, orientation)) {
          shipsArray.push({ shipName, coords: { x, y }, orientation });
          placeShip(x, y, length, orientation, shipName);
        }
      });
    });
  });
}
