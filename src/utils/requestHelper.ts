//对axios二次封装
import axios from 'axios'
//引入element-plus
import { ElMessage } from 'element-plus'

// 1.创建axios实例,进行基础配置
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})
//2.给request实例添加请求与响应拦截器
//发请求时,就会触发这个拦截器,执行拦截器中的方法
request.interceptors.request.use((config) => {
  //config对象有headers属性,经常给服务器(后端)携带公共参数
  return config //拦截器中的方法必须返回config
})
//3.响应拦截器
request.interceptors.response.use(
  (response) => {
    //成功的回调函数,服务器响应数据回来以后,会执行这个回调函数
    return response.data
  },
  (err) => {
    //失败的回调函数,服务器响应数据回来以后,会执行这个回调函数

    let message = ''
    let status = err.response.status

    switch (status) {
      case 401:
        message = 'token过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
    }
    console.log(err)
    // 提示错误信息     ElMessage.error(message)
    ElMessage({ type: 'error', message })
    // 返回错误信息,对外抛出错误信息(暴露)
    return Promise.reject(new Error(err))
  },
)

export default request
