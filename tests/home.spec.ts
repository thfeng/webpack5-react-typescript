import { test, expect } from '@playwright/test';

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('http://localhost:9000');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Webpack5 for React/);

  // create a locator
  const aboutLink = page.getByRole('link', { name: 'View About' });

  // Expect an attribute "to be strictly equal" to the value.
  await expect(aboutLink).toHaveAttribute('href', '/about');

  // Click the get started link.
  await aboutLink.click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*about/);
});
