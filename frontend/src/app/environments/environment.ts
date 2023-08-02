const url = 'https://backend-shop-online.onrender.com/api';
// const url = 'http://localhost:3200/api';
export const environment = {
  production: false,
  url,
  userUrl: url + '/users',
  productUrl: url + '/products',
  itemUrl: url + '/items',
  cartUrl: url + '/carts',
  categoryUrl: url + '/categories',
  orderUrl: url + '/orders',
};
