import configuration from './layout/configuration';
import chartFramework from './layout/chartFramework';
import callbacks from './layout/callbacks';

export default function layout() {
    configuration.call(this);
    chartFramework.call(this);
    callbacks.call(this);
}
