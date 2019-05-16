export default function initChart() {
    if (this.chart && this.chart.destroy) this.chart.destroy();
    else this.containers.chart.selectAll('*').remove();
    this.chart = new webCharts.createChart(this.containers.chart.node(), this.settings.chart);
    this.chart.ct = this;

    const context = this;
    for (const callback in this.callbacks) {
        this.chart.on(callback, function() {
            try {
                eval(context.callbacks[callback]);
            } catch (error) {
                alert(
                    "That's bad code right there pardner.  Check the console to see where you went astray by hitting the F12 key."
                );
                console.error(error);
            }
        });
    }

    this.chart.init(this.data);
}
