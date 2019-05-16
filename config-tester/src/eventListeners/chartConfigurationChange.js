export default function chartConfigurationChange() {
    this.containers.controls.settings.on('change', () => {
        this.containers.controls.render.node().click();
    });
}
