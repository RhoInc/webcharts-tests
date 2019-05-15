export default function verticalBarChart() {
    return {
        data: './data/miscellaneous/iris.csv',
        x: {
            type: 'ordinal',
            column: 'species',
            label: 'Species'
        },
        y: {
            type: 'linear',
            column: 'sepal width',
            label: 'Sepal Width'
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
            }
        ],
        color_by: 'species',
        color_dom: null,
        legend: {
            label: 'Species',
            location: 'top'
        },
        resizable: false
    };
}
