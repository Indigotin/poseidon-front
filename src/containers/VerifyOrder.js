import React, {Component} from 'react';
import '../styles/checkOrder.css';
import {itemToOrderItem} from '../model/OrderItemModel';
import {addOrder} from '../action/OrderAction';
import {NETWORK_BUSY} from '../constants/Constants';
import UForm from './Form';
import {fetchMemberByName} from '../action/MemberAction';
import {clean} from '../action/CartAction';

class VerifyOrder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      addressId: '',
    };
  }
  static async handleAddOrder(verifyCarts, totalPrice) {
    /*const address = $('#new-address').text();
    console.log(address);*/
    const addId = this.state.addressId;
    const userInfo = await fetchMemberByName(localStorage.getItem('curUser'));
    const orderItems = itemToOrderItem(verifyCarts);
    let orderInfo = {
      'id': null,
      'payment': totalPrice,
      'paymentType': null,
      'postFee': 0,
      'orderItemList': orderItems,
      'addressId': addId,
      'userId': userInfo.id
    };
    const msg = await addOrder(orderInfo);
    if (msg.code !== 200) {
      alert(NETWORK_BUSY);
    } else {
      const {verifyCarts} = this.props.location.state;
      let itemCartIds = [];
      verifyCarts.map((cart) => {
        itemCartIds.push(cart.cartId);
        //itemCartIds.push(cart.itemCartId);
      });
      await clean(itemCartIds);
      let data = {
        message: '订单提交成功',
      };
      let path = {
        pathname: '/PaySuccess',
        state: data
      };
      this.props.history.push(path);
    }
  }

  /** 获取子组件状态 */
  getChildState = (addressId) => {
    this.setState({
      addressId:addressId,
    });
  }

  render() {
    const curUser = localStorage.getItem('curUser');
    const {verifyCarts, totalPrice, totalQuantity} = this.props.location.state;
    return (
      <div className="order-header">
        <div className="header-container">
          <a href="/"><img src="https://s01.mifile.cn/i/logo-footer.png?v2" alt=''/></a>
          <div className="text">确认订单</div>
          <div className="operation"><a href="/">{curUser}</a><span>|</span><a href={'/personal/orders/-1'}>我的订单</a>
          </div>
        </div>
        <div className="page-main">
          <div className="post-tips">
            <h4>春节期间发货公告</h4>
            1. 我们将尽力保障手机品类72小时内快速发货，电视、空调品类49个城市不打烊（2月2日-8日，详见电视频道公示）；<br/>
            2. 腊月二十八至正月初四（2月2日-8日）期间订单将于正月初七（2月11日）前完成发货；<br/>
            3. 电信米粉卡大年三十至正月初九（2月4日-13日）暂停发货，期间订单将于正月初十（2月14日）陆续发出。
          </div>
          <div className="checkout-box">
            <div className="section">

              <UForm func={this.getChildState}/>

              <div className="section-goods">
                <div className="section-header">
                  <h3 className="title">商品及优惠券</h3>
                  <div className="more">
                    <a href={'/cart'}>返回购物车 {'>'}</a>
                  </div>
                </div>

                <div className="goods-body">

                  {
                    verifyCarts.map((verifyCart, index) => (
                      <ul key={index} className="good-list">
                        <div className="good">
                          <li className="col-img">
                            <img src={verifyCart.itemImage} width='40' height='40' alt=""/>
                          </li>
                          <li className="col-name">
                            <a href="/">{verifyCart.itemSellPoint}</a>
                          </li>
                          <li className="col-price"> {verifyCart.price}x {verifyCart.quantity}</li>
                          <li className="col-total">{verifyCart.price * verifyCart.quantity}</li>
                        </div>
                      </ul>
                    ))
                  }
                </div>


              </div>
              <div className="section-options">
                <div className="section-header">
                  <h3 className="title">配送方式</h3>
                  <div className="shipment">包邮</div>
                </div>
              </div>
              <div className="section-invoice">
                <div className="section-header">
                  <h3 className="title">发票</h3>
                  <div className="invoice-result">
                    <span>电子发票</span>
                    <span>个人</span>
                    <span>商品明细</span>
                    <a href="/">修改{'>'}</a>
                  </div>
                </div>
              </div>
              <div className="section-count">
                <div className="money-box">
                  <ul>
                    <li>
                      <label>商品件数：</label>
                      <span className="val">{totalQuantity}件</span>
                    </li>
                    <li>
                      <label>商品总价：</label>
                      <span className="val">{totalPrice}元</span>
                    </li>
                    <li>
                      <label>运费：</label>
                      <span className="val">0元</span>
                    </li>
                    <li className="total-price">
                      <label>应付总额：</label>
                      <span className="val"><em>{totalPrice}</em>元</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="section-bar">
                <div className="fr">
                  <button onClick={VerifyOrder.handleAddOrder.bind(this, verifyCarts, totalPrice)} className="btn">去结算
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyOrder;