import "../../css/loadui.css";

export default function loadui() {
  return new Promise((resolve) => {
    document.body.classList.add("ui");

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
          tr.appendChild(document.createElement("td"));
        }
        table.appendChild(tr);
      }
      container.appendChild(table);

      const info = document.createElement("p");
      info.textContent = `${title} Data`;
      container.appendChild(info);

      document.body.appendChild(container);
    }

    const playerName = localStorage["name"] || "Player";
    createBoard(playerName, "playerTable");
    createBoard("Computer", "computerTable");
    resolve();
  });
}
