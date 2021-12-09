function tradeChart(i,j){

    dataset = ["./2019IN.json","./2020IN.json","./2020ex.json","./2019ex.json"];
console.log(dataset[1]);

if (j == 1){
    // chordChart.remove();
    chordChart.selectAll('path').remove();
    chordChart.selectAll('g').remove();
    chordChart.selectAll('linearGradient').remove();
}



const drawChord = async () => {
const colorPalette = ["#48bf8e", "#075c62", "#a1def0", "#5e2a96", 
                      "#e775cc", "#f3c5fa", "#9a76af", "#1c4585", 
                      "#479abc", "#94ea5b", "#1d6d1f", "#cddb9b", 
                      "#604020", "#d48f4d", "#f24219", "#8e1023", 
                      "#8c956d", "#2cf52b", "#ff0087", "#e9d737"]
const got = await d3.json(dataset[i]);
console.log(got);

let nodes = got.nodes;
let links = got.edges;
let matrix = []; // dense edge matrix
let connections = {};  // To save some time later, we'll also store lists of connections between nodes
for (let i=0; i<nodes.length; i++) { 
    let row = [];
    for (let j=0; j<nodes.length; j++) { row.push(0); }
    
    matrix.push(row);
    connections[i] = [i]; // everything connected to itself!
}
console.log(matrix);
links.forEach( d => {
  // Add in if statement to avoid linking unlinked items
  if (d.weight > 0) {
    matrix[d.sourceIndex][d.targetIndex] = d.weight;
    matrix[d.targetIndex][d.sourceIndex] = d.weight;
    
    connections[d.sourceIndex].push(d.targetIndex);
    connections[d.targetIndex].push(d.sourceIndex);
  }
});
console.log(matrix);
console.log(connections);

let radius = (width / 2.0) - 125;
let chordGen = d3.chord()
                .padAngle(.04)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending)
let arcGen = d3.arc()
                .innerRadius(radius)
                .outerRadius(radius + 20)
let ribbonGen = d3.ribbon()
                  .radius(radius)
let chords = chordGen(matrix);
console.log(chords);
chordChart.attr("transform",`translate(${width/2.0},${height/2.0})`);
// Make the outer ring
let colorScale = d3.scaleOrdinal().range(colorPalette);
// We'll use a data join to make a G tag and then make paths within it using the data for the ring
let ringContainer = chordChart.append("g");
let rings = ringContainer.selectAll("g.segment")
                        .data(chords.groups)
                        .join("g")
                        .attr("class","segment");
rings.append("path")
     .attr("fill", d => colorScale( nodes[ d.index ].Affiliation ))
     .attr("stroke", d => colorScale( nodes[ d.index ].Affiliation ))
     .attr("d", arcGen);
let ribbonContainer = chordChart.append("g");
let ribbons = ribbonContainer.selectAll("path.ribbon")
                  .data(chords)
                  .join("path")
                  .attr("class","ribbon")
                  .attr("fill-opacity", 0.5)
                  .attr("stroke", "none")
                  .attr("fill", d => colorScale( nodes[ d.source.index ].Affiliation ))
                  .attr("d", ribbonGen);


chords.groups.forEach( d => {
  let transform = '';
  // find midpoint, convert to degrees
  let midpoint = (d.startAngle + d.endAngle) / 2;
  let rotation = ( midpoint ) * ( 180 / Math.PI ) - 90;
  transform = transform + ` rotate(${rotation})`;
  transform = transform + ` translate(${radius+25}, 0)`;
  if (rotation > 90) {
    transform = transform + ' rotate(180)';
    // Notice text anchor issue that also first
    d.anchor = "end";
  }
  d.trans = transform;
});

rings.append("text")
     .attr("transform", d => d.trans)
     .attr("class", "circleText")
     .text(d => nodes[ d.index ].Name )
     .attr("text-anchor", d => d.anchor);

function restoreHighlights() {
  rings.attr("opacity", 1);   // both text and ring
  ribbons.attr("opacity", 1);
}
function lowlightAll() {
  rings.attr("opacity", 0.2); // both text and ring
  ribbons.attr("opacity", 0.2);
}

function highlightRings(index) {
  let targetSegments = rings.filter( d => {
    return connections[d.index].includes(index);    // JS: arr.includes(x) === Python: x in arr 
  });
  targetSegments.attr("opacity",1);
}

function highlightRibbons(index) {
  let targetRibbons = ribbons.filter( d => {
    return d.source.index === index || d.target.index === index;
  });
  targetRibbons.attr("opacity",1);
}

rings.on("mouseout", restoreHighlights)
     .on("mouseover", function(event, d) {
          lowlightAll();
          highlightRings(d.index);
          highlightRibbons(d.index);
        });

let getGradID = chord => `linkGrad-${chord.source.index}-${chord.target.index}`;

var grads = d3.select("#chord").append("defs")
  .selectAll("linearGradient")
  .data(chords)
  .join("linearGradient")
  .attr("id", getGradID)
  .attr("gradientUnits", "userSpaceOnUse")  // use the coordinate system of whatever is being filled
  .attr("x1", d => radius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2) )
  .attr("y1", d => radius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2) )
  .attr("x2", d => radius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2) )
  .attr("y2", d => radius * Math.sin((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2) )
grads.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", d => colorScale(nodes[ d.source.index ].Affiliation) )
grads.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", d => colorScale(nodes[ d.target.index ].Affiliation) )

ribbons.attr("fill", d => "url(#" + getGradID(d) + ")" )
}
drawChord();

}