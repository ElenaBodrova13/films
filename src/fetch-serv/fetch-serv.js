export default class FetchApi {
  urlBase = 'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US'

  keyApi = '03929c0d75c15a9922ba94bd7bf1e399'

  mainUrl = 'https://api.themoviedb.org/3/'

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

  getAllRes = async () => {
    const result = await this.getRes(`${this.urlBase}&page=1`)
    return result.results
  }

  async getResPerPage(page) {
    const result = await this.getRes(`${this.urlBase}&page=${page}`)

    return result
  }

  getSearchRes = async (page, search) => {
    const result = await this.getRes(
      `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`
    )

    return result
  }

  async getGenre(url) {
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

  getAllGenre = async () => {
    const result = await this.getGenre('https://api.themoviedb.org/3/genre/movie/list?language=en')

    return result
  }

  async gestReqwest() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkyOWMwZDc1YzE1YTk5MjJiYTk0YmQ3YmYxZTM5OSIsIm5iZiI6MTczNzM2ODYxNi41NjgsInN1YiI6IjY3OGUyNDI4ODgwZjZiZDM4NDZlMjViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXtKxIJlZ6CvdmR9NdYoCXh2Xkhk61xjSITaAB4GB1E',
      },
    }

    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
    const body = await res.json()

    return body.guest_session_id
  }

  postRating = async (guestId, movieId, value) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: `{"value": ${value}}`,
    }

    const response = await fetch(
      `${this.mainUrl}movie/${movieId}/rating?api_key=${this.keyApi}&guest_session_id=${guestId}`,
      options
    )
    const body = await response.json()

    return body
  }

  getMoviesWithRating = async (sessionId, page = 1) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMzkyOWMwZDc1YzE1YTk5MjJiYTk0YmQ3YmYxZTM5OSIsIm5iZiI6MTczNzM2ODYxNi41NjgsInN1YiI6IjY3OGUyNDI4ODgwZjZiZDM4NDZlMjViNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qXtKxIJlZ6CvdmR9NdYoCXh2Xkhk61xjSITaAB4GB1E',
      },
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,

      options
    )

    const body = await response.json()

    return body
  }
}
FetchApi.defaultProps = {
  search: 'return',
}
