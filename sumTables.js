const { chromium } = require("playwright");

const seeds = [36,37,38,39,40,41,42,43,44,45];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/table_sum.html?seed=${seed}`;
    await page.goto(url);

    // wait until at least one table cell has a number
    await page.waitForFunction(() => {
      const cells = document.querySelectorAll("table td");
      return [...cells].some(td => td.innerText.trim() !== "");
    });

    const numbers = await page.$$eval("table td", tds =>
      tds
        .map(td => Number(td.innerText.trim()))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    totalSum += sum;
  }

  console.log(`TOTAL_SUM: ${totalSum}`);
  await browser.close();
})();
