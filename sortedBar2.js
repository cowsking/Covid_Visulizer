function sortedBar(choose, j) {
    if (j == 1){
        // barchart.selectAll('rect').remove();
        // barchart.selectAll('text').remove();
        // barchart.selectAll('line').remove();
        // d3.selectAll('g.axis g.tick').remove();
        barchart = d3.select("svg#barchart");
        barchart.selectAll('g').remove();
    }

    function randomRgbColor() {
        // const r = Math.floor(Math.random() * 256);
        // const g = Math.floor(Math.random() * 256);
        // const b = Math.floor(Math.random() * 256);
        return `steelblue`;
    }
    function searchDate(i) {
        time = (i + 1) * 1000 * 60 * 60 * 24 + start_day.getTime();
        time = new Date(time);
        year = String(time.getFullYear());
        month = String(time.getMonth() + 1);
        day = String(time.getDate());
        return (year + '-' + month + '-' + day);
    }
    choice=['total_cases','total_deaths','people_fully_vaccinated_per_hundred'];

    if (j == 1){
        barchart.selectAll('rect').remove();
        barchart.selectAll('text').remove();
        barchart.selectAll('line').remove();
        d3.selectAll('g.axis g.tick').remove();
        barchart.selectAll('g').remove();
    }
     barchart = d3.select("svg#barchart");
     barWidth = barchart.attr("width");
     barHeight0 = barchart.attr("height");
     barMargin = {
        top: 10,
        right: 10,
        bottom: 50,
        left: 50
    };
    const chartWidth = barWidth - barMargin.left - barMargin.right;
    const chartHeight = barHeight0 - barMargin.top - barMargin.bottom;

    let annotations = barchart.append("g").attr("id", "annotations");
    let chartArea = barchart.append("g").attr("id", "points")
        .attr("transform", `translate(${barMargin.left},${barMargin.top})`);

        const numLoc = location_list.length;
        const count = 10;
        const duration = 0.000001;
        const barPadding = 20;
        const barHeight = (chartHeight - (barPadding * count)) / count;
        const getDate = () => dateIndex;
        let dateIndex = 601;
        let date = dateIndex;
        let dataSlice = [];
        let chart = null,
            scale = null,
            axis = null,
            svg = null,
            dateTitle = null;

        function compareNum(x, y) {
            if (x < y) {
                return -1;
            } else if (x == y) {
                return 0;
            } else if (x > y) {
                return 1;
            }
        }

    const formatData = () => {
        lst = [];
        for (n = 0; n < 702; n++) {
            for (i = 0; i < numLoc; i++) {
                if (data[n][location_list[i]] != null) {
                    temp = data[n][location_list[i]];
                    // console.log(temp);
                    if (temp[choice[choose]] != NaN) {
                        lst.push({
                            value: Number(temp[choice[choose]]),
                            name: temp.location,
                            lastValue: function () {
                                if (data[n - 1][location_list[i]] != NaN) {
                                    if (data[n - 1][location_list[i]][choice[choose]] != NaN) {
                                        return Number(data[n - 1][location_list[i]][choice[choose]]);
                                    }
                                }
                            },
                            date: n,
                            color: randomRgbColor()
                        });
                    }
                }
            }
        }
        console.log('fuck')
        console.log(lst);
    }
        const sliceData = () =>
            dataSlice = lst.filter(d => d.date === date).sort((a, b) => b.value - a.value).slice(0, count);
        console.log(dataSlice);

        const createScale = () =>
            scale = d3.scaleLinear().domain([0, d3.max(lst, d => d.value)]).range([0, chartWidth]);

        const renderAxis = () => {
            createScale();

            axis = d3.axisTop().scale(scale).ticks(5).tickPadding(10).tickSize(0);

            chartArea.append('g')
                .classed('axis', true)
                .style('transform', `translate3d(${barMargin.left}px, ${barMargin.top+10}px, 0)`)
                .call(axis);
        }
        const updateAxis = () => {
            createScale();

            axis.scale().domain([0, d3.max(dataSlice, d => d.value)]);

            barchart.select('g.axis')
                .transition().duration(duration).ease(d3.easeLinear)
                .call(axis);

            d3.selectAll('g.axis g.tick text').attr('font-size', 14);
        }
        const renderAxisLine = () => {
            d3.selectAll('g.axis g.tick').select('line.grid-line').remove();
            d3.selectAll('g.axis g.tick').append('line')
                .classed('grid-line', true)
                .attr('stroke', 'black')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', chartHeight);
        }
        const renderDateTitle = () => {
            dateTitle = chartArea.append('text')
                .classed('date-title', true)
                .text("date")
                .attr('x', chartWidth - barMargin.top)
                .attr('y', chartHeight - barMargin.left)
                .attr('fill', 'rgb(128, 128, 128)')
                .attr('font-size', 40)
                .attr('text-anchor', 'end')
        }
        const calTranslateY = (i, end) => {
            if (dateIndex === 1 || end) {
                return (barHeight + barPadding) * i + (barPadding / 2);
            } else {
                return (barHeight + barPadding) * (count + 1);
            }
        }
        const createChart = () => {
            chart = chartArea.append('g')
                .classed('chart', true)
                .style('transform', `translate3d(${barMargin.left}px, ${barMargin.top}px, 0)`);
        }
        const renderChart = () => {
            const bars = chart.selectAll('g.bar').data(dataSlice, (d) => d.name);

            let barsEnter;

            barsEnter = bars.enter()
                .append('g')
                .classed('bar', true)
                .style('transform', (d, i) => `translate3d(0, ${calTranslateY(i)}px, 0)`);

            dateIndex > 1 && barsEnter
                .transition().duration(this.duration)
                .style('transform', (d, i) => `translate3d(0, ${calTranslateY(i, 'end')}px, 0)`);

            barsEnter.append('rect')
                .style('width', d => scale(d.value))
                .style('height', barHeight + 'px')
                .style('fill', d => d.color);

            barsEnter.append('text')
                .classed('label', true)
                .text(d => d.name)
                .attr('x', '-5')
                .attr('y', barPadding)
                .attr('font-size', 14)
                .style('text-anchor', 'end');

            // barsEnter.append('text')
            //     .classed('value', true)
            //     .text(d => d.value)
            //     .attr('x', d => scale(d.value) - 30)
            //     .attr('y', barPadding);

            // 更新模式
            bars.transition().duration(duration).ease(d3.easeLinear)
                .style('transform', (d, i) => 'translate3d(0, ' + calTranslateY(i, 'end') + 'px, 0)')
                .select('rect')
                .style('width', d => scale(d.value) + 'px');

            bars
                .select('text.value')
                .transition().duration(duration).ease(d3.easeLinear)
                .attr('x', d => scale(d.value) + 10)
                .tween('text', function (d) {
                    const textDom = this;
                    const i = d3.interpolateRound(d.lastValue, d.value);
                    return (t) => textDom.textContent = i(t);
                });

            // 退出模式
            bars.exit()
                .transition().duration(duration).ease(d3.easeLinear)
                .style('transform', function (d, i) {
                    return 'translate3d(0, ' + calTranslateY(i) + 'px, 0)';
                })
                .style('width', function (d) {
                    return scale(d.value) + 'px';
                })
                .remove();
        }

        function createTicker() {
            const ticker = d3.interval(() => {
                if (dateIndex > 600 && dateIndex < 701) {
                    dateIndex++;
                    date = getDate();
                    dateTitle.text(searchDate(date));
                    sliceData();
                    updateAxis();
                    renderAxisLine();
                    renderChart();
                } else {
                    ticker.stop();
                }
            }, duration);
        }

        function locator(i) {
            const ticker = d3.interval(() => {
                if (dateIndex == i) {
                    dateIndex ++;
                    date = getDate();
                    dateTitle.text(searchDate(date));
                    sliceData();
                    d3.selectAll('g.axis g.tick').remove();
                    updateAxis();
                    renderAxisLine();
                    renderChart();
                } else {
                    ticker.stop();
                }
            }, duration);
        }

        const init = () => {
            formatData(dateIndex); // 格式化数据
            renderAxis(); // 渲染坐标轴
            renderAxisLine(); // 渲染指示线
            renderDateTitle(); // 渲染日期
            createChart(); // 创建图表
            renderChart(); // 渲染图表
            createTicker(); // 创建定时器
        }
        // init();
        const chooseDate = (i) => {
            dateIndex = i
            formatData(dateIndex); // 格式化数据
            renderAxis(); // 渲染坐标轴
            renderAxisLine(); // 渲染指示线
            renderDateTitle(); // 渲染日期
            createChart(); // 创建图表
            renderChart(); // 渲染图表
            locator(dateIndex); // 创建定时器
        }
        init();
        reqdate = document.getElementById("timeSlider");
        reqdate.onchange = function () {
            barchart.selectAll('rect').remove();
            barchart.selectAll('text').remove();
            barchart.selectAll('line').remove();
            d3.selectAll('g.axis g.tick').remove();
            val = reqdate.value;
            chooseDate(val);
            console.log(val)
        };
    }
