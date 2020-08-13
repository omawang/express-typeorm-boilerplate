import axios from 'axios'

const apiExternal = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
})

// Add a response interceptor
apiExternal.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export default apiExternal
