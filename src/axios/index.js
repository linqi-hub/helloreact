import axios from "axios";
import jsonp from "jsonp";
import { Modal } from 'antd'


export default class Axios {
  static jsonp (options) {
    return new Promise((resolve, reject) => {
      jsonp(options.url, {
        param: 'callback'
      }, function (err, response) {
        if (response.status == 1) {
          resolve(response)
        } else {
          reject(response.info)
        }
      })
    })
  }

  static ajax (options) {
    let loading;
    if (options.data && options.data.isShowLoading !== false) {
      loading = document.getElementById('ajaxLoading')
      loading.style.display = 'block';
    }


    let baseApi = 'https://www.fastmock.site/mock/0a55ab87c0a73fbe07ff463a4ae98772/react_antd'
    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        timeout: 5000,
        params: (options.data && options.data.params) || ''
      }).then((response) => {
        if (options.data && options.data.isShowLoading !== false) {
          loading = document.getElementById('ajaxLoading')
          loading.style.display = 'none';
        }
        if (response.status == '200') {
          let res = response.data;
          if (res.code == '0') {
            resolve(res);
          } else {
            Modal.info({
              title: "提示",
              content: res.msg
            })
          }
        } else {
          reject(response.data);
        }
      })
    })
  }

}