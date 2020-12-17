const { Builder, By, Key, util } = require('selenium-webdriver');
let webdriver = require('selenium-webdriver'), until = webdriver.until;
async function testFlagFinder() {
    //N'oubliez pas d'installer le driver correspondant à votre navigateur et de remplacer "chrome" par votre navigateur
    /*
    https://www.selenium.dev/selenium/docs/api/javascript/index.html lien vers les drivers
    'chrome' pour Goggle chrome
    'firefox' pour Mozilla firefox
    'ie' pour Internet explorer
    'edge' pour Microsoft edge
    */
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get("C:/Users/KHALI/Desktop/marais/projet-web-2020-marais/GeoQuizz/CapitalCity.html");
    driver.manage().window().maximize();
    console.log("le nombre des questions est affiché : " + await driver.wait(until.elementLocated(By.className('police')), 10000).isDisplayed());
    console.log("le nom du pays est affiché : " + await driver.wait(until.elementLocated(By.id('questionTitle')), 10000).isDisplayed());
    console.log("le nom du pays est affiché : " + await driver.wait(until.elementLocated(By.id('pays')), 10000).isDisplayed());
    console.log("Les différentes réponses possibles sont affichées : " + await driver.wait(until.elementLocated(By.id('contrep')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.id('response')), 10000).click();
    console.log("la réponse est affichée : " + await driver.wait(until.elementLocated(By.id('answer')), 10000).isDisplayed());
    console.log("le bouton est affiché : " + await driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    console.log("le nombre des questions est affiché '2' : " + await driver.wait(until.elementLocated(By.className('police')), 10000).isDisplayed());
    console.log("le nom du pays est affiché '2' : " + await driver.wait(until.elementLocated(By.id('questionTitle')), 10000).isDisplayed());
    console.log("le nom du pays est affiché '2' : " + await driver.wait(until.elementLocated(By.id('pays')), 10000).isDisplayed());
    console.log("Les différentes réponses possibles sont affichées '2' : " + await driver.wait(until.elementLocated(By.id('contrep')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.id('response')), 10000).click();
    console.log("la réponse est affichée '2' : " + await driver.wait(until.elementLocated(By.id('answer')), 10000).isDisplayed());
    console.log("le bouton est affiché '2' : " + await driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    console.log("le nombre des questions est affiché '3' : " + await driver.wait(until.elementLocated(By.className('police')), 10000).isDisplayed());
    console.log("le nom du pays est affiché '3' : " + await driver.wait(until.elementLocated(By.id('questionTitle')), 10000).isDisplayed());
    console.log("le nom du pays est affiché '3' : " + await driver.wait(until.elementLocated(By.id('pays')), 10000).isDisplayed());
    console.log("Les différentes réponses possibles sont affichées '3' : " + await driver.wait(until.elementLocated(By.id('contrep')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.id('response')), 10000).click();
    console.log("la réponse est affichée '3' : " + await driver.wait(until.elementLocated(By.id('answer')), 10000).isDisplayed());
    console.log("le bouton est affiché '3' : " + await driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    console.log("le score est affiché : " + await driver.wait(until.elementLocated(By.id('end')), 10000).isDisplayed());
    console.log("le button de retour est affiché : " + await driver.wait(until.elementLocated(By.className('button2')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('button2')), 10000).click();   
    driver.quit();

}testFlagFinder();