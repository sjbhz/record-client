import Axios from 'axios'
class HttpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }

  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }

  // 请求拦截
  interceptors (instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      (config) => {
        console.log('******************上送报文*****************')
        console.log(config)
        // const token = getToken();
        // const currentDomainId = getCurrentDomainId();
        // if (!config.url.includes("/users")) {
        //   config.headers["x-access-token"] = token;
        // }
        // if (token && token !== "undefined") {
        //   config.headers["Authorization"] = token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        // }
        // if (currentDomainId) {
        //   config.headers["CURRENT_DOMAIN_ID"] = currentDomainId;
        // }
        return config
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instance.interceptors.response.use(
      (res) => {
        const { data } = res
        console.log('******************返回报文*****************')
        console.log(data)
        return data
      },
      (error) => {
        // Message.error("服务内部错误");
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }

  // 创建实例
  create () {
    const conf = {
      baseURL: '/',
      timeout: 60 * 1000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }

  // 合并请求实例
  mergeReqest () {
    //
  }

  handleError (error) {
    return Promise.reject(error)
  }

  // 请求实例
  request (options) {
    const instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }

  get (url, params) {
    return this.request({ url, params, method: 'get' }).catch(this.handleError)
  }

  post (url, data) {
    return this.request({ url, data, method: 'post' }).catch(this.handleError)
  }

  put (url, data) {
    return this.request({ url, data, method: 'put' }).catch(this.handleError)
  }

  delete (url) {
    return this.request({ url, method: 'delete' }).catch(this.handleError)
  }
}

const http = new HttpRequest()
export default http
