import { test, expect, request } from '@playwright/test';

test('POST /users - Create a new user', async () => {
  // Create a new API request context
  const apiContext = await request.newContext();

  // Define the request payload
  const payload = {
    name: 'John',
    job: 'Tester',
  };

  // Send POST request
  const response = await apiContext.post('https://reqres.in/api/users', {
    data: payload,
  });

  // Validate response status code
  expect(response.status()).toBe(201);

  // Parse response JSON
  const responseBody = await response.json();

  // Validate that 'id' and 'createdAt' exist in the response
  expect(responseBody).toHaveProperty('id');
  expect(responseBody).toHaveProperty('createdAt');

  console.log('POST API test passed successfully!');
});
