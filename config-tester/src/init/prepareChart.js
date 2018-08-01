export default function prepareChart() {
    this.settings.chart = this.configurations[0];
    this.settings.general = Object.keys(this.settings.chart)
        .filter(key => ['x', 'y', 'marks'].indexOf(key) < 0)
        .reduce(
            (acc,cur) => {
                acc[cur] = settings[cur];
                return acc;
            },
            {}
        );
    this.settings.y = this.settings.chart.y;
    this.settings.marks = this.settings.chart.marks;
    this.settings.x = this.settings.chart.x;
    this.chart = new webCharts
        .createChart(
            this.containers.chart.node(),
            this.settings.chart
        );
}
