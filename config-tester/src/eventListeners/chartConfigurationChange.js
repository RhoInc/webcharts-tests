export default function chartConfigurationChange() {
    const context = this;

    this.containers.controls.settings.on('change', function() {
        context.containers.controls.render.node().click();
    });
}
