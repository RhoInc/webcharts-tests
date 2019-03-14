import clone from './util/clone';

export default function init(data) {
    this.data = data;
    this.chart.init(clone(data));
}
