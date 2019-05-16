import updateDataFile from '../../functions/updateDataFile';
import loadData from '../../functions/loadData';
import initTable from '../../functions/initTable';

export default function dataFile() {
    this.containers.controls.dataFile.on('change', () => {
        updateDataFile.call(this);
        loadData.call(this).then(data => {
            this.data = data;
            initTable.call(this);
        });
    });
}
