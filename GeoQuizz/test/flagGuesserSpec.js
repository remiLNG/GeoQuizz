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

    await driver.get("C:/Users/KHALI/Desktop/marais/projet-web-2020-marais/GeoQuizz/FlagGuesser.html");
    //driver.findElement(By.className("button2")).click();
    console.log("Statut de l'affichage de la question " + await driver.wait(until.elementLocated(By.id('question')), 10000).isDisplayed());
    console.log("Statut de l'affichage du nombres de question " + await driver.wait(until.elementLocated(By.id("nbquestion")), 10000).isDisplayed());
    console.log("Statut de l'affichage du drapeau " + await driver.wait(until.elementLocated(By.id("jumboflag")), 10000).isDisplayed());
    console.log("Statut de l'affichage d'une reponse " + await driver.wait(until.elementLocated(By.id("response")), 10000).isDisplayed());
    driver.findElement(By.id("response")).click();
    console.log("Statut de l'affichage d'un titre " + await driver.wait(until.elementLocated(By.tagName("h2")), 10000).isDisplayed());
    console.log("Statut de l'affichage d'un bouton 'question suivante' " + await driver.wait(until.elementLocated(By.className("btn btn-primary")), 10000).isDisplayed());
    driver.findElement(By.className("btn btn-primary")).click();
    console.log("Statut de l'affichage de la question de la page 2  " + await driver.wait(until.elementLocated(By.id('question')), 10000).isDisplayed());
    console.log("Statut de l'affichage du nombres de question de la page 2 " + await driver.wait(until.elementLocated(By.id("nbquestion")), 10000).isDisplayed());
    console.log("Statut de l'affichage du drapeau de la page 2 " + await driver.wait(until.elementLocated(By.id("jumboflag")), 10000).isDisplayed());
    console.log("Statut de l'affichage d'une reponse de la page 2 " + await driver.wait(until.elementLocated(By.id("response")), 10000).isDisplayed());
    driver.findElement(By.id("response")).click();
    console.log("Statut de l'affichage d'un titre de la page 2 " + await driver.wait(until.elementLocated(By.tagName("h2")), 10000).isDisplayed());
    console.log("Statut de l'affichage d'un bouton 'question suivante' de la page 2 " + await driver.wait(until.elementLocated(By.className("btn btn-primary")), 10000).isDisplayed());
    driver.findElement(By.className("btn btn-primary")).click();
    console.log("Statut de l'affichage de la question de la page 3  " + await driver.wait(until.elementLocated(By.id('question')), 10000).isDisplayed());
    console.log("Statut de l'affichage du nombres de question de la page 3 " + await driver.wait(until.elementLocated(By.id("nbquestion")), 10000).isDisplayed());
    console.log("Statut de l'affichage du drapeau de la page 3 " + await driver.wait(until.elementLocated(By.id("jumboflag")), 10000).isDisplayed());
    console.log("Statut de l'affichage d'une reponse de la page 3 " + await driver.wait(until.elementLocated(By.id("response")), 10000).isDisplayed());
    driver.findElement(By.id("response")).click();
    console.log("Statut de l'affichage d'un titre de la page 3 " + await driver.wait(until.elementLocated(By.tagName("h2")), 10000).isDisplayed());
    console.log("Statut de l'affichage d'un bouton 'question suivante' de la page 3 " + await driver.wait(until.elementLocated(By.className("btn btn-primary")), 10000).isDisplayed());
    driver.findElement(By.className("btn btn-primary")).click();
    console.log("Statut de l'affichage de l'affichage du score " + await driver.wait(until.elementLocated(By.id('end')), 10000).isDisplayed());
    console.log("Statut de l'affichage d'un bouton 'retour menu'  " + await driver.wait(until.elementLocated(By.className("button2")), 10000).isDisplayed());
    driver.findElement(By.className("button2")).click();
    driver.quit();
}
testFlagGuesser();