import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../styles/carousel.css';
import {Carousel} from 'antd';

class Carousels extends Component {
  render() {
    return (

        <Carousel effect="fade" autoplay>
          <div><Link to="/detail"><img src="https://i1.mifile.cn/a4/xmad_15421940322083_jTrLz.jpg" width="100%"
                                       height="100%" alt=''/></Link></div>
          <div><Link to="/detail"><img src="https://i1.mifile.cn/a4/xmad_15402884393036_KqnCH.jpg" width="100%"
                                       height="100%" alt=''/></Link></div>
          <div><Link to="/detail"><img src="https://i1.mifile.cn/a4/xmad_15419444592813_JwZlv.jpg" width="100%"
                                       height="100%" alt=''/></Link></div>
          <div><Link to="/detail"><img src="https://i1.mifile.cn/a4/xmad_15421097162568_oYvdj.jpg" width="100%"
                                       height="100%" alt=''/></Link></div>
          <div><Link to="/detail"><img src="https://i1.mifile.cn/a4/xmad_15369176983433_sWNIg.jpg" width="100%"
                                       height="100%" alt=''/></Link></div>
        </Carousel>

    );
  }
}

export default Carousels;