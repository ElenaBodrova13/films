import React, { Component } from 'react'
import { Pagination, Alert } from 'antd'

import debounce from '../../debounce'
import './header.css'
import FetchApi from '../../fetch-serv/fetch-serv'
import ItemList from '../item-list/item-list'
import StoreContext from '../context'
import Pages from '../pages'

class Header extends Component {
  feychApi = new FetchApi()

  debonsed = debounce((page, searchText) => this.onSearch(page, searchText), 3000)

  state = {
    searchText: 'return',
    films: [],
    error: false,
    loading: true,

    currentPage: [1],
    totalPages: [10],
    newTotalPages: [10],
    genres: [],
    guestId: '',
    tab: 'Search',
    ratedFilms: [],
    post: false,
  }

  componentDidMount() {
    this.onSearch(1, 'return')
    this.onGenre()
    this.setGestId()
  }

  onVote = (guestId, mooviId, value) => {
    this.feychApi.postRating(guestId, mooviId, value).then(() =>
      this.setState({
        post: true,
      })
    )
  }

  onTabCange = (key) => {
    const { post } = this.state

    if (key === 'Rated' && post) {
      this.getRatedFilms()
    }
    this.setState({
      tab: key,
      post: false,
    })
  }

  onGenre() {
    this.feychApi.getAllGenre().then((genre) => {
      if (!genre) {
        this.onError()
      }
      this.setState({
        genres: genre,
      })
    })
  }

  onSearch(page, search) {
    this.feychApi.getSearchRes(page, search).then((films) => {
      if (!films.results) {
        this.onError()
      }

      this.setState({
        films: films.results,
        totalPages: films.total_pages,

        loading: false,
      })
    })
  }

  getRatedFilms = () => {
    const { guestId } = this.state
    this.feychApi.getMoviesWithRating(guestId).then((films) => {
      if (!films.results) {
        this.onError()
      }

      this.setState({
        ratedFilms: films.results,
        newTotalPages: films.total_pages,
      })
    })
  }

  onError = () => {
    this.setState({
      error: true,
    })
  }

  onImputChange = (e) => {
    this.setState({ searchText: e.target.value })
    const { searchText, currentPage } = this.state

    this.debonsed(currentPage, searchText)
  }

  setGestId() {
    this.feychApi
      .gestReqwest()
      .then((res) => {
        this.setState({
          guestId: res,
        })
      })
      .catch(this.onError)
  }

  pagination = (page, text) => {
    this.setState(() => {
      const newPage = [page]
      return { currentPage: newPage }
    })

    this.onSearch(page, text)
  }

  render() {
    const {
      searchText,
      films,
      currentPage,
      totalPages,
      error,
      loading,
      genres,
      guestId,
      tab,
      ratedFilms,
      newTotalPages,
    } = this.state

    const alert = films.length === 0 ? <Alert message="Фильмов по запросу не найдено" /> : null
    const imp =
      tab === 'Search' ? (
        <input
          className="header_input"
          type="search"
          placeholder="Type to search..."
          onChange={this.onImputChange}
          value={searchText}
        />
      ) : null
    return (
      <>
        <div className="header">
          <Pages onTabCange={this.onTabCange} />

          {imp}
        </div>

        <StoreContext.Provider value={genres.genres}>
          {alert}
          <ItemList
            films={films}
            loading={loading}
            error={error}
            onVote={this.onVote}
            guestId={guestId}
            tab={tab}
            ratedFilms={ratedFilms}
          />

          <Pagination
            align="center"
            onChange={(page) => this.pagination(page, searchText)}
            current={currentPage}
            total={tab === 'Search' ? totalPages : newTotalPages}
            pageSize={20}
          />
        </StoreContext.Provider>
      </>
    )
  }
}

export default Header

Header.defaultProps = {
  page: 1,
}
