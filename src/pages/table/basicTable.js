import React from 'react';
import { Card, Table } from 'antd';
import axios from './../../axios';

export default class BasicTable extends React.Component {
  state = {}
  componentDidMount () {
    const data = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      }, {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2010-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      }, {
        id: '1',
        userName: 'Lily',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2010-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '08:00'
      },
    ]
    this.setState({
      dataSource: data
    })
    this.request()
  }
  request = () => {
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: 1
        }
      }
    }).then((res) => {
      if (res.code == '0') {
        this.setState({
          dataSource2: res.result
        })
      }
    })
  }
  render () {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      }, {
        title: '用户名',
        dataIndex: 'userName'
      }, {
        title: '性别',
        dataIndex: 'sex'
      }, {
        title: '状态',
        dataIndex: 'state'
      }, {
        title: '爱好',
        dataIndex: 'interest'
      }, {
        title: '生日',
        dataIndex: 'birthday'
      }, {
        title: '地址',
        dataIndex: 'address'
      }, {
        title: '早起时间',
        dataIndex: 'time'
      }
    ]
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格" style={{ margin: "10px 0" }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}


