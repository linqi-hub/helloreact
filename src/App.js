import React, { Component } from 'react';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import style from './style/common.less'
import NavLeft from './components/NavLeft'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/home'


export default class App extends Component {
  render () {
    return (
      <div>

        <Row className={style.container}>
          <Col span={4} className={style.nav_left}>
            <NavLeft />
          </Col>
          <Col span={20} className={style.main}>
            <Header />
            <Row className={style.content}>
              <Home />
              {/* {this.props.children} */}
            </Row>
            <Footer />
          </Col>
        </Row>

      </div>
    )
  }
}
