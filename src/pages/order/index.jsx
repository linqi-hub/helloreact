import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Form,
  Select,
  Modal,
  message,
  DatePicker,
} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import style from './../../style/common.less'
const FormItem = Form.Item
const Option = Select.Option

export default class index extends Component {
  state = {
    orderInfo: {},
    orderConfirmVisible: false,
  }
  params = {
    page: 1,
  }
  componentDidMount() {
    this.requestList()
  }
  requestList = () => {
    let _this = this
    axios
      .ajax({
        url: '/order/list',
        data: {
          params: {
            page: this.params.page,
          },
        },
      })
      .then((res) => {
        if (res.code == 0) {
          let list = res.list.item_list.map((item, index) => {
            item.key = index
            return item
          })
          this.setState({
            list: list,
            selectRowKeys: [],
            pagination: Utils.pagination(res, (current) => {
              _this.params.page = current
              _this.requestList()
            }),
          })
        }
      })
  }
  // 订单结束确认
  handleConfirm = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束',
      })
      return
    }
    axios
      .ajax({
        url: '/order/ebike_info',
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code == 0) {
          this.setState({
            orderInfo: res.list,
            orderConfirmVisible: true,
          })
        }
      })
  }
  // 结束订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem
    axios
      .ajax({
        url: '/order/finish_order',
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code === 0) {
          message.success('订单结束成功')
          this.setState({
            orderConfirmVisible: false,
          })
          // 订单变化以后刷新一遍列表
          this.requestList()
        }
      })
  }
  onRowClick = (record, index) => {
    let selectKey = [index]
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record,
    })
  }
  //订单详情页
  openOrderDetail = () => {
    let item = this.state.selectedItem
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单',
      })
      return
    }
    // 通过新窗口打开
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn',
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn',
      },
      {
        title: '用户名',
        dataIndex: 'user_name',
      },
      {
        title: '手机号',
        dataIndex: 'mobile',
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance) {
          return distance / 1000 + 'Km'
        },
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time',
      },
      {
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '开始时间',
        dataIndex: 'start_time',
      },
      {
        title: '结束时间',
        dataIndex: 'end_time',
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee',
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay',
      },
    ]

    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 5 },
    }
    const rowSelection = {
      type: 'radio',
    }

    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.openOrderDetail}>
            订单详情
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={this.handleConfirm}
          >
            结束订单
          </Button>
        </Card>
        <div className={style.content_wrap}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                },
              }
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisible}
          onCancel={() => {
            this.setState({
              orderConfirmVisible: false,
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}
class FilterForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator('city_id')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="订单时间">
          {getFieldDecorator('start_time')(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem style={{ marginLeft: -10 }}>
          {getFieldDecorator('end_time')(
            <DatePicker
              style={{ marginLeft: 5 }}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          )}
        </FormItem>
        <FormItem label="订单状态">
          {getFieldDecorator('status')(
            <Select style={{ width: 80 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">进行中</Option>
              <Option value="2">结束行程</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: '0 5px' }}>
            查询
          </Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm)
