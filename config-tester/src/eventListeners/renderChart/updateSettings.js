export default function updateSettings() {
    this.containers.settings.forEach(container => {
        const d = container.datum();
        const json = JSON.stringify(this.settings[d.setting], null, 4);
        container
            .select('textarea')
            .text(JSON.stringify(this.settings[d.setting], null, 4))
            .attr(
                'rows',
                ['general', 'x'].indexOf(d.setting) > -1 ? json.split('\n').length : null
            );
    });
}
