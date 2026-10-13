import { BasePage } from "../../tests/ui/po/pages/basePage";

// ❌ EXPERIMENT - signature-compatible, but silently breaks the contract
export class SneakyBrokenPage extends BasePage {
  async waitForLoad(): Promise<void> {
    // Looks fine, compiles fine — but doesn't actually wait for anything!
    return Promise.resolve();
  }
}
