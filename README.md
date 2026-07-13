# Playwright MCP and Codex Learning Project

This repository is used to learn how to combine:

- Playwright
- Playwright MCP
- Codex CLI
- Page Object Model
- Specification-driven test automation
- GitHub pull-request reviews

The project contains both page-level tests and end-to-end tests.

---

## Testing Scope

### Page-Level Tests

In this project, a **component** refers to a specific application page rather than an individual UI component.

Examples:

- Login page
- Inventory page
- Cart page
- Checkout page

Page-level tests verify the behaviour and acceptance criteria of one page in isolation.

These tests should avoid validating complete workflows across multiple pages unless navigation is required to reach the page under test.

### End-to-End Tests

End-to-end tests validate complete user journeys across multiple pages.

Examples:

- Log in, add an item to the cart, and complete checkout.
- Log in, sort inventory, add products, and verify the cart.
- Attempt login with invalid credentials and verify the error.

End-to-end tests should reuse existing page objects, fixtures, test data, and authentication state where appropriate.

---

## Development Workflow

### 1. Select a Page or User Journey

Choose either:

- A specific page for page-level testing.
- A complete user journey for end-to-end testing.

Only one feature should normally be worked on at a time.

---

### 2. Explore the Application with Playwright MCP

Ask Codex to use Playwright MCP to inspect the live application.

For a page-level feature, Codex should:

1. Navigate to the required page.
2. Inspect the page structure and available controls.
3. interact with relevant elements where safe.
4. Identify validations, state changes, errors, and navigation behaviour.
5. Produce acceptance criteria in BDD format.

Example instruction:

```text
Use Playwright MCP to explore the inventory page.

Identify the established behaviour of this page and produce page-level
acceptance criteria in BDD format.

Do not include complete end-to-end journeys. Limit the acceptance criteria
to behaviour owned by the inventory page.

Do not modify the application or automation code.
```

Acceptance criteria should be based on behaviour observed through Playwright MCP rather than assumptions.

---

### 3. Create a Feature Specification

Create a Markdown specification under:

```text
features/
```

Example structure:

```text
features/
├── login-page.md
├── inventory-page.md
├── cart-page.md
└── checkout-flow.md
```

Each feature specification should contain:

- Feature purpose
- Scope
- Out-of-scope behaviour
- Preconditions
- Acceptance criteria
- Required test data
- Expected page objects
- Expected test coverage
- Completion criteria

Example:

```md
# Inventory Page

## Purpose

Validate the behaviour owned by the inventory page.

## Preconditions

- The user is authenticated.
- The user has been directed to `/inventory.html`.

## Acceptance Criteria

### Scenario: Display available inventory items

Given the user is on the inventory page  
When the inventory list is displayed  
Then each product should show its name, description, price, and action button
```

---

### 4. Update `current-feature.md`

The active specification must be referenced from:

```text
current-feature.md
```

This file is the source of truth for the feature currently being implemented.

Example:

```md
# Current Feature

## Feature

Inventory page automation

## Specification

`features/inventory-page.md`

## Branch

`feature/inventory-page-tests`

## Status

In progress

## Progress

- [x] Page explored using Playwright MCP
- [x] Acceptance criteria documented
- [x] Feature specification created
- [ ] Page Object Model implemented
- [ ] Test cases implemented
- [ ] Tests passing
- [ ] Code committed
- [ ] Pull request created
- [ ] Review comments resolved
- [ ] Pull request merged

## Notes

- Reuse the existing authenticated storage state.
- Do not repeat login through the UI in every test.
```

Codex must keep this file updated while work is in progress.

---

### 5. Create a Feature Branch

Create a dedicated branch before changing automation code.

Example:

```bash
git checkout -b feature/inventory-page-tests
```

The branch should contain changes for only one feature or closely related group of tests.

---

### 6. Implement the Page Object Model

The automation framework must follow the Page Object Model pattern.

Suggested structure:

```text
tests/
├── fixtures/
├── pages/
├── sections/
├── specs/
├── test-data/
└── utils/
```

Example:

```text
tests/
├── fixtures/
│   └── test.fixture.ts
├── pages/
│   ├── login.page.ts
│   └── inventory.page.ts
├── sections/
│   ├── hamburger-menu.section.ts
│   └── inventory-item.section.ts
├── specs/
│   ├── login.spec.ts
│   └── inventory.spec.ts
└── test-data/
    └── users.json
```

### Page Object Responsibilities

Page objects should contain:

- Page-specific locators
- Page-specific actions
- Navigation helpers
- Methods that return page state or locators

Page objects should not normally contain test assertions.

Example:

```ts
export default class LoginPage {
  constructor(private readonly page: Page) {}

  readonly usernameInput = this.page.getByTestId("username");
  readonly passwordInput = this.page.getByTestId("password");
  readonly loginButton = this.page.getByTestId("login-button");
  readonly errorMessage = this.page.getByTestId("error");

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

Assertions should remain in the test:

```ts
await loginPage.login(username, password);

