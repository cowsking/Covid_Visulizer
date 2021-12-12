function makeFlightData() {
    var requestData = async function () {
        const airdata = await d3.json("./airline_percentage.json");
        console.log(airdata);
        console.log("asdfasdfas")
        const flight = d3.select("div#flight");
        svgF = flight
            .append("svg")
            .attr("width", 1200)
            .attr("height", 580)
            .style("margin", 20)
            .style("background", "#0e151f");
        marginF = 25;
        widthF = 1100;
        heightF = 580;
        chartWidth = widthF - marginF - marginF;
        chartHeight = heightF - marginF - marginF;
        var chartArea = svgF
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
            createBar(value - sliderW);
            createMonth();
            createCountry();
            createlabel();
        }

        function createBar(sliderWidth) {
            chartArea.select("rect.slideee").remove();
            chartArea.append("rect")
                .classed('slideee', true)
                .attr("width", sliderW)
                .attr("height", sliderL)
                .attr("x", sliderWidth)
                .attr("y", 0)
                // .attr("fill", "#0e151f")
                .attr("fill", "white")
                .attr("opacity", 0.8);
            svgF.selectAll("text").remove();
            svgF.append("text").attr("x", 40 + sliderWidth).attr("y", 575).text("Year 2020").style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "#E2ECFF").attr("opacity", 1);
            svgF.append("text").attr("x", sliderWidth - 40).attr("y", 575).text("Year 2019").style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "#E2ECFF").attr("opacity", 1);
        }

        function createCountry() {
            temp = 0;
            airdata.forEach(d => {
                svgF.append("text").attr("x", 0).attr("y", 37 + temp * 26.7).text(d.country).style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "#E2ECFF").attr("opacity", 1);
                temp = temp + 1;
            });
        }

        function createMonth() {
            ini = -35;
            Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            for (i = 0; i < 12; i++) {
                ini = ini + 88;
                svgF.append("text").attr("x", ini).attr("y", 10).text(Month[i]).style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "#E2ECFF").attr("opacity", 1);
            }
        }

        function createlabel() {
            const labelList = ['0~20%','20%~40%','40%~60%','60%`80%','80%~100%'];
            svgF.append("text").attr("x", 1090).attr("y", 50).text("Flight Density").style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "#E2ECFF").attr("opacity", 1);
            for(i=0; i<5; i++){
                svgF.append("rect").attr("width", 10).attr("height", 10).attr("x", 1090).attr("y", 70+i*15).style("fill", airColor[i]).attr("opacity", 1);
                svgF.append("text").attr("x", 1110).attr("y", 80+i*15).text(labelList[i]).style("font-size", "15px").style("font-weight", "600").attr("alignment-baseline", "middle").attr("fill", "#E2ECFF").attr("opacity", 1);
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
            numBlock = ((sliderWidth - marginF) / chartWidth) * 36;

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