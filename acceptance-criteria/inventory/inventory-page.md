# Inventory Page Acceptance Criteria

## Page Display

```gherkin
Scenario: Inventory page loads successfully
  Given a standard user has logged in successfully
  When the inventory page is displayed
  Then the page title should show "Products"
  And the inventory item list should be visible
  And the sorting control should be visible
```

```gherkin
Scenario: Inventory page shows the full product list
  Given a standard user is on the inventory page
  When the inventory items are displayed
  Then exactly 6 inventory items should be visible
```

## Inventory Items

```gherkin
Scenario: Each inventory item shows the expected product information
  Given a standard user is on the inventory page
  When an inventory item is displayed
  Then the item should show a product name
  And the item should show a product description
  And the item should show a product price
  And the item should show a product image
  And the item should show an "Add to cart" action when the item is not in the cart
```

## Add And Remove Products

```gherkin
Scenario: Add one product to the cart from the inventory page
  Given a standard user is on the inventory page
  And a product is not yet in the cart
  When the user adds that product to the cart
  Then that product action should change from "Add to cart" to "Remove"
  And the cart badge should show "1"
```

```gherkin
Scenario: Add multiple products to the cart from the inventory page
  Given a standard user is on the inventory page
  And multiple products are not yet in the cart
  When the user adds 2 different products to the cart
  Then each added product action should change to "Remove"
  And the cart badge should show "2"
```

```gherkin
Scenario: Remove a product from the inventory page
  Given a standard user is on the inventory page
  And a product has already been added to the cart
  When the user removes that product from the inventory page
  Then that product action should change from "Remove" to "Add to cart"
  And the cart badge should decrease by 1
```

## Cart Badge

```gherkin
Scenario: Cart badge is hidden before any item is added
  Given a standard user is on the inventory page
  When no products have been added to the cart
  Then the cart badge should not be visible
```

```gherkin
Scenario: Cart badge reflects the number of added products
  Given a standard user is on the inventory page
  When the user adds products to the cart
  Then the cart badge should display the current number of added products
```

```gherkin
Scenario: Cart badge is removed when the final item is cleared from cart state
  Given a standard user is on the inventory page
  And exactly 1 product is currently represented in the cart badge
  When that cart state is cleared
  Then the cart badge should no longer be visible
```

## Product Sorting

```gherkin
Scenario: Sort products by name from A to Z
  Given a standard user is on the inventory page
  When the user selects "Name (A to Z)"
  Then the inventory items should be ordered alphabetically ascending by product name
```

```gherkin
Scenario: Sort products by name from Z to A
  Given a standard user is on the inventory page
  When the user selects "Name (Z to A)"
  Then the inventory items should be ordered alphabetically descending by product name
```

```gherkin
Scenario: Sort products by price from low to high
  Given a standard user is on the inventory page
  When the user selects "Price (low to high)"
  Then the inventory items should be ordered by ascending numeric price
```

```gherkin
Scenario: Sort products by price from high to low
  Given a standard user is on the inventory page
  When the user selects "Price (high to low)"
  Then the inventory items should be ordered by descending numeric price
```

## Product Navigation

```gherkin
Scenario: Open a product details page from the product name
  Given a standard user is on the inventory page
  When the user selects a product name
  Then the user should be taken to that product's details page
```

```gherkin
Scenario: Open a product details page from the product image
  Given a standard user is on the inventory page
  When the user selects a product image
  Then the user should be taken to that product's details page
```

## Hamburger Menu

```gherkin
Scenario: Open the hamburger menu
  Given a standard user is on the inventory page
  When the user opens the hamburger menu
  Then the side menu should become visible
  And the menu should show "All Items"
  And the menu should show "About"
  And the menu should show "Logout"
  And the menu should show "Reset App State"
```

```gherkin
Scenario: Close the hamburger menu
  Given a standard user has opened the hamburger menu on the inventory page
  When the user closes the hamburger menu
  Then the side menu should no longer be visible
```

```gherkin
Scenario: All Items returns the user to the inventory page
  Given a standard user is viewing a SauceDemo page that exposes the hamburger menu
  When the user selects "All Items"
  Then the user should be taken to the inventory page
```

```gherkin
Scenario: About links away from the inventory experience
  Given a standard user has opened the hamburger menu on the inventory page
  When the user selects "About"
  Then the control should link to the Sauce Labs website
```

```gherkin
Scenario: Logout returns the user to the login page
  Given a standard user has opened the hamburger menu on the inventory page
  When the user selects "Logout"
  Then the user should be taken to the login page
```

```gherkin
Scenario: Reset App State clears visible cart badge state
  Given a standard user is on the inventory page
  And at least 1 product has been added to the cart
  When the user selects "Reset App State" from the hamburger menu
  Then the cart badge should no longer be visible
```

## Assumptions And Unverified Areas

- The inventory page was explored live with Playwright MCP on `https://www.saucedemo.com/inventory.html`.
- Product-link navigation was verified by opening the backpack item details page from both the product name and image.
- The `About` menu option was verified as a link to `https://saucelabs.com/`.
- During MCP exploration, `Reset App State` removed the cart badge immediately, but one previously added product button returned to `Add to cart` only after revisiting `/inventory.html`. Future automation should treat that behavior as a potential UI refresh nuance.
- This document intentionally excludes login validation, cart page validation, checkout, and end-to-end purchase flows.
