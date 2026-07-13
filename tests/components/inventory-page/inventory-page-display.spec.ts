import { expect, test } from "../../fixtures/test";

test.describe("Inventory page", () => {
  test("loads successfully with title, inventory list, and sorting control", async ({
    inventoryPage,
  }) => {
    await test.step("Navigate directly to the inventory page", async () => {
      await inventoryPage.navigate();
    });

    await test.step("Verify the inventory page is displayed", async () => {
      await inventoryPage.verifyInventoryPageLoaded();
    });

    await test.step("Verify the page display elements are visible", async () => {
      await expect(inventoryPage.pageTitle).toHaveText("Products");
      await expect(inventoryPage.inventoryItemsList).toBeVisible();
      await expect(inventoryPage.sortDropdown).toBeVisible();
    });
  });

  test("shows the full product list", async ({ inventoryPage }) => {
    await test.step("Navigate directly to the inventory page", async () => {
      await inventoryPage.navigate();
    });

    await test.step("Verify the inventory page is displayed", async () => {
      await inventoryPage.verifyInventoryPageLoaded();
    });

    await test.step("Verify exactly 6 inventory items are visible", async () => {
      await expect(inventoryPage.inventoryItems).toHaveCount(6);
    });
  });
});
