    const element = '#chart';
    const settings1 = {
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
                tooltip: '$x,$y',
                attributes: {
                    stroke: 'black'
                },
            },
        ],
        color_by: 'species',
        color_dom: null,
        legend: {
            location: 'top',
            label: '',
            order: null
        },
        range_band: 50,
        aspect: 1,
        resizable: false,
    };
    const chart = new webCharts.createChart(
        element,
        settings,
        controls
    );

    d3.csv(
        '../../viz-library/data/iris.csv',
        (d,i) => {
            d.seq = i;
            return d;
        },
        data => {
            data.forEach(d => {

                });
            chart.init(data);
        }
    );
