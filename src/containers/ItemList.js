import React, {Component} from 'react';
import MiddleBar2 from '../components/MiddleBar';
import '../styles/item.css';
//import {fetchItem} from '../action/ItemAction';
//import {ItemModel} from '../model/ItemModel';
import {addCart} from '../action/CartAction';
import {NETWORK_BUSY} from '../constants/Constants';
import Footer from '../components/Footer';
import {CartModel} from '../model/CartModel';

class ItemList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      //fetching: true,
      cart: CartModel
      //curUser: localStorage.getItem('curUser')
    };
  }

  /*async componentDidMount() {
    //let id = this.props.match.params.itemId;
    //const itemData = await fetchItem(id);
    this.setState({
      item: itemData,
      fetching: false
    });
  }*/

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

  render() {
    //const {fetching} = this.state;
    const itemListData = this.props.location.state;
    console.log('history',this.props.history);
    console.log('itemListData',itemListData);
    //if (fetching) {
    //  return null;
   // } else {
      return (
        <div>
          <MiddleBar2 history={this.props.history}/>
          <div className="recommend">
            <ul >
              {
                itemListData && itemListData.map((item, index) => (
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
          </div>
          <Footer/>
        </div>
      );
    }
  //}
}

export default ItemList;
