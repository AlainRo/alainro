// https://observablehq.com/@alainro/perception-illusion-part-i@621
import define1 from "./e93997d5089d7165@2285.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Perception Illusion (part I)
This is a well known optical illusion that I recreated with d3/canvas after discovering this Japanese [website](http://www.psy.ritsumei.ac.jp/~akitaoka/kosaku2e.html). I was amazed by the magic of the appearing/disappearing shapes and deligthed by the luminance curve which says a lot about the way our vision works.   

The color area hides rectangles having the exact same color of their background. By dragging them around with mouse or finger you wont believe that their color is not changing. ***(hint: press " Show me " button to see them first).*** 

Once visible, try to replace the shape at the location where it is perfectly hidden.`
)});
  main.variable(observer("viewof uniform")).define("viewof uniform", ["checkbox"], function(checkbox){return(
checkbox({
  options: [{ value: "true", label: "Uniform color" }],
  value: false
})
)});
  main.variable(observer("uniform")).define("uniform", ["Generators", "viewof uniform"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md `Strangely enough, a uniform color appears like being a gradient. Try it.`
)});
  main.variable(observer("viewof blackwhite")).define("viewof blackwhite", ["checkbox"], function(checkbox){return(
checkbox({
  options: [{ value: "true", label: "Grey scale" }],
  value: false
})
)});
  main.variable(observer("blackwhite")).define("blackwhite", ["Generators", "viewof blackwhite"], (G, _) => G.input(_));
  main.variable(observer("viewof show")).define("viewof show", ["html"], function(html){return(
html`<button>Show me the rectangles</button>`
)});
  main.variable(observer("show")).define("show", ["Generators", "viewof show"], (G, _) => G.input(_));
  main.variable(observer("display")).define("display", ["html"], function(html){return(
html`<canvas id="display" width="960" height="300"></canvas>`
)});
  main.variable(observer("PerceivedLuminance")).define("PerceivedLuminance", ["d3","DOM","width","heightChart","dataDiff","lineD"], function(d3,DOM,width,heightChart,dataDiff,lineD)
{
  const svg = d3.select(DOM.svg(width, heightChart));
  
  svg.append("path")
      .datum(dataDiff)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineD);
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`<center><strong> = </strong></center>`
)});
  main.variable(observer("RealLuminance")).define("RealLuminance", ["d3","DOM","width","heightChart","data","line"], function(d3,DOM,width,heightChart,data,line)
{
  const svg = d3.select(DOM.svg(width, heightChart));
  
  svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`<center><strong> - </strong></center>`
)});
  main.variable(observer("Background")).define("Background", ["d3","DOM","width","heightChart","dataApp","lineL"], function(d3,DOM,width,heightChart,dataApp,lineL)
{
  const svg = d3.select(DOM.svg(width, heightChart));
  
  svg.append("path")
      .datum(dataApp)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", lineL);
  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md `The upper section of the background (10 pixels from the top) is continously read in order to show the perceived luminance: real luminance - background luminance(10 pixels from the bottom). This curve explains nicely why we see what we see. ***(hint: try to drag the rectangles at the top of the area and see what happen).***`
)});
  main.variable(observer("width")).define("width", function(){return(
800
)});
  main.variable(observer("height")).define("height", function(){return(
300
)});
  main.variable(observer("rects")).define("rects", function(){return(
[
  [250, 200, 150, 70],
  [350, 100, 150, 70],
  [450, 5, 150, 70]
]
)});
  main.variable(observer("canvas")).define("canvas", ["d3","width","height"], function(d3,width,height)
{
  const c = d3.select("canvas");
  c.property("width", width);
  c.property("height", height);
  return c;
}
);
  main.variable(observer("context")).define("context", ["canvas"], function(canvas){return(
canvas.node().getContext("2d")
)});
  main.variable(observer("initialColor")).define("initialColor", ["getColor","context","d3"], function(getColor,context,d3){return(
function(rect){
  const start = getColor(context, rect[0], 10),
        stop  = getColor(context, rect[0] + rect[2], 10);
  rect[4] = d3.rgb.apply(null, start).hex();
  rect[5] = d3.rgb.apply(null, stop).hex();
}
)});
  main.variable(observer("grd")).define("grd", ["context","width","blackwhite","d3"], function(context,width,blackwhite,d3)
{
  const g = context.createLinearGradient(0,0,width,0);
  g.addColorStop(0, blackwhite ? "black" : d3.rgb(255,255,0)); 
  g.addColorStop(1, blackwhite ? "white" : d3.rgb(255,0,0));
  return g;
}
);
  main.variable(observer("drag")).define("drag", ["canvas","d3","dragsubject","dragged","render"], function(canvas,d3,dragsubject,dragged,render)
{
  canvas
    .call(d3.drag().subject(dragsubject).on("drag", dragged))
    .call(render, true);
}
);
  main.variable(observer("dragsubject")).define("dragsubject", ["d3","rects"], function(d3,rects){return(
function dragsubject() {
  var i,
      x = d3.event.x,
      y = d3.event.y,
      dx,
      dy;

  for (i = rects.length - 1; i >= 0; --i) {
    const r = rects[i];
    dx = x - r[0];
    dy = y - r[1];
    if (dx > 0 && dx < r[2] && dy > 0 && dy < r[3]) {
      r.x = r[0];
      r.y = r[1];
      return r;
    }
  }
}
)});
  main.variable(observer("dragged")).define("dragged", ["d3","render"], function(d3,render){return(
function dragged() {
  d3.event.subject[0] = d3.event.x;
  d3.event.subject[1] = d3.event.y;
  render(true);
}
)});
  main.define("initial flag", function(){return(
false
)});
  main.variable(observer("mutable flag")).define("mutable flag", ["Mutable", "initial flag"], (M, _) => new M(_));
  main.variable(observer("flag")).define("flag", ["mutable flag"], _ => _.generator);
  main.variable(observer("render")).define("render", ["context","width","height","grd","rects","draw","mutable flag"], function(context,width,height,grd,rects,draw,$0){return(
function render(show, reset) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = grd;
  context.fillRect(0, 0, width, height);
  rects.forEach(r => draw(r, show, reset));
  context.fill();
  $0.value = true; // Force eval
}
)});
  main.variable(observer("draw")).define("draw", ["initialColor","uniform","context","d3"], function(initialColor,uniform,context,d3){return(
function draw(rect, show, reset) {
  //console.log('Show', show);
  if (!rect[4] || reset) initialColor(rect);
  let g;
  if (!uniform){ // gradient
    g = context.createLinearGradient(rect[0],0,rect[0]+rect[2],0);
    g.addColorStop(0, rect[4]);
    g.addColorStop(1, rect[5]);
  }
  else { // middle point
    const c1 = d3.color(rect[4]).rgb();
    const c2 = d3.color(rect[5]).rgb();
    console.log(c1, c2);
    g = d3.rgb((c1.r + c2.r) /2, (c1.g + c2.g) /2, (c1.b + c2.b) /2).hex();
  }
  context.fillStyle = g; 
  context.fillRect(rect[0], rect[1], rect[2], rect[3]); 
  if (!show){
    context.strokeStyle = '#FFFFFF';
    context.strokeRect(rect[0], rect[1], rect[2], rect[3]);
    context.stroke();
  }
}
)});
  main.variable(observer()).define(["show","render","d3"], function(show,render,d3)
{show; // show the rectangles for a short instant 
 render(false);
 d3.timeout(() => render(true), 500);
}
);
  main.variable(observer()).define(["blackwhite","render"], function(blackwhite,render)
{blackwhite; render(true, true)}
);
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Luminance curves`
)});
  main.variable(observer("data")).define("data", ["d3","nb","luminance","getColor","context","width","flag"], function(d3,nb,luminance,getColor,context,width,flag){return(
d3.range(nb).map(e => luminance(getColor(context, e * width/nb, 10, flag)))
)});
  main.variable(observer("dataApp")).define("dataApp", ["d3","nb","luminance","getColor","context","width","height","flag"], function(d3,nb,luminance,getColor,context,width,height,flag){return(
d3.range(nb).map(e => luminance(getColor(context, e * width/nb, height -10, flag)))
)});
  main.variable(observer("dataDiff")).define("dataDiff", ["data","dataApp"], function(data,dataApp){return(
data.map((e, i) => data[i] - dataApp[i])
)});
  main.variable(observer("heightChart")).define("heightChart", function(){return(
100
)});
  main.variable(observer("x")).define("x", ["d3","nb","width"], function(d3,nb,width){return(
d3.scaleLinear()
    .domain([0, nb])
    .range([0, width])
)});
  main.variable(observer("line")).define("line", ["d3","x","data","heightChart"], function(d3,x,data,heightChart){return(
d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(i))
    .y(d => 
      d3.scaleLinear()
        .domain([0, d3.max(data, d => d)]).nice()
        .range([heightChart, 0])(d)
      )
)});
  main.variable(observer("lineL")).define("lineL", ["d3","x","dataApp","heightChart"], function(d3,x,dataApp,heightChart){return(
d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(i))
    .y(d => 
       d3.scaleLinear()
        .domain([0, d3.max(dataApp)]).nice()
        .range([heightChart, 0])(d)
      )
)});
  main.variable(observer("lineD")).define("lineD", ["d3","x","dataDiff","heightChart"], function(d3,x,dataDiff,heightChart){return(
d3.line()
    .defined(d => !isNaN(d))
    .x((d, i) => x(i))
    .y(d =>
      d3.scaleLinear()
        .domain(d3.extent(dataDiff)).nice()
        .range([heightChart, 0])(d)
      )
)});
  main.variable(observer("nb")).define("nb", function(){return(
150
)});
  main.variable(observer("luminance")).define("luminance", function(){return(
function (color) { // see wikipedia
  return 0.2126*color[0] + 0.7152*color[1] + 0.0722*color[2];
}
)});
  main.variable(observer("getColor")).define("getColor", function(){return(
function getColor(context, x, y){
  return context.getImageData(x, y, 1, 1).data;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---

## Misc imports`
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  const child1 = runtime.module(define1);
  main.import("checkbox", child1);
  main.import("button", child1);
  return main;
}
