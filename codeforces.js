const pup = require("puppeteer");

let min_Rating = "0";
let quesArr = [];
let max_Rating = "1400";

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function main() {
    let browser = await pup.launch({
        headless: true,
        defaultViewport: false,
        args: ["--start-maximized"]
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto(`https://codeforces.com/problemset/page/1?tags=${min_Rating}-${max_Rating}`);
    let al = await tab.$("span[pageindex='21']");
    let maxPage = await al.$eval("a", e => e.innerText);
    await tab.goto(`https://codeforces.com/problemset/page/${randomNumber(1, maxPage)}?tags=${min_Rating}-${max_Rating}`)
    await tab.waitForSelector("tbody tr");
    let tags = await tab.$$("tbody tr");
    for (let i = 1; i < tags.length; i++) {
        let td = await tags[i].$$("td");
        if (td.length == 5)
            quesArr.push({
                "quesId": await td[0].$eval("a", e => e.innerText),
                "quesName": await td[1].$eval("div a", e => e.innerText),
                "link": await td[0].$eval("a", e => e.href),
                "rating": await td[3].$eval("span", e => e.innerText),
            });
    }
    const randomIndex = Math.floor(Math.random() * quesArr.length);
    const item = quesArr[randomIndex];
    console.log(`Name :- ${item.quesName}`);
    console.log(`Link :- ${item.link}`);
    console.log(`Rating :- ${item.rating}`);
    await browser.close();
}

main();