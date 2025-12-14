const { test, expect, request } = require('@playwright/test');

test('GET /users?page=2 - Validate response', async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Send GET request
  const response = await apiContext.get('https://reqres.in/api/users?page=2');

  // Validate status code
  expect(response.status()).toBe(200);

  // Parse response JSON
  const responseBody = await response.json();

  // Validate that data array is not empty
  expect(responseBody.data).toBeInstanceOf(Array);
  expect(responseBody.data.length).toBeGreaterThan(0);

  console.log('API test passed successfully!');
});
