export const GATEWAY_URL = '';

//export const GATEWAY_TEST_URL = 'http://localhost:8769';

// 商品展示服务
export const ITEM_SERVICE = `${GATEWAY_URL}/api`;

// item cat base url
export const ITEM_CAT = `${ITEM_SERVICE}/category`;
// root categories with items
export const ITEM_CAT_ROOT_WITH_ITEMS = `${ITEM_CAT}/ro`;
// nav categories with items
export const ITEM_CAT_NAV_WITH_ITEMS = `${ITEM_CAT}/nav`;

// item base url
export const ITEM = `${ITEM_SERVICE}/item`;

// panel base url
export const PANEL = `${ITEM_SERVICE}/panel`;
export const PANEL_WITH_CATID = `${PANEL}/cat`;
export const PANEL_WITH_REMARK = `${PANEL}/re`;


//export const ITEM_CAT_ROOT_URL = `${ITEM_CAT}/ro`;
//export const CAT_PANEL_ITEMS_URL = `${PANEL}/pi`;
//export const ITEM_PANEL_REMARK_URL = `${PANEL}/re`;


// 购物车服务
export const WEB_CART_SERVICE = `${ITEM_SERVICE}/cart`;
// 地址服务
export const ADDRESS_SERVICE = `${ITEM_SERVICE}/address`;
// member service
export const MEMBER_SERVICE = `${ITEM_SERVICE}/userInfo`;

// 登录认证服务
//export const AUTH_SERVICE_URL = `${GATEWAY_URL}/auth`;
export const AUTH_SERVICE_URL = `${ITEM_SERVICE}/check`;
//注册
export const REGISTER_URL = `${ITEM_SERVICE}/register`;
// order service
export const ORDER_SERVICE_URL = `${ITEM_SERVICE}/order`;
// es service
export const ES_SERVICE_URL = `${ITEM_SERVICE}/es`;

// 各种错误的信息
export const NETWORK_BUSY = '网络繁忙,请重试';
