export const appRoutes = {
  home: '/',
  login: '/auth/login',
  contact: '/contact',
  cart: '/cart',
  product: '/product/',
} as const;

export const catalogData = {
  searchTerm: 'pliers',
  searchResult: 'Pliers',
  productName: 'Combination Pliers',
  productPath: '/product/01M0J6GZ0QB2FB98Y5DVVTSTJC',
  quantityAfterIncrease: '2',
  productCardSelector: 'a[href^="/product/"]',
} as const;

export const expectedPatterns = {
  authenticatedUrl: /account|dashboard|home/i,
  productUrl: /\/product\//,
  loginError: /invalid|incorrect|authentication|credentials/i,
  validationError: /required|must be filled|invalid/i,
} as const;

export const navigationLabels = {
  cartMenuItem: /cart/i,
} as const;

export const apiEndpoints = {
  products: '/products',
  product: (productId: string) => `/products/${productId}`,
  productSearch: (query: string) => `/products/search?q=${encodeURIComponent(query)}`,
  relatedProducts: (productId: string) => `/products/${productId}/related`,
  brands: '/brands',
  categories: '/categories',
  categoriesTree: '/categories/tree',
  postcodeLookup: (country: string, postcode: string, houseNumber: string) =>
    `/postcode-lookup?country=${encodeURIComponent(country)}&postcode=${encodeURIComponent(postcode)}&house_number=${encodeURIComponent(houseNumber)}`,
  login: '/users/login',
} as const;

export const apiTestData = {
  productSearchTerm: catalogData.searchTerm,
  postcode: {
    country: 'United States',
    postcode: '12345',
    houseNumber: '1',
  },
} as const;

export const formData ={
    firstName: "test123",
    lastName:"test",
    email:"test@gmail.com",
    return:"Return",
    message:"testmessage",
    attachmentPath:"testFiles/contact-attachment.txt"

}