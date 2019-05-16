export default function updateWebchartswebchartsVersions(webchartsVersions) {
    //Add Webcharts webchartsVersions to branch dropdown.
    this.webchartsVersions = webchartsVersions;
    this.branch = webchartsVersions[0];
    this.containers.controls.webchartsVersion
        .selectAll('option')
        .data(webchartsVersions, d => (d.commit ? d.commit.sha : d.name))
        .enter()
        .append('option')
        .text(d => d.name);
}
