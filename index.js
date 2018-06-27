function renderLarge(d){
    d.settings.max_width=1000
    d.wrap = '#big-one'
    d3.select('.charts').classed('hidden',true)
    d3.select('#big-one').classed('hidden',false).datum(d).each(renderTest)
}

function renderTest(d) {

    //draw title
    d3.select(d.wrap).append('h2').text(function(d) {
        return d.label;
    });

    //make a wrapper for the chart
    var chartWrap = d3.select(d.wrap).append('div').attr('class', 'chart');

    //show notes (if any)
    var notes = d3.select(d.wrap)
        .append('div')
        .attr('class','notes')

    notes.append('div').html('<strong>File: </strong> ')
        .append('a')
        .attr('href',function(d){return d.root + '/samples/data/' + d.filename})
        .text(function(d){return d.filename})

    if (d.notes)
        notes.append('div')
            .html('<strong>Notes: </strong>' + d.notes);

    d.tests = d.tests ? d.tests : ['No Tests Specified']


    var tests =    notes.append('div').html('<strong>Tests: </strong> ')
    tests.append('ul')
        .selectAll('li')
        .data(d.tests)
        .enter()
        .append('li')
        .text(function(d){return d})

    notes.append('button')
        .text(d.wrap === '#big-one' ? 'Show All Tests' : 'Show Large Version' )
        .attr('href','#big-one')
        .on('click',function(d){
            if(d.wrap === '#big-one' ){
                d3.select('#big-one').classed('hidden',true).selectAll('*').remove()
                d3.select('.charts').classed('hidden',false)
            } else {
                renderLarge(d)
            }
        })

    //show settings
    d.settingsWrap = d3
        .select(d.wrap)
        .append('div')
        .attr('class','code test' + d.index)

    d.settingsHead = d.settingsWrap.append('a')
    .datum(d)
        .classed('settings-toggle', true)
    .style({'color':'blue','text-decoration':'underline'})
    .text(' + Settings')
    .on('click',function(di){
        var wrap = this.parentNode
        var code = d3.select(wrap).select('pre')
        var codeInput = d3.select(wrap).select('textarea')
        var status = code.classed('hidden')
        code.classed('hidden',!status)
        codeInput.classed('hidden',!status)
        d3.select(this).text(status?'- Settings':' + Settings')
    })
    d.JSONsettings = JSON.stringify(d.settings, null, '    ').trim();
    d.pre = d.settingsWrap
        .append('pre')
        .datum(d)
        .classed('code-block code-block--syntax hidden', true)
        .attr('id', 'pre' + d.index);
    d.code = d.pre
        .append('code')
        .datum(d)
        .attr('class', 'hljs')
        .html(d.JSONsettings);

        hljs.highlightBlock(d.code.node());

    d.codeInput = d.settingsWrap
        .append('textarea')
        .datum(d)
        .classed('code-block code-block--input hidden', true)
        .attr('rows', d.JSONsettings.split('\n').length)
        .text(d.JSONsettings);
    d.codeInput
        .on('change', function(di) {
            di.JSONsettings = this.value;
            di.code.html(d.JSONsettings);
            hljs.highlightBlock(di.code.node());

            di.settings = JSON.parse(di.JSONsettings);

            let updatedChart
            if (di.type === 'charts') {
                d3.select(di.wrap + ' .chart').selectAll('*').remove();
                updatedChart = webCharts.createChart(di.wrap + ' .chart', di.settings);
                updatedChart.init(di.raw);
            } else if (d.type === 'tables') {
                d3.select(di.wrap + ' .chart').selectAll('*').remove();
                updatedChart = webCharts.createTable(d.wrap + ' .chart', di.settings);
                updatedChart.init(di.raw);
            }
        });

        if (d.type === 'charts') {
            thisChart = webCharts.createChart(d.wrap + ' .chart', d.settings);
            thisChart.init(d.raw);
        } else if (d.type === 'tables') {
            thisChart = webCharts.createTable(d.wrap + ' .chart', d.settings);
            thisChart.init(d.raw);
        }
}

