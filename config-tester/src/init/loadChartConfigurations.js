import chartConfigurations from '../chartConfigurations';

export default function loadChartConfigurations() {
    const context = this;

    return new Promise(function(resolve, reject) {
        resolve(
            Object.keys(chartConfigurations).map(key => {
                const chartConfiguration = chartConfigurations[key]();
                chartConfiguration.type = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                chartConfiguration.type;

                return chartConfiguration;
            })
        );
    });
}
