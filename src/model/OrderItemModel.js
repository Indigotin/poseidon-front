export const OrderItemModel = {
  id: null,
  itemId: null,
  orderId: null,
  itemImage: null,
  itemName: null,
  itemNum: null,
  itemPrice: null,
  itemTotalPrice: null,
};

export function itemToOrderItem(items) {
  let ret = [];
  items.forEach((item) => {
    ret.push({
      'id': null,
      'itemId': item.itemId,
      'itemName': item.itemName,
      'itemImage': item.itemImage,
      'itemNum': item.quantity,
      'itemPrice': item.price,
      'itemTotalPrice': item.price * item.quantity,
    });
  });
  return ret;
}