import instance from './instans'

export default class FetchApi {
  async getRes(url) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkyOWMwZDc1YzE1YTk5MjJiYTk0YmQ3YmYxZTM5OSIsIm5iZiI6MTczNzM2ODYxNi41NjgsInN1YiI6IjY3OGUyNDI4ODgwZjZiZDM4NDZlMjViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXtKxIJlZ6CvdmR9NdYoCXh2Xkhk61xjSITaAB4GB1E',
      },
    }
    const res = await fetch(url, options)

    const body = await res.json()

    return body
  }

  async getResPerPage(page) {
    const res = await instance.get(`search/movie?query=return&include_adult=false&language=en-US&page=${page}`, {})

    return res.data
  }

  getSearchRes = async (page, search) => {
    const res = await instance.get(`search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, {})

    return res.data
  }

  getAllGenre = async () => {
    const res = await instance.get('genre/movie/list?language=en', {})

    return res.data
  }

  async gestReqwest() {
    const res = await instance.get('authentication/guest_session/new', {})

    return res.data.guest_session_id
  }

  postRating = async (guestId, movieId, value) => {
    const res = await instance.post(`movie/${movieId}/rating?api_key=${this.keyApi}&guest_session_id=${guestId}`, {
      value,
    })

    return res.data
  }

  getMoviesWithRating = async (sessionId, page = 1) => {
    const res = await instance.get(
      `guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      {}
    )

    return res.data
  }
}
FetchApi.defaultProps = {
  search: 'return',
}
