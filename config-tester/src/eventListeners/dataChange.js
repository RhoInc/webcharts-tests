import getConfiguration from './renderChart/getConfiguration';
import prepareTable from './renderChart/prepareTable';
import init from './renderChart/init';

export default function dataChange() {
    this.containers.controls.data.on('change', () => {
        this.dataFile = this.containers.controls.data.selectAll('option:checked').text();
        console.log(this.dataFile);
        //Get current dropdown selections.
        //getConfiguration.call(this, false, true, false);

        //Define table object.
        prepareTable.call(this);

        //Initialize table.
        init.call(this, true, false);
    });
}
