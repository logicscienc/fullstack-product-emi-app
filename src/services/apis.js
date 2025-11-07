const BASE_URL = process.env.REACT_APP_BASE_URL



export const PRODUCT_API = {
  GET_ALL_PRODUCTS: "/",
  GET_PRODUCT_BY_SLUG: (slug) => `/${slug}`,
};
