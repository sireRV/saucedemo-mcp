import type { Locator } from "@playwright/test";

export class CartSection {
  public readonly root: Locator;
  public readonly shoppingCartLink: Locator;
  public readonly shoppingCartBadge: Locator;

  public constructor(root: Locator) {
    this.root = root;
    this.shoppingCartLink = root.getByTestId("shopping-cart-link");
    this.shoppingCartBadge = root.getByTestId("shopping-cart-badge");
  }

  public async open(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}
