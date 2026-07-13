import {
  expect,
  test as base,
} from "@playwright/test";

import { InventoryPage } from "../../models/pages/InventoryPage";
import { LoginPage } from "../../models/pages/LoginPage";

interface PageObjectFixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
}

const test = base.extend<PageObjectFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect, test };
