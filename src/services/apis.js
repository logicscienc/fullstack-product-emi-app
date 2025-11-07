const BASE_URL = process.env.REACT_APP_BASE_URL; 

export const PRODUCT_API = {
  GET_ALL_PRODUCTS: `${BASE_URL}/api/v1/product`,         
  GET_PRODUCT_BY_SLUG: (slug) => `${BASE_URL}/api/v1/product/${slug}`, 
};
