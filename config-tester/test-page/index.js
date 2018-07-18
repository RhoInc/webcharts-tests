function clone(obj) {
    let copy;

    //boolean, number, string, null, undefined
    if ('object' != typeof obj || null == obj)
        return obj;

    //date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    //array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    //object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error('Unable to copy [obj]! Its type is not supported.');
}

const element = '#chart';
const settings = {
    x: {
        type: 'ordinal',
        column: 'species',
        label: 'Species',
    },
    y: {
        type: 'linear',
        column: 'sepal width',
        label: 'Sepal Width',
    },
    marks: [
        {
            type: 'bar',
            per: ['species'],
            tooltip: '[species]: $y',
            attributes: {
                stroke: 'black'
            },
            summarizeY: 'mean'
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

const chart = new webCharts.createChart(
    element,
    settings,
);
chart.on('init', function() {
    d3.select('#general-settings div')
        .html(JSON.stringify(
            Object.keys(settings)
                .filter(key => ['x', 'y', 'marks'].indexOf(key) < 0)
                .reduce(
                    (acc, cur) => {
                        acc[cur] = this.config[cur];
                        return acc;
                    },
                    {}
                ),
            null,
            4)
        );
    d3.select('#x-axis-settings div')
        .html(JSON.stringify(this.config.x, null, 4));
    d3.select('#y-axis-settings div')
        .html(JSON.stringify(this.config.y, null, 4));
    d3.select('#mark-settings div')
        .html(JSON.stringify(this.config.marks, null, 4));

    const textSettings = JSON.stringify(this.initialSettings, null, 4)
        .split('\n');

    d3.select('#text-settings textarea')
        .attr('rows', textSettings.length)
        .attr('cols', d3.max(textSettings, d => d.length))
        .html(textSettings.join('\n'))
        .on('change', function() {
            const updatedSettings = JSON.parse(this.value);
            chart.config = updatedSettings;
            d3.select('#general-settings div')
                .html(JSON.stringify(
                    Object.keys(updatedSettings)
                        .filter(key => ['x', 'y', 'marks'].indexOf(key) < 0)
                        .reduce(
                            (acc, cur) => {
                                acc[cur] = chart.config[cur];
                                return acc;
                            },
                            {}
                        ),
                    null,
                    4)
                );
            d3.select('#x-axis-settings div')
                .html(JSON.stringify(updatedSettings.x, null, 4));
            d3.select('#y-axis-settings div')
                .html(JSON.stringify(updatedSettings.y, null, 4));
            d3.select('#mark-settings div')
                .html(JSON.stringify(updatedSettings.marks, null, 4));
            chart.draw();
        });
    d3.select('#resize textarea')
        .on('change', function() {
            const callback = this.value;
            chart.on('resize', function() {
                eval(callback);
            });
            chart.draw();
        });
});

d3.csv(
    '../../../viz-library/data/iris.csv',
    (d,i) => {
        d.seq = i;
        return d;
    },
    data => {
        data.forEach(d => {

            });
        chart.initialSettings = clone(settings);
        chart.init(data);
    }
);
