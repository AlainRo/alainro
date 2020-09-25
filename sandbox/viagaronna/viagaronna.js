import define1 from "/@jashkenas/inputs.js?v=3";
import define2 from "/@gampleman/table.js?v=3";
import define3 from "/@d3/color-legend.js?v=3";

export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["via-garona.json","https://static.observableusercontent.com/files/400a2c188e56036450c210a0127093411be360c690a1696fca79da75de04578632a81c5aaa59ff5a8fafbac1e79cdf89b7079f9f7d6e8a6522cdea4dfc472747"]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Path 2 Zip code in France within a given distance`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`*This notebook is able to determine areas traversed by a path. And the connected areas less than a given distance*`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`La distance calculée est la plus courte distance entre un point du chemin et les segments du contour de la commune.`
)});
  main.variable(observer("titre")).define("titre", ["md","Nearests","dist"], function(md,Nearests,dist){return(
md`## Du Nord au Sud, les ${Nearests.length} communes limitrophes à moins de ${dist} kilomètres du parcours via Garonna`
)});
  main.variable(observer()).define(["html","swatches","d3","colors"], function(html,swatches,d3,colors){return(
html`<span><small><i> voisin de niveau</i></small> ${swatches({
  color: d3.scaleLinear([0, 1, 2, 3], colors)
})}</span>`
)});
  main.variable(observer("viewof dist")).define("viewof dist", ["slider"], function(slider){return(
slider({
  min: 0,
  max: 10,
  step: 0.1,
  value: 1,
  title: "Distance en km",
  description: "Distance minimale au chemin"
})
)});
  main.variable(observer("dist")).define("dist", ["Generators", "viewof dist"], (G, _) => G.input(_));
  main.variable(observer("carte")).define("carte", ["d3","colors","DOM","VoisinesNearestThan","dist","path","Contours","Communes","GPSArr","projection"], function(d3,colors,DOM,VoisinesNearestThan,dist,path,Contours,Communes,GPSArr,projection)
{
  const colorScale = d3
    .scaleLinear()
    .domain([0, 3])
    .range(colors);
  const svg = d3
    .select(DOM.svg(1200, 800))
    .attr('id', 'carte')
    .style("width", "100%")
    .style("height", "auto");

  svg
    // Affichage des communes voisines
    .selectAll('path')
    .data(VoisinesNearestThan(dist))
    .enter()
    .append('path')
    .attr('d', d => path(Contours.features[+d.key]))
    .style('fill', d => colorScale(d.value))
    .style('stroke', 'grey')
    .append("title")
    // Affiche le nom de la commune si curseur immobile
    .text(d => Contours.features[+d.key].properties.nom_comm);

  svg
    // Affichage des contours de chaque commune
    .selectAll('path')
    .data(Communes.values())
    .enter()
    .append('path')
    .attr('d', path)
    .style('fill', 'yellow')
    .style('stroke', 'grey')
    .append("title")
    // Affiche le nom de la commune si curseur immobile
    .text(d => d.properties.commune);

  svg
    // Affichage de la path
    .selectAll('circle')
    .data(GPSArr)
    .enter()
    .append('circle')
    .attr("transform", d => {
      const p = projection(d);
      return `translate(${p[0]}, ${p[1]})`;
    })
    .attr('r', 2)
    .style('fill', 'red')
    .text(d => [d.Longitude, d.Latitude]);

  return svg.node();
}
);
  main.variable(observer("tableau")).define("tableau", ["table","Nearests","Faces"], function(table,Nearests,Faces){return(
table(
  Nearests.map(d => {
    return {
      Commune: Faces[d.key].properties.nom_comm,
      "Distance (km)": d.value === 0 ? 0 : d.distance.toFixed(1),
      "Dégré limitrophe": d.value,
      Latitude: Faces[d.key].properties.geo_point_2d[1].toFixed(1)
    };
  }).sort((a, b) => b.Latitude - a.Latitude)
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md` La table peut être téléchargée en cliquant sur la flêche qui descend en bas de la table.`
)});
  main.variable(observer("Nearests")).define("Nearests", ["VoisinesNearestThan","dist"], function(VoisinesNearestThan,dist){return(
VoisinesNearestThan(dist)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Communes différentes`
)});
  main.variable(observer("Communes")).define("Communes", ["d3","ZIPS","Contours"], function(d3,ZIPS,Contours)
{
  const Coms = d3.map();
  ZIPS.forEach(d => Coms.set(d.insee, d));
  const Conts = d3.map();
  Contours.features.forEach(d => {
    const z = Coms.get(d.properties.insee_com);
    if (z) {
      d.properties.delaunay = z.delaunay;
      Conts.set(d.properties.insee_com, d);
    }
  });
  return Conts;
}
);
  main.variable(observer()).define(["Communes"], function(Communes){return(
Communes.values()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Les voisines à 3 niveaux des communes`
)});
  main.variable(observer("Voisines")).define("Voisines", ["Neighbors","Communes"], function(Neighbors,Communes)
{
  const voisines = Neighbors(Communes.values().map(d => d.properties.index), 3);
  return voisines.entries();
}
);
  main.variable(observer("DistVoisines")).define("DistVoisines", ["Voisines","distancePathPolygon","GPSArr","Contours"], function(Voisines,distancePathPolygon,GPSArr,Contours){return(
Voisines.map(v =>
  distancePathPolygon(GPSArr, Contours.features[v.key].geometry.coordinates[0])
)
)});
  main.variable(observer("VoisinesNearestThan")).define("VoisinesNearestThan", ["Voisines","DistVoisines"], function(Voisines,DistVoisines){return(
dist => {
  Voisines.forEach((v, i) => (v.distance = DistVoisines[i] / 1000));
  return Voisines.filter(d => d.value === 0 || d.distance < dist);
}
)});
  main.variable(observer("Neighbors")).define("Neighbors", ["d3","NEIGHBORS"], function(d3,NEIGHBORS){return(
(nodes, depth) => {
  function Neighbors1(nodes, depth, max, neighbors) {
    nodes.forEach(d => neighbors.set(d, depth));
    if (max === 0) return neighbors;
    const newneighbors = d3.map();
    nodes.forEach(d => {
      const locales = NEIGHBORS[+d]; //Array.from(delaunay.neighbors(+d));
      locales.forEach(d => {
        if (neighbors.get(d) === undefined) newneighbors.set(d, depth);
      });
    });
    return Neighbors1(newneighbors.keys(), depth + 1, max - 1, neighbors);
  }
  return Neighbors1(nodes, 0, depth, d3.map());
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`On calcule la triangulation de delaunay des centroids des communes. C'est elle qui permet de trouver efficacement (en O(sqrt(n)) voir: https://visionscarto.net/the-state-of-d3-voronoi) les communes candidates au test d'inclusion dans leur polygone de contour en utilisant l'algorithme de Ray Casting très bien expliqué ici: https://observablehq.com/@tmcw/understanding-point-in-polygon`
)});
  main.variable(observer("delaunay")).define("delaunay", ["D3","Contours","d3"], function(D3,Contours,d3)
{
  const delaunay = D3.Delaunay.from(
    Contours.features.map(d => d3.geoPath().centroid(d))
  );
  return delaunay;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`Tout ce travail est réalisé par la fonction ZipCode`
)});
  main.variable(observer("ZipCode")).define("ZipCode", ["delaunay","inside1","Contours","WhichPolygon","Neighbors2"], function(delaunay,inside1,Contours,WhichPolygon,Neighbors2){return(
p => {
  //const p = [GPS.Longitude, GPS.Latitude];
  let nearest = delaunay.find(p[0], p[1]);
  let real = nearest;
  let type = 0; // = nearest
  if (!inside1(p, Contours.features[nearest].geometry.coordinates[0])) {
    type = 1; // =un des neighbours
    real = WhichPolygon(p, Array.from(delaunay.neighbors(nearest)));
  }
  if (real === -1) {
    type = 2; // pas trouvé on essaye les voisins de niveau 2
    real = WhichPolygon(p, Neighbors2(nearest));
  }
  /*
      if (real === -1) {
        type = 3; // pas trouvé on essaye les voisins de niveau 3
        real = WhichPolygon(p, Neighbors3(nearest));
      } //Pas trouvé de cas où cela se produit 
      */
  if (real === -1) {
    real = nearest;
    type = 4; // pas trouvé
  }
  const f = Contours.features[real];
  return {
    insee: f.properties.insee_com,
    code_postal: f.properties.postal_code,
    Longitude: p[0],
    Latitude: p[1],
    name: f.properties.nom_comm,
    type: type,
    index: f.properties.index
  };
}
)});
  main.variable(observer("Zipcodes")).define("Zipcodes", ["ZipCode"], function(ZipCode){return(
GPSs => GPSs.map(ZipCode)
)});
  main.variable(observer("Neighbors2")).define("Neighbors2", ["d3","delaunay"], function(d3,delaunay){return(
n => {
  // les voisins au 2ieme niveau
  const set = d3.set();
  Array.from(delaunay.neighbors(n)).forEach(d =>
    Array.from(delaunay.neighbors(d)).forEach(v => set.add(v))
  );
  return set.values();
}
)});
  main.variable(observer("WhichPolygon")).define("WhichPolygon", ["inside","Contours"], function(inside,Contours){return(
(point, polygons) => {
  // renvoit le premier polygone qui contient point
  let n = polygons[0];
  let i = 0;
  while (!inside(point, Contours.features[n].geometry.coordinates[0])) {
    i += 1;
    if (i >= polygons.length) return -1;
    n = polygons[i];
  }
  return n;
}
)});
  main.variable(observer("ZIPS")).define("ZIPS", ["Zipcodes","GPSArr"], function(Zipcodes,GPSArr){return(
Zipcodes(GPSArr)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Contours est un sous-ensemble de CONTOURS`
)});
  main.variable(observer("Contours")).define("Contours", ["CONTOURS"], function(CONTOURS)
{
  const rv = {
    type: "FeatureCollection",
    features: CONTOURS.features.filter(d =>
      ['31'].some(e => e === d.properties.code_dept)
    )
  };

  rv.features.forEach((d, i) => (d.properties.index = i));
  return rv;
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`## Geojson -> Topojson`
)});
  main.variable(observer("TOPO")).define("TOPO", ["topojson","Contours"], function(topojson,Contours){return(
topojson.topology(Contours.features)
)});
  main.variable(observer("Faces")).define("Faces", ["TOPO"], function(TOPO){return(
Object.values(TOPO.objects)
)});
  main.variable(observer("FACES")).define("FACES", ["d3","Faces"], function(d3,Faces){return(
d3.map(Faces, d => d.properties.nom_comm)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`### Le graphe de voisinage des communes`
)});
  main.variable(observer("NEIGHBORS")).define("NEIGHBORS", ["topojson","Faces"], function(topojson,Faces){return(
topojson.neighbors(Faces)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Topojson -> geojson`
)});
  main.variable(observer()).define(["topojson","TOPO"], function(topojson,TOPO){return(
topojson.feature(TOPO, TOPO.objects[0])
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Les contours des communes francaises. Y compris les DOM attention. Mais avec le vieux code région.`
)});
  main.variable(observer("CONTOURS")).define("CONTOURS", ["d3"], function(d3){return(
d3.json(
  'https://raw.githubusercontent.com/AlainRo/contoursFrance/master/correspondance-code-insee-code-postal.json'
)
)});
  main.variable(observer("json")).define("json", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("via-garona.json").json()
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Les données de test de l'algorithme. C'est ici qu'il faut mettre les données GPS dont vous cherchez le code commune. Ici le tracé de via garona.`
)});
  main.variable(observer("GPSArr")).define("GPSArr", ["json"], function(json){return(
json[0].fields.geo_shape.coordinates
)});
  main.variable(observer("projection")).define("projection", ["d3","Communes"], function(d3,Communes){return(
d3.geoMercator().fitExtent([[20, 20], [1200 - 20, 800 - 20]], {
  type: "FeatureCollection",
  features: Communes.values()
})
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3
  .geoPath() // Projection et centrage automatique des données dans la carte
  .projection(projection)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Distance from a path to a polygon
Approximé par le minimum des distances des points de la path au polygone`
)});
  main.variable(observer("distancePathPolygon")).define("distancePathPolygon", ["d3","distancePointPolygon"], function(d3,distancePointPolygon){return(
(path, polygon) =>
  d3.min(path.map(d => distancePointPolygon(polygon, d)))
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Distance from a segment to a polygon
Trop compliqué, j'abandonne`
)});
  main.variable(observer()).define(["Contours"], function(Contours){return(
Contours.features[34].geometry.coordinates[0]
)});
  main.variable(observer()).define(["d3","GPSArr","distancePointPolygon","Contours"], function(d3,GPSArr,distancePointPolygon,Contours){return(
d3.min(
  GPSArr.map(d =>
    distancePointPolygon(Contours.features[363].geometry.coordinates[0], d)
  )
)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Distance from a point to a polygon
Minimum distance from a point to any edge.`
)});
  main.variable(observer("distancePointPolygon")).define("distancePointPolygon", ["flyingDistance","distancePointSegment"], function(flyingDistance,distancePointSegment){return(
function(segments, point) {
  let mindist = 1000000;
  if (segments.length === 0) return mindist;
  let p0 = segments[0];
  mindist = flyingDistance(p0, point);
  segments.slice(1).forEach(s => {
    const p1 = s;
    mindist = Math.min(
      mindist,
      flyingDistance(distancePointSegment(p0, p1, point), point)
    );
    p0 = p1;
  });
  return mindist;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Distance from a point p3 to a segment p1, p2`
)});
  main.variable(observer("distancePointSegment")).define("distancePointSegment", ["interpolate","project"], function(interpolate,project){return(
(p1, p2, p3) =>
// renvoit le point de projection. La distance reste à calculer
  interpolate(p1, p2, Math.max(0, Math.min(1, project(p1, p2, p3))))
)});
  main.variable(observer("distance")).define("distance", function(){return(
function distance([x1, y1], [x2, y2]) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
)});
  main.variable(observer("interpolate")).define("interpolate", function(){return(
function interpolate([x1, y1], [x2, y2], t) {
  return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
}
)});
  main.variable(observer("project")).define("project", function(){return(
function project([x1, y1], [x2, y2], [x3, y3]) {
  const x21 = x2 - x1,
    y21 = y2 - y1;
  const x31 = x3 - x1,
    y31 = y3 - y1;
  return (x31 * x21 + y31 * y21) / (x21 * x21 + y21 * y21);
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Point inside a polygon`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`La version d3 de @fil`
)});
  main.variable(observer("inside1")).define("inside1", ["d3"], function(d3){return(
(point, polygon) => d3.polygonContains(polygon, point)
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Une version maison`
)});
  main.variable(observer("inside")).define("inside", function(){return(
function inside(point, vs) {
  // ray-casting algorithm based on
  // Wikipedia proof

  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`## Flying distance between two GPS points`
)});
  main.variable(observer("flyingDistance")).define("flyingDistance", function(){return(
function flyingDistance(p1, p2) {
  const R = 6371e3; // metres
  const φ1 = (p1[1] * Math.PI) / 180; // φ, λ in radians
  const φ2 = (p2[1] * Math.PI) / 180;
  const Δφ = ((p2[1] - p1[1]) * Math.PI) / 180;
  const Δλ = ((p2[0] - p1[0]) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in meters
  return d;
}
)});
  main.variable(observer()).define(["md"], function(md){return(
md`Distance Toulouse Saint Gaudens`
)});
  main.variable(observer()).define(["flyingDistance","FACES"], function(flyingDistance,FACES){return(
flyingDistance(
  FACES.get("TOULOUSE").properties.geo_point_2d,
  FACES.get("SAINT-GAUDENS").properties.geo_point_2d
)
)});
  main.variable(observer("colors")).define("colors", function(){return(
["yellow", "green", "darkgreen"]
)});
  main.variable(observer()).define(["md"], function(md){return(
md`---`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`# Libraries`
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson")
)});
  main.variable(observer("D3")).define("D3", ["require"], function(require){return(
require("d3-delaunay@4")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5", "d3-polygon@2")
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  const child2 = runtime.module(define2);
  main.import("table", child2);
  const child3 = runtime.module(define3);
  main.import("swatches", child3);
  return main;
}