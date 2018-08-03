export default function initChart() {
    d3.csv(
        `${this.dataPath}/${this.dataFile}`,
        d => {
            return d;
        },
        data => {
            this.data = data;
            this.chart.init(data);
        }
    );
}
