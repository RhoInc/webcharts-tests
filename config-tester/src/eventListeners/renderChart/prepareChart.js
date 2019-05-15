import copyChartSettings from './copyChartSettings';

export default function prepareChart() {
    if (this.chart && this.chart.destroy) this.chart.destroy();
    else
        this.containers.chart.selectAll('*').remove();

    copyChartSettings.call(this);
    this.chart = new webCharts.createChart(this.containers.chart.node(), this.settings.chart);
    this.chart.ct = this;
}
