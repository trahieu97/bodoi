const HOST = 'http://localhost:3000';
// const HOST = 'http://localhost:3000';
export default {
    GET_SEEN_PRODUCTS: HOST + '/api/product/get_all',
    GET_ONE_PRODUCT: HOST + '/api/product/',
    ADD_TO_CART: HOST + '/api/cart/add',
    GET_ALL_CART_ITEM: HOST + '/api/cart/get_all',
    GET_ALL_PROVINCE: HOST + '/api/address/get_all_provincial'
};