import { expect, test } from "@playwright/test";

import { InventoryPage } from "../../../models/pages/InventoryPage";
import { LoginPage } from "../../../models/pages/LoginPage";

function getCredential(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

test.describe("Inventory page", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const validUserName: string = getCredential(
      "VALID_USER_NAME",
      "standard_user",
    );
    const validUserPassword: string = getCredential(
      "VALID_USER_PASSWORD",
      "secret_sauce",
    );

    await test.step("Navigate to the SauceDemo login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Log in as a standard user", async () => {
      await loginPage.login(validUserName, validUserPassword);
    });
  });

  test("loads successfully with title, inventory list, and sorting control", async ({
    page,
  }) => {
    const inventoryPage: InventoryPage = new InventoryPage(page);

    await test.step("Verify the inventory page is displayed", async () => {
      await inventoryPage.verifyInventoryPageLoaded();
    });

    await test.step("Verify the page display elements are visible", async () => {
      await expect(inventoryPage.pageTitle).toHaveText("Products");
      await expect(inventoryPage.inventoryItemsList).toBeVisible();
      await expect(inventoryPage.sortDropdown).toBeVisible();
    });
  });

  test("shows the full product list", async ({ page }) => {
    const inventoryPage: InventoryPage = new InventoryPage(page);

    await test.step("Verify the inventory page is displayed", async () => {
      await inventoryPage.verifyInventoryPageLoaded();
    });

    await test.step("Verify exactly 6 inventory items are visible", async () => {
      await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });
  });
});
