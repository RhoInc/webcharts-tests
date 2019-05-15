export default function reset() {
    delete this.chartConfiguration;
    delete this.dataFile;
    delete this.branch;

    if (this.table && this.table.destroy)
        this.table.destroy();
    else
        this.containers.dataPreview.selectAll('*').remove();

    if (this.chart && this.chart.destroy)
        this.chart.destroy();
    else
        this.containers.chart.selectAll('*').remove();

    this.containers.settings.forEach(container => {
        container.select('textarea').text('').attr('rows', null);
    });
}
