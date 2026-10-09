import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class BadLoginPage extends BasePage {
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.errorMessage = page.locator('[data-test="login-error"]');
  }

  async goto() {
    await this.page.goto("/auth/login");
  }

  // ❌ BAD - assertion inside Page Object, violates SRP
  async loginAndVerifySuccess(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.page).toHaveURL("/account");
  }
}
