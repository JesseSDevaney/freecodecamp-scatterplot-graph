import * as d3 from "d3";
import "./app.scss";

export default function createScatterPlot(dataset) {
  const width = 800;
  const height = 450;

  const svg = d3
    .select("#root")
    .append("svg")
    .attr("id", "chart")
    .attr("viewBox", `0 0 ${width} ${height}`);

  const padWidth = 0.1 * width;
  const padHeight = 0.12 * height;

  // Create x-axis
  const years = dataset.map((d) => new Date(d["Year"], 0));
  const xScale = d3
    .scaleTime()
    .domain([d3.min(years), d3.max(years)])
    .range([padWidth, width - padWidth]);
  const xAxis = d3.axisBottom(xScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${height - padHeight})`);

  // Label x-axis
  svg
    .append("text")
    .text("Years")
    .attr("id", "x-axis-label")
    .attr("class", "axis-label")
    .attr("x", "80%")
    .attr("y", "97%");
}
