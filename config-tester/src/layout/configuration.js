export default function configuration() {
    this.containers.configuration = this.containers.main
        .append('div')
        .classed('ct-row ct-row--top ct-configuration', true);

    this.containers.configuration
        .append('h1')
        .classed('ct-row__header', true)
        .text('Configuration');
    this.containers.configuration
        .append('h5')
        .classed('ct-row__instruction', true)
        .text('Choose a chart configuration, a Webcharts branch, and optionally a data file.');

    this.containers.buttons = this.containers.configuration
        .append('div')
        .classed('ct-control-div ct-control-div--buttons', true);

    this.containers.renderControl = this.containers.buttons
        .append('div')
        .classed('ct-control ct-control--render', true);
    this.containers.controls.render = this.containers.renderControl
        .append('button')
        .classed('ct-control__button', true)
        .text('Render Chart');

    this.containers.dropdowns = this.containers.configuration
        .append('div')
        .classed('ct-control-div ct-control-div--dropdowns', true);

    this.containers.settingsControl = this.containers.dropdowns
        .append('div')
        .classed('ct-control ct-control--settings', true);
    this.containers.controls.settings = this.containers.settingsControl
        .append('select')
        .classed('ct-control__select', true);
    this.containers.settingsControl
        .append('span')
        .classed('ct-control__label', true)
        .text('Chart Configuration');

    this.containers.dataControl = this.containers.dropdowns
        .append('div')
        .classed('ct-control ct-control--data', true);
    this.containers.controls.data = this.containers.dataControl
        .append('select')
        .classed('ct-control__select', true);
    this.containers.dataControl
        .append('span')
        .classed('ct-control__label', true)
        .text('Select a data file or load a .csv:');
    this.containers.dataSelect = this.containers.dataControl
        .append('input')
        .classed('ct-control__input ct-control__input--file', true)
        .attr('type', 'file');

    this.containers.branchesControl = this.containers.dropdowns
        .append('div')
        .classed('ct-control ct-control--branches', true);
    this.containers.controls.branches = this.containers.branchesControl
        .append('select')
        .classed('ct-control__select', true);
    this.containers.branchesControl
        .append('span')
        .classed('ct-control__label', true)
        .text('Webcharts Branch');

    this.containers.dataPreviewContainer = this.containers.configuration
        .append('div')
        .classed('ct-control-div ct-data-preview', true);

    this.containers.dataPreviewContainer
        .append('h3')
        .classed('ct-data-preview__header', true)
        .text('Data Preview');
    this.containers.dataPreview = this.containers.dataPreviewContainer
        .append('div')
        .classed('ct-data-preview__table', true);
}
