import "bootstrap/dist/js/umd/util";
import "bootstrap/dist/js/umd/collapse";
import "bootstrap/dist/js/umd/tooltip";
import collapse from "./js/collapse";
import { setup } from "./ts/app/global-navigation.ts";

collapse();
setup();

document.body.classList.add("js");
