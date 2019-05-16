export default function updateWebchartsVersion(version) {
    const options = this.containers.controls.webchartsVersion.selectAll('option');
    if (version) options.property('selected', d => d.name === version);
    else
        this.webchartsVersion = options
            .filter(function() {
                return this.selected;
            })
            .datum();
}
