/* eslint-disable quotes */
/* eslint-disable no-console */
import React, { Component } from 'react';
import '../styles/middlebar.css';
import { fetchNavCategoriesWithItems } from '../action/CategoryAction';
import $ from 'jquery';
import { ItemCartModel } from '../model/ItemCatModel';
import { ItemModel } from '../model/ItemModel';
import search from '../img/search.png';
import { Select } from 'antd';
import Search from 'antd/lib/transfer/search';

const { Option } = Select;

class MiddleBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesDto: ItemCartModel,
      items: [ItemModel],
      fetching: true,
      searchData: [
        {
          key: '小米6X',
          desc: '还剩6件'
        },

        {
          key: '小米6X1',
          desc: '还剩6件'
        },
        {
          key: '小米6X2',
          desc: '还剩6件'
        },

        {
          key: '小米6X3',
          desc: '还剩6件'
        }
      ]
    };
  }

  async componentDidMount() {
    const categoryDtoData = await fetchNavCategoriesWithItems(10, 6);
    this.setState({
      categoriesDto: categoryDtoData,
      fetching: false,
      searchListShow: false,
      searchHover: false,
      navShowState: 0
    });

    const List = $('#middle-nav-list');

    $('#list3>.item-list').hover(function () {
      List.css('display', 'block');
    }, function () {
      List.css('display', 'none');
      List.hover(function () {
        List.css('display', 'block');
      }, function () {
        List.css('display', 'none');
      });
    });

    $('#search').focus(function () {
      $('#serch-item').css('display', 'block');
      $('#search').css({
        'color': '#333333',
        'outline': 'none',
        'border': '1px darkorange solid'
      });
      $('#serch-icon').css('border-color', 'darkorange');
    });

    $('#search').blur(function () {
      setTimeout(function () {
        $('#serch-item').css('display', 'none');
        $('#search').css('border-color', '#c9c9c9');
        $('#serch-icon').css('border-color', '#c9c9c9');
      }, 500);

    });


  }


  handleChange = (index) => (event) => {
    event.stopPropagation();
    const { categoriesDto } = this.state;
    let items = categoriesDto[index].items;
    this.setState({
      items,
      navShowState: 1
    });
  };


  render() {
    const state = this.state;
    const { categoriesDto, items, fetching, searchData } = this.state;
    if (fetching) {
      return null;
    }
    return (
      <div style={{ backgroundColor: '#fafafa' }} className='full-width xy-center'>
        <div className='i-xy-between jf-start' style={{ width: '1226px' }}>
          <div className="site-middlebar i-xy-between full-width">
            <div className='i-xy-between'>
              <a href="/"><img className="logo-icon" src="https://s01.mifile.cn/i/logo-footer.png?v2" alt='' /></a>
              <div className='list3 i-xy-center' onMouseLeave={(e) => {
                if (state.navShowState === 1) {
                  this.setState({
                    navShowState: 0
                  });
                }
              }}>
                {
                  categoriesDto && categoriesDto.map((categoryData, index) => (
                    <a href='/' key={index} onMouseOver={this.handleChange(index)}>{categoryData.name}</a>
                  ))
                }
              </div>
            </div>
            <div id="middle-nav">

              <div className="i-xy-center search-box">

                <input type="text" defaultValue="" className={state.searchHover ? 'search-input search-hover' : 'search-input'}
                  onFocus={() => {
                    this.setState({
                      searchListShow: true,
                      searchHover: true
                    });
                  }} onBlur={
                    () => {
                      setTimeout(() => {
                        this.setState({
                          searchListShow: false,
                          searchHover: false
                        });
                      }, 200);
                    }
                  } />
                {
                  <div className="serch-item" style={{ zIndex: state.searchListShow ? '1' : '-2' }}>
                    {
                      searchData.map(data => {
                        return <a href="/" key={data.key}><p className="name">{data.key}</p><p className="count">{data.desc}</p></a>;
                      })
                    }
                  </div>
                }
                <button className={state.searchHover ? 'serch-icon search-hover' : 'serch-icon'} >
                  <img src={search} alt="" />
                </button>
              </div>
            </div>
          </div>


          {
            state.navShowState > 0 ? <div id="middle-nav-list" className='i-xy-center'
              onMouseEnter={
                () => {
                  this.setState({
                    navShowState: 2
                  });
                }
              }
              onMouseLeave={
                (e) => {
                  if (state.navShowState === 2) {
                    this.setState({
                      navShowState: 0
                    });
                  }
                }
              }
            >
              <div className="list-container" >
                {/*最多6条数据*/}
                <ul className="main-list">
                  {
                    items.map((item, index) => (
                      <div key={index} className="itemBox">
                        <li>
                          <div className="new"> 新品</div>
                          {/*如果不是新品*/}
                          {/*<div className='not-new></div>'*/}
                          <a href={`/item/${item.id}`}>
                            <img src={item.image} alt={item.name} width="160"
                              height="110" />
                          </a>
                          <p className="name">{item.name}</p>
                          <p className="price">{item.price}</p>
                        </li>
                      </div>
                    ))
                  }
                </ul>
              </div>
            </div> : ''
          }
        </div>
      </div>
    );
  }
}

export default MiddleBar;
