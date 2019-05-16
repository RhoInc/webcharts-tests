export default function updateChartConfigurations(chartConfigurations) {
    //Add chart configurations to chart configuration dropdown.
    this.chartConfigurations = chartConfigurations;
    this.chartConfiguration = chartConfigurations[0];
    this.containers.controls.settings
        .selectAll('option')
        .data(chartConfigurations, d => d.type)
        .enter()
        .append('option')
        .text(d => d.type);
}
