export default function init(loadData = true) {
    if (loadData)
        d3.csv(
            `${this.dataPath}/${this.dataFile}`,
            (d,i) => {
                d.index = i;
                return d;
            },
            data => {
                this.data = data;
                this.table.init(data);
                this.chart.init(data);
            }
        );
    else {
        this.table.init(this.data);
        this.chart.init(this.data);
    }
}
