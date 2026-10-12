import { Page } from "@playwright/test";

// ❌ BAD - violates OCP: adding a new page type requires modifying BasePage
export class BasePage {
  constructor(
    protected readonly page: Page,
    private pageType: "login" | "home" | "checkout",
  ) {}

  async performPageSpecificAction(): Promise<void> {
    if (this.pageType === "login") {
      // login-specific logic
    } else if (this.pageType === "home") {
      // home-specific logic
    } else if (this.pageType === "checkout") {
      // every new page type forces a modification here!
    }
  }
}
