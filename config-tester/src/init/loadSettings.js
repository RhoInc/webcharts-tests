export default function loadSettings() {
    const root = 'https://rawgit.com/RhoInc/Webcharts/master/test/samples/chart-config/';
    d3.json(`${root}/testSettingList.json`, testSettingGroups => {
        testSettingGroups.forEach(testSettingGroup => {
            if (!/^Sizing|Tables/.test(testSettingGroup.label)) {
                d3.json(`${root}/${testSettingGroup.filename}`, settingsList => {
                    settingsList.forEach(settings => {
                        if (settings.settings.hasOwnProperty('marks')) {
                            this.configurations.push(settings);
                            this.containers.controls.settings
                                .append('option')
                                .datum(settings)
                                .text(settings.label);
                        }
                    });
                });
            }
        });
    });
}
