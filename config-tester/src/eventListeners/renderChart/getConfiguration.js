export default function getConfiguration(
    getChartConfiguration = true,
    getData = true,
    getBranch = true
) {
    if (getChartConfiguration) {
        this.chartConfiguration = this.containers.controls.settings
            .select('option:checked')
            .datum();
    }

    if (getData) {
        this.dataFile = this.chartConfiguration.data;
        this.containers.controls.data
            .selectAll('option')
            .property('selected', d => d.rel_path === this.dataFile);
    }

    if (getBranch) {
        this.branch = this.containers.controls.branches.select('option:checked').datum();
    }
}
