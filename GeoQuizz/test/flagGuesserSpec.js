const { Builder, By, Key, util } = require('selenium-webdriver');
let webdriver = require('selenium-webdriver'), until = webdriver.until;
async function testFlagGuesser() {
    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get("C:/Users/KHALI/Desktop/marais/projet-web-2020-marais/GeoQuizz/menu.html");
    driver.findElement(By.className("button2")).click();

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