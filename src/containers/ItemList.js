import React, {Component} from 'react';
import MiddleBar from '../components/MiddleBar';
import '../styles/item.css';
import {Pagination} from 'antd';
import {addCart} from '../action/CartAction';
import {NETWORK_BUSY} from '../constants/Constants';
import Footer from '../components/Footer';
import {CartModel} from '../model/CartModel';
import {fetchItemList} from '../action/ItemAction';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: CartModel,
      fetching: true,
      page: 1,
      size: 30,
      total: 0
    };
  }

  componentDidMount() {
    this.loadData(this.props.location.state);
    console.log("this.props.location.state:",this.props.location.state);
  }

  loadData(searchValue){
     fetchItemList(searchValue,this.state.page,this.state.size)
      .then(itemListData => {
        this.setState({
          itemListData: itemListData.list,
          total: itemListData.total,
          fetching: false
        });
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

  render() {
    const {itemListData,fetching} = this.state;
    if(fetching){
      return null;
    }
      return (
        <div>
          <MiddleBar history={this.props.history} callback={(searchData) => {
            this.loadData(searchData);
          }}/>
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
          <div className="pageBar" style={{width:'100vw',textAlign:'center'}}>
            <Pagination pageSize={this.state.size}
                        current={this.state.page}
                        total={this.state.total}
                        onChange={(current, pageSize) => {
                          this.setState({
                            size: pageSize,
                            page: current
                          }, () => {
                            this.loadData(this.props.location.state);
                          });
                        }}/>
          </div>
          <Footer/>
        </div>
      );
    }
  //}
}

export default ItemList;
