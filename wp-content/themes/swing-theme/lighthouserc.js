//https://web.dev/lighthouse-ci/
module.exports = {
  ci: {
    collect: {
      /* Add configuration here */
      // startServerCommand: "npm run start",
      url: ["https://google.com/"],
      numberOfRuns: 2,
    },
    upload: {
      /* Add configuration here */
      target: "temporary-public-storage",
    },
  },
};
