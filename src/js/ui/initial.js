import "../../css/initial.css";

export default function initial() {
  return new Promise((resolve) => {
    const container = document.createElement("div");

    const h1 = document.createElement("h1");
    h1.textContent = "Welcome to BattleShip";

    const h2 = document.createElement("h2");
    h2.textContent = "Sink your enemies ships before they sink yours!";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your name";

    const button = document.createElement("button");
    button.id = "start";
    button.textContent = "Enter";

    container.append(h1, h2, input, button);
    document.body.appendChild(container);

    button.addEventListener("click", () => {
      const playerName = input.value.trim() || "Player";
      localStorage.setItem("name", playerName);
      resolve(playerName);
    });
  });
}
