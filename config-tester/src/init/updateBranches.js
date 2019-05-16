export default function updateBranches(branches) {
    //Add Webcharts branches to branch dropdown.
    if (!(Array.isArray(branches) && branches.length)) branches = [{ name: 'master' }];
    this.branches = branches;
    this.containers.controls.branches
        .selectAll('option')
        .data(branches, d => (d.commit ? d.commit.sha : d.name))
        .enter()
        .append('option')
        .text(d => d.name);
}
