//https://web.dev/lighthouse-ci/
module.exports = {
  ci: {
    collect: {
      /* Add configuration here */
      // startServerCommand: "npm run start",
      url: [
        "https://swingeducation.wpengine.com/",
        "https://swingeducation.wpengine.com/for-subs",
      ],
      numberOfRuns: 2,
    },
    upload: {
      /* Add configuration here */
      target: "temporary-public-storage",
    },
  },
};
