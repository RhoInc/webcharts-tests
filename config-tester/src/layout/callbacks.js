export default function callbacks() {
    const context = this;

    this.containers.callbacksContainer = this.containers.main
        .append('div')
        .classed('ct-row ct-row--bottom ct-callbacks', true);

    this.containers.callbacksContainer
        .append('h1')
        .classed('ct-row__header', true)
        .text('Callbacks');
    this.containers.callbacksContainer
        .append('h5')
        .classed('ct-row__instruction', true)
        .html(
            `Add chart callbacks below and click the <span class = 'ct-render-chart-hover'>Render Chart</span> button to re-render the chart.`
        );

    this.containers.callbacksContainer
        .selectAll('div.ct-component')
        .data(
            [
                {
                    label: 'init',
                    description: 'called once before chart container is laid out on webpage'
                },
                {
                    label: 'layout',
                    description: 'called once after chart container is laid out on webpage'
                },
                {
                    label: 'preprocess',
                    description: 'called each time chart is drawn, prior to any data manipulation'
                },
                {
                    label: 'datatransform',
                    description: 'called once for each mark in settings'
                },
                {
                    label: 'draw',
                    description: 'called after data manipulation and before any marks are drawn'
                },
                {
                    label: 'resize',
                    description: 'called after chart is full-renderered'
                },
                {
                    label: 'destroy',
                    description: 'removes chart from webpage; must be explicitly called'
                }
            ].map(d => d)
        )
        .enter()
        .append('div')
        .attr('class', d => `ct-component ct-component--callback ct-${d.label}`)
        .each(function(d) {
            const component = d3.select(this);

            //Attach component to containers object.
            d.container = component;
            context.containers.callbacks.push(component);

            //Add header, input, and description.
            context.containers[`${d.label}Header`] = component
                .append('h3')
                .classed('ct-component__header', true)
                .text(d.label);
            context.containers[`${d.label}Textarea`] = component
                .append('textarea')
                .classed('ct-component__textarea', true);
            context.containers[`${d.label}Description`] = component
                .append('small')
                .classed('ct-component__description', true)
                .text(d.description);
        });
}
