import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import IgaRoot from "./igaroot.jsx";
import "./index.less";

import store from "./thestore";

window.onload=main;
function main()
{
    ReactDOM.render(<Provider store={store}><IgaRoot/></Provider>,document.querySelector(".iga-root"));
}