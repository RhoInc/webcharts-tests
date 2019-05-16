import reset from '../reset';
import getConfiguration from './renderChart/getConfiguration';
import copyChartSettings from './renderChart/copyChartSettings';
import prepareTable from './renderChart/prepareTable';
import prepareChart from './renderChart/prepareChart';
import updateSettings from './renderChart/updateSettings';
import init from './renderChart/init';

export default function renderChart(init = true) {
    this.containers.controls.render.on('click', () => {
        //reset.call(this);

        if (init) {
            //Get current dropdown selections.
            getConfiguration.call(this);

            //Copy chart settings.
            copyChartSettings.call(this);

            //Update settings textareas.
            updateSettings.call(this);

            //Define table object.
            prepareTable.call(this);

            //Define chart object.
            prepareChart.call(this);

            //Read in data and initialize table and chart.
            init.call(this);
        } else {
            this.chart.draw();
        }
    });
}
