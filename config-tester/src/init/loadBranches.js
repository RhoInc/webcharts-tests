export default function loadBranches() {
    const context = this;

    return new Promise(function(resolve,reject) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200)
                resolve(
                    JSON.parse(this.responseText)
                        .sort((a,b) => (
                            a.name === 'master' ? -1 :
                            b.name === 'master' ?  1 :
                                a.name < b.name ? -1 : 1
                        ))
                );
            else
                resolve(
                    [
                        {name: 'master'},
                        {name: 'bar-chart-domain'},
                        {name: 'falsey-zeroes'},
                    ]
                );
        };
        xhttp.open('GET', 'https://api.GitHub.com/repos/RhoInc/Webcharts/branches', true);
        xhttp.send();
    });
}
