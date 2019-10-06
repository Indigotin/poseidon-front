import React, {Component} from 'react';
import '../styles/checkOrder.css';

import axios from 'axios';
import Mock from 'mockjs';
//import moment from 'moment';
import $ from 'jquery';

import address from '../request/address.json';
import CollectionCreateForm from './CustomizedForm';
import {fetchAddByUserName} from '../action/AddressAction';
import {addAddress} from '../action/AddressAction';


const options = [];
Mock.mock('/address', address);

export default class UForm extends Component {
        constructor(props) {
          super(props);
          this.state = {
            userName: '',
            address: '',
            addresses: [],
            timeRange: '',
            visible: false, //新建窗口隐藏
            dataSource: [],
            selectedRowKeys: [],
            tableRowKey: 0,
            loading: true,
            fetching: true,
          };
          //this.handleClick = this.handleClick.bind(this);
    }

    //渲染
    componentDidMount() {
        axios.get('/address')
            .then(function (response) {
                response.data.map(function (province) {
                    options.push({
                        value: province.name,
                        label: province.name,
                        children: province.city.map(function (city) {
                            return {
                                value: city.name,
                                label: city.name,
                                children: city.area.map(function (area) {
                                    return {
                                        value: area,
                                        label: area,
                                    };
                                })
                            };
                        }),
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            });

      let curUser = localStorage.getItem('curUser');
      let addressData = fetchAddByUserName(curUser);
      //addressData = [addressData];
      addressData.then(data=> {
        console.log('addressData f6  ',data.data);
        this.setState({
          addresses: data.data,
          fetching: false
        });
      });
    }

    //新建信息弹窗
    CreateItem = () => {
        this.setState({
            visible: true,
        });
        const form = this.form;
        form.resetFields();
    };
    //接受新建表单数据
    saveFormRef = (form) => {
        this.form = form;
    };


    //填充表格行
    handleCreate = () => {
        const {dataSource} = this.state;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            /*let address='';
            if (values.addressTag === undefined){
                address = values.name + '/' + values.phone + '/' + values.address.join('-') + '/' + values.detailAddress + '/' + values.postalcode;
            } else {
                address = values.name + '/' + values.phone + '/' + values.address.join('-') + '/' + values.detailAddress + '/' + values.postalcode + '/' + values.addressTag;
            }*/

            $('#new-address').css('display', 'block');
            //$('#add-address').css('display', 'none');

            values.address = values.address.join(' / ');
            //values.createtime = moment().format('YYYY-MM-DD hh:mm:ss');

          let curUser = localStorage.getItem('curUser');
          const flag = addAddress(values,curUser);
          const addressData = fetchAddByUserName(curUser);
          if(flag){
            addressData.then(data=> {
              console.log('addressData add  ',data.data);
              this.setState({
                addresses: data.data,
                fetching: false
              });
            });
          }

          form.resetFields();
          this.setState({
              visible: false,
              dataSource: [...dataSource, values],
              address
          });
      });
    };
    //取消
    handleCancel = () => {
        this.setState({visible: false});
    };

    /*handleClick(addressId){
      const element = document.getElementById(addressId);
      element.style
    }*/
    render() {
      const {addresses,fetching,visible} = this.state;
      console.log('addresses  ',addresses);
      if (fetching) {
        return null;
      }else{
        return (
            <div>
                <div className="section-address" onClick={this.CreateItem}>
                    <div className="section-header">
                        <h3 className="title">收货地址</h3>
                    </div>
                    <div className="address-body" id="add-address">
                        <div className="address-item">
                            <p className="iconfont">+</p>
                            添加新地址
                        </div>
                    </div>

                    <div className="address-body">
                      {
                        addresses.map(add=>
                          <div key={add.id} className="address-item" >
                            <p>{add.name}<br/>{add.phone}<br/>{add.address},{add.detailAddress}<br/>{add.postalCode}<br/>{add.addressTag}</p><br/>
                          </div>
                        )}
                    </div>
                </div>
                <CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel}
                                        onCreate={this.handleCreate} title="新建信息" okText="创建"/>
            </div>
        );


      }
    }
}