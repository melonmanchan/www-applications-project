const webdriver = require("selenium-webdriver");
const baseUrl = "https://melonmanchan.github.io/www-applications-project";

const projects = [
  {
    name: "fibonacci",
    testsAvailable: ["js", "wasm", "asmjs"],
    parameters: ["n=10", "n=20", "n=30"]
  }
];

// Input capabilities
const capabilities = {
  "browserstack.user": "mattijokitulppo2",
  "browserstack.key": process.env.STACK_KEY,
  "browserstack.debug": "true",
  project: "www-applications-project",
  build: "build"
};

const createBrowserStackCapability = browserName => ({
  ...capabilities,
  browserName
});

const capabilitiesUsed = [
  createBrowserStackCapability("firefox"),
  createBrowserStackCapability("chrome"),
  createBrowserStackCapability("internet explorer"),
  createBrowserStackCapability("safari"),
  createBrowserStackCapability("opera"),
  createBrowserStackCapability("edge"),
  createBrowserStackCapability("iPad"),
  createBrowserStackCapability("iPhone"),
  createBrowserStackCapability("android")
];

for (const c of capabilitiesUsed) {
  for (const p of projects) {
    for (const params of p.parameters) {
      for (t of p.testsAvailable) {
        console.log(
          `Running test ${p.name} ${t} on browser ${
            c.browserName
          } with query parameters ${params}`
        );

        const url = `${baseUrl}/${p.name}/${t}/?${params}`;

        console.log(`url is ${url}`);

        var driver = new webdriver.Builder()
          .usingServer("http://hub-cloud.browserstack.com/wd/hub")
          .withCapabilities(c)
          .build();

        driver.get(url);
        driver.wait(webdriver.until.titleIs("done"), 20000);
        driver.quit();
      }
    }
  }
}
