import asyncio
from playwright.async_api import async_playwright

# Correct seeds required in the assignment
SEEDS = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]
BASE_URL = "https://sanand0.github.io/tdsdata/js_table/?seed="

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        grand_total = 0

        for seed in SEEDS:
            page = await browser.new_page()
            url = f"{BASE_URL}{seed}"
            await page.goto(url, wait_until="networkidle")

            # wait until table loads (important for dynamic content)
            await page.wait_for_selector("table")

            cells = await page.query_selector_all("table td")
            page_sum = 0

            for cell in cells:
                text = await cell.inner_text()
                try:
                    page_sum += int(text.strip())
                except ValueError:
                    pass

            print(f"Seed {seed}: sum = {page_sum}")
            grand_total += page_sum
            await page.close()

        await browser.close()

        # 🔴 Important: exact output format for grader
        print(f"TOTAL: {grand_total}")

if __name__ == "__main__":
    asyncio.run(main())
