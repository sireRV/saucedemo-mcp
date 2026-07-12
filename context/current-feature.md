# Current Feature

## Feature: Login Page Object And Component Tests

Create the SauceDemo login page object and the follow-up Playwright login component tests that use it.

### Status

Done

### Goals

- Create a typed `LoginPage` page object.
- Add locators for username, password, login button, login error message, and a successful login element on the inventory page.
- Add actions to navigate, enter username, enter password, click login, and log in with supplied credentials.
- Verify failed-login and successful-login locators against the live SauceDemo application.
- Create independent successful-login and unsuccessful-login tests.
- Use the existing `LoginPage` page object without duplicating login locators in the spec file.
- Keep assertions in the test file and use `test.step()` for meaningful actions.
- Verify the successful-login locator on the inventory page.
- Verify the failed-login error locator and expected error message.
- Update the feature status and results after verification.

### Notes

- Use `https://saucedemo.com` for navigation.
- Verify live page behavior with Playwright MCP.
- Stay on branch `feature/login-page-object` for this follow-up feature work.
- Use the existing `LoginPage` page object unless a required method or locator is missing.
- Run the login test file for verification.
- Ensure `npm run build` passes for this feature.
- Verification results:
- Login page object locators were verified against the live SauceDemo application.
- `npm run build` passed.
- `PW_TEST_HTML_REPORT_OPEN=never npx playwright test tests/components/login-page.spec.ts` passed with 2 tests.

### History

- Done: Login page object created and verified against the live SauceDemo application.
- In progress: Login page object implementation started.
- Done: Login component tests added and verified on `feature/login-page-object`.
- In progress: Login component test implementation started on `feature/login-page-object`.

## Feature: Login Test Parameterization

Parameterize the SauceDemo login component test so credentials come from environment variables instead of being hardcoded in the spec.

### Status

Done

### Goals

- Install `dotenv` as a dev dependency.
- Enable dotenv loading in `playwright.config.ts`.
- Add `VALID_USER_NAME`, `VALID_USER_PASSWORD`, `INVALID_USER_NAME`, and `INVALID_USER_PASSWORD` to a local `.env` file.
- Ignore `.env` in git.
- Update `tests/components/login-page.spec.ts` to use environment variables instead of hardcoded credentials.
- Run the login component test file for verification.
- Ensure `npm run build` passes.
- Update this file with verification results.

### Notes

- Use the existing `LoginPage` page object.
- Keep assertions in the test file.
- Fail fast if a required environment variable is missing.
- Verification results:
- `npm run build` passed.
- `PW_TEST_HTML_REPORT_OPEN=never npx playwright test tests/components/login-page.spec.ts` passed with 2 tests.
- The successful login test verified navigation to the inventory page.
- The unsuccessful login test verified the login error message.

### History

- Done: Login test parameterization completed and verified.
- In progress: Login test parameterization started.

## Feature: Create Inventory Page Object

Create a Playwright Page Object Model for the SauceDemo inventory page and supporting sections for inventory items and the hamburger menu.

### Status

Done

### Goals

- Create a typed `InventoryPage` page object for `/inventory.html`.
- Add inventory page locators for title, items list, item details, cart controls, sort dropdown, and hamburger menu button.
- Encapsulate inventory item locators and actions in a reusable section object.
- Encapsulate hamburger menu controls in a section object used only by the inventory page.
- Add actions to verify page readiness, access items by name and index, add and remove items, open the cart, select sorting, and open the menu.
- Keep assertions out of the page object and preserve the existing POM testing style.
- Ensure TypeScript compilation passes.
- Update this file with implementation status and verification results.

### Notes

- `playwright.config.ts` now maps `getByTestId()` to SauceDemo's `data-test` attribute so page objects can follow the project's locator hierarchy.
- No inventory tests were added because this feature's scope is limited to page objects and sections.
- Verification results:
- `npm run build` passed.
- `PW_TEST_HTML_REPORT_OPEN=never npx playwright test tests/components/login-page.spec.ts` passed with 2 tests after the page object additions.

### History

- Done: Inventory page object and supporting section objects created and verified.
- In progress: Inventory page object implementation started.

## Feature: Explore Inventory Page And Document Acceptance Criteria

Explore the SauceDemo inventory page and document page-level acceptance criteria in BDD format for future Playwright automation.

### Status

Done

### Goals

- Explore the live `/inventory.html` page with Playwright MCP.
- Document page structure, inventory items, product links, cart controls, sorting, and hamburger menu behavior.
- Capture independent BDD scenarios suitable for later Playwright automation.
- Keep the scope limited to inventory-page behavior and direct navigation controls.
- Create the acceptance-criteria document under `acceptance-criteria/`.
- Update this file with exploration and verification status.

### Notes

- Acceptance criteria were documented in `acceptance-criteria/inventory/inventory-page.md`.
- Live behavior was explored with Playwright MCP against `https://www.saucedemo.com`.
- Verified behaviors include:
- Inventory page load and 6-item product list.
- Product name, description, price, image, and add/remove controls.
- Cart badge state changes for add and remove actions.
- Sorting by name and price in both supported directions.
- Product details navigation from product name and product image.
- Hamburger menu open and close behavior.
- Hamburger menu options for All Items, About, Logout, and Reset App State.
- Logout navigation back to the login page.
- `About` links to `https://saucelabs.com/`.
- `Reset App State` immediately cleared the cart badge during MCP exploration; one previously added item button visually reset after revisiting `/inventory.html`.
- `npm run build` passed.
- `PW_TEST_HTML_REPORT_OPEN=never npx playwright test tests/components/login-page.spec.ts` was attempted but failed in the local shell because the sandboxed Chromium process closed with `sandbox_host_linux.cc:41`, so MCP was used for live verification instead.

### History

- Done: Inventory page acceptance criteria documented and verified with Playwright MCP.
- In progress: Inventory page acceptance-criteria exploration started.
