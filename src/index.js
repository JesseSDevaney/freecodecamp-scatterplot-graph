import "./index.scss";
import createScatterPlot from "./app/app";

function ready() {
  fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  )
    .then((response) => response.json())
    .then((dataset) => {
      createScatterPlot(dataset);
    })
    .catch((error) => {
      alert("Error loading content");
      console.log(error);
    });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
