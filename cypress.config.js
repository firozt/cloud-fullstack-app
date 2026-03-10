module.exports = {
  e2e: {
    experimentalWebKitSupport: true,
    experimentalMemoryManagement: true,
    setupNodeEvents(_, config) {
      return config;
    },
  },
};
