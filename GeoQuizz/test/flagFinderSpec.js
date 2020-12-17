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

    await driver.get("C:/Users/KHALI/Desktop/marais/projet-web-2020-marais/GeoQuizz/FlagFinder.html");
    driver.manage().window().maximize();

    driver.findElement(By.id("normal")).click()
    for (let nbQ = 1; nbQ < 101; nbQ++) {
        console.log("la question "+nbQ+" est affichée : "  + await driver.wait(until.elementLocated(By.id('suiviQuestion')), 10000).isDisplayed());
        console.log("la questions est affichée : " + await driver.wait(until.elementLocated(By.id('questionTitle')), 10000).isDisplayed());
        console.log("le pays est affiché : " + await driver.wait(until.elementLocated(By.id('pays')), 10000).isDisplayed());
        console.log("les drapeaux sont affichées :" + await driver.wait(until.elementLocated(By.className('jumbotron')), 10000).isDisplayed());
        driver.wait(until.elementLocated(By.id('flag1')), 10000).click();
        console.log("le titre est affiché : " + await driver.wait(until.elementLocated(By.tagName('h2')), 10000).isDisplayed());
        console.log("la reponse est affiché : " + await driver.wait(until.elementLocated(By.id('answer')), 10000).isDisplayed());
        console.log("c'est une mauvaise reponse :  " + await driver.wait(until.elementLocated(By.id('mauvaiserep')), 10000).isDisplayed());
        console.log("c'est une  bonne reponse : " + await driver.wait(until.elementLocated(By.id('bonrep')), 10000).isDisplayed());
        console.log("Statut de l'affichage du bon drapeau : " + await driver.wait(until.elementLocated(By.id('goodflag')), 10000).isDisplayed());
        driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    }
    console.log("le score est affiché : " + await driver.wait(until.elementLocated(By.id('end')), 10000).isDisplayed());
    console.log("le boutton bouton 'retour menu' est affiché  " + await driver.wait(until.elementLocated(By.className("btn btn-primary")), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    driver.quit();
} testFlagFinder();