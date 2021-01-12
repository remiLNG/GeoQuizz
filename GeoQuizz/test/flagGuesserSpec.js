const { Builder, By, Key, util } = require('selenium-webdriver');
let webdriver = require('selenium-webdriver'), until = webdriver.until;
async function testFlagGuesser() {
    //N'oubliez pas d'installer le driver correspondant à votre navigateur et de remplacer "chrome" par votre navigateur
    /*
    https://www.selenium.dev/selenium/docs/api/javascript/index.html lien vers les drivers
    'chrome' pour Goggle chrome
    'firefox' pour Mozilla firefox
    'ie' pour Internet explorer
    'edge' pour Microsoft edge
    */
    let driver = await new Builder().forBrowser('chrome').build();
    driver.manage().window().maximize();

    await driver.get("C:/Users/KHALI/Desktop/marais/projet-web-2020-marais/GeoQuizz/FlagGuesser.html");
    //driver.findElement(By.className("button2")).click();
    console.log("La question est affichée " + await driver.wait(until.elementLocated(By.id('question')), 10000).isDisplayed());
    console.log("Le nombre de questions est affichée " + await driver.wait(until.elementLocated(By.id("nbquestion")), 10000).isDisplayed());
    console.log("Le drapeau est affiché " + await driver.wait(until.elementLocated(By.id("jumboflag")), 10000).isDisplayed());
    console.log("La réponse est affichée " + await driver.wait(until.elementLocated(By.id("response")), 10000).isDisplayed());
    driver.findElement(By.id("response")).click();
    console.log("Le titre est affiché " + await driver.wait(until.elementLocated(By.tagName("h2")), 10000).isDisplayed());
    console.log("Le bouton 'question suivante' est affiché " + await driver.wait(until.elementLocated(By.className("button2")), 10000).isDisplayed());
    driver.findElement(By.id("retourmenu")).click();
    console.log("La question est affichée 2  " + await driver.wait(until.elementLocated(By.id('question')), 10000).isDisplayed());
    console.log("Le nombre de questions est affichée 2 " + await driver.wait(until.elementLocated(By.id("nbquestion")), 10000).isDisplayed());
    console.log("Le drapeau est affiché 2 " + await driver.wait(until.elementLocated(By.id("jumboflag")), 10000).isDisplayed());
    console.log("La réponse est affichée 2 " + await driver.wait(until.elementLocated(By.id("response")), 10000).isDisplayed());
    driver.findElement(By.id("response")).click();
    console.log("Le titre est affiché 2 " + await driver.wait(until.elementLocated(By.tagName("h2")), 10000).isDisplayed());
    console.log("Le bouton 'question suivante' est affiché 2 " + await driver.wait(until.elementLocated(By.className("button2")), 10000).isDisplayed());
    driver.findElement(By.id("retourmenu")).click();
    console.log("La question est affichée 3  " + await driver.wait(until.elementLocated(By.id('question')), 10000).isDisplayed());
    console.log("Le nombre de questions est affichée 3 " + await driver.wait(until.elementLocated(By.id("nbquestion")), 10000).isDisplayed());
    console.log("Le drapeau est affiché 3 " + await driver.wait(until.elementLocated(By.id("jumboflag")), 10000).isDisplayed());
    console.log("La réponse est affichée 3 " + await driver.wait(until.elementLocated(By.id("response")), 10000).isDisplayed());
    driver.findElement(By.id("response")).click();
    console.log("Le titre est affiché 3 " + await driver.wait(until.elementLocated(By.tagName("h2")), 10000).isDisplayed());
    console.log("Le bouton 'question suivante' est affiché 3 " + await driver.wait(until.elementLocated(By.className("button2")), 10000).isDisplayed());
    driver.findElement(By.id("retourmenu")).click();
    console.log("Le score est affiché " + await driver.wait(until.elementLocated(By.id('end')), 10000).isDisplayed());
    console.log("Le bouton 'retour menu' est affiché " + await driver.wait(until.elementLocated(By.id("pfin")), 10000).isDisplayed());
    
    driver.quit();
}
testFlagGuesser();