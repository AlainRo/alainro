var   data = [
  {"title":"Satisfaction","subtitle":"Impression générale","ranges":[3,5,10],"measures":[3],"markers":[8]},
  {"title":"Prix","subtitle":"Qualité/Prix","ranges":[4,7,10],"measures":[7],"markers":[7]},
  {"title":"Offre","subtitle":"Diversité","ranges":[5,6,10],"measures":[9],"markers":[8]},
  {"title":"SAV","subtitle":"Délai de réponse","ranges":[4,7,10],"measures":[8.5],"markers":[7]},
  {"title":"Parking","subtitle":"Nombre de places","ranges":[2,8,10],"measures":[9],"markers":[8]},
  {"title":"Promotions","subtitle":"Bonnes affaires","ranges":[3,5,10],"measures":[9],"markers":[6]}
];

// Trouve la zone active
function rangesup(d,k) {return d.map(function(e, i , array)
    {return (e<=k)&&(array[i+1]>k||i===2)?1:0;})
;}

      
var rangemeas = data[0].ranges.map(function (e) {return data[0].measures.concat(e);});

function getData() {
  //getGoogle();
  drawbullets(data);
 //   getCSV();

}

window.onload = function() {getData();};
//setInterval(function() {getData();}, 10000);

var timerId = 0;
var timerNb = 10;

window.onclick = function() {
  if (timerId===0)
    {timerNb = 10;
      timerId=setInterval(function() {if (timerNb >0) {timerNb = timerNb - 1;getrandom(); } else {clearInterval(timerId); timerId=0;}}, 2000);
      getrandom();
    }
    else {clearInterval(timerId); timerId=0;}
};

var width = 320,
    height = 60,
    margin = {top: 10, right: 10, bottom: 10, left: 10};

var chart = nv.models.bulletChart()
    .width(width - margin.right - margin.left)
    .height(height - margin.top - margin.bottom)
    .tooltips(false);

function getCSV() {
    d3.csv("http://localhost:8000/kheolia.csv", makecsv);
}
function makecsv(data, i) {
    data.forEach(
      function(e) {decodeFrenchNumber(e);
                  decode(e);});
    drawbullets(data, i);
}

function getGoogle() {
    Tabletop.init( { key: public_spreadshseet_url,
                     callback: drawbullets,
                     simpleSheet: true,
                     parseNumbers: true,
                     postProcess: decode
                     }
                      );
      }

function decodeFrenchNumber(x){
    for (var i in x)
    { var y = x[i].replace(/[^\d\,\-\ ]/g, '');
      var z = parseFloat(y.replace(/[\,]/g, '.'));
      if (!isNaN(z)){x[i]=z;}
    }
}

function decode(elt) {
    elt.ranges=[elt.min,elt.ok,elt.max];
    elt.measures=[elt.measure]; //,elt.measure];
    elt.markers=[elt.target];
}




function drawbullets(data,i) {

  console.log(data);
 // alert("Successfully processed " + data.length + " rows!");
  var vis = d3.select("#chart").selectAll("svg")
//      .data(data, function(d) {return d.order});

      .data(data);
        //, function(d) {return d.title.concat(d.subtitle);});

  var entvis = vis.enter().append("svg")
      .attr("class", "bullet nvd3")
      .attr("width", width)
      .attr("height", height);

  vis
      .transition()
      .duration(1000)
      .call(chart);

//  var rn = d3.select("chart").select("nv-range nv-s2");
//  rn.attr("class","nv-range nv-s2 b");


  vis.exit().remove();


}
//----------- Randomize
function getrandom () {
  var vis = d3.select("#chart").selectAll("svg");
    vis.datum(randomize);

    vis
      .transition()
      .duration(1000)
      .call(chart);
  }

function randomize(d) {
  if (!d.randomizer) d.randomizer = randomizer(d);
  //d.ranges = d.ranges.map(d.randomizer);
  d.markers = d.measures;
  d.measures = d.measures.map(d.randomizer);
  //d.markers = d.markers.map(d.randomizer);
  return d;
}

function randomizer(d) {
  var k = 8;
  return function(d) {
    return Math.max(0, 2 + k * (Math.random()));
  };
}



