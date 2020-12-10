const { Builder, By, Key, util } = require('selenium-webdriver');
let webdriver = require('selenium-webdriver'), until = webdriver.until;
async function testFlagFinder() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get("C:/Users/KHALI/Desktop/marais/projet-web-2020-marais/GeoQuizz/popGuesser.html");
    driver.manage().window().maximize();
    console.log("le nombre des questions est affiché : " + await driver.wait(until.elementLocated(By.id('nbquestion')), 10000).isDisplayed());
    console.log("la question est afficher : " + await driver.wait(until.elementLocated(By.id('questions')), 10000).isDisplayed());
    console.log("le nom des pays son affichait  pays 1 : " + await driver.wait(until.elementLocated(By.id('pays1')), 10000).isDisplayed()+" pays 2 : "+await driver.wait(until.elementLocated(By.id('pays2')), 10000).isDisplayed());
    console.log("les deux drapeaux sont affichés   drapeau 1 : " + await driver.wait(until.elementLocated(By.id('drapeau1')), 10000).isDisplayed()+" drapeau 2 : "+await driver.wait(until.elementLocated(By.id('drapeau2')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.id('drapeau1')), 10000).click();
    console.log("la réponse est affichée : " + await driver.wait(until.elementLocated(By.id('answer')), 10000).isDisplayed());
    console.log("le boutton est affiché : " + await driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    console.log("le nombre des questions est affiché '2' : " + await driver.wait(until.elementLocated(By.id('nbquestion')), 10000).isDisplayed());
    console.log("la question est afficher '2' : " + await driver.wait(until.elementLocated(By.id('questions')), 10000).isDisplayed());
    console.log("le nom des pays son affichait  '2' pays 1 : " + await driver.wait(until.elementLocated(By.id('pays1')), 10000).isDisplayed()+" pays 2 : "+await driver.wait(until.elementLocated(By.id('pays2')), 10000).isDisplayed());
    console.log("les deux drapeaux sont affichés  '2' drapeau 1 : " + await driver.wait(until.elementLocated(By.id('drapeau1')), 10000).isDisplayed()+" drapeau 2 : "+await driver.wait(until.elementLocated(By.id('drapeau2')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.id('drapeau1')), 10000).click();
    console.log("la réponse est affichée '2' : " + await driver.wait(until.elementLocated(By.id('answer')), 10000).isDisplayed());
    console.log("le boutton est affiché '2' : " + await driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    console.log("le nombre des questions est affiché '3' : " + await driver.wait(until.elementLocated(By.id('nbquestion')), 10000).isDisplayed());
    console.log("la question est afficher '3' : " + await driver.wait(until.elementLocated(By.id('questions')), 10000).isDisplayed());
    console.log("le nom des pays son affichait  '3' pays 1 : " + await driver.wait(until.elementLocated(By.id('pays1')), 10000).isDisplayed()+" pays 2 : "+await driver.wait(until.elementLocated(By.id('pays2')), 10000).isDisplayed());
    console.log("les deux drapeaux sont affichés  '3' drapeau 1 : " + await driver.wait(until.elementLocated(By.id('drapeau1')), 10000).isDisplayed()+" drapeau 2 : "+await driver.wait(until.elementLocated(By.id('drapeau2')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.id('drapeau1')), 10000).click();
    console.log("la réponse est affichée '3' : " + await driver.wait(until.elementLocated(By.id('answer')), 10000).isDisplayed());
    console.log("le boutton est affiché '3' : " + await driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('btn btn-primary')), 10000).click();
    console.log("le score est affiché : " + await driver.wait(until.elementLocated(By.id('end')), 10000).isDisplayed());
    console.log("le button de retour est affiché : " + await driver.wait(until.elementLocated(By.className('button2')), 10000).isDisplayed());
    driver.wait(until.elementLocated(By.className('button2')), 10000).click();   
    driver.quit();

}testFlagFinder();