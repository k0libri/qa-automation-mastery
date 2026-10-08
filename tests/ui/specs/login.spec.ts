import { test, expect } from "@playwright/test";
import { LoginPage } from "../po/pages/loginPage";
import { BadLoginPage } from "../po/pages/badLoginPage";

test.describe("Login", () => {
  test("valid credentials redirect to account page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.CUSTOMER_EMAIL!,
      process.env.CUSTOMER_PASSWORD!,
    );

    await expect(page).toHaveURL("/account");
  });

  test("valid credentials redirect to account page without SRP", async ({
    page,
  }) => {
    const loginPage = new BadLoginPage(page);
    await loginPage.goto();
    await loginPage.loginAndVerifySuccess(
      process.env.CUSTOMER_EMAIL!,
      process.env.CUSTOMER_PASSWORD!,
    );
  });

  test("invalid credentials show error message", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("wrong@user.com", "wrongPassword");

    await expect(loginPage.getErrorMessage()).resolves.toContain("Invalid");
  });
});
