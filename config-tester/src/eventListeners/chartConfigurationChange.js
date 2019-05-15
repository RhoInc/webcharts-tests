import copyChartSettings from './renderChart/copyChartSettings';
import updateSettings from './renderChart/updateSettings';

export default function chartConfigurationChange() {
    const context = this;

    this.containers.controls.settings.on('change', function() {
        context.chartConfiguration = _.clone(
            d3.select(this)
                .selectAll('option')
                .filter(function() {
                    return this.selected;
                })
                .datum()
        );
        context.containers.controls.data
            .selectAll('option')
            .property('selected', d => d.rel_path === context.chartConfiguration.data);
        copyChartSettings.call(context);
        console.log(context.settings);
        updateSettings.call(context);
        context.containers.controls.render.node().click();
    });
}
