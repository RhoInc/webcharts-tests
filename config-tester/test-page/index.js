//Initialize default config-tester.
const settings = {
    x: {
        type: 'linear',
        column: 'sepal width',
        label: 'Sepal Width',
    },
    y: {
        type: 'linear',
        column: 'sepal length',
        label: 'Sepal Length',
    },
    marks: [
        {
            type: 'circle',
            per: ['species', 'sepal width', 'sepal length'],
            tooltip: '[species]: $x/$y',
            attributes: {
                stroke: 'black'
            }
        },
    ],
    color_by: 'species',
    color_dom: null,
    legend: {
        label: 'Species',
        location: 'top'
    },
    resizable: false,
};

d3.csv(
    'https://rawgit.com/RhoInc/viz-library/master/data/iris.csv',
    function(d,i) {
        d.seq = i;
        return d;
    },
    function(data) {
        configTester('#container', settings).init(data);
    }
);

//Select the configurations dropdown and bind the default settings object to it.
const configurations = d3.select('#configurations select');
configurations
    .select('option')
    .datum({
        label: 'Scatter Plot: Sepal Width x Sepal Height',
        notes: 'Default config-tester configuration',
        tests: [],
        settings: settings,
        filename: 'iris.csv'
    });

//Read each sample settings object from the Webcharts test/samples/chart-config folder and add an
//option to the configuration dropdown.
const root = 'https://rawgit.com/RhoInc/Webcharts/master/test/samples/chart-config/';
d3.json(`${root}/testSettingList.json`, function(testSettingGroups) {
    const allSettings = [];

    testSettingGroups.forEach(function(testSettingGroup) {
        if (!/^Sizing|Tables/.test(testSettingGroup.label)) {
            d3.json(`${root}/${testSettingGroup.filename}`, function(settingsList) {
                settingsList.forEach(function(settings) {
                    if (settings.settings.hasOwnProperty('marks')) {
                        allSettings.push(settings);
                        configurations
                            .append('option')
                            .datum(settings)
                            .text(settings.label);
                    }
                });
            });
        }
    });
});

//Update config-tester when the chart configuration changes.
configurations.on('change', function() {
    d3.select('#container').selectAll('*').remove();
    const settings = d3.select(this).select('option:checked').datum();
    d3.csv(
        settings.filename !== 'iris.csv'
            ? 'https://rawgit.com/RhoInc/Webcharts/master/test/samples/data/' + settings.filename.replace('../data/', '')
            : 'https://rawgit.com/RhoInc/viz-library/master/data/' + settings.filename,
        function(d) {
            return d;
        },
        function(error, data) {
        if (error)
            console.log(error);
            configTester('#container', settings.settings).init(data);
        }
    );
});
