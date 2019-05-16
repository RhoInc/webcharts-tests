export default function onInit() {
    if (this.data) {
        this.config.cols = Object.keys(this.data.raw[0]).filter(key => key !== 'index');
        this.config.headers = this.config.cols.slice();
    }
}
