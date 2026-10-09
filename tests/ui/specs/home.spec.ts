import { test, expect } from "@playwright/test";
import { HomePage } from "../po/pages/homePage";

test("searching for a product returns results", async ({ page }) => {
  const searchTerm = "Hammer";
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.search(searchTerm);

  await expect.poll(() => homePage.getProductCount()).toBeLessThan(9);
  const productNames = await homePage.getProductNames();

  expect(productNames).toEqual(
    expect.arrayOf(expect.stringContaining(searchTerm)),
  );
});
