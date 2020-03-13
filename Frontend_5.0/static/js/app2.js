// Define SVG area dimensions
var svgWidth = 350;
var svgHeight = 160;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.selectAll("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup1 = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from Trash-of-tv-watched.csv
console.log("trash ");

d3.csv("static/data/trash_monthly.csv").then(function(trashData) {


  console.log(trashData);

  // Cast the Trash value to a number for each piece of trashData
  trashData.forEach(function(e) {
    e.Trash = +e.Trash;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(trashData.map(e => e.month))
    .range([0, chartWidth])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(trashData, e => e.Trash)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup1 area,
  // and create the bottom and left axes inside of them
  chartGroup1.append("g")
    .call(leftAxis);

  chartGroup1.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of trashData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup1.selectAll(".bar1")
    .data(trashData)
    .enter()
    .append("rect")
    .attr("class", "bar1")
    .attr("x", e => xBandScale(e.month))
    .attr("y", e => yLinearScale(e.Trash))
    .attr("width", xBandScale.bandwidth())
    .attr("height", e => chartHeight - yLinearScale(e.Trash));

}).catch(function(error) {
  console.log(error);
});
