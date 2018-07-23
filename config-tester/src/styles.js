export default function styles() {
    const chartHeight = 437;

    const settingsWidth = 32;
    const settingsPadding = 2;
    const settingsMargin = 2;

    const callbackWidth = 13;
    const callbackPadding = 1.5;
    const callbackMargin = 1.5;

    const styles = [
        /***--------------------------------------------------------------------------------------\
          Global styles
        \--------------------------------------------------------------------------------------***/

            '#config-tester {' +
            '}',
            '.ct-row {' +
                'width: 100%;' +
                'display: inline-block;' +
            '}',
            '.ct-row__header {' +
                'width: 100%;' +
                'padding-bottom: 5px;' +
                'border-bottom: 1px solid lightgray;' +
                'margin-bottom: 5px;' +
            '}',
            '.ct-component {' +
                'display: inline-block;' +
                'vertical-align: top;' +
            '}',
            '.ct-component__header {' +
                'text-align: left;' +
            '}',
            '.ct-component__textarea {' +
                'white-space: pre;' +
                'font-family: courier;' +
                'width: 100%;' +
            '}',

        /***--------------------------------------------------------------------------------------\
          Chart framework
        \--------------------------------------------------------------------------------------***/

            '.ct-chart-framework {' +
            '}',
            '.ct-callbacks > .ct-component {' +
                `width: ${settingsWidth}%;` +
            '}',

                /*****----------------------------------------------------------------------------\
                  General Settings
                \----------------------------------------------------------------------------*****/

                    '.ct-component--top {' +
                        `width: ${settingsWidth}%;` +
                        `margin-right: ${settingsWidth + settingsMargin}%;` + 
                        `margin-left: ${settingsWidth + settingsMargin}%;` + 
                    '}',
                    '.ct-component--top .ct-component__textarea {' +
                    '}',

                /*****----------------------------------------------------------------------------\
                  Y-axis Settings
                \----------------------------------------------------------------------------*****/

                    '.ct-component--left {' +
                        `width: ${settingsWidth}%;` +
                        `height: ${chartHeight}px;` +
                        'float: left;' +
                    '}',
                    '.ct-component--left .ct-component__textarea {' +
                        'height: 100%;' +
                    '}',

                /*****----------------------------------------------------------------------------\
                  Chart
                \----------------------------------------------------------------------------*****/

                    '.ct-chart {' +
                        `width: ${settingsWidth}%;` +
                        `height: ${chartHeight}px;` +
                        `padding: 10px ${settingsPadding}%;` +
                    '}',

                /*****----------------------------------------------------------------------------\
                  Mark Settings
                \----------------------------------------------------------------------------*****/

                    '.ct-component--right {' +
                        `width: ${settingsWidth}%;` +
                        `height: ${chartHeight}px;` +
                        'float: right;' +
                    '}',
                    '.ct-component--right .ct-component__textarea {' +
                        'height: 100%;' +
                    '}',

                /*****----------------------------------------------------------------------------\
                  X-axis Settings
                \----------------------------------------------------------------------------*****/

                    '.ct-component--bottom {' +
                        `width: ${settingsWidth}%;` +
                        `margin-right: ${settingsWidth + settingsMargin}%;` +
                        `margin-left: ${settingsWidth + settingsMargin}%;` +
                    '}',
                    '.ct-component--bottom .ct-component__textarea {' +
                    '}',

        /***--------------------------------------------------------------------------------------\
          Callback
        \--------------------------------------------------------------------------------------***/

            '.ct-callbacks {' +
            '}',
            '.ct-callbacks > .ct-component {' +
                `width: ${callbackWidth}%;` +
            '}',
            '.ct-callbacks > .ct-component:not(.ct-destroy) {' +
                `margin-right: ${callbackMargin}%;` +
            '}',
            '.ct-component--callback .ct-component__textarea {' +
                'height: 250px;' +
            '}',
    ];

    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styles.join('\n');
    document.getElementsByTagName('head')[0].appendChild(style);
}
