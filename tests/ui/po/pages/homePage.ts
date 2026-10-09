import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly productCards: Locator;
  private readonly productName: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator("[data-test='search-query']");
    this.searchButton = page.locator("[data-test='search-submit']");
    this.productCards = page.locator("a.card");
    this.productName = page.locator("[data-test='product-name']");
  }

  async goto() {
    await this.page.goto("/");
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getProductCount() {
    return this.productCards.count();
  }

  async getProductNames() {
    return this.productName.allTextContents();
  }
}
