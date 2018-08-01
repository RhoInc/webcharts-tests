import layout from './layout';
import styles from './styles';
import eventListeners from './eventListeners';
import init from './init';

export default function configTester(element) {
    const configTester = {
        element,
        settings: {
            chart: null,
            general: null,
            y: null,
            marks: null,
            x: null,
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

    return configTester;
}
