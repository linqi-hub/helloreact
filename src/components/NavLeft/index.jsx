import React, { Component } from 'react'
import style from './index.less'
import { Menu } from 'antd'
import MenuConfig from './../../config/menuConfig'
import { NavLink } from 'react-router-dom'

const SubMenu = Menu.SubMenu

export default class index extends Component {
  UNSAFE_componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig)
    this.setState({
      menuTreeNode,
    })
  }
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <div>
        <div className={style.logo}>
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>react</h1>
        </div>
        <Menu theme="dark">{this.state.menuTreeNode}</Menu>
      </div>
    )
  }
}
