(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.configTester = factory());
}(this, (function () { 'use strict';

    function layout() {
        var context = this;

        this.containers.chartFramework = this.containers.main.append('div').classed('ct-row ct-row--top ct-chart-framework', true);

        this.containers.chartFramework.append('h1').text('Chart Framework');

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
            d.setting = d.label.replace('-', ' ').split(' ')[0].toLowerCase();

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
                component.append('h3').classed('ct-component__header', true).text(d.label);
                component.append('textarea').classed('ct-component__textarea', true).html(JSON.stringify(context.settings[d.setting], null, 4));
            }
        });

        this.containers.callbacksContainer = this.containers.main.append('div').classed('ct-row ct-row--bottom callbacks', true);

        this.containers.callbacksContainer.append('h1').text('Callbacks');

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

            //Add header, description, and input.
            component.append('h3').classed('ct-component__header', true).text(d.label);
            component.append('small').classed('ct-component__description', true).text(d.description);
            component.append('textarea').classed('ct-component__textarea', true);
        });
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
                    context.chart.destroy();
                    context.chart = webCharts.createChart(context.containers.chart.node(), context.settings.chart).init(context.data);
                }
            });
        });
    }

    function eventListeners() {
        settings.call(this);
        callbacks.call(this);
    }

    function createChart() {
        this.chart = new webCharts.createChart(this.containers.chart.node(), this.settings.chart);
    }

    function init(data) {
        this.data = data;
        this.chart.init(data);
    }

    function configTester(element, settings) {
        var configTester = {
            element: element,
            settings: {
                chart: settings,
                general: Object.keys(settings).filter(function (key) {
                    return ['x', 'y', 'marks'].indexOf(key) < 0;
                }).reduce(function (acc, cur) {
                    acc[cur] = settings[cur];
                    return acc;
                }, {}),
                y: settings.y,
                marks: settings.marks,
                x: settings.x
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
                settings: [],
                callbacks: []
            },
            init: init
        };

        layout.call(configTester);
        eventListeners.call(configTester);
        createChart.call(configTester);

        return configTester;
    }

    return configTester;

})));
