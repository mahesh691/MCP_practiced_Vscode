import { test, expect } from '@playwright/test';
import Ajv from 'ajv';

test.describe('FakeStore API - Product GET', () => {
	const url = 'https://fakestoreapi.com/products/1';

	test('GET product and validate status, keys, schema and log values', async ({ request }) => {
		// Send GET request
		const response = await request.get(url);
		
		// Verify status is 200
		expect(response.status()).toBe(200);

		// Parse response body
		const body = await response.json();

		// Verify required keys exist
		const requiredKeys = ['id', 'title', 'price', 'category', 'description'];
		for (const key of requiredKeys) {
			expect(Object.prototype.hasOwnProperty.call(body, key)).toBeTruthy();
		}

		// JSON Schema validation with Ajv
		const schema = {
			type: 'object',
			required: requiredKeys,
			properties: {
				id: { type: 'number' },
				title: { type: 'string' },
				price: { type: 'number' },
				category: { type: 'string' },
				description: { type: 'string' }
			},
			additionalProperties: true
		};

		const ajv = new Ajv();
		const validate = ajv.compile(schema);
		const valid = validate(body);
		
		if (!valid) {
			console.error('Schema validation errors:', validate.errors);
		}
		expect(valid).toBe(true);

		// Log product title and price
		console.log(`Product title: ${body.title}`);
		console.log(`Product price: ${body.price}`);
	});
});
