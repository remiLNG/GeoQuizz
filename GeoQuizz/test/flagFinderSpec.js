const { Builder, By, Key, util } = require('selenium-webdriver');
let webdriver = require('selenium-webdriver'), until = webdriver.until;
async function testFlagFinder() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get("C:/Users/KHALI/Desktop/marais/projet-web-2020-marais/GeoQuizz/FlagFinder.html");
    driver.manage().window().maximize();

    /*List <WebElement> listButton;
    listButton=driver.findElements(By.className("button2")) ;
    listButton.get[1].click();*/
    console.log("Statut du suivie des questions " + await driver.wait(until.elementLocated(By.id('suiviQuestion')), 10000).isDisplayed());
    console.log("Statut de l'affichage de la questions " + await driver.wait(until.elementLocated(By.id('questionTitle')), 10000).isDisplayed());
    console.log("Statut de l'affichage du pays " + await driver.wait(until.elementLocated(By.id('pays')), 10000).isDisplayed());
    console.log("Statut de l'affichage des drapeau  " + await driver.wait(until.elementLocated(By.className('jumbotron')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.id('flag1')), 10000).click();
} testFlagFinder();