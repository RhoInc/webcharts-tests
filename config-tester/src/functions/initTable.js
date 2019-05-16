import onInit from './initTable/onInit';
import onDraw from './initTable/onDraw';

export default function initTable() {
    if (this.table && this.table.destroy) this.table.destroy();
    else this.containers.dataPreview.selectAll('*').remove();

    this.table = new webCharts.createTable(this.containers.dataPreview.node());
    this.table.ct = this;
    this.table.on('init', onInit);
    this.table.on('draw', onDraw);
    this.table.init(this.data);
}
