import callback from './loadData/callback';

export default function loadData() {
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://rawgit.com/RhoInc/viz-library/master/util/web/data/dataFiles.js';
    script.configTester = this;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}
