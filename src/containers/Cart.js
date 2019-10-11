import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/cart.css';
import $ from 'jquery';
import Footer from '../components/Footer';
import {deleteCart, fetchCartByUserName, updateCart} from '../action/CartAction';
import {NETWORK_BUSY} from '../constants/Constants';
import {CartModel} from '../model/CartModel';
import {fetchRecommendItems} from '../action/EsAction';
import {addCart} from '../action/CartAction';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curUser: localStorage.getItem('curUser'),
      carts: [CartModel],
      cart: CartModel,
      count: 0,
      totalPrice: 0,
      fetching: true,
      multiChecked: false,
      recommendItems: []
    };
  }

  async componentDidMount() {
    const {curUser} = this.state;
    const cartsData = await fetchCartByUserName(curUser);
    const itemIds = cartsData.map(cart => cart.itemId);
    let msg = await fetchRecommendItems(itemIds, 10);
    this.setState({
      carts: cartsData,
      fetching: false,
      recommendItems: msg.data
    });
    $('#goCheckout').attr({
      'disabled': 'disabled',
    });
  }

  async handleAddItemToCart(item) {
    let cart = this.state.cart;
    cart.quantity = 1;
    cart.itemId = item.id;
    cart.price = item.price;
    cart.username = localStorage.getItem('curUser');
    cart.itemImage = item.image;
    cart.itemSellPoint = item.sellPoint;
    cart.itemName = item.name;
    const rep = await addCart(cart);
    if (rep.code === 200) {
      //   跳转到添加到购物车成功页面页面
      // alert('将商品添加到购物车成功');
      let data = {
        message: '添加到购物车成功',
        details: `${cart.itemName}.${cart.itemSellPoint}`
      };
      let path = {
        pathname: '/success',
        state: data
      };
      this.props.history.push(path);
    } else {
      alert(NETWORK_BUSY);
    }
  }


  //处理input标签的变化
  handleChange = (operation, index) => event => {
    let carts = [...this.state.carts];
    let quantity = carts[index].quantity;
    let {totalPrice} = this.state;
    if (operation === 'add') {
      if (++quantity > 10) {
        alert('超过最大的限制');
      } else {
        carts[index].quantity = quantity;
        if (carts[index].checked) {
          totalPrice += carts[index].price;
        }
      }
    } else {
      if (--quantity < 0) {
        alert('数量不能小于0');
      } else {
        carts[index].quantity = quantity;
        if (carts[index].checked) {
          totalPrice -= carts[index].price;
        }
      }
    }
    this.setState({
      carts,
      totalPrice
    });
  };


  handleCheckbox = (operation, index) => (event) => {
    let totalPrice = this.state.totalPrice;
    if (operation === 'single') {
      let {count} = this.state;
      let carts = [...this.state.carts];
      carts[index].checked = !carts[index].checked;
      if (carts[index].checked) {
        this.setState({
          carts,
          count: count + 1,
          totalPrice: totalPrice + carts[index].price * carts[index].quantity
        });
      } else {
        this.setState({
          carts,
          count: count - 1,
          totalPrice: totalPrice === 0 ? 0 : totalPrice - carts[index].price * carts[index].quantity,
          multiChecked: false
        });
      }
    } else if (operation === 'multi') {
      let carts = [...this.state.carts];
      const multiChecked = !this.state.multiChecked;
      if (multiChecked) {
        let price = 0;
        carts.forEach((cart) => {
          cart.checked = true;
          price += cart.price * cart.quantity;
        });
        this.setState({
          carts,
          count: carts.length,
          totalPrice: price,
          multiChecked
        });
      } else {
        carts.forEach((cart) => {
          cart.checked = false;
        });
        this.setState({
          carts,
          count: 0,
          totalPrice: 0,
          multiChecked
        });

      }
    }
    let carts = [...this.state.carts];
    let count = 0;
    const ck = $('#goCheckout');
    carts.forEach((cart) => {
      if (cart.checked) {
        count = count + 1;
      }
    });
    if (count === carts.length) {
      this.setState({
        multiChecked: true
      });
    }
    if (count !== 0) {
      ck.removeAttr('disabled');
      ck.css({
        'background': '#ff6700',
        'border-color': '#ff6700',
        'color': '#fff'
      });
    }
    if (count === 0) {
      ck.attr({'disabled': 'disabled'});
      ck.css({
        'background': '#e0e0e0',
        'border-color': '#e0e0e0',
        'color': '#b0b0b0'
      });
    }
  };


  async handleDelete(itemCartId) {
    const {curUser} = this.state;
    let carts = [...this.state.carts];
    const rep = await deleteCart(curUser, itemCartId);
    console.log('rep',rep);
    if (rep.code === 200) {
      console.log('rep.code',rep.code);
      carts.splice(carts.findIndex(cart => cart.cartId === itemCartId), 1);
      this.setState({
        carts
      });
    } else {
      alert(NETWORK_BUSY);
    }
  }

  async handleUpdate(itemId, quantity) {
    const {curUser} = this.state;
    const rep = await updateCart(curUser, itemId, quantity);
    if (rep.code !== 200) {
      alert(NETWORK_BUSY);
    }
  }

  handleVerifyOrder = () => {
    const {carts, totalPrice} = this.state;
    let verifyCarts = carts.filter((cart) => cart.checked);
    let totalQuantity = 0;
    verifyCarts.map((verifyCart) => (totalQuantity += verifyCart.quantity));
    let path = {
      pathname: '/verify/order',
      state: {verifyCarts, totalPrice, totalQuantity}
    };
    this.props.history.push(path);
  };

  render() {
    const {curUser, carts, count, totalPrice, fetching, multiChecked, recommendItems} = this.state;
    if (fetching) {
      return null;
    }
    return (
      <div>
        <div>
          <div className="cart-header">
            <div className="header-container">
              <a href="/"><img src="https://s01.mifile.cn/i/logo-footer.png?v2" alt=''/></a>
              <div className="text">我的购物车</div>
              <div className="operation">
                {curUser === null ?
                  <div>
                    <Link to="/login">登录</Link>
                    <span>|</span>
                    <a href="/">注册</a>
                  </div> :
                  <div>
                    <Link to="/personal">{curUser}</Link>
                    <span>|</span>
                    <Link to="/">注销</Link>
                  </div>
                }

              </div>
            </div>
          </div>
        </div>

        {
          carts.length === 0 ?
            <div className="cart-empty">
              <h2>您的购物车还是空的!</h2>
              {
                curUser == null ?
                  <span>
                    <p className="login-desc">登录后将显示您之前加入的商品</p>
                    <a className="btn-login" href="/">立即登录</a>
                  </span> :
                  null
              }
              <a className="btn-shopping" href="/">马上去购物</a>
            </div>
            :
            <div className="cart-box">
              <div className="cart-goods-list">
                <div className="list-head">
                  <div className="col-check">
                    <input type="checkbox" className="checkbox" checked={multiChecked}
                           onChange={this.handleCheckbox('multi', 0)}
                           id="selectAll"/>
                    <span className="selectall">全选</span>
                  </div>
                  <div className="col-img"/>
                  <div className="col-name">商品名称</div>
                  <div className="col-price">单价</div>
                  <div className="col-num">数量</div>
                  <div className="col-total">小计</div>
                  <div className="col-action">操作</div>
                </div>
                <div id="list-body">
                  {
                    carts.map((cart, index) => (
                      <div key={index} className="item-box">
                        <div className="col-check">
                          <input type="checkbox" className="itemcheck" checked={cart.checked}
                                 onChange={this.handleCheckbox('single', index)}/>
                        </div>
                        <div className="col-img">
                          <a href="/">
                            <img width='80px' height='80px' src={cart.itemImage} alt=""/>
                          </a>
                        </div>
                        <div className="col-name">
                          <a href="/">{cart.itemName}</a>
                        </div>
                        <div className="col-price"> {cart.price}元</div>
                        <div className="col-num">
                          <div className="change-goods-num">
                            <button value="-" onBlurCapture={this.handleUpdate.bind(this, cart.itemId, cart.quantity)}
                                    onClick={this.handleChange('reduce', index)}>-
                            </button>
                            <input type="text" className="num" id='num' onChange={this.handleChange}
                                   value={cart.quantity}/>
                            <button value="+" onBlurCapture={this.handleUpdate.bind(this, cart.itemId, cart.quantity)}
                                    onClick={this.handleChange('add', index)}>+
                            </button>
                          </div>
                        </div>
                        {/*需要动态变更*/}
                        <div className="col-total"> {cart.price * cart.quantity}元</div>
                        <div className="col-action">
                          <p className="delete"
                             onClick={this.handleDelete.bind(this, cart.cartId, cart.quantity)}>×</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="cart-bar">
                <div className="section-left">
                  <a href="/" className="back-shopping">继续购物</a>
                  <span className="cart-total">共<i id="cartTotalNum">{carts.length}</i> 件商品，已选择 <i
                    id="selTotalNum">{count}</i> 件</span>
                </div>
                <div className="section-right">
                  <div className="total-price">合计：
                    <em id="cartTotalPrice">{totalPrice}</em>
                    元
                    <button onClick={this.handleVerifyOrder} className="cart-btn-primary" id="goCheckout">去结算</button>
                  </div>
                </div>
              </div>
            </div>
        }
        <h2 className="recommend-title">
          <span>为您推荐</span>
        </h2>
        <div className="recommend">
          <ul >
          {
            recommendItems && recommendItems.map((item, index) => (
                <li key={index} className="recommend-list">
                  <dl>
                    <dt>
                      <a href={`/item/${item.id}`}>
                        <img src={item.image} alt=""/>
                      </a>
                    </dt>
                    <dd className="recommend-name">
                      <a href="/"> {item.name}</a>
                    </dd>
                    <dd className="recommend-price">{item.price}元</dd>
                    <dd className="addToCar"><a onClick={this.handleAddItemToCart.bind(this, item)}>加入购物车</a></dd>
                  </dl>
                </li>
            ))
          }
          </ul>
          {/*          <ul>
            <li className="recommend-list">
              <dl>
                <dt>
                  <a href="/">
                    <img src="https://i1.mifile.cn/a1/pms_1543975478.91979978!140x140.jpg" alt=""/>
                  </a>
                </dt>
                <dd className="recommend-name">
                  <a href="/"> 小米米家智能插座WiFi版 </a>
                </dd>
                <dd className="recommend-price">49元</dd>
                <dd className="recommend-tips">665人好评</dd>
                <dd className="addToCar"><a href="/">加入购物车</a></dd>
              </dl>
            </li>
          </ul>*/}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Cart;
