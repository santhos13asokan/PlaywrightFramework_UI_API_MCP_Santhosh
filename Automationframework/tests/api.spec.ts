import { expect } from '@playwright/test';
import { test } from '../fixture/custom.fixture';
import { apiEndpoints, apiTestData } from '../constants';
import { testData } from '../testdata';

async function getFirstProductId(apiUtil: { get: (endpoint: string) => Promise<any> }) {
  const response = await apiUtil.get(apiEndpoints.products);
  const body = await response.json();
  return body.data[0].id as string;
}

test.describe('Toolshop API scenarios', () => {
  test('GET products returns a paginated product collection', async ({ apiUtil }) => {
    const response = await apiUtil.get(apiEndpoints.products);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      price: expect.any(Number),
    }));
  });

  test('GET product returns details for a known catalog product', async ({ apiUtil }) => {
    const productId = await getFirstProductId(apiUtil);
    const response = await apiUtil.get(apiEndpoints.product(productId));
    expect(response.status()).toBe(200);

    const product = await response.json();
    expect(product).toEqual(expect.objectContaining({
      id: productId,
      name: expect.any(String),
      price: expect.any(Number),
      in_stock: expect.any(Boolean),
    }));
  });

  test('GET product search returns matching products', async ({ apiUtil }) => {
    const response = await apiUtil.get(apiEndpoints.productSearch(apiTestData.productSearchTerm));
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data.every((product: { name: string }) =>
      product.name.toLowerCase().includes(apiTestData.productSearchTerm),
    )).toBe(true);
  });

  test('GET related products returns an array', async ({ apiUtil }) => {
    const productId = await getFirstProductId(apiUtil);
    const response = await apiUtil.get(apiEndpoints.relatedProducts(productId));
    expect(response.status()).toBe(200);
    expect(Array.isArray(await response.json())).toBe(true);
  });

  test('GET brands and categories return collections', async ({ apiUtil }) => {
    const [brandsResponse, categoriesResponse, treeResponse] = await Promise.all([
      apiUtil.get(apiEndpoints.brands),
      apiUtil.get(apiEndpoints.categories),
      apiUtil.get(apiEndpoints.categoriesTree),
    ]);

    expect(brandsResponse.status()).toBe(200);
    expect(categoriesResponse.status()).toBe(200);
    expect(treeResponse.status()).toBe(200);
    expect(Array.isArray(await brandsResponse.json())).toBe(true);
    expect(Array.isArray(await categoriesResponse.json())).toBe(true);
    expect(Array.isArray(await treeResponse.json())).toBe(true);
  });

  test('postcode lookup returns address fields', async ({ apiUtil }) => {
    const { country, postcode, houseNumber } = apiTestData.postcode;
    const response = await apiUtil.get(apiEndpoints.postcodeLookup(country, postcode, houseNumber));
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toEqual(expect.objectContaining({
      street: expect.any(String),
      city: expect.any(String),
      state: expect.any(String),
      country: expect.any(String),
      postcode: expect.any(String),
    }));
  });

  test('valid user credentials return an access token', async ({ apiUtil }) => {
    const response = await apiUtil.post(apiEndpoints.login, {
      email: testData.user.username,
      password: testData.user.password,
    });

    expect(response.status()).toBe(200);
    expect(await response.json()).toEqual(expect.objectContaining({
      access_token: expect.any(String),
      token_type: expect.any(String),
    }));
  });

  test('invalid user credentials are rejected', async ({ apiUtil }) => {
    const response = await apiUtil.post(apiEndpoints.login, {
      email: testData.invalid.username,
      password: testData.invalid.password,
    });

    expect([400, 401, 422]).toContain(response.status());
  });
});