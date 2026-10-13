import { expect } from "@playwright/test";
import { BasePage } from "../../ui/po/pages/basePage";

export async function verifyPageLoaded(page: BasePage) {
  await page.waitForLoad();
  const title = await page.getTitle();
  expect(title.length).toBeGreaterThan(0);
}
