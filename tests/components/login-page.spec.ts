import { expect, test } from "@playwright/test";

import { LoginPage } from "../../models/pages/LoginPage";
import {
  getInvalidCredentials,
  getValidCredentials,
} from "../support/credentials";

test.describe("Login page", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("logs in successfully with valid credentials", async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const validCredentials = getValidCredentials();

    await test.step("Navigate to the SauceDemo login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Submit valid credentials", async () => {
      await loginPage.login(
        validCredentials.username,
        validCredentials.password,
      );
    });

    await test.step("Verify inventory page is visible", async () => {
      await expect(loginPage.successfulLoginElement).toBeVisible();
      await expect(page).toHaveURL(/inventory\.html$/);
    });
  });

  test("shows an error for invalid credentials", async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);
    const invalidCredentials = getInvalidCredentials();

    await test.step("Navigate to the SauceDemo login page", async () => {
      await loginPage.navigate();
    });

    await test.step("Submit invalid credentials", async () => {
      await loginPage.login(
        invalidCredentials.username,
        invalidCredentials.password,
      );
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
