// https://observablehq.com/@tmcw/zoomable@12
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Zoomable

A utility to make a wide image zoomable. Usable with an import:

\`\`\`js
import {zoomable} from "@tmcw/zoomable";
\`\`\`
`
)});
  main.variable(observer()).define(["zoomable"], function(zoomable){return(
zoomable("https://photos.macwright.org/2019-05-15-sweet-fennel_1280.jpg")
)});
  main.variable(observer("zoomable")).define("zoomable", ["html"], function(html){return(
url => {
  const img = html`<img style='cursor:zoom-in;transition:all 100ms ease-in;max-width: 640px;width:100%;border:1px solid #eee;border-radius:2px;' src='${url}' />`;
  img.onclick = () => {
    const zoomed = img.style.maxWidth === "640px";

    img.style.maxWidth = zoomed ? "" : "640px";
    img.style.cursor = zoomed ? "zoom-in" : "zoom-out";
  };
  return img;
}
)});
  return main;
}
