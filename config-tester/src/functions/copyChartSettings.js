export default function copyChartSettings() {
    this.settings.chart = _.clone(this.chartConfiguration);
    this.settings.x = this.settings.chart.x;
    this.settings.y = this.settings.chart.y;
    this.settings.marks = this.settings.chart.marks;
    this.settings.general = Object.keys(this.settings.chart)
        .filter(key => ['type', 'data', 'x', 'y', 'marks'].indexOf(key) < 0)
        .reduce((acc, cur) => {
            acc[cur] = this.settings.chart[cur];
            return acc;
        }, {});
}
