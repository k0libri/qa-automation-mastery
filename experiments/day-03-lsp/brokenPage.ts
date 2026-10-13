import { BasePage } from "../../tests/ui/po/pages/basePage";

// ❌ EXPERIMENT - signature-incompatible override
export class BrokenPage extends BasePage {
  async waitForLoad(timeoutMs: number): Promise<void> {
    await this.page.waitForLoadState("networkidle", { timeout: timeoutMs });
  }
}
