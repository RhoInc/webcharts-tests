export default function layout() {
    const context = this;

    this.containers.chartFramework = this.containers.main
        .append('div')
        .classed('ct-row ct-row--top ct-chart-framework', true);

        this.containers.chartFramework.append('h1').text('Chart Framework');

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
                        },
                    ]
                    .map(d => {
                        d.property = d.label.toLowerCase()
                            .replace(' ', '-')
                            .split(' ')
                            .map((d,i) => i === 0 ? d : d.substring(0,1).toUpperCase() + d.substring(1))
                            .join('');
                        d.setting = d.label.replace('-', ' ').split(' ')[0].toLowerCase();

                        return d;
                    })
                )
                .enter()
            .append('div')
            .attr('class', d => `ct-component ct-component--${location} ct-${d.label.toLowerCase().split(' ').join('-')}`)
            .each(function(d) {
                const component = d3.select(this);

                //Attach component to containers object.
                d.container = component;
                context.containers.settings.push(component);

                //Add header and input.
                if (d.location !== 'middle') {
                    component
                        .append('h3')
                        .classed('ct-component__header', true)
                        .text(d.label);
                    component
                        .append('textarea')
                        .classed('ct-component__textarea', true)
                        .html(JSON.stringify(context.settings[d.setting], null, 4));
                }
            });

    this.containers.callbacks = this.containers.main
        .append('div')
        .classed('ct-row ct-row--bottom callbacks', true);

        this.containers.callbacks.append('h1').text('Callbacks');

        this.containers.callbacks
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
                        },
                    ]
                    .map(d => d)
                )
                .enter()
            .append('div')
            .attr('class', d => `ct-component ct-component--callback ct-${d.label}`)
            .each(function(d) {
                const component = d3.select(this);

                //Attach component to containers object.
                d.container = component;
                context.containers.callbacks.push(component);

                //Add header, description, and input.
                component.append('h3')
                    .classed('ct-component__header', true)
                    .text(d.label);
                component
                    .append('small')
                    .classed('ct-component__description', true)
                    .text(d.description);
                component
                    .append('textarea')
                    .classed('ct-component__textarea', true);
            });
}
