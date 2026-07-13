import { expect, test } from "../fixtures/test";

const INVENTORY_ITEM_COUNT: number = 6;

for (let itemIndex: number = 0; itemIndex < INVENTORY_ITEM_COUNT; itemIndex += 1) {
  test(`inventory item ${itemIndex + 1} shows complete product information`, async ({
    inventoryPage,
  }) => {
    await test.step("Navigate directly to the inventory page", async () => {
      await inventoryPage.navigate();
    });

    await test.step("Verify the inventory page is displayed", async () => {
      await inventoryPage.verifyInventoryPageLoaded();
      await expect(inventoryPage.inventoryItems).toHaveCount(INVENTORY_ITEM_COUNT);
    });

    await test.step("Verify the item shows all required information", async () => {
      const inventoryItem = inventoryPage.getInventoryItemByIndex(itemIndex);

      await expect(inventoryItem.itemName).toBeVisible();
      await expect(inventoryItem.itemName).not.toBeEmpty();
      await expect(inventoryItem.itemDescription).toBeVisible();
      await expect(inventoryItem.itemDescription).not.toBeEmpty();
      await expect(inventoryItem.itemPrice).toBeVisible();
      await expect(inventoryItem.itemPrice).toContainText("$");
      await expect(inventoryItem.itemImage).toBeVisible();
      await expect(inventoryItem.itemImage).toHaveAttribute("src", /.+/);
      await expect(inventoryItem.addToCartButton).toBeVisible();
      await expect(inventoryItem.addToCartButton).toHaveText("Add to cart");
    });
  });
}
