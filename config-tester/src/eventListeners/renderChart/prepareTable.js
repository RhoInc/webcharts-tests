export default function prepareTable() {
    if (this.table) this.table.destroy();

    this.table = new webCharts.createTable(this.containers.dataPreview.node());
    this.table.ct = this;

    //on init()
    this.table.on('init', function() {
        this.config.cols = Object.keys(this.data.raw[0]).filter(key => key !== 'index');
        this.config.headers = this.config.cols.slice();
    });

    //on draw()
    this.table.on('draw', function() {
        const context = this;

        //Allow cell editing.
        this.tbody.selectAll('tr').each(function(d) {
            const row = d3.select(this);

            row.selectAll('td').each(function(di) {
                di.index = d.index;
                const cell = d3.select(this).text('');

                //Append div to cell with the contenteditable attribute.
                const contentEditable = cell
                    .append('div')
                    .attr('contenteditable', true)
                    .text(di.text);

                //Update cell datum on input.
                contentEditable.on(
                    /Trident/.test(navigator.userAgent) ? 'textinput' : 'input',
                    function() {
                        di.text = this.textContent;
                    }
                );

                //Update table data on blue (when focus leaves cell).
                contentEditable.on('blur', () => {
                    const datum = context.ct.data.find(dii => dii.index === di.index);
                    datum[di.col] = di.text;
                    context.ct.chart.draw(context.ct.data);
                });
            });
        });
    });
}
