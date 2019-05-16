export default function updateChartConfiguration(type) {
    const options = this.containers.controls.chartConfiguration.selectAll('option');
    if (type) {
        options.property('selected', d => d.type === type);
    } else {
        this.chartConfiguration = options
            .filter(function() {
                return this.selected;
            })
            .datum();
        this.dataFile = this.chartConfiguration.dataFile;
    }
}
