// https://observablehq.com/d/69c33ed283cfabf7@860
import define1 from "./e93997d5089d7165@2227.js";
import define2 from "./5716344134c3fa5c@12.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Quadtree can speed up pan and zoom on a canvas (part II)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `Let's try with polygons !! We cheat a little with the image background`
)});
  main.variable(observer("viewof background")).define("viewof background", ["checkbox"], function(checkbox){return(
checkbox({
  options: ['With Background'],
  value: ['With Background']
})
)});
  main.variable(observer("background")).define("background", ["Generators", "viewof background"], (G, _) => G.input(_));
  main.variable(observer("viewof q")).define("viewof q", ["radio"], function(radio){return(
radio(
  {options: ["without Quadtree", "with Quadtree"],
   value: "with Quadtree"}
)
)});
  main.variable(observer("q")).define("q", ["Generators", "viewof q"], (G, _) => G.input(_));
  main.variable(observer()).define(["md","nbrendered","nbtotal"], function(md,nbrendered,nbtotal){return(
md `Try to pan and zoom on this canvas image. ${nbrendered} cities in ${nbtotal} are rendered.`
)});
  main.variable(observer("visual")).define("visual", ["DOM","width","height","d3","zoom","draw","data"], function(DOM,width,height,d3,zoom,draw,data)
{
  const canvas = DOM.canvas(width, height);
  const context = canvas.getContext("2d");

  d3.select(canvas).call(zoom);

  draw(context, data, d3.zoomIdentity);

  return canvas;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md `This is the minimap showing every cities and the zoomed viewport (not editable).`
)});
  main.variable(observer()).define(["html"], function(html){return(
html `<svg width="960" height="500"></svg>`
)});
  main.variable(observer()).define(["md","nbCities"], function(md,nbCities){return(
md `Whatever the zoom level, only the **biggest visible** ${nbCities} cities are showned. This is a different speed up strategy which complements very well the quad-tree optimization.`
)});
  main.variable(observer("viewof nbCities")).define("viewof nbCities", ["slider"], function(slider)
{
  const min = 0, max = 36000, value = 1000;
  const primes = [500, 1000, 2000, 3000, 4000, 5000, 10000, 36000];
  return slider({
    value: 3,
    step: 1, 
    max: primes.length - 1,
    getValue: n => primes[n.value],
    format: ",",
    description:"Draw only the N biggest cities in the viewport"
  });
}
);
  main.variable(observer("nbCities")).define("nbCities", ["Generators", "viewof nbCities"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md `To disable all optimizations, choose **without Quadtree** and **36,000 cities**`
)});
  main.variable(observer("svg")).define("svg", ["d3","width","height"], function(d3,width,height){return(
d3.select("svg").attr('width', width).attr('height', height).attr('fill','none')
)});
  main.variable(observer()).define(["svg","brushed","width","height"], function(svg,brushed,width,height)
{svg.append('rect').attr('fill', 'none').attr('stroke', 'black').attr('stoke-width', 3);
 brushed([[0, 0], [width, height]])
}
);
  main.variable(observer()).define(["svg","data"], function(svg,data){return(
svg.selectAll(".point")
  .data(data)
  .enter().append("circle")
    .attr("class", "point")
    .attr("cx", d => d[0])
    .attr("cy", d => d[1])
    .attr("opacity", 0.5)
    .attr('fill', 'black')
    .attr("r", d => Math.sqrt(d.size/500))
)});
  main.variable(observer("quadtree")).define("quadtree", ["d3","width","height","data"], function(d3,width,height,data){return(
d3.quadtree()
    .extent([[-1, -1], [width + 1, height + 1]])
    .addAll(data)
)});
  main.variable(observer("brushed")).define("brushed", ["d3"], function(d3){return(
function brushed(extent) {
  d3.select('rect')
    .attr('x', extent[0][0])
    .attr('y', extent[0][1])
    .attr('width', extent[1][0] - extent[0][0]) 
    .attr('height', extent[1][1] - extent[0][1]) 
}
)});
  main.variable(observer("search")).define("search", function(){return(
function search(quadtree, x0, y0, x3, y3) {
  const nodes = []
  quadtree.visit((node, x1, y1, x2, y2) => {
    // node.data contient les points à retracer
    if (!node.length) {
      do {
        var d = node.data;
        //d.scanned = true;
        var selected = (d[0] >= x0) && (d[0] < x3) && (d[1] >= y0) && (d[1] < y3);
        if (selected) nodes.push(d)
      } while (node = node.next);
    }
    return x1 >= x3 || y1 >= y3 || x2 < x0 || y2 < y0;
  });
  return nodes
}
)});
  main.variable(observer("draw")).define("draw", ["mutable nbtotal","nbCities","d3","background","image","width","height","mutable nbrendered","contours","color"], function($0,nbCities,d3,background,image,width,height,$1,contours,color){return(
(context, points, t) => {
  $0.value = points.length;

  if (points.length > nbCities) {
    points = points.slice();
    d3.quickselect(   // very nice suggestion from https://observablehq.com/@fil Thanks!!
      points,
      nbCities,
      0,
      points.length - 1,
      (a, b) => b.size - a.size
    );
    points.splice(nbCities, points.length - 1)
  }
  
  if (background){
    context.globalAlpha = 1
    context.drawImage(image, 0, 0, width, height)
    context.fill()
  }

  $1.value = points.length;
  // Les contours

  const cities = points.map(p => contours.get(p.id)).filter(p => p)
  const listes = d3.nest()
    .key(d => d.properties.LISTE)
    .entries(cities)
  
  context.lineJoin = "round"
  context.lineCap = "round"
  context.lineWidth = 0.2/t.k
  context.strokeStyle = "white"
  //context.scale(t.k, t.k)
  
  const path = d3.geoPath(null, context)
  
  listes.forEach(c => {
    context.beginPath()
    const geo = {type: "FeatureCollection", features: c.values}
    context.fillStyle = color(c.key)
    path(geo)
    context.fill()
    context.stroke()
    context.closePath
  })

}
)});
  main.variable(observer("zoom")).define("zoom", ["d3","width","height","brushed","q","search","quadtree","data","draw"], function(d3,width,height,brushed,q,search,quadtree,data,draw){return(
function zoom(sel) {
  const context = sel.node().getContext("2d");
  const zoomBehaviour = d3.zoom().on("zoom", zoomed);
  sel.call(zoomBehaviour);

  function zoomed() {
    const t = d3.event.transform;

    context.save();

    context.clearRect(0, 0, width, height);

    const viewbox = [t.invert([0, 0]), t.invert([width, height])];
    setTimeout(() => brushed(viewbox), 200); //adjust the minimap

    context.translate(t.x, t.y);
    context.scale(t.k, t.k);
    const points =
      q === "with Quadtree"
        ? search(
            quadtree,
            viewbox[0][0],
            viewbox[0][1],
            viewbox[1][0],
            viewbox[1][1]
          )
        : data;
    
    draw(context, points, t);

    context.restore();
  }
}
)});
  main.variable(observer("y")).define("y", ["d3","villes","height"], function(d3,villes,height){return(
d3.scaleLinear().domain(d3.extent(villes, v => +v['lat-commune'])).range([height, 0])
)});
  main.variable(observer("x")).define("x", ["d3","villes","width"], function(d3,villes,width){return(
d3.scaleLinear().domain(d3.extent(villes, v => +v['long-commune'])).range([0, width])
)});
  main.define("initial nbrendered", function(){return(
0
)});
  main.variable(observer("mutable nbrendered")).define("mutable nbrendered", ["Mutable", "initial nbrendered"], (M, _) => new M(_));
  main.variable(observer("nbrendered")).define("nbrendered", ["mutable nbrendered"], _ => _.generator);
  main.define("initial nbtotal", function(){return(
0
)});
  main.variable(observer("mutable nbtotal")).define("mutable nbtotal", ["Mutable", "initial nbtotal"], (M, _) => new M(_));
  main.variable(observer("nbtotal")).define("nbtotal", ["mutable nbtotal"], _ => _.generator);
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoMercator()
  .scale(1868.3820881046693)
  .translate([327.34425478373794, 1964.1964018984593])
)});
  main.variable(observer("data")).define("data", ["villes","projection"], function(villes,projection){return(
villes.map(v => {
  const coords = projection([v["long-commune"], v["lat-commune"]])
  //const coords = [x(v["long-commune"]), y(v["lat-commune"])];
  coords.size = +v.nb_emplois
  coords.id = v.insee_com
  return coords;
})
)});
  main.variable(observer("villes")).define("villes", ["d3"], function(d3){return(
d3.csv('https://raw.githubusercontent.com/toulousedataviz/toulousedataviz.github.io/master/total_BTX_2009_FR.csv')
)});
  main.variable(observer("height")).define("height", function(){return(
500
)});
  main.variable(observer("width")).define("width", function(){return(
800
)});
  main.variable(observer()).define(["md"], function(md){return(
md `## Optional bakground`
)});
  main.variable(observer()).define(["md"], function(md){return(
md `An image background can be inserted under the canvas which gracefully follows pan and zoom`
)});
  main.variable(observer("image")).define("image", ["zoomable"], function(zoomable){return(
zoomable('https://raw.githubusercontent.com/toulousedataviz/toulousedataviz.github.io/master/CanvasElectionsx8.png')
)});
  main.variable(observer("contours")).define("contours", ["d3","projection"], async function(d3,projection)
{const data = await d3.json("https://gist.githubusercontent.com/AlainOttenheimer/e400b66c25e77156ca5cae241d513cb5/raw/94e5ef2b2dae8c29a6d2688ea6429f0b1a86785b/france_EU_2014_std.json")
// pre-Projection
data.features.forEach(f => {
  f.geometry.coordinates[0][0] = f.geometry.coordinates[0][0].map(c => projection(c))
})
return new Map(data.features.map(o => [o.properties.INSEE, o]))
 }
);
  main.variable(observer()).define(["md"], function(md){return(
md `Put reference to topology on each cities. It woud be easy to draw the filtered topojson.`
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleOrdinal()
  .domain(['LVEC', 'LUMP', 'LUG', 'LUC', 'LFN', 'LFG', 'LEXD', 'LDVG', 'LDIV'])
  .range(['#6AE656', '#0167B2', '#FA82B0','#FEAE32','#0A0A0A','#F60F00','#F60F00','#0167B2'])
)});
  main.variable(observer("tau")).define("tau", function(){return(
2 * Math.PI
)});
  const child1 = runtime.module(define1);
  main.import("button", child1);
  main.import("slider", child1);
  main.import("date", child1);
  main.import("file", child1);
  main.import("radio", child1);
  main.import("checkbox", child1);
  main.import("number", child1);
  const child2 = runtime.module(define2);
  main.import("zoomable", child2);
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5", "d3-array@2")
)});
  return main;
}
