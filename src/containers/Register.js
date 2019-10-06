import React, {Component} from 'react';
import '../styles/register.css';
import {fetchRegister} from '../action/RegisterAction';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: ''
    };
  }

  handleChange = name => event => {
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  async handleSubmit(e) {
     e.preventDefault();
    const flag = await fetchRegister(this.state);
    if (flag) {
      window.location.href = '/login';
    } else {
      alert('注册失败,请重试');
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className="contain">
          <div className="register">
            <div className="logo"/>
            <div className="register-mode" id="register-mode">
              <a href='/' id="account-register" className="color">
               注册账号
              </a>
            </div>
            <div id="list">
              <div id='account-area'>
                {/*<form id="form1">*/}
                <input type="text" placeholder="邮箱" id="email" onChange={this.handleChange('email')}/>
                <input type="text" placeholder="用户名" id="username" onChange={this.handleChange('username')}/>
                <input type="password" placeholder="密码" id="password" onChange={this.handleChange('password')}/>
                <div className="err_tip" style={{display: 'none'}}>
                  <div>
                    <em className="icon_error">
                    </em>
                    <span className="error-con">用户名不正确</span>
                  </div>
                </div>
                <div className="err_tip" style={{display: 'none'}}>
                  <div>
                    <em className="icon_error">
                    </em>
                    <span className="error-con">密码不正确</span>
                  </div>
                </div>
                <button onClick={this.handleSubmit.bind(this)} className="register-btn">立即注册</button>
                <div className="others">
                  <div className="RegisterAndForget">
                    <a href="/">已阅读并同意：小米 用户协议和 隐私政策</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <p className="sub-nav">
            <ul className="lang-select-list">
              <li><a href="/">简体</a><span>|</span></li>
              <li><a href="/">繁体</a><span>|</span></li>
              <li><a href="/">English</a><span>|</span></li>
              <li><a href="/">FAQ</a><span>|</span></li>
              <li><a href="/">Privacy Policy</a></li>
            </ul>
          </p>
          <p className="copyright">
            Xiaomi Inc., All rights reserved - Beijing ICP - 10046444 -
            <a href="/">
              <span>
                <img
                  src={'https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png'}
                  alt=''/></span>Beijing Public Security ICP-11010802020134</a> - Beijing ICP licence No. - 110507
          </p>
        </div>
      </div>
    );
  }
}

export default Register;
