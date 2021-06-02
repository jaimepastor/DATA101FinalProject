
//////////////CHORD DIAGRAM//////////////
  
var NameProvider = ["Brunei","Cambodia","Indonesia","Laos","Malaysia","Myanmar","Philippines","Singapore","Thailand","Vietnam","European Union","Japan","China","United States","South Korea","Rest of the World"]; 
	
var matrix = [
[0.00, 0.01, 38.54, 0.00, 611.53, 0.02, 119.01, 966.89, 552.12, 198.74, 23.00, 2206.89, 429.10, 36.76, 338.12, 1518.38],
[14.27, 0.00, 23.64, 2.71, 117.33, 4.02, 37.14, 274.79, 511.31, 374.98, 4880.93, 1138.81, 1015.18, 4410.54, 212.21, 1826.90],
[103.15, 618.52, 0.00, 6.84, 8801.81, 875.63, 6770.11, 12916.73, 6218.39, 5153.36, 14616.73, 16003.26, 27961.89, 17844.61, 7234.41, 42557.55],
[0.00, 16.83, 2.26, 0.00, 14.93, 1.93, 0.32, 14.70, 2406.85, 1054.90, 235.58, 93.57, 1672.28, 29.53, 5.22, 260.45],
[552.29, 602.30, 7441.92, 8.09, 0.00, 667.52, 4387.02, 33035.67, 13479.61, 8382.72, 23128.62, 15755.42, 33690.41, 23112.44, 8147.91, 65697.06],
[0.29, 17.07, 160.03, 0.53, 198.25, 0.00, 124.25, 326.51, 3228.87, 227.70, 3331.08, 1428.60, 5712.67, 828.69, 530.64, 1881.93],
[5.26, 26.16, 829.02, 1.09, 1825.27, 54.97, 0.00, 3831.79, 2972.48, 1269.64, 8285.41, 10674.92, 9814.43, 11566.75, 3240.83, 16528.98],
[1113.11, 2277.24, 27377.68, 53.47, 41184.57, 3153.12, 8532.55, 0.00, 15363.56, 12971.29, 34512.55, 17648.59, 51655.90, 33242.63, 15223.34, 126380.00],
[116.10,7143.64,9071.22,3848.79,10462.93,4365.37,6931.15,8842.70,0.00,12103.22,23601.47,24533.85,29163.88,31351.17,4718.02,69887.18],
[66.63, 4311.01, 3369.98, 702.55, 3789.34, 721.49, 3734.03, 3174.30, 5050.23, 0.00, 41492.44, 20426.60, 41434.24, 61371.14, 19729.25, 55237.09],
[661.62, 758.68, 12500.90, 139.05, 19042.02, 874.94, 9894.23, 46977.40, 20920.98, 14940.88, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
[207.00, 881.32, 15661.83, 118.21, 15346.95, 501.51, 11217.88, 19408.65, 33242.59, 19532.76, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
[672.05, 7527.74, 44930.62, 1681.04, 42371.94, 6445.16, 26756.38, 49075.01, 50367.14, 75586.16, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
[322.52, 306.97, 9261.64, 77.88, 16571.46, 344.87, 8592.80, 43807.14, 17346.68, 14367.11, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
[94.39, 669.91, 8421.26, 71.39, 9364.11, 450.57, 8759.57, 13718.39, 8635.04, 46941.93, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
[1507.63, 2001.08, 40611.58, 194.95, 52690.26, 1874.35, 21534.33, 107827.00, 57738.25, 49962.05, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00]
];

var colors = ["#6dc2ca", "#d27d2c", "#8b008b", "#8595a1", "#deeed6", "#6daa2c", "#346524","#757161","#dad45e","#d2aa99","#30346d","#4e4a4e","#854c30","#597dce","#442434","#140c1c"];

var chord = d3.layout.chord()
    .padding(.07)
    .sortSubgroups(d3.ascending) //sort the chords inside an arc from high to low
    .sortChords(d3.ascending) //which chord should be shown on top when chords cross. Now the biggest chord is at the bottom
	.matrix(matrix);

var width = 800,
    height = 700,
    innerRadius = 220,
    outerRadius = 230;
	
var fill = d3.scale.ordinal()
    .domain(d3.range(NameProvider.length))
    .range(colors);
	
var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

var svg = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height+50)
	.append("svg:g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2+30) + ")");
   
//insert tooltip
var tooltip = d3.select("#tooltip")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")
   
var showTooltip = function(d) {
  tooltip
    .style("opacity", 1)
    .html("Net Exporter: " +NameProvider[d.source.index]
          + "<br>Value of Exports from " +NameProvider[d.source.index] + " (in millions): $" + [d.source.value]
          + "<br>Value of Exports from " +NameProvider[d.target.index] + " (in millions): $" + [d.target.value])
    .style("left", (d3.event.pageX + 15) + "px")
    .style("top", (d3.event.pageY - 28) + "px")
}

var hideTooltip = function(d) {
  tooltip
    .transition()
    .duration(1000)
    .style("opacity", 0)
}

// Draw outer Arcs
var g = svg.selectAll("g.group")
	.data(chord.groups)
	.enter().append("svg:g")
	.attr("class", "group")
    .attr("fill-opacity", 1)
	.on("mouseover", fade(.02))
	.on("mouseout", fade(.80));

g.append("svg:path")
  .style("stroke", function(d) { return fill(d.index); })
  .style("fill", function(d) { return fill(d.index); })
  .attr("d", arc);
  
// Append Names
g.append("svg:text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d) {
		return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
		+ "translate(" + (innerRadius + 30) + ")"
		+ (d.angle > Math.PI ? "rotate(180)" : "");
  })
  .text(function(d,i) { return NameProvider[i]; });

// Draw inner chords
svg.selectAll("path.chord")
	.data(chord.chords)
	.enter().append("svg:path")
	.attr("class", "chord")
    .style("fill-opacity", 0.5)
	.style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(0.1)})
	.style("fill", function(d) { return fill(d.source.index); })
	.attr("d", d3.svg.chord().radius(innerRadius))
    //.style("mix-blend-mode", "multiply")
     .on("mouseover", showTooltip )
     .on("mouseleave", hideTooltip )
    

// Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(d, i) {
    svg.selectAll("path.chord")
        .filter(function(d) { return d.source.index != i ; })
        //.filter(function(d) { return d.source.index != i && d.target.index != i; })
		.transition()
        .style("stroke-opacity", opacity)
        .style("fill-opacity", opacity);
  };
  


}//groupTicks
  

