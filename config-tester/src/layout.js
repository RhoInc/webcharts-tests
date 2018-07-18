export default function layout() {
    this.containers.leftColumn = this.containers.main
        .append('div')
        .classed('column column--left chart-framework', true);

        this.containers.leftColumn
            .selectAll('div.component')
                .data([
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
                ])
                .enter()
            .append('div')
            .attr('class', d => `component component--${location} ${d.label.toLowerCase().split(' ').join('-')}`)
            .each(function(d) {
                const component = d3.select(this);
                this.containers[
                    d.label.toLowerCase()
                        .replace(' ', '-')
                        .split(' ')
                        .replace((d,i) => i === 0 ? d : d.substring(0,1).toUpperCase() + d.substring(1))
                        .join('')
                ] = component;
                if (d.location !== 'middle') {
                    component.append('h3').classed('settings-header', true).text(d.label);
                    component.append('textarea').classed('text-area', true);
                }
            });
            
            .append('div')
            .classed('component component--top settings general-settings', true);

            this.containers.generalSettings
                .append('h3')
                .classed('component__header', true)
                .text('General Settings');
            this.containers.generalSettings
                .append('div')
                .classed('component__code', true);

    this.containers.rightColumn = this.containers.main
        .append('div')
        .classed('column column--right chart-framework', true);
/*
            <div class = 'column column--right' id = 'code-framework'>
                <div id = 'text-settings'>
                    <h3>Settings</h3>
                    <textarea class = 'text-area'></textarea>
                </div>

                <div id = 'callbacks'>
                    <h3>Callbacks</h3>
                    <div class = 'callback' id = 'init'>
                        <label class = 'callback-label'>init</label>
                        <textarea class = 'text-area callback-input'></textarea>
                    </div>
                    <div class = 'callback' id = 'layout'>
                        <label class = 'callback-label'>layout</label>
                        <textarea class = 'text-area callback-input'></textarea>
                    </div>
                    <div class = 'callback' id = 'preprocess'>
                        <label class = 'callback-label'>preprocess</label>
                        <textarea class = 'text-area callback-input'></textarea>
                    </div>
                    <div class = 'callback' id = 'datatransform'>
                        <label class = 'callback-label'>datatransform</label>
                        <textarea class = 'text-area callback-input'></textarea>
                    </div>
                    <div class = 'callback' id = 'draw'>
                        <label class = 'callback-label'>draw</label>
                        <textarea class = 'text-area callback-input'></textarea>
                    </div>
                    <div class = 'callback' id = 'resize'>
                        <label class = 'callback-label'>resize</label>
                        <textarea class = 'text-area callback-input'></textarea>
                    </div>
                    <div class = 'callback' id = 'destroy'>
                        <label class = 'callback-label'>destroy</label>
                        <textarea class = 'text-area callback-input'></textarea>
                    </div>
                </div>
            </div>
*/
}
