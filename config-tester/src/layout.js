export default function layout() {
    const context = this;

    /**-------------------------------------------------------------------------------------------\
	  Configuration
    \-------------------------------------------------------------------------------------------**/

        this.containers.configuration = this.containers.main
            .append('div')
            .classed('ct-row ct-row--top ct-configuration', true);

            this.containers.configuration.append('h1').classed('ct-row__header', true).text('Configuration');

            this.containers.settingsControl = this.containers.configuration
                .append('div')
                .classed('ct-control ct-control--settings', true);
                this.containers.controls.settings = this.containers.settingsControl
                    .append('select')
                    .classed('ct-control__select', true);
                this.containers.settingsControl
                    .append('span')
                    .classed('ct-control__label', true)
                    .text('Chart Configuration');

            this.containers.dataControl = this.containers.configuration
                .append('div')
                .classed('ct-control ct-control--data', true);
                this.containers.controls.data = this.containers.dataControl
                    .append('select')
                    .classed('ct-control__select', true);
                this.containers.dataControl
                    .append('span')
                    .classed('ct-control__label', true)
                    .text('Data');

            this.containers.branchesControl = this.containers.configuration
                .append('div')
                .classed('ct-control ct-control--branches', true);
                this.containers.controls.branches = this.containers.branchesControl
                    .append('select')
                    .classed('ct-control__select', true);
                this.containers.branchesControl
                    .append('span')
                    .classed('ct-control__label', true)
                    .text('Webcharts Branch');

    /**-------------------------------------------------------------------------------------------\
	  Chart framework
    \-------------------------------------------------------------------------------------------**/

        this.containers.chartFramework = this.containers.main
            .append('div')
            .classed('ct-row ct-row--middle ct-chart-framework', true);

            this.containers.chartFramework.append('h1').classed('ct-row__header', true).text('Chart Framework');

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
                            d.setting = d.label.replace('-', ' ').replace('Mark', 'Marks').split(' ')[0].toLowerCase();

                            return d;
                        })
                    )
                    .enter()
                .append('div')
                .attr('class', d => `ct-component ct-component--${d.location} ct-${d.label.toLowerCase().split(' ').join('-')}`)
                .each(function(d) {
                    const component = d3.select(this);

                    //Attach component to containers object.
                    d.container = component;
                    if (d.property !== 'chart')
                        context.containers.settings.push(component);
                    else
                        context.containers[d.property] = component;

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

    /**-------------------------------------------------------------------------------------------\
	  Callbacks
    \-------------------------------------------------------------------------------------------**/

        this.containers.callbacksContainer = this.containers.main
            .append('div')
            .classed('ct-row ct-row--bottom ct-callbacks', true);

            this.containers.callbacksContainer.append('h1').classed('ct-row__header', true).text('Callbacks');

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
