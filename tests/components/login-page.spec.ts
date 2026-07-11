import { expect, test } from "@playwright/test";

import { LoginPage } from "../../models/pages/LoginPage";

function getRequiredEnvVariable(name: string): string {
  const value: string | undefined = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const validUserName: string = getRequiredEnvVariable("VALID_USER_NAME");
const validUserPassword: string = getRequiredEnvVariable("VALID_USER_PASSWORD");
const invalidUserName: string = getRequiredEnvVariable("INVALID_USER_NAME");
const invalidUserPassword: string = getRequiredEnvVariable(
  "INVALID_USER_PASSWORD",
);

test.describe("Login page", () => {
  test("logs in successfully with valid credentials", async ({ page }) => {
    const loginPage: LoginPage = new LoginPage(page);

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
