import renderChart from './eventListeners/renderChart';
import chartConfigurationChange from './eventListeners/chartConfigurationChange';
import dataChange from './eventListeners/dataChange';
import branchChange from './eventListeners/branchChange';
import settings from './eventListeners/settings';
import callbacks from './eventListeners/callbacks';

export default function eventListeners() {
    renderChart.call(this);
    chartConfigurationChange.call(this);
    dataChange.call(this);
    branchChange.call(this);
    settings.call(this);
    callbacks.call(this);
}
