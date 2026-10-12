import { Page } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}

  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState("networkidle");
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
