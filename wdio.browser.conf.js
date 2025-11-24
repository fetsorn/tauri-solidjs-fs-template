import viteConfig from "./vite.config.js";

export const config = {
  specs: [["./src/test/browser/*.test.jsx"]],
  runner: [
    "browser",
    {
      viteConfig: viteConfig,
    },
  ],
  capabilities: [
    {
      browserName: "firefox",
      "moz:firefoxOptions": {
        //NOTE: headless might break with "ev.error is undefined"
        //args: ["-headless", "--window-size=1024,768"],
        log: { level: "error" },
      },
    },
  ],
  framework: "mocha",
  mochaOpts: {
    ui: "bdd",
    timeout: 6000000,
  },
  logLevel: "error",
  maxInstances: 1,
  reporters: ["spec"],
};
