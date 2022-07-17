//https://web.dev/lighthouse-ci/
module.exports = {
  ci: {
    collect: {
      /* Add configuration here */
      // startServerCommand: "npm run start",
      url: [
        "https://swingeducation.wpengine.com/",
        "https://swingeducation.wpengine.com/for-subs",
        "https://swingeducation.wpengine.com/for-schools",
        "https://swingeducation.wpengine.com/getting-started",
        "https://swingeducation.wpengine.com/help-support",
        "https://swingeducation.wpengine.com/terms",
        "https://swingeducation.wpengine.com/a404",
      ],
      numberOfRuns: 2,
    },
    upload: {
      /* Add configuration here */
      target: "temporary-public-storage",
    },
  },
};
