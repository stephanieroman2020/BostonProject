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
var chartGroup2 = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from Rodents-of-tv-watched.csv
console.log("Rodents ");


var rodents_chart_url = window.location.origin.concat('/rodents_monthly');
d3.csv(rodents_chart_url).then(function(RodentsData) {


  console.log(RodentsData);

  // Cast the Rodents value to a number for each piece of RodentsData
  RodentsData.forEach(function(d) {
    d.Rodents = +d.Rodents;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(RodentsData.map(d => d.month))
    .range([0, chartWidth])
    .padding(0.1);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(RodentsData, d => d.Rodents)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup2 area,
  // and create the bottom and left axes inside of them
  chartGroup2.append("g")
    .call(leftAxis);

  chartGroup2.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  // Create one SVG rectangle per piece of RodentsData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup2.selectAll(".bar2")
    .data(RodentsData)
    .enter()
    .append("rect")
    .attr("class", "bar2")
    .attr("x", d => xBandScale(d.month))
    .attr("y", d => yLinearScale(d.Rodents))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight - yLinearScale(d.Rodents));

}).catch(function(error) {
  console.log(error);
});
