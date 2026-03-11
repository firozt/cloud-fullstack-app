const execa = require('execa');

// path for brave on mac (local) and ubuntu (github action)
const BRAVE_PATH =
  process.platform === 'darwin'
    ? '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser'
    : '/usr/bin/brave-browser';

module.exports = {
  e2e: {
    experimentalWebKitSupport: true,
    experimentalMemoryManagement: true,
    async setupNodeEvents(_, config) {
      const result = await execa(BRAVE_PATH, ['--version']);
      const [, version] = /Brave Browser ([\d.]+)/.exec(result.stdout);

      config.browsers = config.browsers.concat({
        name: 'brave',
        channel: 'stable',
        family: 'chromium',
        displayName: 'Brave',
        version,
        path: BRAVE_PATH,
        majorVersion: parseInt(version.split('.')[0]),
      });

      return config;
    },
  },
};
