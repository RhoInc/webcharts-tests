import settings from './eventListeners/settings';
import callbacks from './eventListeners/callbacks';

export default function eventListeners() {
    settings.call(this);
    callbacks.call(this);
}
