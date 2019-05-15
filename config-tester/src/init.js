import loadChartConfigurations from './init/loadChartConfigurations';
import loadData from './init/loadData';
import loadBranches from './init/loadBranches';

export default function init() {
    const context = this;

    //Add data-library data to data dropdown.
    Promise.all([
        loadChartConfigurations.call(this),
        loadData.call(this),
        loadBranches.call(this),
    ]).then(function(values) {
        let [chartConfigurations,data,branches] = values;

        //Add chart configurations to chart configuration dropdown.
        context.chartConfigurations = chartConfigurations;
        context.chartConfiguration = chartConfigurations[0];
        context.containers.controls.settings
            .selectAll('option')
                .data(chartConfigurations, d => d.type)
                .enter()
            .append('option')
            .text(d => d.type);

        //Add data files to data dropdown.
        context.data = data;
        context.containers.controls.data
            .selectAll('option')
            .data(data)
            .enter()
            .append('option')
            .property('selected', d => d.rel_path === context.chartConfiguration.data)
            .text(d => d.rel_path);

        //Add Webcharts branches to branch dropdown.
        if (!(Array.isArray(branches) && branches.length)) branches = [{ name: 'master' }];
        context.branches = branches;
        context.containers.controls.branches
            .selectAll('option')
            .data(branches, d => (d.commit ? d.commit.sha : d.name))
            .enter()
            .append('option')
            .text(d => d.name);

        context.containers.controls.render.node().click();
    });
}
