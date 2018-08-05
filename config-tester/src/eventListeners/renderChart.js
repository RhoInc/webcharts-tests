import getConfiguration from './renderChart/getConfiguration';
import prepareTable from './renderChart/prepareTable';
import prepareChart from './renderChart/prepareChart';
import updateSettings from './renderChart/updateSettings';
import init from './renderChart/init';

export default function renderChart() {
    this.containers.controls.render
        .on('click', () => {
            //Get current dropdown selections.
            getConfiguration.call(this);

            //Define table object.
            prepareTable.call(this);

            //Define chart object.
            prepareChart.call(this);

            //Update settings textareas.
            updateSettings.call(this);

            //Read in data and initialize table and chart.
            init.call(this);
        });
}
