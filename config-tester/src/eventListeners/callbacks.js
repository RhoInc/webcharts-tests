export default function callbacks() {
    const context = this;

    this.containers.callbacks
        .forEach(container => {
            container.select('textarea').on('change', function(d) {
                context.callbacks[d.label] = this.value;

                context.chart.on(d.label, function() {
                    try {
                        eval(context.callbacks[d.label]);
                    } catch(error) {
                        alert("That's bad code right there pardner.  Check the console to see where you went astray by hitting the F12 key.");
                        console.error(error);
                    }
                });

                if (['init', 'layout', 'destroy'].indexOf(d.label) < 0)
                    context.chart.draw();
                else {
                    context.chart.destroy();
                    context.chart = webCharts.createChart(context.containers.chart.node(), context.settings.chart).init(context.data);
                }
            });
        });
}