//////////////COMMODITIES//////////////

var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svgIntra = d3.select("#IntraASEAN")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var svgExtra = d3.select("#ExtraASEAN")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var x_Intra = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis_Intra = svgIntra.append("g")
  .attr("transform", "translate(0," + height + ")")


var y_Intra = d3.scaleLinear()
  .range([ height, 0]);
var yAxis_Intra = svgIntra.append("g")
  .attr("class", "myYaxis")

var x_Extra = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis_Extra = svgExtra.append("g")
  .attr("transform", "translate(0," + height + ")")


var y_Extra = d3.scaleLinear()
  .range([ height, 0]);
var yAxis_Extra = svgExtra.append("g")
  .attr("class", "myYaxis")

function update(selectedVar_Intra) 
  {

d3.csv("https://raw.githubusercontent.com/jaimepastor/DATA101FinalProject/main/static/data/DATA101%20Datasets/Millions%20Renamed%20Bar%20Intra-Asean%20-%20Copy%20-%20Copy.csv?token=ARNVJFAEZGQG4D5UGXE35B3AXETEA", function(dataIntra) 
         {var topDataIntra = dataIntra.sort(function(a, b) 
         {return d3.descending(+a[selectedVar_Intra], +b[selectedVar_Intra]);})
  
  .slice(0, 5);//top 10 here
    // X axis
    x_Intra.domain(topDataIntra.map(function(d) { return d.Commodity; }))
    xAxis_Intra.transition().duration(1000).call(d3.axisBottom(x_Intra))

    // Add Y axis
    y_Intra.domain([0, d3.max(dataIntra, function(d) { return +d[selectedVar_Intra] }) ]);
    yAxis_Intra.transition().duration(1000).call(d3.axisLeft(y_Intra));


       var u = svgIntra.selectAll("rect")
      .data(topDataIntra)

    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x_Intra(d.Commodity); })
        .attr("y", function(d) { return y_Intra(d[selectedVar_Intra]); })
        .attr("width", x_Intra.bandwidth())
        .attr("height", function(d) { return height - y_Intra(d[selectedVar_Intra]); })
        .attr("fill", "steelblue")
    

  })

}

  function update2(selectedVar_Extra) {

  d3.csv("https://raw.githubusercontent.com/jaimepastor/DATA101FinalProject/main/static/data/DATA101%20Datasets/Millions%20Renamed%20Bar%20Extra-Asean%20-%20Copy%20-%20Copy.csv?token=ARNVJFCX2KW5GLICHSLEHZTAYAWMK", function(dataExtra) {
  var topDataExtra = dataExtra.sort(function(a, b) {
    return d3.descending(+a[selectedVar_Extra], +b[selectedVar_Extra]);
}).slice(0, 5);//top 10 here
    // X axis
    x_Extra.domain(topDataExtra.map(function(d) { return d.Commodity; }))
    xAxis_Extra.transition().duration(1000).call(d3.axisBottom(x_Extra))

    // Add Y axis
    y_Extra.domain([0, d3.max(dataExtra, function(d) { return +d[selectedVar_Extra] }) ]);
    yAxis_Extra.transition().duration(1000).call(d3.axisLeft(y_Extra));

    var o = svgExtra.selectAll("rect").data(topDataExtra)
    
    o
      .enter()
      .append("rect")
      .merge(o)
      .transition()
      .duration(1000)
        .attr("x", function(d) { return x_Extra(d.Commodity); })
        .attr("y", function(d) { return y_Extra(d[selectedVar_Extra]); })
        .attr("width", x_Extra.bandwidth())
        .attr("height", function(d) { return height - y_Extra(d[selectedVar_Extra]); })
        .attr("fill", "steelblue")
  })

}


update('Total Trade')
update2('Total Trade')
