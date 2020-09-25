// https://observablehq.com/@alainro/perception-illusion-part-ii@236
import define1 from "./e93997d5089d7165@2285.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Perception Illusion (part II)`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Automatic 3D vision superseeds conscious perception`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`This is a well-known illusion. The image is borrowed from [Wikipedia](https://en.wikipedia.org/wiki/Checker_shadow_illusion). I found that a simple animation controlled by a button gives an even bigger Waoooh effect. 

Don't you think ?`
)});
  main.variable(observer("image")).define("image", ["html"], function(html){return(
html`<center>
<img id="image" class="b" src="https://gist.githubusercontent.com/AlainRo/e3423d22c3747ded4c6e03dc1685e371/raw/07973bc67728987eef9b53243592c133d1053c34/Checkboard1.png">
</center>
`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<center><button class="b">Remove shadow</button> <i>or click the image</i></center>`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## 3D vision do hack the brain. Be aware.`
)});
  main.variable(observer("wall")).define("wall", ["html"], function(html){return(
html`<center>
<img id="wall" class="c" src="https://gist.githubusercontent.com/AlainRo/e3423d22c3747ded4c6e03dc1685e371/raw/1c565a97e77d67b36b8bdcd908bef87ac1ea2589/Wall1.png">
</center>`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<center><small><i>Click the image to compare heigth of the red bars</i></small></center>`
)});
  main.variable(observer()).define(["d3","putImg","md"], function(d3,putImg,md)
{d3.selectAll('.c')
  .on('mousedown touchstart', function () {putImg('#wall', "https://gist.githubusercontent.com/AlainRo/e3423d22c3747ded4c6e03dc1685e371/raw/1c565a97e77d67b36b8bdcd908bef87ac1ea2589/Wall2.png")})
  .on('mouseup touchend', function () {
putImg('#wall', "https://gist.githubusercontent.com/AlainRo/e3423d22c3747ded4c6e03dc1685e371/raw/1c565a97e77d67b36b8bdcd908bef87ac1ea2589/Wall1.png")})
return md``
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`### Misc. imports and definitions`
)});
  main.variable(observer()).define(["d3","putImg","md"], function(d3,putImg,md)
{d3.selectAll('.b')
  .on('mousedown touchstart', function () {putImg('#image', "https://gist.githubusercontent.com/AlainRo/e3423d22c3747ded4c6e03dc1685e371/raw/07973bc67728987eef9b53243592c133d1053c34/Checkboard2.png")})
  .on('mouseup touchend', function () {
putImg('#image', "https://gist.githubusercontent.com/AlainRo/e3423d22c3747ded4c6e03dc1685e371/raw/07973bc67728987eef9b53243592c133d1053c34/Checkboard1.png")})
return md``
}
);
  main.variable(observer("putImg")).define("putImg", ["d3"], function(d3){return(
function putImg(img, src){
  d3.select(img).attr('src',src)
}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3")
)});
  const child1 = runtime.module(define1);
  main.import("button", child1);
  return main;
}
