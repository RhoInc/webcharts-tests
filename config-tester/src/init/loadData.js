export default function loadData() {
    const context = this;

    return new Promise(function(resolve, reject) {
        const req = new XMLHttpRequest();
        req.open(
            'GET',
            'https://cdn.jsdelivr.net/gh/RhoInc/data-library/dataFiles.json',
            true
        );
        req.onload = function() {
            if (req.status == 200)
                resolve(
                    JSON.parse(req.responseText).sort(
                        (a, b) =>
                            a.name === 'master'
                                ? -1
                                : b.name === 'master'
                                    ? 1
                                    : a.name < b.name
                                        ? -1
                                        : 1
                    )
                );
            else reject(Error(this.statusText));
        };
        req.onerror = function() {
            reject(Error('Network Error'));
        };
        req.send();
    });
}
