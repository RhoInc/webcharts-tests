import loadChartConfigurations from './init/loadChartConfigurations';
import loadData from './init/loadData';
import loadBranches from './init/loadBranches';

export default function init() {
    const context = this;

    //Add viz-library data to data dropdown.
    loadChartConfigurations.call(this)
        .then(function(chartConfigurations) {
            context.chartConfigurations = chartConfigurations;
            context.containers.controls.settings
                .selectAll('option')
                    .data(chartConfigurations, d => d.type)
                    .enter()
                .append('option')
                .text(d => d.type);

            return chartConfigurations;
        });

    //Add viz-library data to data dropdown.
    loadData.call(this)
        .then(function(data) {
            context.data = data;
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
            context.branches = branches;
            context.containers.controls.branches
                .selectAll('option')
                    .data(branches, d => d.commit ? d.commit.sha : d.name)
                    .enter()
                .append('option')
                .text(d => d.name);

            return branches;
        });
}
