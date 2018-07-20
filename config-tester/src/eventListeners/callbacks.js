export default function callbacks() {
    const context = this;

    this.containers.callbacks
        .forEach(container => {
            console.log(container);
            container.select('textarea').on('change', function(d) {
                context.callbacks[d.label] = this.value;

                context.chart.on(d.label, function() {
                    try {
                        var _eval_ = eval;
                        _eval_(context.callbacks[d.label]);
                        //const callback = new Function(context.callbacks[d.label]);
                    } catch(error) {
                        alert("That's bad code right there pardner.  Check the console to see where you went astray by hitting the F12 key.");
                        console.error(error);
                    }
                });

                if (['init', 'layout', 'destroy'].indexOf(d.label) < 0)
                    chart.draw();
                else {
                    chart.destroy();
                    chart.init(context.data);
                }
            });
        });
}
