/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
  // adds a new svg with given dimensions to build the graph 
  // within the div with the given id
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do? - this defines the max y value from data 1
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do?   
  // defines the range of y values for the graph & where to put 
  // them in the pixels -- mapping to pixel values
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
  // defines the range of x values for the graph & where to put them in the pixels
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
  // formats the y-axis of the graph within the svg on the page
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do? 
  // // formats the x-axis of the graph within the svg
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
  // select the given div & append another div for the tooltip
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
  // defines the text to show up when hovering over a bar in the graph
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
  // position the tooltip
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
  // when the mouse in no longer hovering over the graph, the 
  // tooltip should disappear
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
  // select bar within svg 
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  // makes placeholder for each row
   .append("rect") // adds rect to each
     .attr("class", "bar")  // add attribute class, make it bar
     .attr("x", (d,i) => xScale1(i)) // setting x position for rectangles
     .attr("y", (d) => yScale1(d.score)) // setting y position for rectangles
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) // set height & width for bars
     .on("mouseover", mouseover1) // add listeners
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);


// ----------------------------------------------------------------------------

/*
  New code for bar chart from csv
*/

const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("data/barchart.csv").then((data) => {
  console.log(data);

  let maxY2 = d3.max(data, function(d) { return d.score; });

// TODO: What does each line of this code do?   
  // defines the range of y values for the graph & where to put 
  // them in the pixels -- mapping to pixel values
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
  // defines the range of x values for the graph & where to put them in the pixels
let xScale2 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

svg2.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale2)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do? 
  // // formats the x-axis of the graph within the svg
svg2.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale2) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px'); 

const tooltip2 = d3.select("#csv-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?  
  // defines the text to show up when hovering over a bar in the graph
const mouseover2 = function(event, d) {
  tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
  // position the tooltip
const mousemove2 = function(event, d) {
  tooltip2.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
  // when the mouse in no longer hovering over the graph, the 
  // tooltip should disappear
const mouseleave2 = function(event, d) { 
  tooltip2.style("opacity", 0); 
}

  svg2.selectAll("bar")
    .data(data)
    .enter()
    .append('rect')
    .attr("class", "bar")
    .attr("x", (d,i) => xScale2(i)) // setting x position for rectangles
    .attr("y", (d) => yScale2(d.score)) // setting y position for rectangles
    .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
    .attr("width", xScale2.bandwidth()) // set height & width for bars
    .on("mouseover", mouseover2) // add listeners
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2);
})


