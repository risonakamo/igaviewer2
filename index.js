import IgaRoot from "./igaroot.jsx";
import "./index.less";

window.onload=main;
function main()
{
    ReactDOM.render(React.createElement(IgaRoot),document.querySelector(".iga-root"));
}