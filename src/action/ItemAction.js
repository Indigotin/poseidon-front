import {ITEM} from '../constants/Constants';

/**
 * fetch data depend on item id
 * @param id item id
 * @param blob  boolean including blob (0 or 1)
 */
export async function fetchItem(id) {
  return await fetch(`${ITEM}/${id}`, {
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
    return json.data;
  })
    .catch(error => {
      console.error(error);
    });
}

export async function fetchItemList(searchValue,page,size) {
  return await fetch(`${ITEM}/search/${searchValue}/${page}/${size}`, {
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
    return json.data;
  })
    .catch(error => {
      console.error(error);
    });
}