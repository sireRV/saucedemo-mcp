import { expect, test } from "@playwright/test";

import { LoginPage } from "../../../models/pages/LoginPage";
import { getValidCredentials } from "../../support/credentials";

test.describe("Login page display", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("shows the login page inputs and action button", async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);

    await test.step("Navigate to the SauceDemo login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Verify the login form is visible", async () => {
      await expect(page).toHaveURL(/saucedemo\.com\/?$/);
      await expect(loginPage.usernameInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.loginButton).toBeVisible();
    });
  });

  test("shows the supported credential hints for this specification", async ({
    page,
  }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const validCredentials = getValidCredentials();

    await test.step("Navigate to the SauceDemo login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Verify the credential hint content is visible", async () => {
      await expect(loginPage.acceptedUsernamesHeading).toBeVisible();
      await expect(
        loginPage.getAcceptedUsernameHint(validCredentials.username),
      ).toBeVisible();
      await expect(loginPage.passwordHintHeading).toBeVisible();
      await expect(
        loginPage.getSharedPasswordHint(validCredentials.password),
      ).toBeVisible();
    });
  });
});
