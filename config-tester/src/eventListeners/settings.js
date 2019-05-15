export default function settings() {
    const context = this;

    this.containers.settings.forEach(container => {
        container.select('textarea').on('change', function(d) {
            const updatedSettings = JSON5.parse(this.value);

            if (d.property !== 'general') {
                context.settings[d.setting] = updatedSettings;
                context.chart.config[d.setting] = updatedSettings;
            } else {
                const properties = Object.keys(updatedSettings).filter(
                    key => ['x', 'y', 'marks'].indexOf(key) < 0
                );
                [context.settings, chart.config] = {
                    x: context.settings.x,
                    y: context.settings.y,
                    marks: context.settings.marks
                };
                for (const property of properties) {
                    [context.settings[property], context.chart.config[property]] = updatedSettings[
                        property
                    ];
                }
            }

            context.chart.draw();
        });
    });
}
