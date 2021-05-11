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

  const minYear = new Date(d3.min(years).getTime());
  minYear.setFullYear(minYear.getFullYear() - 1);
  const maxYear = new Date(d3.max(years).getTime());
  maxYear.setFullYear(maxYear.getFullYear() + 1);
  const xScale = d3
    .scaleTime()
    .domain([minYear, maxYear])
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
    .text("Year of Race")
    .attr("id", "x-axis-label")
    .attr("class", "axis-label")
    .attr("x", "77%")
    .attr("y", "97%");

  // Create y-axis
  const times = dataset.map((d) => new Date(0, 0, 0, 0, 0, d["Seconds"]));

  const minTime = new Date(d3.min(times).getTime());
  minTime.setSeconds(minTime.getSeconds() - 10);
  const maxTime = new Date(d3.max(times).getTime());
  maxTime.setSeconds(maxTime.getSeconds() + 10);
  const yScale = d3
    .scaleTime()
    .domain([minTime, maxTime])
    .range([height - padHeight, padHeight]);
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", `translate(${padWidth}, 0)`);

  // Label y-axis
  svg
    .append("text")
    .text("Race Time (M:S)")
    .attr("id", "y-axis-label")
    .attr("class", "axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", "-24%")
    .attr("y", "6%");

  // Plot scatter points
  svg
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => xScale(years[i]))
    .attr("cy", (d, i) => yScale(times[i]))
    .attr("r", 3)
    .attr("class", "dot")
    .attr("data-xvalue", (d, i) => years[i])
    .attr("data-yvalue", (d, i) => times[i]);

  // Plot title
  svg
    .append("text")
    .text("Doping Allegations and Race Times in Cycling")
    .attr("id", "title")
    .attr("x", "50%")
    .attr("y", "5%")
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "middle");
}
