import axios from 'axios'

const baseURL = axios.create({
  baseURL: 'https://kodepos-2d475.firebaseio.com/'
})

export default baseURL
