# Login Page Acceptance Criteria

## Page Display

```gherkin
Scenario: Login page loads successfully
  Given the user navigates to "https://www.saucedemo.com"
  When the login page is displayed
  Then the "Username" input should be visible
  And the "Password" input should be visible
  And the "Login" button should be visible
```

```gherkin
Scenario: Login page shows the supported credential hints
  Given the user is on the login page
  When the credential help content is displayed
  Then the page should show the "Accepted usernames are:" heading
  And the page should show "standard_user" as the valid-login username covered by this specification
  And the page should show the "Password for all users:" heading
  And the page should show "secret_sauce" as the shared password hint
```

## Successful Login

```gherkin
Scenario: Standard user logs in successfully
  Given the user is on the login page
  When the user submits username "standard_user"
  And the user submits password "secret_sauce"
  And the user clicks the "Login" button
  Then the user should be redirected to "/inventory.html"
  And the inventory page title should show "Products"
```

## Failed Login

```gherkin
Scenario: Invalid credentials are rejected
  Given the user is on the login page
  When the user submits username "invalid_user"
  And the user submits password "invalid_password"
  And the user clicks the "Login" button
  Then the user should remain on the login page
  And the login error message should be visible
  And the login error message should contain "Epic sadface: Username and password do not match any user in this service"
```

## Assumptions And Unverified Areas

- This document is limited to page-level login behaviour and excludes all non-`standard_user` login variants, checkout, and other end-to-end flows.
- The successful login and login-page structure were corroborated by existing Playwright MCP snapshots stored under `.playwright-mcp/`.
- The invalid-login error text is corroborated by the existing Playwright component spec in `tests/components/login-page.spec.ts`.
- A fresh Playwright MCP session was attempted during this task, but the MCP navigation call was cancelled before execution, so this update relies on the repo's recorded MCP artifacts plus the current automation coverage.
