import React, {Component} from 'react';
import MiddleBar2 from '../components/MiddleBar';
import '../styles/item.css';
import {fetchItem} from '../action/ItemAction';
import {CartModel} from '../model/CartModel';
import {addCart} from '../action/CartAction';
import {NETWORK_BUSY} from '../constants/Constants';
import {ItemModel} from '../model/ItemModel';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: ItemModel,
      fetching: true,
      cart: CartModel,
      curUser: localStorage.getItem('curUser')
    };
  }

  async componentDidMount() {
    console.log(this.props.match);
    let id = this.props.match.params.itemId;
    const itemData = await fetchItem(id);
    console.log(itemData)
    this.setState({
      item: itemData,
      fetching: false
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
    console.log('rep',rep);
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

  render() {
    const {item, fetching, curUser} = this.state;
    console.log(item)
    if (fetching) {
      return null;
    } else {
      return (
        <div>
          <MiddleBar2 history={this.props.history}/>
          <div>
            <div className="product-box">
              <div className="nav-bar">
                <div className="product-container">
                  <h2>{item.name}</h2>
                  <div className="right">
                    <a href="/">概述</a>
                    <span className="separator">|</span>
                    <a href="/">参数</a>
                    <span className="separator">|</span>
                    <a href="/">图集</a>
                    <span className="separator">|</span>
                    <a href="/" target="_blank">F码通道</a>
                    <span className="separator">|</span>
                    <a href="/">用户评价</a>
                  </div>
                </div>
              </div>
            </div>
            {curUser === null ?
              <div className="please-login">
                为方便您购买，请提前登录
                <a href="/">立即登录</a>
                <a href="/" className="iconfont">×</a>
              </div> :
              <div/>
            }

            <div className="pro-choose-main">
              <div className="pro-view">
                <img style={{width: '100%', height: '100%'}}
                     src={item.image} alt=''/>
              </div>
              <div className="pro-info">
                <h1>{item.name}</h1>
                <p className="sale-desc">{item.sellPoint}</p>
                <div className="pro-main">
                  <p className="aftersale-company">小米自营</p>
                  <p className="pro-price">{item.price}元 </p>
                  <div className="sale-wrap">
                    <span className="flow-tag">赠品</span>
                    <span className="flow-name">赠米粉卡，最高含100元话费</span>
                  </div>
                  <div className="address-wrap">
                    <div className="user-default-address">
                      <div>
                        <div className="address-info">
                          <span className="item">北京</span><span className="item">北京市</span><span
                          className="item">东城区</span><span className="item">永定门外街道</span>
                        </div>
                        <span className="switch-choose-regions"> 修改 </span>
                      </div>
                      <div className="product-status">有现货</div>
                    </div>
                  </div>
                  <div className="list-wrap">
                    {/*<div className="pro-choose">
                      <div className="step-title">选择版本</div>
                      <ul>
                        <li>
                          <a href="/"> <span className="name">6GB+128GB </span>
                            <span className="price"> 3299元 </span> </a>
                        </li>
                        <li>
                          <a href="/"> <span className="name">8GB+128GB </span>
                            <span className="price"> 3599元 </span> </a>
                        </li>
                        <li>
                          <a href="/"> <span className="name">8GB+256GB </span>
                            <span className="price"> 3999元 </span> </a>
                        </li>
                      </ul>
                      <div className="clear"/>
                    </div>*/}
                    {/*<div className="pro-choose">
                      <div className="step-title">选择颜色</div>
                      <ul>
                        <li>
                          <a href="/"> 黑色 </a>
                        </li>
                      </ul>
                      <div className="clear"/>
                    </div>*/}
                    {/*<div className="pro-choose-prot">
                      <div className="step-title ">选择小米提供的意外保护
                        <a href="/" target="_blank" className="step-pro">了解意外保护 {'>'}</a>
                      </div>
                      <ul className="protect">
                        <li>
                          <div>
                            <span className="name"> 意外保障服务   </span>
                            <p className="desc">手机意外摔落/进水/碾压等损坏</p>
                            <p className="agreement">
                              我已阅读
                              <a href="/" target="_blank">
                                服务条款
                                <span>|</span></a>
                              <a href="/" target="_blank">
                                常见问题
                              </a>
                            </p>  <span className="price">  299元  </span>
                          </div>
                        </li>
                        <li>
                          <div>
                            <span className="name"> 碎屏保障服务   </span>
                            <p className="desc">手机意外碎屏</p>
                            <p className="agreement">
                              我已阅读
                              <a href="/" target="_blank">
                                服务条款
                                <span>|</span></a>
                              <a href="/" target="_blank">
                                常见问题
                              </a>
                            </p>  <span className="price">  159元  </span>
                          </div>
                        </li>
                      </ul>
                    </div>*/}
                    {/*<div className="pro-choose-prot">
                      <div className="step-title ">选择小米提供的延长保修
                        <a href="/" target="_blank" className="step-pro">{'了解延长保修'} </a>
                      </div>
                      <ul className="protect">
                        <li>
                          <div>
                            <span className="name"> 延长保修服务   </span>
                            <p className="desc">厂保延一年，性能故障免费维修</p>
                            <p className="agreement">
                              我已阅读
                              <a href="/" target="_blank">
                                服务条款
                                <span>|</span></a>
                              <a href="/" target="_blank">
                                常见问题
                              </a>
                            </p>  <span className="price">  99元  </span>
                          </div>
                        </li>
                      </ul>
                    </div>*/}
                    <div className="pro-list">
                      <ul>
                        <li>{item.name} <span>{item.price}元 </span></li>
                        <li className="totlePrice"> 总计 ：{item.price}</li>
                      </ul>
                    </div>
                    <ul className="btn-wrap clear">
                      <li>
                        <button onClick={this.handleAddItemToCart.bind(this, item)} className="btn">加入购物车</button>
                      </li>
                      <li>
                        <a href="/" className="btn-gray btn-like ">
                          喜欢
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="clear"/>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Item;
