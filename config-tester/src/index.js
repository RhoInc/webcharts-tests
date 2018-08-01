import layout from './layout';
import styles from './styles';
import eventListeners from './eventListeners';
import createChart from './createChart';
import init from './init';

export default function configTester(element, settings) {
    const configTester = {
        element,
        settings: {
            chart: settings,
            general: Object.keys(settings)
                .filter(key => ['x', 'y', 'marks'].indexOf(key) < 0)
                .reduce(
                    (acc, cur) => {
                        acc[cur] = settings[cur];
                        return acc;
                    },
                    {}
                ),
            y: settings.y,
            marks: settings.marks,
            x: settings.x,
        },
        callbacks: {
            init: null,
            layout: null,
            preprocess: null,
            datatransform: null,
            draw: null,
            resize: null,
            destroy: null,
        },
        containers: {
            main: d3.select(element)
                .append('div')
                .classed('config-tester', true)
                .attr('id', `config-tester${d3.selectAll('.config-tester').size() + 1}`),
            controls: {},
            settings: [],
            callbacks: [],
        },
        init,
        configurations: [],
        datasets: [],
        branches: [],
    };

    layout.call(configTester);
    styles.call(configTester);
    eventListeners.call(configTester);
    createChart.call(configTester);

    return configTester;
}
