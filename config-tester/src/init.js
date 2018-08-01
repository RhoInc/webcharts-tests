import loadSettings from './init/loadSettings';
import loadBranches from './init/loadBranches';
import updateSettings from './init/updateSettings';
import clone from './util/clone';

export default function init(data) {
    this.data = data;
    loadSettings.call(this);
    loadBranches.call(this);
    updateSettings.call(this);
    this.chart.init(clone(data));
}
