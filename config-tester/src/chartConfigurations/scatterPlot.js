export default function scatterPlot() {
    return {
        data: './data/iris.csv',
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
}
