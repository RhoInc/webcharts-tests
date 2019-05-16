export default function updateData(data) {
    //Add data files to data dropdown.
    this.data = data;
    this.containers.controls.data
        .selectAll('option')
        .data(data)
        .enter()
        .append('option')
        .property('selected', d => d.rel_path === this.chartConfiguration.data)
        .text(d => d.rel_path);
}
