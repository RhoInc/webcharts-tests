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

    this.containers.renderChartControl = this.containers.buttons
        .append('div')
        .classed('ct-control ct-control--render', true);
    this.containers.controls.renderChart = this.containers.renderChartControl
        .append('button')
        .classed('ct-control__button', true)
        .text('Render Chart');

    this.containers.dropdowns = this.containers.configuration
        .append('div')
        .classed('ct-control-div ct-control-div--dropdowns', true);

    //chart configuration
    this.containers.chartConfigurationControl = this.containers.dropdowns
        .append('div')
        .classed('ct-control ct-control--chart-configuration', true);
    this.containers.controls.chartConfiguration = this.containers.chartConfigurationControl
        .append('select')
        .classed('ct-control__select', true);
    this.containers.chartConfigurationControl
        .append('span')
        .classed('ct-control__label', true)
        .text('Chart Configuration');

    //data file
    this.containers.dataFileControl = this.containers.dropdowns
        .append('div')
        .classed('ct-control ct-control--data-file', true);
    this.containers.controls.dataFile = this.containers.dataFileControl
        .append('select')
        .classed('ct-control__select', true);
    this.containers.dataFileControl
        .append('span')
        .classed('ct-control__label', true)
        .text('Select a data file or load a .csv:');
    this.containers.dataFileSelect = this.containers.dataFileControl
        .append('input')
        .classed('ct-control__input ct-control__input--file', true)
        .attr('type', 'file');

    //webcharts versions
    this.containers.webchartsVersionControl = this.containers.dropdowns
        .append('div')
        .classed('ct-control ct-control--webcharts-version', true);
    this.containers.controls.webchartsVersion = this.containers.webchartsVersionControl
        .append('select')
        .classed('ct-control__select', true);
    this.containers.webchartsVersionControl
        .append('span')
        .classed('ct-control__label', true)
        .text('Webcharts Branch');

    //data preview
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
