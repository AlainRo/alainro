//IE9
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        'use strict';
        var i, len;
        for (i = 0, len = this.length; i < len; ++i) {
            if (i in this) {
                fn.call(scope, this[i], i, this);
            }
        }
    };
}
/*
 window.onload = function() {getGoogle();};
 function getGoogle() {
    Tabletop.init( { key: '0AiAyoEbUuwl7dE5vOV9uczNweFBnSnJGaVBJVm5zQmc',
                     callback: function(data,tabletop) {console.log(data);
                      drawdashboard(data);},
                     simpleSheet: true,
                     parseNumbers: true
                     }
                      );
      };
    */
/**********************************
* Step0: Load data from json file *
**********************************/

// load data from a csv file
var smv = d3.dsv(";", "text/semi-column"); // french format

smv("tel.csv", function (error, data) {
//d3.csv("tel1.csv", function (error, data) {
//function drawdashboard (data) {
  // format our data
//  var dtgFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");
  var dtgFormat = d3.time.format("%d/%m/%yT%H:%M:%S");
  var semFormat = d3.scale.ordinal()
    .domain([1,2,3,4,5,6,7])
    .range(["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]);

  data.forEach(function(d) {
    d.dtg   = dtgFormat.parse(d.origintime);
    //d.lat   = +d.latitude;
    //d.long  = +d.longitude;
    d.mag   = d3.round(+d.nb,0);
    d.sem   = d3.round(+d.semaine,0);
    //d.depth = d3.round(+d.depth,0);
  });

/******************************************************
* Step1: Create the dc.js chart objects & ling to div *
******************************************************/

  //var magnitudeChart = dc.barChart("#dc-magnitude-chart");
  var hourChart = dc.barChart("#dc-hour-chart");
  var weekChart = dc.rowChart("#dc-week-chart");
  var timeChart = dc.barChart("#dc-time-chart");
  //var dataTable = dc.dataTable("#dc-table-graph");
  var datacounter = dc.dataCount("#dc-data-count");

/****************************************
*   Run the data through crossfilter    *
****************************************/

  var facts = crossfilter(data);  // Gets our 'facts' into crossfilter
  var all = facts.groupAll();

/******************************************************
* Create the Dimensions                               *
* A dimension is something to group or filter by.     *
* Crossfilter can filter by exact value, or by range. *
******************************************************/

  // for Magnitude
  var magValue = facts.dimension(function (d) {
    return d.mag;       // group or filter by magnitude
  });
  var magValueGroupSum = magValue.group()
    .reduceSum(function(d) { return d.mag; });  // sums the magnitudes per magnitude
  var magValueGroupCount = magValue.group()
    .reduceCount(function(d) { return d.mag; });// counts the number of the facts by magnitude

  // For datatable
  var timeDimension = facts.dimension(function (d) {
    return d.dtg;
  }); // group or filter by time

  // for Depth
  /*var depthValue = facts.dimension(function (d) {
    return d.depth;
  });
  var depthValueGroup = depthValue.group();
  */
  // define a daily volume Dimension
  var volumeByDay = facts.dimension(function(d) {
    var nd = new Date(d.dtg);
    var h = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate());
    return h;
  });
  // map/reduce to group sum
  var volumeByDayGroup = volumeByDay.group()
    .reduceSum(function(d) { return d.mag;});

 // define an hourly Dimension
 var volumeByHour = facts.dimension(function(d) {
    var h = new Date(d.dtg);
    var r =h.getHours();
    if (r>2 ){return r;}
    else {return r+24;}
  });

 var hourValueGroupCount = volumeByHour.group()
    .reduceSum(function(d) { return d.mag;});

/* essai de groupement avec percentage du total
 var hourValueGroupCount = volumeByHour.group().reduce()
// add
  function(p,v) {
      ++p.count;
      p.sum += v.d;
      return p;
  },
// remove
  function (p,v) {
      --p.count;
      p.sum -= v.d;
      return p;
  },
// init
  function () {
      count:0;
      sum:0;

  }
  );  
*/
 var volumeByWeekDay = facts.dimension(function(d) {
    return d.sem;
  });
   // map/reduce to group sum
  var volumeByWeekDayGroup = volumeByWeekDay.group()
    .reduceSum(function(d) { return d.mag;});

/***************************************
*   Step4: Create the Visualisations   *
***************************************/

  hourChart.width(500)
    .height(200)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dimension(volumeByHour)                // the values across the x axis
    .group(hourValueGroupCount)              // the values on the y axis
  .transitionDuration(500)
    .colors(["#4D4E4D","#2760A4"])
    .colorDomain([0,1])
    .colorAccessor(function(d){if ((d.value < 9) || (d.value > 20)) {return 0;} else {return 1;}})
    .centerBar(true)
  .gap(2)                                            // bar width Keep increasing to get right then back off.
    .x(d3.scale.linear().domain([4, 27]))
 
  .elasticY(true)
  .xAxis().tickFormat(function(v) {return v;});

  var dmin = new Date(volumeByDay.bottom(1)[0].dtg);
  var dmax = new Date(volumeByDay.top(1)[0].dtg);
  var dofweek = dmin.getDay();
  // time graph
  timeChart.width(1000)
    .height(200)
    .margins({top: 10, right: 10, bottom: 20, left: 40})
    .dimension(volumeByDay)
    .group(volumeByDayGroup)
    .transitionDuration(500)
    .colors(["#4D4E4D","#2760A4"])

    .colorAccessor(function(d,i){if ((i + dofweek) % 7 < 2) {return 0;} else {return 1;}})

    .centerBar(true)
    .gap(3)
  .elasticY(true)
    .x(d3.time.scale().domain([dmin, dmax])) // scale and domain of the graph
    .xAxis();



    weekChart
            .width(500) // (optional) define chart width, :default = 200
            .height(200) // (optional) define chart height, :default = 200
            .group(volumeByWeekDayGroup) // set group
            .dimension(volumeByWeekDay) // set dimension;
            .label(function(d){return semFormat(d.key);})
            .colors(["#4D4E4D","#2760A4"])
            .colorAccessor(function(d,i){if ((i  % 7 == 4)|| (i % 7 == 5)) {return 0;} else {return 1;}})

            .elasticX(true);

    datacounter
      .dimension(facts)
      .group(all);

/****************************
* Step6: Render the Charts  *
****************************/
      
  dc.renderAll();
  //d3.select("#dc-data-count").select(".filter-count").text("123");
  
});
  