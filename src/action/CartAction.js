import {REQUEST_TYPE} from '../model/Media';
import {WEB_CART_SERVICE} from '../constants/Constants';

export async function fetchCartByUserName(username) {
  return await fetch(`${WEB_CART_SERVICE}/list/${username}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return new Error('请求错误');
    }
  }).then(json => {
    let ret = json.data;
    ret.map((cart) => (
      cart.checked = false
    ));
    return ret;
  })
    .catch(error => {
      console.error(error);
    });
}

/**
 * 根据购物车id删除购物车中的商品`
 */
export async function deleteCart(username, cartId) {
  return await fetch(`${WEB_CART_SERVICE}/delete/${username}/${cartId}`, {
    method: REQUEST_TYPE.DELETE,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

/**
 * 添加商品到购物车中
 */
export async function addCart(cartInfo) {
  return await fetch(`${WEB_CART_SERVICE}/add`, {
    method: REQUEST_TYPE.POST,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(cartInfo)
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

/**
 * 更新购物车中某个商品的数量
 */

export async function updateCart(username, itemId, quantity) {
  return await fetch(`${WEB_CART_SERVICE}/update/${username}/${itemId}/${quantity}`, {
    method: REQUEST_TYPE.PATCH,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

export async function clean(cartIds) {
  return await fetch(`${WEB_CART_SERVICE}/clean`, {
    method: REQUEST_TYPE.PATCH,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(cartIds)
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

