import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
})

instance.defaults.headers.common.Authorization =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkyOWMwZDc1YzE1YTk5MjJiYTk0YmQ3YmYxZTM5OSIsIm5iZiI6MTczNzM2ODYxNi41NjgsInN1YiI6IjY3OGUyNDI4ODgwZjZiZDM4NDZlMjViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXtKxIJlZ6CvdmR9NdYoCXh2Xkhk61xjSITaAB4GB1E'

export default instance
