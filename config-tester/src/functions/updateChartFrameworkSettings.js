export default function updateChartFrameworkSettings() {
    this.containers.settings.forEach(container => {
        const d = container.datum();
        const json = JSON.stringify(this.settings[d.setting], null, 4);
        container
            .select('textarea')
            .attr('rows', ['general', 'x'].indexOf(d.setting) > -1 ? json.split('\n').length : null)
            .property('value', json)
            .text(json);
    });
}
