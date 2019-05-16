export default function histogram() {
    return {
        dataFile: './data/miscellaneous/iris.csv',
        x: {
            type: 'linear',
            column: 'sepal width',
            label: 'Sepal Width',
            bin: 25
        },
        y: {
            type: 'linear',
            label: '# of Observations',
            domain: [0, null]
        },
        marks: [
            {
                type: 'bar',
                per: ['sepal width'],
                summarizeY: 'count',
                tooltip: '$y observations at $x',
                attributes: {
                    'fill-opacity': 0.75
                }
            }
        ],
        resizable: false
    };
}
