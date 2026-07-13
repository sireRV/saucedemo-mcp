import { test, expect } from "../fixtures/test";
import { getValidCredentials } from "../support/credentials";

test("authenticate standard user", async ({ context, loginPage, page }) => {
  const validCredentials = getValidCredentials();

  await test.step("Navigate to the SauceDemo login page", async () => {
    await loginPage.navigate();
  });

  await test.step("Log in as a standard user", async () => {
    await loginPage.login(
      validCredentials.username,
      validCredentials.password,
    );
  });

  await test.step("Verify login succeeded before saving state", async () => {
    await expect(loginPage.successfulLoginElement).toBeVisible();
    await expect(page).toHaveURL(/inventory\.html$/);
  });

  await test.step("Save the authenticated browser state", async () => {
    await context.storageState({ path: "playwright/.auth/user.json" });
  });
});
