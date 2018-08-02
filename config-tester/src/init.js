import loadData from './init/loadData';
import loadBranches from './init/loadBranches';
import prepareChart from './init/prepareChart';
import updateSettings from './init/updateSettings';
import clone from './util/clone';

export default function init() {
    const context = this;

    //Add viz-library data to data dropdown.
    loadData.call(this)
        .then(function(data) {
            console.log(data);
            context.containers.controls.data
                .selectAll('option')
                    .data(data)
                    .enter()
                .append('option')
                .text(d => d.rel_path);

            return data;
        });

    //Add Webcharts branches to branch dropdown.
    loadBranches.call(this)
        .then(function(branches) {
            console.log(branches);
            context.containers.controls.branches
                .selectAll('option')
                    .data(branches, d => d.commit.sha)
                    .enter()
                .append('option')
                .text(d => d.name);

            return branches;
        });

    prepareChart.call(configTester);
    //updateSettings.call(configTester);
    //context.chart.init(clone(context.data));
}
