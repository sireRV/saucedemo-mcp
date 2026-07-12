import type { Locator } from "@playwright/test";

export class HamburgerMenuSection {
  public readonly root: Locator;
  public readonly openButton: Locator;
  public readonly closeButton: Locator;
  public readonly allItemsLink: Locator;
  public readonly aboutLink: Locator;
  public readonly logoutLink: Locator;
  public readonly resetAppStateLink: Locator;

  public constructor(root: Locator) {
    this.root = root;
    this.openButton = root.getByTestId("open-menu");
    this.closeButton = root.getByTestId("close-menu");
    this.allItemsLink = root.getByTestId("inventory-sidebar-link");
    this.aboutLink = root.getByTestId("about-sidebar-link");
    this.logoutLink = root.getByTestId("logout-sidebar-link");
    this.resetAppStateLink = root.getByTestId("reset-sidebar-link");
  }

  public async open(): Promise<void> {
    await this.openButton.click();
  }

  public async close(): Promise<void> {
    await this.closeButton.click();
  }
}
