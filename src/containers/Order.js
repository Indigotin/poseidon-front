import React, {Component} from 'react';
import {OrderModel} from '../model/OrderModel';
import {fetchByBuyerId} from '../action/OrderAction';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [OrderModel],
      curPage: 1,
      pages: null,
      fetching: true,
      op: -1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log(this.state);
    if (nextProps.match.params.op !== this.props.match.params.op) {
      const buyerId = localStorage.getItem('buyerId');
      let msg = await fetchByBuyerId(buyerId, nextProps.match.params.op, this.state.curPage, 3);
      if (msg.code === 200) {
        console.log('msg.data.list ',msg.data.list);
        this.setState({
          orders: msg.data.list,
          curPage: msg.data.current,
          pages: msg.data.pages,
          fetching: false,
        });
      } else {
        alert('网络错误');
      }
    }
  }

  async componentDidMount() {
    const buyerId = localStorage.getItem('buyerId');
    const {op, curPage} = this.state;
    let msg = await fetchByBuyerId(buyerId, op, curPage, 3);
    if (msg.code === 200) {
      console.log('msg.data.list ',msg.data.list);
      this.setState({
        orders: msg.data.list,
        curPage: msg.data.pageNum,
        pages: msg.data.total,
        fetching: false,
      });
    } else {
      alert('网络错误');
    }
  }

  handleChange = (operation, cur) => async event => {

    const {pages, op} = this.state;
    const buyerId = localStorage.getItem('buyerId');
    if (operation === 'add' && cur < pages) {
      cur++;
    } else if (operation === 'reduce' && cur > 1) {
      cur--;
    }
    this.setState({
      curPage: cur
    });
    let msg = await fetchByBuyerId(buyerId, op, cur, 3);
    /*msg.then(data => {
      if(data.code === 200) {
        console.log(data);
        this.setState({
          orders: data.data.list,
          curPage: data.data.pageNum,
        });
      }else {
        alert('网络错误');
      }
    });*/
    if (msg.code === 200) {
      this.setState({
        orders: msg.data.list,
        curPage: msg.data.pageNum,
      });
    } else {
      alert('网络错误');
    }
  };

  render() {
    const {orders, fetching, curPage} = this.state;
    console.log('orders',orders);
    if (fetching) {
      return null;
    }
    if (orders.length === 0) {
      return <div><p className="empty">当前没有相关订单信息。</p></div>;
    }
    return (
      <div>
        {
          orders.map((order, index) => (
            <div key={index} className="order-detail">
              <div className="order-type">
                <p className="title">
                  {
                    order.status === 0 ? '等待付款' : order.status === 1 ? '待收货' : '已关闭'
                  }
                </p>
                <div className="info">
                  <p>{order.paymentTime}<span className="sep">|</span> {order.username}<span className="sep"><span
                    className="sep">|</span></span> 订单号：{order.id}<span className="sep">|</span> 在线支付 </p>
                  {
                    order.status === 0 ?
                      <p>应付金额：<span
                        className="price">{order.payment}</span>元
                      </p> :
                      <p>支付金额：<span
                        className="price">{order.payment}</span>元
                      </p>
                  }
                </div>
              </div>
              <div className="order-item">
                <div>
                  {
                    order.orderItemList.map((orderItem, index) => (
                      <div key={index} className="image">
                        <div>
                          <a href="/">
                            <img src={orderItem.itemImage} width="80"
                                 height="80" alt={orderItem.itemName}/>
                          </a>
                        </div>
                        <div className="name">
                          <a href="/">{orderItem.itemName}</a>
                          <p className="price"> {orderItem.itemPrice}元 × {orderItem.itemNum} </p>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="action">
                  {
                    order.status === 0 ?
                      <a className="btn btn-small btn-primary" href={'/personal/orders/-1'}>立即支付</a>
                      :
                      null
                  }
                  <a className="btn btn-small btn-line-gray" href="/">订单详情</a>
                </div>
              </div>
            </div>
          ))
        }
        <div className="pages">
          <span className="numbers first"><span className="pages-iconfont"
                                                onClick={this.handleChange('reduce', curPage)}>{'<'}</span></span>
          <span className="numbers current">{curPage}</span>
          <span className="numbers last"><span className="pages-iconfont"
                                               onClick={this.handleChange('add', curPage)}>{'>'}</span></span>
        </div>
      </div>
    );
  }
}

export default Order;