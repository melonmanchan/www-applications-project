const webdriver = require("selenium-webdriver");
const baseUrl = "https://melonmanchan.github.io/www-applications-project";

const projects = [
  // {
  //   name: "matrix",
  //   testsAvailable: ["js", "wasm", "asmjs", "gpujs"],
  //   parameters: [
  //     "n=10&type=f",
  //     "n=100&type=f",
  //     "n=1000&type=f",
  //     "n=10000&type=f"
  //   ]
  // },
  //{
  //  name: "fibonacci",
  //  testsAvailable: ["js", "wasm", "asmjs"],
  //  parameters: ["n=10", "n=20", "n=30"]
  // }
   {
     name: "sort",
     testsAvailable: ["js", "wasm", "asmjs"],
     parameters: [
       "n=10&type=f",
       "n=100&type=f",
       "n=1000&type=f",
       "n=10000&type=f",
       "n=10&type=",
       "n=100&type=i",
       "n=1000&type=i",
       "n=10000&type=i",
       "n=10&type=d",
       "n=100&type=d",
       "n=1000&type=d",
       "n=10000&type=d"
     ]
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
  createBrowserStackCapability("internet explorer"),
  createBrowserStackCapability("safari"),
  createBrowserStackCapability("opera"),
  createBrowserStackCapability("edge"),
  createBrowserStackCapability("iPad"),
  createBrowserStackCapability("iPhone"),
  createBrowserStackCapability("android"),
  createBrowserStackCapability("firefox"),
  createBrowserStackCapability("chrome")
];

async function doRun (url, capabilities) {
  console.log(`url is ${url}`);

  var driver = new webdriver.Builder()
    .usingServer("http://hub-cloud.browserstack.com/wd/hub")
    .withCapabilities(capabilities)
    .build();

  try {
    driver.get(url);
    await driver.wait(webdriver.until.titleIs("done"), 30000);
    driver.quit();
  } catch (ex) {
    console.log(ex);
  }
}

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

        doRun(url, c);
      }
    }
  }
}
