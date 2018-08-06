export default function timeSeriesPlot() {
    return {
        data: './data/climate_data.csv',
        x: {
            type: 'time',
            column: 'DATE',
            label: 'Date'
        },
        y: {
            type: 'linear',
            column: 'Monthly Mean',
            label: 'Mean Temperature?'
        },
        marks: [
            {
                type: 'line',
                per: ['STATION_NAME'],
                summarizeY: 'mean'
            },
            {
                type: 'circle',
                per: ['STATION_NAME', 'DATE'],
                summarizeY: 'mean'
            }
        ],
        color_by: 'STATION_NAME',
        color_dom: null,
        legend: {
            label: 'Measurement Location',
            location: 'top'
        },
        resizable: false
    };
}
