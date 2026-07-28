import axios from 'axios'

const apiClient = axios.create({
  // Sesuaikan port 8000 ini dengan port server Laravel kamu
  baseURL: 'http://localhost:8000/api', 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export default apiClient