export default function callback() {
    this.configTester.containers.controls.data
        .selectAll('option')
            .data(dataFiles)
            .enter()
        .append('option')
        .text(d => d.rel_path);
}
