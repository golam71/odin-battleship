import "./css/style.css";

import initial from "./js/ui/initial.js";
import loadui from "./js/ui/loadui.js";
import cleanBody from "./js/ui/cleanBody.js";

initial().then(cleanBody).then(loadui);
