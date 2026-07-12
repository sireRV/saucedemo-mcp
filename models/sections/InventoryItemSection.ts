import type { Locator } from "@playwright/test";

export class InventoryItemSection {
  public readonly root: Locator;
  public readonly itemName: Locator;
  public readonly itemDescription: Locator;
  public readonly itemPrice: Locator;
  public readonly addToCartButton: Locator;
  public readonly removeButton: Locator;

  public constructor(root: Locator) {
    this.root = root;
    this.itemName = root.getByTestId("inventory-item-name");
    this.itemDescription = root.getByTestId("inventory-item-desc");
    this.itemPrice = root.getByTestId("inventory-item-price");
    this.addToCartButton = root.getByRole("button", { name: "Add to cart" });
    this.removeButton = root.getByRole("button", { name: "Remove" });
  }

  public async getName(): Promise<string> {
    return (await this.itemName.textContent())?.trim() ?? "";
  }

  public async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  public async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }
}
