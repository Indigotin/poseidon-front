import {REQUEST_TYPE} from '../model/Media';
import {ADDRESS_SERVICE} from '../constants/Constants';

export async function fetchAddByUserName(username) {
  return await fetch(`${ADDRESS_SERVICE}/list/${username}`, {
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(response => {
    if (response.ok) {
      //console.log('response.json() ',response.json());
      return response.json();
    } else {
      return new Error('请求错误');
    }
  })
    .catch(error => {
      console.error(error);
    });
}

export async function addAddress(address,username) {
  return await fetch(`${ADDRESS_SERVICE}/add/${username}`, {
    method: REQUEST_TYPE.POST,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(address)
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}

/**
 * 根据购物车id删除购物车中的商品`
 */
/*
export async function deleteCart(username, itemId) {
  return await fetch(`${WEB_CART_SERVICE}/delete/${username}/${itemId}`, {
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

/!**
 * 添加商品到购物车中
 *!/
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

/!**
 * 更新购物车中某个商品的数量
 *!/

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

*/
