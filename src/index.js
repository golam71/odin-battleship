import "./css/style.css";

import initial from "./js/ui/initial.js";
import placeShips from "./js/ui/placeShips.js";
import loadui from "./js/ui/loadgameui.js";
import cleanBody from "./js/ui/cleanBody.js";

// // initial().then(cleanBody).then
// cleanBody();
// // placeShips();
// loadui();

initial().then(cleanBody).then(placeShips).then(cleanBody).then(loadui);
