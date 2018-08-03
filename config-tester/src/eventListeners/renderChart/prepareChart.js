export default function prepareChart() {
    this.settings.chart = this.chartConfiguration;
    this.settings.general = Object.keys(this.settings.chart)
        .filter(key => ['data', 'x', 'y', 'marks'].indexOf(key) < 0)
        .reduce(
            (acc,cur) => {
                acc[cur] = this.settings.chart[cur];
                return acc;
            },
            {}
        );
    this.settings.y = this.settings.chart.y;
    this.settings.marks = this.settings.chart.marks;
    this.settings.x = this.settings.chart.x;
    if (this.chart)
        this.chart.destroy();
    if (this.table)
        this.table.destroy();
    this.chart = new webCharts
        .createChart(
            this.containers.chart.node(),
            this.settings.chart
        );
}
