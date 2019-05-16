export default function updateDataFile(dataFile) {
    const options = this.containers.controls.dataFile.selectAll('option');
    if (dataFile)
        options.property('selected', d => d.rel_path === dataFile);
    else
        this.dataFile = options.filter(function() { return this.selected; }).datum().rel_path;
}
