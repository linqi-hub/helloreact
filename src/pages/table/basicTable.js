import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import axios from './../../axios';
// import Utils from './../../utils/utils';

export default class BasicTable extends React.Component {
  state = { dataSource2: [] }
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
    data.map((item, index) => {
      item.key = index
    })
    this.setState({
      dataSource: data
    })
    this.request()
  }
  // 动态获取mock数据
  request = () => {
    axios.ajax({
      url: '/table/list',
      data: {
        params: {
          page: 1
        },
        isShowLoading: true
      }
    }).then((res) => {
      if (res.code == '0') {
        res.result.map((item, index) => {
          item.key = index
        })
        this.setState({
          dataSource2: res.result
        })
      }
    })
  }
  // 表格单选
  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName}, 用户爱好：${record.interest}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }
  // 表格复选
  // 多选执行删除操作
  handleDelete = (() => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item) => {
      ids.push(item.id)
    })
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request(); //重新刷新页面
      }
    })
  })

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
        dataIndex: 'sex',
        render (sex) {
          return sex == 1 ? '男' : '女'
        }
      }, {
        title: '状态',
        dataIndex: 'state',
        render (state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          }
          return config[state];
        }
      }, {
        title: '爱好',
        dataIndex: 'interest',
        render (interest) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          }
          return config[interest];
        }
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
    const selectedRowKeys = this.state.selectedRowKeys
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }

    // 表格复选
    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        // let ids = []
        // selectedRows.map((item) => {
        //    ids.push(item.id)
        // })
        this.setState({
          selectedRowKeys, //必需
          // selectedIds: ids,
          selectedRows
        })
      }
    }
    return (

      < div >
        <Card title="基础表格">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染-mock" style={{ margin: "10px 0" }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="mock-单选" style={{ margin: "10px 0" }}>
          <Table
            bordered
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }
              }
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
        <Card title="Mock-复选" style={{ margin: '10px 0' }}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                }  //点击行
              }
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>
      </div>
    );
  }
}


