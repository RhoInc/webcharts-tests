import renderChart from './eventListeners/renderChart';
import settings from './eventListeners/settings';
import callbacks from './eventListeners/callbacks';

export default function eventListeners() {
    renderChart.call(this);
    settings.call(this);
    callbacks.call(this);
}
