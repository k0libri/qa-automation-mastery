import { test } from "@playwright/test";
import { LoginPage } from "../po/pages/loginPage";
import { HomePage } from "../po/pages/homePage";
import { verifyPageLoaded } from "../../common/utils/pageHelpers";

test("LoginPage respects the BasePage contract", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await verifyPageLoaded(loginPage);
});

test("HomePage respects the BasePage contract", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await verifyPageLoaded(homePage);
});
