const { chromium } = require("playwright");

const seeds = [36,37,38,39,40,41,42,43,44,45];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let totalSum = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/table_sum.html?seed=${seed}`;

    await page.goto(url, { waitUntil: "networkidle" });

    // get all visible text and extract numbers
    const numbers = await page.evaluate(() => {
      const text = document.body.innerText;
      return text
        .split(/\s+/)
        .map(n => Number(n))
        .filter(n => !isNaN(n));
    });

    const sum = numbers.reduce((a, b) => a + b, 0);
    totalSum += sum;
  }

  console.log(`TOTAL: ${totalSum}`);
  await browser.close();
})();
