import React, { Component } from 'react'
import { Row, Col } from 'antd'
import style from './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'

export default class index extends Component {
  state = {}
  UNSAFE_componentWillMount() {
    this.setState({
      userName: 'lynch',
    })

    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime())
      this.setState({
        sysTime,
      })
    }, 1000)

    this.getWeatherAPIData()
  }

  getWeatherAPIData() {
    let city = '310115'
    axios
      .jsonp({
        url:
          'https://restapi.amap.com/v3/weather/weatherInfo?key=dbb715a952c46de85997efd15067eb6d&city=' +
          city,
      })
      .then((res) => {
        if (res.status === 1) {
          let data = res.lives[0]
          this.setState({
            weather: data.weather,
          })
        }
      })
  }
  render() {
    return (
      <div className={style.header}>
        <Row className={style.header_top}>
          <Col span={24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className={style.breadcrumb}>
          <Col span={4} className={style.breadcrumb_title}>
            首页
          </Col>
          <Col span={20} className={style.weather}>
            <span className={style.date}>{this.state.sysTime}</span>

            <span className={style.weather_detail}>{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
