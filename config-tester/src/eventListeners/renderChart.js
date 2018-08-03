import getConfiguration from './renderChart/getConfiguration';
import prepareChart from './renderChart/prepareChart';
import updateSettings from './renderChart/updateSettings';
import initChart from './renderChart/initChart';

export default function renderChart() {
    this.containers.controls.render
        .on('click', () => {
            getConfiguration.call(this);
            prepareChart.call(this);
            updateSettings.call(this);
            initChart.call(this);
        });
}
