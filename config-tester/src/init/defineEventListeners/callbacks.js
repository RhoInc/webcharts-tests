export default function callbacks() {
    const context = this;

    this.containers.callbacks.forEach(container => {
        container.select('textarea').on('change', function(d) {
            context.callbacks[d.label] = this.value;
        });
    });
}
