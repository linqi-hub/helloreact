import React, { Component } from 'react';
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';
import style from './style/common.less'

import Header from './components/Header'




export default class Common extends Component {
  render () {
    return (
      <div>
        <Row className={style.container}>
          <Header menuType='second' />
        </Row>
        <Row className={style.container}>
          {this.props.children}
        </Row>
      </div>

    )
  }
}
