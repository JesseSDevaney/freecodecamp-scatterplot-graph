import "./index.scss";
import createScatterPlot from "./app/app";

function ready() {
  createScatterPlot();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
