import axios from 'axios'


export const baseDomain = 'http://localhost:8000'


const baseUrl = `${baseDomain}/api`

export default axios.create({
  baseURL: baseUrl,
})
