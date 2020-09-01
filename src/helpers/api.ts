import axios from 'axios'

export const apiPaypoin = axios.create({
  baseURL: process.env.PAYPOIN_API_URL,
})

// Add a response interceptor
// apiPaypoin.interceptors.response.use(
//   (response) => response.data,
//   (error) => Promise.reject(error)
// )

export const apiMoota = axios.create({
  baseURL: process.env.MOOTA_API_URL,
})