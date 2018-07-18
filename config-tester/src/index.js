import layout from './layout';

export default function configTester(element, settings) {
    const configTester = {
        element,
        settings,
        containers: {
            main: d3.select(element)
                .append('div')
                .classed('config-tester', true)
                .attr('id', `config-tester${d3.selectAll('.config-tester').size() + 1}`)
        }
    };

    layout.call(configTester);

    return configTester;
}
