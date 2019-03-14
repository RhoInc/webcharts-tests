import renderChart from './eventListeners/renderChart';
import branchChange from './eventListeners/branchChange';
import settings from './eventListeners/settings';
import callbacks from './eventListeners/callbacks';

export default function eventListeners() {
    renderChart.call(this);
    branchChange.call(this);
    settings.call(this);
    callbacks.call(this);
}
