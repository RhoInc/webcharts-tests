export default function chartFramework() {
    const context = this;

    this.containers.chartFramework = this.containers.main
        .append('div')
        .classed('ct-row ct-row--middle ct-chart-framework', true);

    this.containers.chartFramework
        .append('h1')
        .classed('ct-row__header', true)
        .text('Chart Framework');
    this.containers.chartFramework
        .append('h5')
        .classed('ct-row__instruction', true)
        .html(
            `Edit chart settings below and click the <span id = 'ct-render-chart-hover'>Render Chart</span> button to re-render the chart.`
        );

    this.containers.chartFramework
        .selectAll('div.ct-component')
        .data(
            [
                {
                    label: 'General Settings',
                    location: 'top'
                },
                {
                    label: 'Y-axis Settings',
                    location: 'left'
                },
                {
                    label: 'Chart',
                    location: 'middle'
                },
                {
                    label: 'Mark Settings',
                    location: 'right'
                },
                {
                    label: 'X-axis Settings',
                    location: 'bottom'
                }
            ].map(d => {
                d.property = d.label
                    .toLowerCase()
                    .replace(' ', '-')
                    .split(' ')
                    .map((d, i) => (i === 0 ? d : d.substring(0, 1).toUpperCase() + d.substring(1)))
                    .join('');
                d.setting = d.label
                    .replace('-', ' ')
                    .replace('Mark', 'Marks')
                    .split(' ')[0]
                    .toLowerCase();

                return d;
            })
        )
        .enter()
        .append('div')
        .attr(
            'class',
            d =>
                `ct-component ct-component--${d.location} ct-${d.label
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`
        )
        .each(function(d) {
            const component = d3.select(this);

            //Attach component to containers object.
            d.container = component;
            if (d.property !== 'chart') context.containers.settings.push(component);
            else context.containers[d.property] = component;

            //Add header and input.
            if (d.location !== 'middle') {
                context.containers[`${d.property}Header`] = component
                    .append('h3')
                    .classed('ct-component__header', true)
                    .text(d.label);
                context.containers[`${d.property}Textarea`] = component
                    .append('textarea')
                    .classed('ct-component__textarea', true);
            }
        });
}
