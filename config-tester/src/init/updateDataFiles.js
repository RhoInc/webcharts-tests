export default function updateDataFiles(dataFiles) {
    //Add data files to data dropdown.
    this.dataFiles = dataFiles;
    this.dataFile = this.chartConfiguration.dataFile;
    this.containers.controls.dataFile
        .selectAll('option')
        .data(dataFiles)
        .enter()
        .append('option')
        .attr('label', d => d.rel_path.split('/').pop())
        .property('selected', d => d.rel_path === this.chartConfiguration.dataFile)
        .text(d => d.rel_path);
}
