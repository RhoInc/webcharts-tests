import updateChartConfiguration from '../../functions/updateChartConfiguration';
import updateDataFile from '../../functions/updateDataFile';
import loadData from '../../functions/loadData';
import initTable from '../../functions/initTable';
import copyChartSettings from '../../functions/copyChartSettings';
import initChart from '../../functions/initChart';
import updateChartFrameworkSettings from '../../functions/updateChartFrameworkSettings';

export default function chartConfiguration() {
    this.containers.controls.chartConfiguration.on('change', () => {
        updateChartConfiguration.call(this);
        updateDataFile.call(this, this.dataFile);
        loadData.call(this)
            .then(data => {
                this.data = data;
                initTable.call(this);
                copyChartSettings.call(this);
                initChart.call(this);
                updateChartFrameworkSettings.call(this);
            });
    });
}
