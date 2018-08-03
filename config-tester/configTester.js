(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.configTester = factory());
}(this, (function () { 'use strict';

    function layout() {
        var context = this;

        /**-------------------------------------------------------------------------------------------\
        Configuration
        \-------------------------------------------------------------------------------------------**/

        this.containers.configuration = this.containers.main.append('div').classed('ct-row ct-row--top ct-configuration', true);

        this.containers.configuration.append('h1').classed('ct-row__header', true).text('Configuration');

        //this.containers.settingsControl = this.containers.configuration
        //    .append('div')
        //    .classed('ct-control ct-control--settings', true);
        //    this.containers.controls.settings = this.containers.settingsControl
        //        .append('select')
        //        .classed('ct-control__select', true);
        //    this.containers.settingsControl
        //        .append('span')
        //        .classed('ct-control__label', true)
        //        .text('Chart Configuration');

        this.containers.buttons = this.containers.configuration.append('div').classed('ct-control-div ct-control-div--buttons', true);
        this.containers.renderControl = this.containers.buttons.append('div').classed('ct-control ct-control--render', true);
        this.containers.controls.render = this.containers.renderControl.append('button').classed('ct-control__button', true).text('Render Chart');

        this.containers.dropdowns = this.containers.configuration.append('div').classed('ct-control-div ct-control-div--dropdowns', true);

        this.containers.dataControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--data', true);
        this.containers.controls.data = this.containers.dataControl.append('select').classed('ct-control__select', true);
        this.containers.dataControl.append('span').classed('ct-control__label', true).text('Data');

        this.containers.branchesControl = this.containers.dropdowns.append('div').classed('ct-control ct-control--branches', true);
        this.containers.controls.branches = this.containers.branchesControl.append('select').classed('ct-control__select', true);
        this.containers.branchesControl.append('span').classed('ct-control__label', true).text('Webcharts Branch');

        /**-------------------------------------------------------------------------------------------\
        Chart framework
        \-------------------------------------------------------------------------------------------**/

        this.containers.chartFramework = this.containers.main.append('div').classed('ct-row ct-row--middle ct-chart-framework', true);

        this.containers.chartFramework.append('h1').classed('ct-row__header', true).text('Chart Framework');

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

    function settings$1() {
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
        settings$1.call(this);
        callbacks.call(this);
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

    function prepareChart() {
        this.settings.chart = this.configurations[0];
        this.settings.general = Object.keys(this.settings.chart).filter(function (key) {
            return ['x', 'y', 'marks'].indexOf(key) < 0;
        }).reduce(function (acc, cur) {
            acc[cur] = settings[cur];
            return acc;
        }, {});
        this.settings.y = this.settings.chart.y;
        this.settings.marks = this.settings.chart.marks;
        this.settings.x = this.settings.chart.x;
        this.chart = new webCharts.createChart(this.containers.chart.node(), this.settings.chart);
    }

    function init() {
        var context = this;

        //Add viz-library data to data dropdown.
        loadData.call(this).then(function (data) {
            console.log(data);
            context.containers.controls.data.selectAll('option').data(data).enter().append('option').text(function (d) {
                return d.rel_path;
            });

            return data;
        });

        //Add Webcharts branches to branch dropdown.
        loadBranches.call(this).then(function (branches) {
            console.log(branches);
            context.containers.controls.branches.selectAll('option').data(branches, function (d) {
                return d.commit.sha;
            }).enter().append('option').text(function (d) {
                return d.name;
            });

            return branches;
        });

        prepareChart.call(configTester);
        //updateSettings.call(configTester);
        //context.chart.init(clone(context.data));
    }

    function configTester$1(element) {
        var configTester = {
            element: element,
            settings: {
                chart: null,
                general: null,
                y: null,
                marks: null,
                x: null
            },
            callbacks: {
                init: null,
                layout: null,
                preprocess: null,
                datatransform: null,
                draw: null,
                resize: null,
                destroy: null
            },
            containers: {
                main: d3.select(element).append('div').classed('config-tester', true).attr('id', 'config-tester' + (d3.selectAll('.config-tester').size() + 1)),
                controls: {},
                settings: [],
                callbacks: []
            },
            init: init,
            configurations: [],
            datasets: [],
            branches: []
        };

        layout.call(configTester);
        styles.call(configTester);
        eventListeners.call(configTester);

        return configTester;
    }

    return configTester$1;

})));
