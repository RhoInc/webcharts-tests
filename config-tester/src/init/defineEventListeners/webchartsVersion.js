import updateWebchartsVersion from '../../functions/updateWebchartsVersion';
import initTable from '../../functions/initTable';
import initChart from '../../functions/initChart';

export default function webchartsVersion() {
    this.containers.controls.webchartsVersion.on('change', () => {
        updateWebchartsVersion.call(this);

        const head = document.getElementsByTagName('head')[0];

        //Load Webcharts .js file.
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://cdn.jsdelivr.net/gh/RhoInc/Webcharts@${
            this.webchartsVersion.name
        }/build/webcharts.js`;
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

        //Load Webcharts .css file.
        const link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = `https://cdn.jsdelivr.net/gh/RhoInc/Webcharts@${
            this.webchartsVersion.name
        }/css/webcharts.css`;
        head.appendChild(link);

        //Redraw table and chart.
        const webChartsLoading = setInterval(() => {
            const webChartsExists = window.webCharts !== undefined;
            if (webChartsExists) {
                clearInterval(webChartsLoading);
                try {
                    initTable.call(this);
                    initChart.call(this);
                } catch (err) {
                    console.warn(err);
                    context.containers.chart.text(
                        `Webcharts version ${
                            this.webchartsVersion.name
                        } is experiencing technical difficulties.  Please select another version.`
                    );
                }
            }
        }, 25);
    });
}
