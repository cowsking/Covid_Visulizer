function makeFlightData(){
    var requestData = async function () {
        const airdata = await d3.json("./airline_percentage.json");
        console.log(airdata);

        const flight = d3.select("div#flight");
        const svg = flight
            .append("svg")
            .attr("width", 1200)
            .attr("height", 580)
            .style("margin", 20);
        const width = 1100;
        const height = 580;
        margin = 25;
        const chartWidth = width - margin - margin;
        const chartHeight = height - margin - margin;
        var chartArea = svg
            .append("g")
            .attr("transform", "translate(" + 25 + "," + 25 + ")");

        const airColor = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
        const airExtent = [0, 1];
        const airScale = d3.scaleQuantile()
            .domain(airExtent)
            .range(airColor);

        const sliderL = chartHeight;
        const sliderW = 10;
        updateBlock(300);
        const incomeSlider = document.getElementById("incomeSlider");
        incomeSlider.onchange = function () {
            val = incomeSlider.value
            updateBlock(val);
            console.log(incomeSlider.value);
        };
        
        function updateBlock(value) {
            createSecondChart(1100);
            createFirstChart(value);
            createBar(value-sliderW);
            createMonth();
            createCountry();
        }

        function createBar(sliderWidth) {
            chartArea.append("rect")
                .attr("width", sliderW)
                .attr("height", sliderL)
                .attr("x", sliderWidth)
                .attr("y", 0)
                .attr("fill", "white")
                .attr("opacity", 0.8);
            svg.selectAll("text").remove();
            svg.append("text").attr("x", 40 + sliderWidth).attr("y", 575).text("Year 2020").style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "grey").attr("opacity", 1);
            svg.append("text").attr("x", sliderWidth - 40).attr("y", 575).text("Year 2019").style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "grey").attr("opacity", 1);
        }
        function createCountry(){
            temp = 0;
            airdata.forEach(d => {
                svg.append("text").attr("x", 0).attr("y", 37+temp*26.7).text(d.country).style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "grey").attr("opacity", 1);
                temp = temp+1;
            });
        }
        function createMonth(){
            ini = -35;
            Month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            for (i = 0; i<12; i++){
                ini = ini+88;
                svg.append("text").attr("x", ini).attr("y", 10).text(Month[i]).style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "grey").attr("opacity", 1);
            }
        }
        function createFirstChart(sliderWidth) {

            const rectNumX = 35;
            const rectNumY = 19;
            const interval = 2;
            const rectLength = 23;

            var dict = new Array();
            for (var i = 0; i <= rectNumX; i++) {
                for (var j = 0; j <= rectNumY; j++) {
                    dict.push({
                        "a": i,
                        "b": j
                    });
                }
            }

            const aExtent = d3.extent(dict, d => d['a']);
            const bExtent = d3.extent(dict, d => d['b']);
            const aScale = d3.scaleLinear().domain(aExtent).range([rectLength / 2, chartWidth - rectLength /
                2
            ]);
            const bScale = d3.scaleLinear().domain(bExtent).range([chartHeight - rectLength / 2, rectLength /
                2 +
                interval
            ]);

            function airChoose(j, i) {
                i = 201901 + (i - i % 3) / 3;
                return airScale(airdata[j][i])
            }
            // console.log(airChoose(0,202001))
            numBlock = ((sliderWidth - margin) / chartWidth) * 36;

            for (var i = 0; i <= numBlock; i++) {
                for (var j = 0; j <= rectNumY; j++) {
                    chartArea.append("rect")
                        .attr("width", rectLength)
                        .attr("height", rectLength)
                        .attr("x", aScale(i) - rectLength / 2)
                        .attr("y", bScale(j) - rectLength / 2)
                        .attr("fill", airChoose(j, i))
                }
            } // Draw the axis
        }

        function createSecondChart(i) {

            const rectNumX = 35;
            const rectNumY = 19;
            const interval = 2;
            const rectLength = 23;

            var dict = new Array();
            for (var i = 0; i <= rectNumX; i++) {
                for (var j = 0; j <= rectNumY; j++) {
                    dict.push({
                        "a": i,
                        "b": j
                    });
                }
            }

            const aExtent = d3.extent(dict, d => d['a']);
            const bExtent = d3.extent(dict, d => d['b']);
            const aScale = d3.scaleLinear().domain(aExtent).range([chartWidth - rectLength / 2, rectLength /
                2
            ]);
            const bScale = d3.scaleLinear().domain(bExtent).range([chartHeight - rectLength / 2, rectLength /
                2 + interval
            ]);

            function airChoose(j, i) {
                i = 202012 - (i - i % 3) / 3;
                return airScale(airdata[j][i])
            }
            // console.log(airChoose(0,202001))
            for (var i = 0; i <= rectNumX; i++) {
                for (var j = 0; j <= rectNumY; j++) {
                    chartArea.append("rect")
                        .attr("width", rectLength)
                        .attr("height", rectLength)
                        .attr("x", aScale(i) - rectLength / 2)
                        .attr("y", bScale(j) - rectLength / 2)
                        .attr("fill", airChoose(j, i))
                }
            } // Draw the axis

        }
    }
    requestData();
}
