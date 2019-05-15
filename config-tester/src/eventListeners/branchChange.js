import getConfiguration from './renderChart/getConfiguration';
import prepareTable from './renderChart/prepareTable';
import prepareChart from './renderChart/prepareChart';
import init from './renderChart/init';

export default function branchChange() {
    const context = this;

    this.containers.branchesControl.on('change', function() {
        delete window.webCharts;

        const d = d3
            .select(this)
            .select('option:checked')
            .datum();
        this.branch = d.name;
        const head = document.getElementsByTagName('head')[0];

        //Load Webcharts .js file.
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://cdn.jsdelivr.net/gh/RhoInc/Webcharts@${d.name}/build/webcharts.js`;
        head.appendChild(script);

        //Disable Webcharts .css file.
        const styleSheets = document.styleSheets;
        for (const i in styleSheets) {
            const styleSheet = styleSheets[i];
            if (/webcharts\.(min\.)?css/.test(styleSheet.href)) styleSheet.disabled = true;
        }

        //Remove Webcharts .css file.
        const links = head.querySelectorAll('link');
        for (const i in links) {
            const link = links[i];
            if (/webcharts\.(min\.)?css/.test(link.href)) head.removeChild(link);
        }

        //Load Webcharts .js file.
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = `https://cdn.rawgit.com/RhoInc/Webcharts/${d.name}/css/webcharts.css`;
        head.appendChild(link);

        //Redraw table and chart.
        const webChartsLoading = setInterval(() => {
            const webChartsExists = window.webCharts !== undefined;
            if (webChartsExists) {
                clearInterval(webChartsLoading);
                getConfiguration.call(
                    context,
                    context.chartConfiguration === undefined,
                    context.data === undefined,
                    context.branch === undefined
                );
                console.log(webCharts.version);
                try {
                    prepareTable.call(context);
                    prepareChart.call(context);
                    init.call(context, context.data === undefined);
                } catch(err) {
                    console.warn(err);
                    context.containers.chart
                        .text(`Webcharts branch ${d.name} is experiencing technical difficulties.  Please select another branch or version.`);
                }
            }
        }, 25);
    });
}
