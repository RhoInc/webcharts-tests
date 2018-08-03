(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.configTester = factory());
}(this, (function () { 'use strict';

    function horizontalBarChart() {
        return {
            data: './data/iris.csv',
            x: {
                type: 'linear',
                column: 'sepal width',
                label: 'Sepal Width'
            },
            y: {
                type: 'ordinal',
                column: 'species',
                label: 'Species'
            },
            marks: [{
                type: 'bar',
                per: ['species'],
                tooltip: '[species]: $y',
                attributes: {
                    stroke: 'black'
                },
                summarizeX: 'mean'
            }],
            color_by: 'species',
            color_dom: null,
            legend: {
                label: 'Species',
                location: 'top'
            },
            resizable: false
        };
    }

    function scatterPlot() {
        return {
            data: './data/iris.csv',
            x: {
                type: 'linear',
                column: 'sepal width',
                label: 'Sepal Width'
            },
            y: {
                type: 'linear',
                column: 'sepal length',
                label: 'Sepal Length'
            },
            marks: [{
                type: 'circle',
                per: ['species', 'sepal width', 'sepal length'],
                tooltip: '[species]: $x/$y',
                attributes: {
                    stroke: 'black'
                }
            }],
            color_by: 'species',
            color_dom: null,
            legend: {
                label: 'Species',
                location: 'top'
            },
            resizable: false
        };
    }

    function timeSeriesPlot() {
        return {
            data: './data/climate_data.csv',
            x: {
                type: 'time',
                column: 'DATE',
                label: 'Date'
            },
            y: {
                type: 'linear',
                column: 'Monthly Mean',
                label: 'Mean Temperature?'
            },
            marks: [{
                type: 'line',
                per: ['STATION_NAME'],
                summarizeY: 'mean'
            }, {
                type: 'circle',
                per: ['STATION_NAME', 'DATE'],
                summarizeY: 'mean'
            }],
            color_by: 'STATION_NAME',
            color_dom: null,
            legend: {
                label: 'Measurement Location',
                location: 'top'
            },
            resizable: false
        };
    }

    function verticalBarChart() {
        return {
            data: './data/iris.csv',
            x: {
                type: 'ordinal',
                column: 'species',
                label: 'Species'
            },
            y: {
                type: 'linear',
                column: 'sepal width',
                label: 'Sepal Width'
            },
            marks: [{
                type: 'bar',
                per: ['species'],
                tooltip: '[species]: $y',
                attributes: {
                    stroke: 'black'
                },
                summarizeY: 'mean'
            }],
            color_by: 'species',
            color_dom: null,
            legend: {
                label: 'Species',
                location: 'top'
            },
            resizable: false
        };
    }

    var chartConfigurations = {
        horizontalBarChart: horizontalBarChart,
        scatterPlot: scatterPlot,
        timeSeriesPlot: timeSeriesPlot,
        verticalBarChart: verticalBarChart
    };

    function loadChartConfigurations() {

        return new Promise(function (resolve, reject) {
            resolve(Object.keys(chartConfigurations).map(function (key) {
                var chartConfiguration = chartConfigurations[key]();
                chartConfiguration.type = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                chartConfiguration.type;

                return chartConfiguration;
            }));
        });
    }

    function loadData() {

        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', 'https://rawgit.com/RhoInc/viz-library/master/util/web/data/dataFiles.json', true);
            req.onload = function () {
                if (req.status == 200) resolve(JSON.parse(req.responseText).sort(function (a, b) {
                    return a.name === 'master' ? -1 : b.name === 'master' ? 1 : a.name < b.name ? -1 : 1;
                }));else reject(Error(this.statusText));
            };
            req.onerror = function () {
                reject(Error('Network Error'));
            };
            req.send();
        });
    }

    function loadBranches() {

        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) resolve(JSON.parse(this.responseText).sort(function (a, b) {
                    return a.name === 'master' ? -1 : b.name === 'master' ? 1 : a.name < b.name ? -1 : 1;
                }));
            };
            xhttp.open('GET', 'https://api.GitHub.com/repos/RhoInc/Webcharts/branches', true);
            xhttp.send();
        });
    }

    function init() {
        var context = this;

        //Add viz-library data to data dropdown.
        loadChartConfigurations.call(this).then(function (chartConfigurations) {
            console.log(chartConfigurations);
            context.chartConfigurations = chartConfigurations;
            context.containers.controls.settings.selectAll('option').data(chartConfigurations, function (d) {
                return d.type;
            }).enter().append('option').text(function (d) {
                return d.type;
            });

            return chartConfigurations;
        });

        //Add viz-library data to data dropdown.
        loadData.call(this).then(function (data) {
            console.log(data);
            context.data = data;
            context.containers.controls.data.selectAll('option').data(data).enter().append('option').text(function (d) {
                return d.rel_path;
            });

            return data;
        });

        //Add Webcharts branches to branch dropdown.
        loadBranches.call(this).then(function (branches) {
            console.log(branches);
            context.branches = branches;
            context.containers.controls.branches.selectAll('option').data(branches, function (d) {
                return d.commit.sha;
            }).enter().append('option').text(function (d) {
                return d.name;
            });

            return branches;
        });
    }

    function layout() {
        var context = this;

        /**-------------------------------------------------------------------------------------------\
        Configuration
        \-------------------------------------------------------------------------------------------**/

        this.containers.configuration = this.containers.main.append('div').classed('ct-row ct-row--top ct-configuration', true);

        this.containers.configuration.append('h1').classed('ct-row__header', true).text('Configuration');
        this.containers.configuration.append('h5').classed('ct-row__instruction', true).text('Choose a chart configuration, a Webcharts branch, and optionally a data file.');

        this.containers.buttons = this.containers.configuration.append('div').classed('ct-control-div ct-control-div--buttons', true);

        this.containers.renderControl = this.containers.buttons.append('div').classed('ct-control ct-control--render', true);
        this.containers.controls.render = this.containers.renderControl.append('button').classed('ct-control__button', true).text('Render Chart');

        this.containers.dropdowns = this.containers.configuration.append('div').classed('ct-control-div ct-control-div--dropdowns', true);

        this.containers.settingsControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--settings', true);
        this.containers.controls.settings = this.containers.settingsControl.append('select').classed('ct-control__select', true);
        this.containers.settingsControl.append('span').classed('ct-control__label', true).text('Chart Configuration');

        this.containers.dataControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--data', true);
        this.containers.controls.data = this.containers.dataControl.append('select').classed('ct-control__select', true);
        this.containers.dataControl.append('span').classed('ct-control__label', true).text('Select a data file or load a .csv:');
        this.containers.dataSelect = this.containers.dataControl.append('input').classed('ct-control__input ct-control__input--file', true).attr('type', 'file');

        this.containers.branchesControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--branches', true);
        this.containers.controls.branches = this.containers.branchesControl.append('select').classed('ct-control__select', true);
        this.containers.branchesControl.append('span').classed('ct-control__label', true).text('Webcharts Branch');

        this.containers.dataPreviewContainer = this.containers.configuration.append('div').classed('ct-control-div ct-data-preview', true);

        this.containers.dataPreview = this.containers.dataPreviewContainer.append('h3').classed('ct-data-preview__header', true).text('Data Preview');
        this.containers.dataPreview = this.containers.dataPreviewContainer.append('div').classed('ct-data-preview__table', true);

        /**-------------------------------------------------------------------------------------------\
        Chart framework
        \-------------------------------------------------------------------------------------------**/

        this.containers.chartFramework = this.containers.main.append('div').classed('ct-row ct-row--middle ct-chart-framework', true);

        this.containers.chartFramework.append('h1').classed('ct-row__header', true).text('Chart Framework');
        this.containers.chartFramework.append('h5').classed('ct-row__instruction', true).html('Edit chart settings below and click the <span id = \'ct-render-chart-hover\'>Render Chart</span> button to re-render the chart.');

        this.containers.chartFramework.selectAll('div.ct-component').data([{
            label: 'General Settings',
            location: 'top'
        }, {
            label: 'Y-axis Settings',
            location: 'left'
        }, {
            label: 'Chart',
            location: 'middle'
        }, {
            label: 'Mark Settings',
            location: 'right'
        }, {
            label: 'X-axis Settings',
            location: 'bottom'
        }].map(function (d) {
            d.property = d.label.toLowerCase().replace(' ', '-').split(' ').map(function (d, i) {
                return i === 0 ? d : d.substring(0, 1).toUpperCase() + d.substring(1);
            }).join('');
            d.setting = d.label.replace('-', ' ').replace('Mark', 'Marks').split(' ')[0].toLowerCase();

            return d;
        })).enter().append('div').attr('class', function (d) {
            return 'ct-component ct-component--' + d.location + ' ct-' + d.label.toLowerCase().split(' ').join('-');
        }).each(function (d) {
            var component = d3.select(this);

            //Attach component to containers object.
            d.container = component;
            if (d.property !== 'chart') context.containers.settings.push(component);else context.containers[d.property] = component;

            //Add header and input.
            if (d.location !== 'middle') {
                context.containers[d.property + 'Header'] = component.append('h3').classed('ct-component__header', true).text(d.label);
                context.containers[d.property + 'Textarea'] = component.append('textarea').classed('ct-component__textarea', true);
            }
        });

        /**-------------------------------------------------------------------------------------------\
        Callbacks
        \-------------------------------------------------------------------------------------------**/

        this.containers.callbacksContainer = this.containers.main.append('div').classed('ct-row ct-row--bottom ct-callbacks', true);

        this.containers.callbacksContainer.append('h1').classed('ct-row__header', true).text('Callbacks');
        this.containers.callbacksContainer.append('h5').classed('ct-row__instruction', true).html('Add chart callbacks below and click the <span class = \'ct-render-chart-hover\'>Render Chart</span> button to re-render the chart.');

        this.containers.callbacksContainer.selectAll('div.ct-component').data([{
            label: 'init',
            description: 'called once before chart container is laid out on webpage'
        }, {
            label: 'layout',
            description: 'called once after chart container is laid out on webpage'
        }, {
            label: 'preprocess',
            description: 'called each time chart is drawn, prior to any data manipulation'
        }, {
            label: 'datatransform',
            description: 'called once for each mark in settings'
        }, {
            label: 'draw',
            description: 'called after data manipulation and before any marks are drawn'
        }, {
            label: 'resize',
            description: 'called after chart is full-renderered'
        }, {
            label: 'destroy',
            description: 'removes chart from webpage; must be explicitly called'
        }].map(function (d) {
            return d;
        })).enter().append('div').attr('class', function (d) {
            return 'ct-component ct-component--callback ct-' + d.label;
        }).each(function (d) {
            var component = d3.select(this);

            //Attach component to containers object.
            d.container = component;
            context.containers.callbacks.push(component);

            //Add header, input, and description.
            context.containers[d.label + 'Header'] = component.append('h3').classed('ct-component__header', true).text(d.label);
            context.containers[d.label + 'Textarea'] = component.append('textarea').classed('ct-component__textarea', true);
            context.containers[d.label + 'Description'] = component.append('small').classed('ct-component__description', true).text(d.description);
        });
    }

    function styles() {
        var chartHeight = 437;

        var settingsWidth = 32;
        var settingsPadding = 2;
        var settingsMargin = 2;

        var callbackWidth = 13;
        var callbackMargin = 1.5;

        var styles = [
        /***--------------------------------------------------------------------------------------\
          Global styles
        \--------------------------------------------------------------------------------------***/

        '#config-tester {' + '}', '.ct-row {' + 'width: 100%;' + 'display: inline-block;' + '}', '.ct-row__header {' + 'width: 100%;' + 'padding-bottom: 5px;' + 'border-bottom: 1px solid lightgray;' + 'margin-bottom: 5px;' + '}', '.ct-component {' + 'display: inline-block;' + 'vertical-align: top;' + '}', '.ct-component__header {' + 'text-align: left;' + '}', '.ct-component__textarea {' + 'white-space: pre;' + 'font-family: courier;' + 'width: 100%;' + '}',

        /***--------------------------------------------------------------------------------------\
          Chart framework
        \--------------------------------------------------------------------------------------***/

        '.ct-chart-framework {' + '}', '.ct-callbacks > .ct-component {' + ('width: ' + settingsWidth + '%;') + '}',

        /*****----------------------------------------------------------------------------\
          General Settings
        \----------------------------------------------------------------------------*****/

        '.ct-component--top {' + ('width: ' + settingsWidth + '%;') + ('margin-right: ' + (settingsWidth + settingsMargin) + '%;') + ('margin-left: ' + (settingsWidth + settingsMargin) + '%;') + '}', '.ct-component--top .ct-component__textarea {' + '}',

        /*****----------------------------------------------------------------------------\
          Y-axis Settings
        \----------------------------------------------------------------------------*****/

        '.ct-component--left {' + ('width: ' + settingsWidth + '%;') + ('height: ' + chartHeight + 'px;') + 'float: left;' + '}', '.ct-component--left .ct-component__textarea {' + 'height: 100%;' + '}',

        /*****----------------------------------------------------------------------------\
          Chart
        \----------------------------------------------------------------------------*****/

        '.ct-chart {' + ('width: ' + settingsWidth + '%;') + ('height: ' + chartHeight + 'px;') + ('padding: 10px ' + settingsPadding + '%;') + '}',

        /*****----------------------------------------------------------------------------\
          Mark Settings
        \----------------------------------------------------------------------------*****/

        '.ct-component--right {' + ('width: ' + settingsWidth + '%;') + ('height: ' + chartHeight + 'px;') + 'float: right;' + '}', '.ct-component--right .ct-component__textarea {' + 'height: 100%;' + '}',

        /*****----------------------------------------------------------------------------\
          X-axis Settings
        \----------------------------------------------------------------------------*****/

        '.ct-component--bottom {' + ('width: ' + settingsWidth + '%;') + ('margin-right: ' + (settingsWidth + settingsMargin) + '%;') + ('margin-left: ' + (settingsWidth + settingsMargin) + '%;') + '}', '.ct-component--bottom .ct-component__textarea {' + '}',

        /***--------------------------------------------------------------------------------------\
          Callback
        \--------------------------------------------------------------------------------------***/

        '.ct-callbacks {' + '}', '.ct-callbacks > .ct-component {' + ('width: ' + callbackWidth + '%;') + '}', '.ct-callbacks > .ct-component:not(.ct-destroy) {' + ('margin-right: ' + callbackMargin + '%;') + '}', '.ct-component--callback .ct-component__textarea {' + 'height: 250px;' + '}'];

        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = styles.join('\n');
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    function getConfiguration() {
        var _this = this;

        this.chartConfiguration = this.containers.controls.settings.select('option:checked').datum();
        console.log(this.chartConfiguration);
        this.dataFile = this.chartConfiguration.data;
        this.containers.controls.data.selectAll('option').property('selected', function (d) {
            return d.rel_path === _this.dataFile;
        });
        console.log(this.dataFile);
        this.branch = this.containers.controls.branches.select('option:checked').datum();
        console.log(this.branch);
    }

    function prepareChart() {
        var _this = this;

        this.settings.chart = this.chartConfiguration;
        this.settings.general = Object.keys(this.settings.chart).filter(function (key) {
            return ['data', 'x', 'y', 'marks'].indexOf(key) < 0;
        }).reduce(function (acc, cur) {
            acc[cur] = _this.settings.chart[cur];
            return acc;
        }, {});
        this.settings.y = this.settings.chart.y;
        this.settings.marks = this.settings.chart.marks;
        this.settings.x = this.settings.chart.x;
        if (this.chart) this.chart.destroy();
        if (this.table) this.table.destroy();
        this.chart = new webCharts.createChart(this.containers.chart.node(), this.settings.chart);
    }

    function updateSettings() {
        var _this = this;

        this.containers.settings.forEach(function (container) {
            var d = container.datum();
            var json = JSON.stringify(_this.settings[d.setting], null, 4);
            container.select('textarea').text(JSON.stringify(_this.settings[d.setting], null, 4)).attr('rows', ['general', 'x'].indexOf(d.setting) > -1 ? json.split('\n').length : null);
        });
    }

    function initChart() {
        var _this = this;

        d3.csv(this.dataPath + "/" + this.dataFile, function (d) {
            return d;
        }, function (data) {
            _this.data = data;
            _this.chart.init(data);
            _this.table = new webCharts.createTable(_this.containers.dataPreview.node()).init(data);
        });
    }

    function renderChart() {
        var _this = this;

        this.containers.controls.render.on('click', function () {
            getConfiguration.call(_this);
            prepareChart.call(_this);
            updateSettings.call(_this);
            initChart.call(_this);
        });
    }

    function branchChange() {

        this.containers.branchesControl.on('change', function () {
            var d = d3.select(this).select('option:checked').datum();
            this.branch = d.name;
            var head = document.getElementsByTagName('head')[0];

            //Load Webcharts .js file.
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdn.rawgit.com/RhoInc/Webcharts/' + d.name + '/build/webcharts.js';
            head.appendChild(script);

            //Disable Webcharts .css file.
            var styleSheets = document.styleSheets;
            for (var i in styleSheets) {
                var styleSheet = styleSheets[i];
                if (/webcharts\.(min\.)?css/.test(styleSheet.href)) styleSheet.disabled = true;
            }

            //Remove Webcharts .css file.
            var links = head.querySelectorAll('link');
            for (var _i in links) {
                var _link = links[_i];
                if (/webcharts\.(min\.)?css/.test(_link.href)) head.removeChild(_link);
            }

            //Load Webcharts .js file.
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.rawgit.com/RhoInc/Webcharts/' + d.name + '/css/webcharts.css';
            head.appendChild(link);
        });
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();

    function settings() {
        var context = this;

        this.containers.settings.forEach(function (container) {
            container.select('textarea').on('change', function (d) {
                var updatedSettings = JSON.parse(this.value);

                if (d.property !== 'general') {
                    context.settings[d.setting] = updatedSettings;
                    context.chart.config[d.setting] = updatedSettings;
                } else {
                    var properties = Object.keys(updatedSettings).filter(function (key) {
                        return ['x', 'y', 'marks'].indexOf(key) < 0;
                    });
                    var _x$y$marks = {
                        x: context.settings.x,
                        y: context.settings.y,
                        marks: context.settings.marks
                    };

                    var _x$y$marks2 = slicedToArray(_x$y$marks, 2);

                    context.settings = _x$y$marks2[0];
                    chart.config = _x$y$marks2[1];
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = properties[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var property = _step.value;

                            var _updatedSettings$prop = slicedToArray(updatedSettings[property], 2);

                            context.settings[property] = _updatedSettings$prop[0];
                            context.chart.config[property] = _updatedSettings$prop[1];
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                }

                context.chart.draw();
            });
        });
    }

    function clone(obj) {
        var copy = void 0;

        //boolean, number, string, null, undefined
        if ('object' != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) || null == obj) return obj;

        //date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        //array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        //object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
            }
            return copy;
        }

        throw new Error('Unable to copy [obj]! Its type is not supported.');
    }

    function callbacks() {
        var context = this;

        this.containers.callbacks.forEach(function (container) {
            container.select('textarea').on('change', function (d) {
                context.callbacks[d.label] = this.value;

                context.chart.on(d.label, function () {
                    try {
                        eval(context.callbacks[d.label]);
                    } catch (error) {
                        alert("That's bad code right there pardner.  Check the console to see where you went astray by hitting the F12 key.");
                        console.error(error);
                    }
                });

                if (['init', 'layout', 'destroy'].indexOf(d.label) < 0) context.chart.draw();else {
                    console.log('reinitialized');
                    context.chart.destroy();
                    context.chart = webCharts.createChart(context.containers.chart.node(), context.settings.chart);

                    var _loop = function _loop(callback) {
                        context.chart.on(callback, function () {
                            try {
                                eval(context.callbacks[callback]);
                            } catch (error) {
                                alert("That's bad code right there pardner.  Check the console to see where you went astray by hitting the F12 key.");
                                console.error(error);
                            }
                        });
                    };

                    for (var callback in context.callbacks) {
                        _loop(callback);
                    }
                    context.chart.init(clone(context.data));
                }
            });
        });
    }

    function eventListeners() {
        renderChart.call(this);
        branchChange.call(this);
        settings.call(this);
        callbacks.call(this);
    }

    function configTester(element) {
        var dataPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://cdn.rawgit.com/RhoInc/viz-library/master';

        var configTester = {
            init: init,
            element: element,
            dataPath: dataPath,

            //Containers is an object whose properties represent d3 selections of elements in the DOM.
            containers: {
                main: d3.select(element).append('div').classed('config-tester', true).attr('id', 'config-tester' + (d3.selectAll('.config-tester').size() + 1)),
                controls: {},
                settings: [],
                callbacks: []
            },

            //Settings is an object whose properties populate the settings inputs.
            settings: {
                data: null,
                chart: null,
                general: null,
                y: null,
                marks: null,
                x: null
            },

            //Callbacks is an object whose methods become chart callbacks.
            callbacks: {
                init: null,
                layout: null,
                preprocess: null,
                datatransform: null,
                draw: null,
                resize: null,
                destroy: null
            },

            //These properties represent data that populate the config-tester configuration dropdowns.
            //They are instantiated as arrays when init() is called.
            chartConfigurations: null,
            data: null,
            branches: null
        };

        layout.call(configTester);
        styles.call(configTester);
        eventListeners.call(configTester);

        return configTester;
    }

    return configTester;

})));