await expect(page).toHaveURL(/inventory\.html/);
```

---

## DRY Principle

The automation code must follow the DRY principle: **Do Not Repeat Yourself**.

Avoid repeating:

- Login steps
- Page object creation
- Test-data definitions
- Common setup
- Repeated locators
- Repeated navigation
- Repeated assertions for shared behaviour

Use the following where appropriate:

- Playwright fixtures
- Authentication storage state
- Reusable page objects
- Reusable page sections
- Shared test data
- Helper functions
- `beforeEach` only when the setup must run before every test

### Authentication

Do not log in through the UI before every test unless login itself is being tested.

For authenticated tests, prefer:

- A setup project
- Saved authentication storage state
- An authenticated Playwright fixture

Example:

```ts
test.use({
  storageState: "playwright/.auth/user.json",
});
```

This reduces execution time and prevents login logic from being duplicated across test files.

---

## Writing Automated Tests

Test cases must be derived from the acceptance criteria in the active feature specification.

Each test should:

- Cover one clear behaviour.
- Have an understandable name.
- Use existing fixtures and page objects.
- Keep assertions inside the test.
- Avoid unnecessary dependencies on other tests.
- Be independently executable.
- Avoid hard waits such as `page.waitForTimeout()`.
- Use Playwright's automatic waiting and web-first assertions.

Example:

```ts
test("displays an error when invalid credentials are submitted", async ({
  loginPage,
}) => {
  await loginPage.goto();
  await loginPage.login("invalid-user", "invalid-password");

  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    "Username and password do not match",
  );
});
```

---

## Test Execution

Run the relevant test file during implementation:

```bash
npx playwright test tests/specs/inventory.spec.ts
```

Run the test in headed mode when visual inspection is useful:

```bash
npx playwright test tests/specs/inventory.spec.ts --headed
```

Run the complete test suite before creating a pull request:

```bash
npx playwright test
```

View the HTML report:

```bash
npx playwright show-report
```

A test should not be marked complete until it passes reliably.

---

## Commit and Pull-Request Rules

Code should only be committed when:

- The relevant tests pass.
- Existing tests have not been broken.
- Formatting and linting pass, where configured.
- `current-feature.md` has been updated.
- The implementation matches the feature specification.
- Unrelated changes have been removed.

Example:

```bash
git status
git diff
npx playwright test
git add .
git commit -m "test: add inventory page coverage"
git push -u origin feature/inventory-page-tests
```

After pushing the branch, create a pull request.

The pull request should include:

- A summary of the feature.
- The specification implemented.
- Test coverage added.
- Commands used to verify the change.
- Known limitations or excluded scenarios.

---

## Codex Pull-Request Review

Where configured, request a review through the GitHub Codex connector.

Example pull-request comment:

```text
@codex review
```

When Codex provides review feedback:

1. Read every review comment.
2. Determine whether the comment is applicable.
3. Ask Codex CLI to inspect the pull request and review feedback.
4. Apply the required changes.
5. Run the affected tests.
6. Run the complete test suite when appropriate.
7. Commit and push the corrections.
8. Request another review when required.

Example instruction for Codex CLI:

```text
Inspect the review comments on the current pull request.

Implement the valid requested changes without modifying unrelated code.

Run the relevant Playwright tests after making the changes.

Update current-feature.md with the review status and the verification
commands that were executed.
```

Repeat this loop until all relevant review comments are resolved.

---

## Merge the Pull Request

Merge the pull request only when:

- Required tests pass.
- Review comments are resolved.
- The pull request contains no unrelated changes.
- The feature specification has been satisfied.
- `current-feature.md` reflects the final state.

After merging:

```bash
git checkout master
git pull
git branch -d feature/inventory-page-tests
```

Use `main` instead of `master` when that is the repository's default branch.

---

## Complete the Feature

Update `current-feature.md` before finishing:

````md
## Status

Completed

## Completion Summary

- Acceptance criteria implemented.
- Page Object Model added or updated.
- Relevant tests passing.
- Pull request reviewed.
- Pull request merged.

## Verification

```bash
npx playwright test tests/specs/inventory.spec.ts
npx playwright test
```
````

````

Commit this update as part of the feature branch where possible.

---

## Start the Next Feature

After the current feature has been merged:

1. Update the local default branch.
2. Confirm the working tree is clean.
3. Clear the Codex conversation context.
4. Start a new Codex session.
5. Select the next page or end-to-end workflow.
6. Create or update `current-feature.md`.
7. Repeat the workflow.

A new context should be used so that completed feature details do not unnecessarily influence the next implementation.

Important project-wide instructions should remain documented in repository files such as:

- `README.md`
- `AGENTS.md`
- Framework documentation
- Feature specifications

Do not rely on the previous Codex conversation as permanent project documentation.

---

## Complete Workflow

```text
Select page or user journey
        ↓
Explore using Playwright MCP
        ↓
Document acceptance criteria
        ↓
Create features/<feature-name>.md
        ↓
Reference it from current-feature.md
        ↓
Create feature branch
        ↓
Implement or update Page Objects
        ↓
Implement automated tests
        ↓
Run relevant tests
        ↓
Refactor using POM and DRY principles
        ↓
Run the complete test suite
        ↓
Commit and push the branch
        ↓
Create pull request
        ↓
Request Codex review when required
        ↓
Fix review comments
        ↓
Repeat test and review cycle
        ↓
Merge into the default branch
        ↓
Mark feature complete
        ↓
Clear Codex context
        ↓
Start the next feature
````

---

## Definition of Done

A feature is complete when:

- Acceptance criteria are documented.
- The feature specification is stored under `features/`.
- `current-feature.md` is up to date.
- Page objects follow the existing framework design.
- Repeated behaviour has been extracted appropriately.
- Tests are independent and readable.
- Relevant tests pass.
- The complete suite passes where required.
- The branch has been committed and pushed.
- The pull request has been reviewed where applicable.
- Review feedback has been resolved.
- The pull request has been merged.
- The local default branch has been updated.
