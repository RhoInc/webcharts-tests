export default function settings() {
    const context = this;

    this.containers.settings.forEach(container => {
        container.select('textarea').on('change', function(d) {
            const updatedSettings = JSON5.parse(this.value);

            //Update x, y, and mark settings.
            if (d.setting !== 'general') {
                context.settings[d.setting] = updatedSettings;
                context.settings.chart[d.setting] = updatedSettings;
                context.chart.config[d.setting] = updatedSettings;
            }
            //Update general settings.
            else {
                const properties = Object.keys(updatedSettings).filter(
                    key => ['x', 'y', 'marks'].indexOf(key) < 0
                );
                properties.forEach(function(property) {
                    const setting = updatedSettings[property];
                    context.settings.general[property] = setting;
                    context.settings.chart[property] = setting;
                    context.chart.config[property] = setting;
                });
            }

            context.chart.draw();
        });
    });
}
