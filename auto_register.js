const uId = "apaaryo2000@gmail.com";
const pass = "Apaar#123";
const pup = require("puppeteer");

async function main() {
    let browser = await pup.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://codeforces.com/enter?back=%2F");
    await tab.type("#handleOrEmail",uId);
    await tab.type("#password",pass);
    await tab.click(".submit");
    await tab.waitForTimeout(5000);
    await tab.goto("https://codeforces.com/contests");
    await tab.waitForTimeout(2000);
    let registerLinks = await tab.$$(".red-link");
    if(registerLinks.length == 0){
        console.log("No Active Contests Open for Registration");
        await browser.close();
        return;
    }
    await tab.click(".red-link");
    await tab.waitForTimeout(5000);
    let contest = await tab.$("h2");
    let contestName = contest.$eval("h2", e=>e.innerText);
    await tab.click(".submit");
    console.log("Successfully registered for "+contestName);
    await browser.close();
}
main();