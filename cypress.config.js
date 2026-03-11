const execa = require('execa');

module.exports = {
  e2e: {
    experimentalWebKitSupport: true,
    experimentalMemoryManagement: true,
    async setupNodeEvents(_, config) {
      const result = await execa(
        '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
        ['--version']
      );
      const [, version] = /Brave Browser ([\d.]+)/.exec(result.stdout);

      config.browsers = config.browsers.concat({
        name: 'brave',
        channel: 'stable',
        family: 'chromium',
        displayName: 'Brave',
        version,
        path: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
        majorVersion: parseInt(version.split('.')[0]),
      });

      return config;
    },
  },
};
