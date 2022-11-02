import axios from "axios"
import store from "@/store"

const require = axios.create({
  baseURL: 'https://lianghj.top:8888/api/private/v1/',
  headers: {
    Authorization: window.sessionStorage.getItem('token')
  }
})


const require1 = axios.create({
  baseURL: 'http://gmall-h5-api.atguigu.cn'
})

export default {
  require,
  require1
}