import axios from "axios"
import {API_URL} from "../constants"
import store from '../redux/configureStore'
class AxiosService {
  constructor() {
    const instance = axios.create({
      baseURL: API_URL
    })
    instance.interceptors.request.use(
      (config) => {
        const state = store.getState()
        console.log(state.account)
        const token = state.account.token
        config.headers.Authorization = token
        return config
      }
    )
    this.instance = instance
  }

  get(url) {
    return this.instance.get(url);
  }

  post(url, body) {
    return this.instance.post(url, body);
  }

  put(url, body) {
    return this.instance.put(url, body);
  }

  delete(url) {
    return this.instance.delete(url);
  }
}

export default new AxiosService()