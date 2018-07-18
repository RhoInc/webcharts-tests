export default function horizontalBarChart() {
    return {
        x: {
            type: 'linear',
            column: 'sepal width',
            label: 'Sepal Width',
        },
        y: {
            type: 'ordinal',
            column: 'species',
            label: 'Species',
        },
        marks: [
            {
                type: 'bar',
                per: ['species'],
                tooltip: '[species]: $y',
                attributes: {
                    stroke: 'black'
                },
                summarizeX: 'mean'
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
