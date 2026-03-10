module.exports = {
  e2e: {
    setupNodeEvents(_, config) {
      config.browsers = [
        {
          name: 'Brave',
          channel: 'stable',
          family: 'chromium',
          displayName: 'Brave',
          version: '126.1.67.119',
          path: '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
          majorVersion: 126,
        },
      ];
      return config;
    },
    experimentalWebKitSupport: true,
    experimentalMemoryManagement: true,
  },
};
