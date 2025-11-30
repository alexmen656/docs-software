import axios from 'axios'

//const isDevelopment = import.meta.env.DEV || !import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: 'http://localhost:2323', //isDevelopment ? 'http://localhost:2323' : (import.meta.env.VITE_API_URL || 'https://alex.polan.sk/control-center/cloud/'),
  /*headers: {
    Authorization: `Bearer ${localStorage.getItem('auth_token') || ''}`,
  },*/
})

export default axiosInstance
