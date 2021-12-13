function tradeChart(i,j){

  // This code refers to the code of the INFO5100 d3 chord diagrams course

    dataset = ["./2019IN.json","./2020IN.json","./2020ex.json","./2019ex.json"];
console.log(dataset[1]);

if (j == 1){
    // chordChart.remove();
    chordChart.selectAll('path').remove();
    chordChart.selectAll('g').remove();
    chordChart.selectAll('linearGradient').remove();
}



const drawChord = async () => {
const colorList = ["#48bf8e", "#075c62", "#a1def0", "#5e2a96"]
const getData = await d3.json(dataset[i]);
console.log(getData);

let nodes = getData.nodes;
let links = getData.edges;
let table = [];
let relations = {};
for (let i=0; i<nodes.length; i++) { 
    let row = [];
    for (let j=0; j<nodes.length; j++) { row.push(0); }
    
    table.push(row);
    relations[i] = [i];
}
console.log(table);
links.forEach( d => {
  if (d.weight > 0) {
    table[d.sourceIndex][d.targetIndex] = d.weight;
    table[d.targetIndex][d.sourceIndex] = d.weight;
    
    relations[d.sourceIndex].push(d.targetIndex);
    relations[d.targetIndex].push(d.sourceIndex);
  }
});
console.log(table);
console.log(relations);
chord_width = document.getElementById("chord").getAttribute('width');
chord_height = document.getElementById("chord").getAttribute('height');

let radius = (chord_width / 2.0) - 125;
let generation = d3.chord()
                .padAngle(.04)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending)
let arc = d3.arc()
                .innerRadius(radius)
                .outerRadius(radius + 20)
let ribbonGen = d3.ribbon()
                  .radius(radius)
let chords = generation(table);
console.log(chords);
chordChart.attr("transform",`translate(${chord_width/2.0},${chord_height/2.0+20})`);
let colorScale = d3.scaleOrdinal().range(colorList);
let ringContainer = chordChart.append("g");
let rings = ringContainer.selectAll("g.segment")
                        .data(chords.groups)
                        .join("g")
                        .attr("class","segment");
rings.append("path")
     .attr("fill", d => colorScale( nodes[ d.index ].Affiliation ))
     .attr("stroke", d => colorScale( nodes[ d.index ].Affiliation ))
     .attr("d", arc);
let ribContainer = chordChart.append("g");
let ribbons = ribContainer.selectAll("path.ribbon")
                  .data(chords)
                  .join("path")
                  .attr("class","ribbon")
                  .attr("fill-opacity", 0.5)
                  .attr("stroke", "none")
                  .attr("fill", d => colorScale( nodes[ d.source.index ].Affiliation ))
                  .attr("d", ribbonGen);

chords.groups.forEach( d => {
  let transform = '';
  let midpoint = (d.startAngle + d.endAngle) / 2;
  let rotation = ( midpoint ) * ( 180 / Math.PI ) - 90;
  transform = transform + ` rotate(${rotation})`;
  transform = transform + ` translate(${radius+25}, 0)`;
  if (rotation > 90) {
    transform = transform + ' rotate(180)';
    d.anchor = "end";
  }
  d.trans = transform;
});

rings.append("text")
     .attr("transform", d => d.trans)
     .attr("class", "circleText")
     .text(d => nodes[ d.index ].Name )
     .attr("text-anchor", d => d.anchor);

function reshighLight() {
  rings.attr("opacity", 1);
  ribbons.attr("opacity", 1);
}
function allLowlight() {
  rings.attr("opacity", 0.2);
  ribbons.attr("opacity", 0.2);
}

function ringHighlight(index) {
  let targetSegments = rings.filter( d => {
    return relations[d.index].includes(index);
  });
  targetSegments.attr("opacity",1);
}

function ribbonHighlight(index) {
  let targetRibbons = ribbons.filter( d => {
    return d.source.index === index || d.target.index === index;
  });
  targetRibbons.attr("opacity",1);
}

rings.on("mouseout", reshighLight)
     .on("mouseover", function(event, d) {
          allLowlight();
          ringHighlight(d.index);
          ribbonHighlight(d.index);
        });

let getGradID = chord => `linkGrad-${chord.source.index}-${chord.target.index}`;

var finals = d3.select("#chord").append("defs")
  .selectAll("linearGradient")
  .data(chords)
  .join("linearGradient")
  .attr("id", getGradID)
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", d => radius * Math.cos((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2) )
  .attr("y1", d => radius * Math.sin((d.source.endAngle-d.source.startAngle) / 2 + d.source.startAngle - Math.PI/2) )
  .attr("x2", d => radius * Math.cos((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2) )
  .attr("y2", d => radius * Math.sin((d.target.endAngle-d.target.startAngle) / 2 + d.target.startAngle - Math.PI/2) )
finals.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", d => colorScale(nodes[ d.source.index ].Affiliation) )
finals.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", d => colorScale(nodes[ d.target.index ].Affiliation) )

ribbons.attr("fill", d => "url(#" + getGradID(d) + ")" )
}
drawChord();

}