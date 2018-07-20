export default function createChart() {
    this.chart = new Webcharts
        .createChart(
            this.containers.chart.node(),
            this.settings.chart
        );
}
