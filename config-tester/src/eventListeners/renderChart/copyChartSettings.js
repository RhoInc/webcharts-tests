export default function copyChartSettings() {
    this.settings.chart = this.chartConfiguration;
    for (const setting in this.chartConfiguration)
        if (this.settings[setting])
            this.settings.chart[setting] = this.settings[setting];
    this.settings.general = Object.keys(this.settings.chart)
        .filter(key => ['type', 'data', 'x', 'y', 'marks'].indexOf(key) < 0)
        .reduce((acc, cur) => {
            acc[cur] = this.settings.chart[cur];
            return acc;
        }, {});
    this.settings.y = this.settings.chart.y;
    this.settings.marks = this.settings.chart.marks;
    this.settings.x = this.settings.chart.x;
}
