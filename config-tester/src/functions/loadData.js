export default function loadData() {
    return fetch(`${this.dataPath}/${this.dataFile}`)
        .then(response => response.text())
        .then(text => d3.csv.parse(text));
}
