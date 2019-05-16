(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.configTester = factory());
}(this, function () { 'use strict';

    if (typeof Object.assign != 'function') {
        Object.defineProperty(Object, 'assign', {
            value: function assign(target, varArgs) {

                if (target == null) {
                    // TypeError if undefined or null
                    throw new TypeError('Cannot convert undefined or null to object');
                }

                var to = Object(target);

                for (var index = 1; index < arguments.length; index++) {
                    var nextSource = arguments[index];

                    if (nextSource != null) {
                        // Skip over if undefined or null
                        for (var nextKey in nextSource) {
                            // Avoid bugs when hasOwnProperty is shadowed
                            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                                to[nextKey] = nextSource[nextKey];
                            }
                        }
                    }
                }

                return to;
            },
            writable: true,
            configurable: true
        });
    }

    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, 'length')).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return kValue.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return kValue;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return undefined.
                return undefined;
            }
        });
    }

    if (!Array.prototype.findIndex) {
        Object.defineProperty(Array.prototype, 'findIndex', {
            value: function value(predicate) {
                // 1. Let O be ? ToObject(this value).
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }

                var o = Object(this);

                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;

                // 3. If IsCallable(predicate) is false, throw a TypeError exception.
                if (typeof predicate !== 'function') {
                    throw new TypeError('predicate must be a function');
                }

                // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
                var thisArg = arguments[1];

                // 5. Let k be 0.
                var k = 0;

                // 6. Repeat, while k < len
                while (k < len) {
                    // a. Let Pk be ! ToString(k).
                    // b. Let kValue be ? Get(O, Pk).
                    // c. Let testResult be ToBoolean(? Call(predicate, T, � kValue, k, O �)).
                    // d. If testResult is true, return k.
                    var kValue = o[k];
                    if (predicate.call(thisArg, kValue, k, o)) {
                        return k;
                    }
                    // e. Increase k by 1.
                    k++;
                }

                // 7. Return -1.
                return -1;
            }
        });
    }

    function horizontalBarChart() {
        return {
            dataFile: './data/miscellaneous/iris.csv',
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
            dataFile: './data/miscellaneous/iris.csv',
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
            dataFile: './data/miscellaneous/climate-data.csv',
            x: {
                type: 'time',
                column: 'DATE',
                label: 'Date'
            },
            y: {
                type: 'linear',
                column: 'Monthly Mean',
                label: 'Mean Temperature'
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
            date_format: '%Y%m',
            resizable: false
        };
    }

    function verticalBarChart() {
        return {
            dataFile: './data/miscellaneous/iris.csv',
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

    function histogram() {
        return {
            dataFile: './data/miscellaneous/iris.csv',
            x: {
                type: 'linear',
                column: 'sepal width',
                label: 'Sepal Width',
                bin: 25
            },
            y: {
                type: 'linear',
                label: '# of Observations',
                domain: [0, null]
            },
            marks: [{
                type: 'bar',
                per: ['sepal width'],
                summarizeY: 'count',
                tooltip: '$y observations at $x',
                attributes: {
                    'fill-opacity': 0.75
                }
            }],
            resizable: false
        };
    }

    var chartConfigurations = {
        horizontalBarChart: horizontalBarChart,
        scatterPlot: scatterPlot,
        timeSeriesPlot: timeSeriesPlot,
        verticalBarChart: verticalBarChart,
        histogram: histogram
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

    function loadDataFiles() {

        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            req.open('GET', 'https://cdn.jsdelivr.net/gh/RhoInc/data-library/dataFiles.json', true);
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

    function loadWebchartsVersions() {

        return new Promise(function (resolve, reject) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status == 200) resolve(JSON.parse(this.responseText).sort(function (a, b) {
                    return a.name === 'master' ? -1 : b.name === 'master' ? 1 : a.name < b.name ? -1 : 1;
                }));
            };
            xhttp.open('GET', 'https://api.GitHub.com/repos/RhoInc/Webcharts/branches', true);
            xhttp.send();
        });
    }

    function updateChartConfigurations(chartConfigurations) {
        //Add chart configurations to chart configuration dropdown.
        this.chartConfigurations = chartConfigurations;
        this.chartConfiguration = chartConfigurations[0];
        this.containers.controls.chartConfiguration.selectAll('option').data(chartConfigurations, function (d) {
            return d.type;
        }).enter().append('option').text(function (d) {
            return d.type;
        });
    }

    function updateDataFiles(dataFiles) {
        var _this = this;

        //Add data files to data dropdown.
        this.dataFiles = dataFiles;
        this.dataFile = this.chartConfiguration.dataFile;
        this.containers.controls.dataFile.selectAll('option').data(dataFiles).enter().append('option').property('selected', function (d) {
            return d.rel_path === _this.chartConfiguration.dataFile;
        }).text(function (d) {
            return d.rel_path;
        });
    }

    function updateWebchartswebchartsVersions(webchartsVersions) {
        //Add Webcharts webchartsVersions to branch dropdown.
        this.webchartsVersions = webchartsVersions;
        this.branch = webchartsVersions[0];
        this.containers.controls.webchartsVersion.selectAll('option').data(webchartsVersions, function (d) {
            return d.commit ? d.commit.sha : d.name;
        }).enter().append('option').text(function (d) {
            return d.name;
        });
    }

    function loadData() {
        return fetch(this.dataPath + "/" + this.dataFile).then(function (response) {
            return response.text();
        }).then(function (text) {
            return d3.csv.parse(text);
        });
    }

    function onInit() {
        if (this.data) {
            this.config.cols = Object.keys(this.data.raw[0]).filter(function (key) {
                return key !== 'index';
            });
            this.config.headers = this.config.cols.slice();
        }
    }

    function onDraw() {
        this.table.on('draw', function () {
            var context = this;

            //Allow cell editing.
            this.tbody.selectAll('tr').each(function (d) {
                var row = d3.select(this);

                row.selectAll('td').each(function (di) {
                    di.index = d.index;
                    var cell = d3.select(this).text('');

                    //Append div to cell with the contenteditable attribute.
                    var contentEditable = cell.append('div').attr('contenteditable', true).text(di.text);

                    //Update cell datum on input.
                    contentEditable.on(/Trident/.test(navigator.userAgent) ? 'textinput' : 'input', function () {
                        di.text = this.textContent;
                    });

                    //Update table data on blue (when focus leaves cell).
                    contentEditable.on('blur', function () {
                        var datum = context.ct.data.find(function (dii) {
                            return dii.index === di.index;
                        });
                        datum[di.col] = di.text;
                        context.ct.chart.draw(context.ct.data);
                    });
                });
            });
        });
    }

    function initTable() {
        if (this.table && this.table.destroy) this.table.destroy();else this.containers.dataPreview.selectAll('*').remove();

        this.table = new webCharts.createTable(this.containers.dataPreview.node());
        this.table.ct = this;
        this.table.on('init', onInit);
        this.table.on('draw', onDraw);
        this.table.init(this.data);
    }

    function copyChartSettings() {
        var _this = this;

        this.settings.chart = _.clone(this.chartConfiguration);
        this.settings.x = this.settings.chart.x;
        this.settings.y = this.settings.chart.y;
        this.settings.marks = this.settings.chart.marks;
        this.settings.general = Object.keys(this.settings.chart).filter(function (key) {
            return ['type', 'data', 'x', 'y', 'marks'].indexOf(key) < 0;
        }).reduce(function (acc, cur) {
            acc[cur] = _this.settings.chart[cur];
            return acc;
        }, {});
    }

    function initChart() {
        if (this.chart && this.chart.destroy) this.chart.destroy();else this.containers.chart.selectAll('*').remove();
        this.chart = new webCharts.createChart(this.containers.chart.node(), this.settings.chart);
        this.chart.ct = this;
        this.chart.init(this.data);
    }

    function updateChartFrameworkSettings() {
        var _this = this;

        this.containers.settings.forEach(function (container) {
            var d = container.datum();
            var json = JSON.stringify(_this.settings[d.setting], null, 4);
            container.select('textarea').attr('rows', ['general', 'x'].indexOf(d.setting) > -1 ? json.split('\n').length : null).property('value', json).text(json);
        });
    }

    function updateChartConfiguration(type) {
        var options = this.containers.controls.chartConfiguration.selectAll('option');
        if (type) {
            options.property('selected', function (d) {
                return d.type === type;
            });
        } else {
            this.chartConfiguration = options.filter(function () {
                return this.selected;
            }).datum();
            this.dataFile = this.chartConfiguration.dataFile;
        }
    }

    function updateDataFile(dataFile) {
        var options = this.containers.controls.dataFile.selectAll('option');
        if (dataFile) options.property('selected', function (d) {
            return d.rel_path === dataFile;
        });else this.dataFile = options.filter(function () {
            return this.selected;
        }).datum().rel_path;
    }

    function chartConfiguration() {
        var _this = this;

        this.containers.controls.chartConfiguration.on('change', function () {
            updateChartConfiguration.call(_this);
            updateDataFile.call(_this, _this.dataFile);
            loadData.call(_this).then(function (data) {
                _this.data = data;
                initTable.call(_this);
                copyChartSettings.call(_this);
                initChart.call(_this);
                updateChartFrameworkSettings.call(_this);
            });
        });
    }

    function dataFile() {
        var _this = this;

        this.containers.controls.dataFile.on('change', function () {
            updateDataFile.call(_this);
            loadData.call(_this).then(function (data) {
                _this.data = data;
                initTable.call(_this);
            });
        });
    }

    function updateWebchartsVersion(version) {
        var options = this.containers.controls.webchartsVersion.selectAll('option');
        if (version) options.property('selected', function (d) {
            return d.name === version;
        });else this.webchartsVersion = options.filter(function () {
            return this.selected;
        }).datum();
    }

    function webchartsVersion() {
        var _this = this;

        this.containers.controls.webchartsVersion.on('change', function () {
            updateWebchartsVersion.call(_this);

            var head = document.getElementsByTagName('head')[0];

            //Load Webcharts .js file.
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://cdn.jsdelivr.net/gh/RhoInc/Webcharts@' + _this.webchartsVersion.name + '/build/webcharts.js';
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

            //Load Webcharts .css file.
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/gh/RhoInc/Webcharts@' + _this.webchartsVersion.name + '/css/webcharts.css';
            head.appendChild(link);

            //Redraw table and chart.
            var webChartsLoading = setInterval(function () {
                var webChartsExists = window.webCharts !== undefined;
                if (webChartsExists) {
                    clearInterval(webChartsLoading);
                    try {
                        initTable.call(_this);
                        initChart.call(_this);
                    } catch (err) {
                        console.warn(err);
                        context.containers.chart.text('Webcharts version ' + _this.webchartsVersion.name + ' is experiencing technical difficulties.  Please select another version.');
                    }
                }
            }, 25);
        });
    }

    function chartFrameworkSettings() {
        var context = this;

        this.containers.settings.forEach(function (container) {
            container.select('textarea').on('change', function (d) {
                var updatedSettings = JSON5.parse(this.value);

                //Update x, y, and mark settings.
                if (d.setting !== 'general') {
                    context.settings[d.setting] = updatedSettings;
                    context.settings.chart[d.setting] = updatedSettings;
                    context.chart.config[d.setting] = updatedSettings;
                }
                //Update general settings.
                else {
                        var properties = Object.keys(updatedSettings).filter(function (key) {
                            return ['x', 'y', 'marks'].indexOf(key) < 0;
                        });
                        properties.forEach(function (property) {
                            var setting = updatedSettings[property];
                            context.settings.general[property] = setting;
                            context.settings.chart[property] = setting;
                            context.chart.config[property] = setting;
                        });
                    }

                context.chart.draw();
            });
        });
    }

    function defineEventListeners() {
        chartConfiguration.call(this);
        dataFile.call(this);
        webchartsVersion.call(this);
        chartFrameworkSettings.call(this);
    }

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

    //load data

    function init() {
        var _this = this;

        Promise.all([loadChartConfigurations.call(this), loadDataFiles.call(this), loadWebchartsVersions.call(this)]).then(function (values) {
            var _values = slicedToArray(values, 3),
                chartConfigurations = _values[0],
                dataFiles = _values[1],
                webchartsVersions = _values[2];

            updateChartConfigurations.call(_this, chartConfigurations);
            updateDataFiles.call(_this, dataFiles);
            updateWebchartswebchartsVersions.call(_this, Array.isArray(webchartsVersions) && webchartsVersions.length ? webchartsVersions : [{ name: 'master' }]);

            loadData.call(_this).then(function (data) {
                _this.data = data;
                initTable.call(_this);
                copyChartSettings.call(_this);
                initChart.call(_this);
                updateChartFrameworkSettings.call(_this);
            });

            defineEventListeners.call(_this);
        });
    }

    function configuration() {
        this.containers.configuration = this.containers.main.append('div').classed('ct-row ct-row--top ct-configuration', true);

        this.containers.configuration.append('h1').classed('ct-row__header', true).text('Configuration');
        this.containers.configuration.append('h5').classed('ct-row__instruction', true).text('Choose a chart configuration, a Webcharts branch, and optionally a data file.');

        this.containers.buttons = this.containers.configuration.append('div').classed('ct-control-div ct-control-div--buttons', true);

        this.containers.renderControl = this.containers.buttons.append('div').classed('ct-control ct-control--render', true);
        this.containers.controls.render = this.containers.renderControl.append('button').classed('ct-control__button', true).text('Render Chart');

        this.containers.dropdowns = this.containers.configuration.append('div').classed('ct-control-div ct-control-div--dropdowns', true);

        //chart configuration
        this.containers.chartConfigurationControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--chart-configuration', true);
        this.containers.controls.chartConfiguration = this.containers.chartConfigurationControl.append('select').classed('ct-control__select', true);
        this.containers.chartConfigurationControl.append('span').classed('ct-control__label', true).text('Chart Configuration');

        //data file
        this.containers.dataFileControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--data-file', true);
        this.containers.controls.dataFile = this.containers.dataFileControl.append('select').classed('ct-control__select', true);
        this.containers.dataFileControl.append('span').classed('ct-control__label', true).text('Select a data file or load a .csv:');
        this.containers.dataFileSelect = this.containers.dataFileControl.append('input').classed('ct-control__input ct-control__input--file', true).attr('type', 'file');

        //webcharts versions
        this.containers.webchartsVersionControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--webcharts-version', true);
        this.containers.controls.webchartsVersion = this.containers.webchartsVersionControl.append('select').classed('ct-control__select', true);
        this.containers.webchartsVersionControl.append('span').classed('ct-control__label', true).text('Webcharts Branch');

        //data preview
        this.containers.dataPreviewContainer = this.containers.configuration.append('div').classed('ct-control-div ct-data-preview', true);

        this.containers.dataPreviewContainer.append('h3').classed('ct-data-preview__header', true).text('Data Preview');
        this.containers.dataPreview = this.containers.dataPreviewContainer.append('div').classed('ct-data-preview__table', true);
    }

    function chartFramework() {
        var context = this;

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
    }

    function callbacks() {
        var context = this;

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

    function layout() {
        configuration.call(this);
        chartFramework.call(this);
        callbacks.call(this);
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

    function eventListeners() {
        //renderChart.call(this);
        //chartConfigurationChange.call(this);
        //dataChange.call(this);
        //branchChange.call(this);
        //settings.call(this);
        //callbacks.call(this);
    }

    function configTester(element) {
        var dataPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'https://raw.githubusercontent.com/RhoInc/data-library/master';

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
                x: null,
                y: null,
                marks: null,
                general: null
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

}));
