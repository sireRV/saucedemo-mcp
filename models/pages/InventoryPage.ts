import type { Locator, Page } from "@playwright/test";

import { CartSection } from "../sections/CartSection";
import { HamburgerMenuSection } from "../sections/HamburgerMenuSection";
import { InventoryItemSection } from "../sections/InventoryItemSection";

export class InventoryPage {
  public readonly root: Locator;
  public readonly header: Locator;
  public readonly pageTitle: Locator;
  public readonly inventoryItemsList: Locator;
  public readonly inventoryItems: Locator;
  public readonly sortDropdown: Locator;
  public readonly cart: CartSection;
  public readonly hamburgerMenu: HamburgerMenuSection;

  public constructor(private readonly page: Page) {
    this.root = page.getByTestId("inventory-container");
    this.header = page.getByTestId("primary-header");
    this.pageTitle = page.getByTestId("title");
    this.inventoryItemsList = page.getByTestId("inventory-list");
    this.inventoryItems = page.getByTestId("inventory-item");
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.cart = new CartSection(this.header);
    this.hamburgerMenu = new HamburgerMenuSection(
      this.page.locator("#menu_button_container"),
    );
  }

  public async verifyInventoryPageLoaded(): Promise<void> {
    await this.page.waitForURL(/\/inventory\.html$/);
    await this.pageTitle.waitFor({ state: "visible" });
    await this.inventoryItemsList.waitFor({ state: "visible" });
    await this.inventoryItems.first().waitFor({ state: "visible" });
  }

  public async getAllInventoryItems(): Promise<InventoryItemSection[]> {
    const itemCount: number = await this.inventoryItems.count();
    const items: InventoryItemSection[] = [];

    for (let index: number = 0; index < itemCount; index += 1) {
      items.push(new InventoryItemSection(this.inventoryItems.nth(index)));
    }

    return items;
  }

  public getInventoryItemByName(name: string): InventoryItemSection {
    const item: Locator = this.inventoryItems
      .filter({ has: this.page.getByText(name, { exact: true }) })
      .first();

    return new InventoryItemSection(item);
  }

  public getInventoryItemByIndex(index: number): InventoryItemSection {
    return new InventoryItemSection(this.inventoryItems.nth(index));
  }

  public async addItemToCartByName(name: string): Promise<void> {
    await this.getInventoryItemByName(name).addToCart();
  }

  public async removeItemFromCartByName(name: string): Promise<void> {
    await this.getInventoryItemByName(name).removeFromCart();
  }

  public async openShoppingCart(): Promise<void> {
    await this.cart.open();
  }

  public async selectSortingOption(option: string): Promise<void> {
    await this.sortDropdown.selectOption({ label: option });
  }

  public async openHamburgerMenu(): Promise<void> {
    await this.hamburgerMenu.open();
  }
}
