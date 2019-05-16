import chartConfiguration from './defineEventListeners/chartConfiguration';
import dataFile from './defineEventListeners/dataFile';
import webchartsVersion from './defineEventListeners/webchartsVersion';
import chartFrameworkSettings from './defineEventListeners/chartFrameworkSettings';

export default function defineEventListeners() {
    chartConfiguration.call(this);
    dataFile.call(this);
    webchartsVersion.call(this);
    chartFrameworkSettings.call(this);
}
