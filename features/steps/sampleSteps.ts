import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { chromium, Page, Browser } from 'playwright';
import { config } from '../../lambdatest-config';

let page: Page;
let browser: Browser;
setDefaultTimeout(120 * 1000);

Given("Open DuckDuckGo Website", { timeout: 60 * 1000 }, async function () {
    browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(config))}`
  });
  const context = await browser.newContext();
  page = await context.newPage();
  await page.goto("https://duckduckgo.com");
});

When("Search for LambdaTest", async function () {
  const element = await page.locator("[name=\"q\"]");
  await element.click();
  await element.type("LambdaTest");
  await element.press("Enter");
});

Then("Title should match with {string}", async function (expectedTitle: string) {
  try {
    const title = await page.title();
    console.log("title is::" + title);
    expect(title).toBe(expectedTitle);
    
    // Mark the test as passed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Title matched' } })}`);
  } catch (error) {
    // Mark the test as failed
    await page.evaluate(_ => {}, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: "Not matched" } })}`);
    throw error;
  } finally {
    await browser.close();
  }
});

