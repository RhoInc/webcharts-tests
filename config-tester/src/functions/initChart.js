export default function initChart() {
    if (this.chart && this.chart.destroy) this.chart.destroy();
    else this.containers.chart.selectAll('*').remove();
    this.chart = new webCharts.createChart(this.containers.chart.node(), this.settings.chart);
    this.chart.ct = this;
    this.chart.init(this.data);
}