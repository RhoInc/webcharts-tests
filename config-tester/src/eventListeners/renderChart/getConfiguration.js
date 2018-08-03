export default function getConfiguration() {
    this.chartConfiguration = this.containers.controls.settings
        .select('option:checked')
        .datum();
    console.log(this.chartConfiguration);
    this.dataFile = this.chartConfiguration.data;
    this.containers.controls.data
        .selectAll('option')
        .property('selected', d => d.rel_path === this.dataFile);
    console.log(this.dataFile);
    this.branch = this.containers.controls.branches
        .select('option:checked')
        .datum();
    console.log(this.branch);
}
