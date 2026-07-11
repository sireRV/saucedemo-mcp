import { expect, test } from "@playwright/test";

import { LoginPage } from "../../models/pages/LoginPage";

function getCredential(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

test.describe("Login page", () => {
  test("logs in successfully with valid credentials", async ({ page }) => {
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

    await test.step("Submit valid credentials", async () => {
      await loginPage.login(validUserName, validUserPassword);
    });

    await test.step("Verify inventory page is visible", async () => {
      await expect(loginPage.successfulLoginElement).toBeVisible();
      await expect(page).toHaveURL(/inventory\.html$/);
    });
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const invalidUserName: string = getCredential(
      "INVALID_USER_NAME",
      "invalid_user",
    );
    const invalidUserPassword: string = getCredential(
      "INVALID_USER_PASSWORD",
      "invalid_password",
    );

    await test.step("Navigate to the SauceDemo login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Submit invalid credentials", async () => {
      await loginPage.login(invalidUserName, invalidUserPassword);
    });

    await test.step("Verify login failure message is shown", async () => {
      await expect(loginPage.loginErrorMessage).toBeVisible();
      await expect(loginPage.loginErrorMessage).toContainText(
        "Epic sadface: Username and password do not match any user in this service",
      );
      await expect(page).toHaveURL(/saucedemo\.com\/?$/);
    });
  });
});
