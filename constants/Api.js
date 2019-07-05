const HOST = 'http://localhost:3000';
// const HOST = 'http://localhost:3000';
export default {
    GET_SEEN_PRODUCTS: HOST + '/api/product/get_all',
    GET_ONE_PRODUCT: HOST + '/api/product/',
    ADD_TO_CART: HOST + '/api/cart/add',
    GET_CART_TOTAL: HOST + '/api/cart/total',
    GET_ALL_CART_ITEM: HOST + '/api/cart/get_all',
    GET_ALL_PROVINCE: HOST + '/api/address/get_all_provincial',
    GET_DISTRICT: HOST + '/api/address/get_district',
    GET_WARD: HOST + '/api/address/get_ward',
    CHECK_PROMOTION_CODE: HOST + '/api/promotion_code/check_promotion_code',
    GET_ALL_ORDER: HOST + '/api/order/get_all',
    CREATE_ORDER: HOST + '/api/order/create'
};