function drawCharts(path, root, type){
    d3.json(path,function(error,testConfig){
        testConfig.forEach(function(d,i){
            d.index = i + 1
            d.root = root
            d.wrap = 'div.test' + d.index
            d.type = type
        })

        var chartDivs = d3
            .select('.charts')
            .selectAll('div.testWrap')
            .data(testConfig)
            .enter()
            .append('div')
            .attr('class', function(d) {
                return 'testWrap test' + d.index;
            })

            chartDivs.append('span').text(function(d){return 'Test #' + d.index})

        //get all test data sets (once each)
        var dataPaths = d3
            .set(
                testConfig.map(function(d) {
                    return d.filename;
                })
            )
            .values()
            .map(function(d){return {'filename':d, 'path':root + '/samples/data/' + d}});

        //load the data and render the chart
        dataPaths.forEach(function(file) {
            d3.csv(file.path, function(error, data) {
                file.raw = data;

                var matches = chartDivs
                .filter(function(chart){

                    if(chart.filename === file.filename){
                        chart.raw = file.raw
                    }
                    return chart.filename === file.filename
                })
                .each(renderTest)
            });
        });
    })


}

function initTestSuite(version,path){
    //attempt to load from a relative path if one is given (allows for local testing)
    var location = version.slice(0,3) === '../' ? version : path + version
    var root = location + '/test';
    var rendererPath = location + '/build/webcharts.js';

    var link = document.createElement('link');
    link.href =location + '/css/webcharts.css'
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.getElementsByTagName('head')[0].appendChild(link);

    var loader = new scriptLoader();
    loader.require(rendererPath, {
        async: true,
        success: function() {
            console.log('loaded the script ...')
            function drawAll(d){
                d3.select('.charts').classed('hidden',false)
                d3.select('#big-one').classed('hidden',true).selectAll('*').remove()

                var label = this.value
                var filename = d3.select(this).datum().filter(function(d){return d.label === label})[0].filename
                var type =    d3.select(this).datum().filter(function(d){return d.label === label})[0].type
                type = type ? type : 'charts'
                var path = d.root + '/samples/chart-config/' + filename
                d3.select('.charts').selectAll('*').remove()
                drawCharts(root + '/samples/chart-config/' + filename, d.root, type)
            }

            d3.json(root + '/samples/chart-config/testSettingList.json',function(error,allSettings){
                if(!error){
                    allSettings.root = root;
                    var settingsSelect = d3.select('.controls').append('select').datum(allSettings)
                    var options = settingsSelect
                    .selectAll('option')
                    .data(function(d){return d})
                    .enter()
                    .append('option')
                    .text(function(d){return d.label})

                    settingsSelect.on('change',drawAll)

                    //initialize the first set of tests on load
                    var type = allSettings[0].type ? allSettings[0].type : 'charts'
                    drawCharts(root + '/samples/chart-config/' + allSettings[0].filename, root,type    )
                } else {
                    d3.select('.charts').append('span').text('No valid tests found for the version specified').attr('class','error')
                }
            })
        },
        failure: function() {
            console.log("couldn't load renderer :(")
        }
    });
}

//Select version of webcharts

d3.select('.versionSelect').append('span').text('Webcharts Version:')
var webchartsVersion = d3.select('.versionSelect').append('input').attr('class','webcharts-version')
webchartsVersion.node().value = 'master'
d3.select('.versionSelect').append('button').text('Render Visual Tests')
.on('click',function(d){
    d3.selectAll('.charts *').remove()
    d3.selectAll('.controls *').remove()
    var version = webchartsVersion.node().value
    initTestSuite(version,'https://rawgit.com/RhoInc/Webcharts/')
})
    var version = webchartsVersion.node().value
    initTestSuite(version,'https://rawgit.com/RhoInc/Webcharts/')
