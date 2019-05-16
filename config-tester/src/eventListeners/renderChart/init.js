export default function init(table = true, chart = true, loadData = true) {
    if (loadData)
        d3.csv(
            `${this.dataPath}/${this.dataFile}`,
            (d, i) => {
                d.index = i;
                return d;
            },
            data => {
                this.data = data;
                if (table) this.table.init(data);
                if (chart) this.chart.init(data);
            }
        );
    else {
        if (table) this.table.init(this.data);
        if (chart) this.chart.init(this.data);
    }
}
