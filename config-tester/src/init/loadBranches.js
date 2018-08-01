export default function loadBranches() {
    const context = this;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const branches = JSON.parse(this.responseText)
                .sort((a,b) => (
                    a.name === 'master' ? -1 :
                    b.name === 'master' ?  1 :
                        a.name < b.name ? -1 : 1
                ));
            context.containers.controls.branches
                .selectAll('option')
                    .data(branches, d => d.commit.sha)
                    .enter()
                .append('option')
                .text(d => d.name);
        }
    };
    xhttp.open('GET', 'https://api.GitHub.com/repos/RhoInc/Webcharts/branches', true);
    xhttp.send();
}
