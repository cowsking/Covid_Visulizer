function sortedBarini(choose, j) {

    choice=['total_cases','total_deaths','people_fully_vaccinated_per_hundred'];

    if (j == 1){
        // barchart.selectAll('rect').remove();
        // barchart.selectAll('text').remove();
        // barchart.selectAll('line').remove();
        // d3.selectAll('g.axis g.tick').remove();
        barchart = d3.select("svg#barchart");
        barchart.selectAll('g').remove();
    }
    function randomRgbColor() {
        if (choose == 0){
            return '#FF5252';
        }
        if (choose == 1){
            return '#BB29EB';
        }
        if (choose == 2){
            return '#0D61FA';
        }
    }
    // function dateDiffInDays(a, b) {
    //     // Discard the time and time-zone information.
    //     const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    //     const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    //     return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    // }
    // d3.csv("./vacc_processed.csv", function (csvdata) {
    //     // console.log(new Date(csvdata.date))
    //     const cur_date = new Date(csvdata.date);
    //     // const diffTime = Math.abs(cur_date - start_day);
    //     var diffDays = dateDiffInDays(start_day, cur_date)
    //     country = String(csvdata.location)
    //     // console.log(data[diffDays])
    //     // console.log(diffDays)

    //     data[diffDays][country] = csvdata
    //     // console.log(cur_date)
    // });
    location_list = ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola',
        'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba',
        'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain',
        'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
        'Bermuda', 'Bhutan', 'Bolivia', 'Bonaire Sint Eustatius and Saba',
        'Bosnia and Herzegovina', 'Botswana', 'Brazil',
        'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso',
        'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde',
        'Cayman Islands', 'Central African Republic', 'Chad', 'Chile',
        'China', 'Colombia', 'Comoros', 'Congo', 'Cook Islands',
        'Costa Rica', "Cote d'Ivoire", 'Croatia', 'Cuba', 'Curacao',
        'Cyprus', 'Czechia', 'Democratic Republic of Congo', 'Denmark',
        'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt',
        'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
        'Eswatini', 'Ethiopia',
        'Faeroe Islands', 'Falkland Islands', 'Fiji', 'Finland', 'France',
        'French Polynesia', 'Gabon', 'Gambia', 'Georgia', 'Germany',
        'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada',
        'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana',
        'Haiti', 'Honduras', 'Hong Kong', 'Hungary',
        'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
        'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan',
        'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kosovo',
        'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
        'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Low income',
        'Luxembourg', 'Macao', 'Madagascar',
        'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta',
        'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
        'Micronesia (country)', 'Moldova', 'Monaco', 'Mongolia',
        'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar',
        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia',
        'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue',
        'North Macedonia', 'Northern Cyprus', 'Norway',
        'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama',
        'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn',
        'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
        'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia',
        'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
        'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia',
        'Seychelles', 'Sierra Leone', 'Singapore',
        'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia',
        'Solomon Islands', 'Somalia', 'South Africa',
        'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan',
        'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan',
        'Tajikistan', 'Tanzania', 'Thailand', 'Timor', 'Togo', 'Tokelau',
        'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
        'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda',
        'Ukraine', 'United Arab Emirates', 'United Kingdom',
        'United States', 'Uruguay', 'Uzbekistan',
        'Vanuatu', 'Vatican', 'Venezuela', 'Vietnam', 'Wallis and Futuna',
        'Yemen', 'Zambia', 'Zimbabwe'
    ]


    function searchDate(i) {
        time = (i + 1) * 1000 * 60 * 60 * 24 + start_day.getTime();
        time = new Date(time);
        year = String(time.getFullYear());
        month = String(time.getMonth() + 1);
        day = String(time.getDate());
        return (year + '-' + month + '-' + day);
    }

    // Start barchart
    async function requestData() {

        // function dateDiffInDays(a, b) {
        //     // Discard the time and time-zone information.
        //     const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        //     const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        //     return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
        // }

        // const csv = await d3.csv("vacc_processed.csv");
        // for (var i = 0; i < csv.length; i++) {
        //     const cur_date = new Date(csv[i].date);
        //     // const diffTime = Math.abs(cur_date - start_day);
        //     var diffDays = dateDiffInDays(start_day, cur_date)
        //     country = csv[i].location


        //     data[diffDays][country] = csv[i]
        // }
        // console.log(data[0]['Argentina'])
         svg = main.append("svg")
        .attr("width", docWidth * 0.55)
        .attr("height", docHeight * 0.6)
        .style("background", "#0e151f")
        .style("margin", 0);
barchart = main.append("svg")
.attr("width", docWidth * 0.4)
.attr("height", docHeight * 0.6)
.attr("id", 'barchart')
// .style("background", "#0e151f")
.style("margin", 0);


             barchart = d3.select("svg#barchart");
             width = barchart.attr("width");
             height = barchart.attr("height");
             margin = {
                top: 10,
                right: 10,
                bottom: 50,
                left: 50
            };
             chartWidth = width - margin.left - margin.right;
             chartHeight = height - margin.top - margin.bottom;

            let annotations = barchart.append("g").attr("id", "annotations");
            let chartArea = barchart.append("g").attr("id", "points")
                .attr("transform", `translate(${margin.left},${margin.top})`);
        console.log(data);

        const numLoc = location_list.length;
        const count = 10;
        const duration = 0.0001;
        const barPadding = 20;
        const barHeight = (chartHeight - (barPadding * count)) / count;
        const getDate = () => dateIndex;
        let dateIndex = 0;
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
            console.log(lst);
        }
        // 获取当天数据并按倒叙排列

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
                .style('transform', `translate3d(${margin.left}px, ${margin.top+10}px, 0)`)
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
                .attr('x', chartWidth - margin.top)
                .attr('y', chartHeight - margin.left)
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
                .style('transform', `translate3d(${margin.left}px, ${margin.top}px, 0)`);
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
                if (dateIndex < 701) {
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
        reqdate = document.getElementById("dateSlider");
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
    requestData();
    
}