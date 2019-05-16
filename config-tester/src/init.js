//load data
import loadChartConfigurations from './init/loadChartConfigurations';
import loadDataFiles from './init/loadDataFiles';
import loadWebchartsVersions from './init/loadWebchartsVersions';

//update dropdowns with loaded data
import updateChartConfigurations from './init/updateChartConfigurations';
import updateDataFiles from './init/updateDataFiles';
import updateWebchartsVersions from './init/updateWebchartsVersions';

//initialize
import loadData from './functions/loadData';
import initTable from './functions/initTable';
import copyChartSettings from './functions/copyChartSettings';
import initChart from './functions/initChart';
import updateChartFrameworkSettings from './functions/updateChartFrameworkSettings';

//event listeners
import defineEventListeners from './init/defineEventListeners';

export default function init() {
    Promise.all([
        loadChartConfigurations.call(this),
        loadDataFiles.call(this),
        loadWebchartsVersions.call(this)
    ]).then(values => {
        const [chartConfigurations, dataFiles, webchartsVersions] = values;

        updateChartConfigurations.call(this, chartConfigurations);
        updateDataFiles.call(this, dataFiles);
        updateWebchartsVersions.call(
            this,
            Array.isArray(webchartsVersions) && webchartsVersions.length
                ? webchartsVersions
                : [{ name: 'master' }]
        );

        loadData.call(this).then(data => {
            this.data = data;
            initTable.call(this);
            copyChartSettings.call(this);
            initChart.call(this);
            updateChartFrameworkSettings.call(this);
        });

        defineEventListeners.call(this);
    });
}
