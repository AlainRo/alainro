function columnChart() {
  var margin = {top: 30, right: 10, bottom: 0, left: 50},
      width = 420,
      height = 420,
      xRoundBands = 0.2,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.scale.ordinal(),
      yScale = d3.scale.linear(),
      yAxis = d3.svg.axis().scale(yScale).orient("right").ticks(1),
      xAxis = d3.svg.axis().scale(xScale),
      yScaleDomain = undefined; // To impose a given domain
      

  function chart(selection) {
    selection.each(function(data) {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      data = data.map(function(d, i) {
        return [xValue.call(data, d, i), yValue.call(data, d, i)];
      });
    
      // Update the x-scale.
      xScale
          .domain(data.map(function(d) { return d[0];} ))
          .rangeRoundBands([0, width - margin.left - margin.right], xRoundBands);
       
      function minmax (l) { // Pour avoir l'axe zéro dans la zone
        return [Math.min(0, l[0]),Math.max(0,l[1])];
      }

      // Update the y-scale.
      yScale
          .domain((yScaleDomain === undefined) ?
                  minmax(d3.extent(data.map(function(d) { return d[1];}))) :
                  yScaleDomain)
          .range([height - margin.top - margin.bottom, 0])
          .nice();
          

      // Select the svg element, if it exists.
      var ndata = (data.length ===0) ? [] : [data];
      var svg = d3.select(this).selectAll("g.chart").data(ndata);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter()
          .append("g")
          .attr('class', 'chart')
          .append("g");
      gEnter.append("g").attr("class", "bars");
      gEnter.append("g").attr("class", "y axis");
      gEnter.append("g").attr("class", "x axis");
      gEnter.append("g").attr("class", "x axis zero");

      svg.exit().remove();

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

     // Update the bars.
      var bar = svg.select(".bars").selectAll(".bar").data(data);
      bar.enter().append("rect")
          .on('mousedown', function () {console.log('mousedown');})
          .on('mouseover', function () {mover(+this.attributes.index.value);})
          .call(d3.helper.tooltip()
            .attr({class :'tooltip'})
            .style('color', 'red')
            .text(function(d, i){ return d[0] + ' -> ' + d[1];}));

      bar.exit().remove();
      bar.transition()
        .attr("class", function(d, i) { return d[1] < 0 ? "bar negative" : "bar positive"; })
          .attr("x", function(d) { return X(d); })
          .attr("y", function(d, i) {
              return d[1] < 0 ? Y0() : Y(d); })
          .attr("value", function (d) {return d[1];})
          .attr("index", function (d,i) {return i;})
          .attr("width", xScale.rangeBand())
          .attr("height", function(d, i) {
              return Math.abs( Y(d) - Y0() ); });

    // x axis at the bottom of the chart
//     g.select(".x.axis")
//        .attr("transform", "translate(0," + (height - margin.top - margin.bottom) + ")")
//        .call(xAxis.orient("bottom"));
 /*   
    // zero line
     g.select(".x.axis.zero")
        .transition()
        .attr("transform", "translate(0," + Y0() + ")")
        .call(xAxis.tickFormat("").tickSize(0));
    
    
      // Update the y-axis.
     g.select(".y.axis")
        .transition()
        .attr("transform", "translate(" + (width - margin.right) + ", 0)")
        .call(yAxis.tickValues(
            function () {
              var p = d3.extent(data.map(function(d) { return d[1];}));
              p.push(0);
              return p;}).tickSize(0));
*/
  });
}


// The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(d[0]);
  }

  function Y0() {
    return yScale(0);
  }

  // The x-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  chart.yScaleDomain = function(_) {
    if (!arguments.length) return yScaleDomain;
    yScaleDomain = _;
    return chart;
  };


  return chart;
}
