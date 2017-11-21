const webdriver = require('selenium-webdriver')
const baseUrl = 'https://melonmanchan.github.io/www-applications-project/'

// Input capabilities
const capabilities = {
  'browserName' : 'chrome',
  'browserstack.user' : 'mattijokitulppo2',
  'browserstack.key' : process.env.STACK_KEY,
  'browserstack.debug' : 'true',
  'project': 'www-applications-project',
  'build' : 'build'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build()

console.log(capabilities)
// driver.get('http://www.google.com')
// driver.wait(webdriver.until.titleIs('done'), 1000)
// driver.quit()
