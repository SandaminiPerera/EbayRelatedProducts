# Playwright Tests for eBay

This project demonstrates automated testing of eBay's product search, related products, and product attributes using Playwright.

# Table of Contents
1. Introduction
2. Prerequisites
3. Setup
4. Test Structure
5. How to Run Tests
6. Test Descriptions


# 1.Introduction

The tests in this project validate different aspects of the eBay website, such as:

Searching for a product
Verifying proper related product display
Checking price range consistency
Validating product categories
Validating best seller products
Ensuring proper display of product information

The tests are written using Playwright, a powerful end-to-end testing framework.


# 2.prerequisites

Ensure you have the following installed:
Node.js (v14 or higher)
npm or yarn
Visual studio code


# 3.Setup

Clone the repository:
git clone <repository_url>
cd <repository_folder>

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install


# 4.Test Structure

The tests are written in JavaScript using Playwright's test framework. Each test file corresponds to a specific functionality or feature:

Test 1: Verify Related Products Displayed
Checks if related products are displayed on the product page and verifies the count.

Test 2: Validate Related Products Category
Ensures that related products belong to the same category as the main product.

Test 3: Validate Best-Seller Status
Verifies that related products meet a predefined sales threshold to qualify as best-sellers.

Test 4: Verify Price Range
Confirms that related products fall within a specific price range of the main product.

Test 5: Verify Displayed Attributes
Checks the presence of product attributes such as name, image, condition, and price.


# 5.How to Run Tests

Run all tests:
npx playwright test

Run a specific test file:
npx playwright test <test-file-name>

Run tests in headed mode:
npx playwright test --headed

Generate and view test reports:
npx playwright show-report


# 6.Test Descriptions

1. Verify Related Products Displayed

Objective: Verify the presence and count of related products.
Key Assertion: 4 related products should displayed on the main product page.

2. Validate Related Products Category

Objective: Ensure related products belong to the same category as the main product.
Key Assertion: Main product category matches related product category.

3. Validate Best-Seller Status

Objective: Verify related products meet the sales threshold for best-sellers.
Key Assertion: Products have a sold count of at least 5.

4. Verify Price Range

Objective: Check if related products are within a price range of +/-10 compared to the main product.
Key Assertion: Price difference between main and related products is <= 10.

5. Verify Displayed Attributes

Objective: Validate that related product attributes (name, image, condition, price) are displayed.
Key Assertion: All attributes are visible and correctly formatted.

