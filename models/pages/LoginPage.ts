import type { Locator, Page } from "@playwright/test";

export class LoginPage {
  private static readonly LOGIN_PATH: string = "/";

  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;
  public readonly loginErrorMessage: Locator;
  public readonly successfulLoginElement: Locator;
  public readonly acceptedUsernamesHeading: Locator;
  public readonly passwordHintHeading: Locator;

  public constructor(private readonly page: Page) {
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.loginErrorMessage = page.getByTestId("error");
    this.successfulLoginElement = page.getByText("Products", { exact: true });
    this.acceptedUsernamesHeading = page.getByRole("heading", {
      name: "Accepted usernames are:",
    });
    this.passwordHintHeading = page.getByRole("heading", {
      name: "Password for all users:",
    });
  }

  public async navigate(): Promise<void> {
    await this.page.goto(LoginPage.LOGIN_PATH);
  }

  public async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  public async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  public async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  public async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  public getAcceptedUsernameHint(username: string): Locator {
    return this.page.getByText(username);
  }

  public getSharedPasswordHint(password: string): Locator {
    return this.page.getByText(password);
  }
}
