// var csvData;

// d3.csv("assets/data/data.csv").then(function(data) {
//     csvData=data;
//     //console.log(csvData);

//     var states=[]
//     var obesityRate=[]
//     var incomeLevel=[]
//     csvData.forEach((entry)=> {
//         var state=entry.abbr;
//         var income=entry.income;
//         var obese=entry.obesity;
//         states.push(state);
//         obesityRate.push(obese);
//         incomeLevel.push(income);

//     });

//     console.log(states);

//     var plotSpace= d3.select('#scatter');

//     var trace={
//         x: incomeLevel,
//         y: obesityRate,
//         text: states,
//         marker: {
//             size:25,
//             color: 'aqua'
//         },
//         mode: 'markers+text'
//     };

//     var layout={
//         title: 'The Health of the Nation',
//         xaxis:{
//             title: 'Income Level'
//         },
//         yaxis:{
//             title: 'Obesity Rate'
//         }
//     };

//     Plotly.newPlot('scatter', [trace], layout)

    
// });


d3.csv("assets/data/data.csv").then(function(data) {
    var csvData=data;

    var states=[]
    var obesityRate=[]
    var incomeLevel=[]
    csvData.forEach((entry)=> {
        var state=entry.abbr;
        var income=entry.income;
        var obese=entry.obesity;
        states.push(state);
        obesityRate.push(obese);
        incomeLevel.push(income);

    });

    console.log(states);

    var svgWidth=1250;
    var svgHeight=500;

    var chartMargins={
        top: 20,
        bottom: 20,
        left: 70,
        right: 50
    };

    var chartWidth=svgWidth-chartMargins.left-chartMargins.right;
    var chartHeight=svgHeight-chartMargins.top-chartMargins.bottom;

    var svg=d3.select('#scatter')
        .append('svg')
        .attr('height', svgHeight)
        .attr('width', svgWidth);

    var chartGroup= svg.append('g')
        .attr('transform', `translate(${chartMargins.left}, ${chartMargins.top})`);


    //Scales
    var xScale=d3.scaleLinear()
        .domain(d3.extent(incomeLevel))
        .range([0, chartWidth]);

    var yscale=d3.scaleLinear()
        .domain(d3.extent(obesityRate))
        .range([chartHeight, 0]);

    //Axes
    var xAxis=d3.axisBottom(xScale);
    var yAxis=d3.axisLeft(yscale);

    chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append('g')
        .call(yAxis);

    chartGroup.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('x', -250)
        .text('Obesity Rate');
        


    //Create Markers
    chartGroup.selectAll('point')
        .data(csvData)
        .enter()
        .append("circle")
        .attr('cx', d => xScale(d.income))
        .attr('cy', d => yscale(d.obesity))
        .attr('r', 15)
        .attr('fill', 'aqua')
        .attr('stroke-width', 1)
        .attr('stroke', 'black');
    
    chartGroup.selectAll('.stateText')
        .data(csvData)
        .enter()
        .append("text")
        .attr('x', d => xScale(d.income-280))
        .attr('y', d => yscale(d.obesity-.14))
        .text(d => (d.abbr))
        .attr('stroke-width', 1)
        .attr('stroke', 'black');

    
    



});