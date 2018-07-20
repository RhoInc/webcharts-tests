export default function createChart() {
    this.chart = new webCharts
        .createChart(
            this.containers.chart.node(),
            this.settings.chart
        );
}
