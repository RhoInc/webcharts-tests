import loadChartConfigurations from './init/loadChartConfigurations';
import loadData from './init/loadData';
import loadBranches from './init/loadBranches';
import updateChartConfigurations from './init/updateChartConfigurations';
import updateData from './init/updateData';
import updateBranches from './init/updateBranches';

export default function init() {
    Promise.all([
        loadChartConfigurations.call(this),
        loadData.call(this),
        loadBranches.call(this)
    ]).then(values => {
        const [chartConfigurations, data, branches] = values;

        updateChartConfigurations.call(this, chartConfigurations);
        updateData.call(this, data);
        updateBranches.call(
            this,
            Array.isArray(branches) && branches.length ? branches : [{ name: 'master' }]
        );

        this.containers.controls.render.node().click();
    });
}
