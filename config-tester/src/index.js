import './util/polyfills';
import init from './init';
import layout from './layout';
import styles from './styles';

export default function configTester(
    element,
    dataPath = 'https://raw.githubusercontent.com/RhoInc/data-library/master'
) {
    const configTester = {
        init,
        element,
        dataPath,

        //Containers is an object whose properties represent d3 selections of elements in the DOM.
        containers: {
            main: d3
                .select(element)
                .append('div')
                .classed('config-tester', true)
                .attr('id', `config-tester${d3.selectAll('.config-tester').size() + 1}`),
            controls: {},
            settings: [],
            callbacks: []
        },

        //Settings is an object whose properties populate the settings inputs.
        settings: {
            data: null,
            chart: null,
            x: null,
            y: null,
            marks: null,
            general: null
        },

        //Callbacks is an object whose methods become chart callbacks.
        callbacks: {
            init: null,
            layout: null,
            preprocess: null,
            datatransform: null,
            draw: null,
            resize: null,
            destroy: null
        },

        //These properties represent data that populate the config-tester configuration dropdowns.
        //They are instantiated as arrays when init() is called.
        chartConfigurations: null,
        data: null,
        branches: null
    };

    layout.call(configTester);
    styles.call(configTester);

    return configTester;
}
