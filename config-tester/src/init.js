import loadSettings from './init/loadSettings';
import loadData from './init/loadData';
import loadBranches from './init/loadBranches';
import prepareChart from './init/prepareChart';
import updateSettings from './init/updateSettings';
import clone from './util/clone';

export default function init() {
    const context = this;
    const promise = new Promise(function(resolve, reject) {
        loadSettings.call(context);
        loadData.call(context);
        loadBranches.call(context);
        resolve(context);
        return context;
    })
    .then(function(configTester) {
        prepareChart.call(configTester);
        return configTester;
    })
    .then(function(configTester) {
        updateSettings.call(configTester);
        return configTester;
    })
    .then(function(configTester) {
        context.chart.init(clone(context.data));
        return configTester;
    })
    .catch(function(configTester) {
        console.log(configTester);
    });
}
