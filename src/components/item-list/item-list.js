import React from 'react'
import { Alert } from 'antd'

import './item-list.css'
import Item from '../item/item'
import Loading from '../loading'

function ItemList(props) {
  let newArr = []
  const { films, loading, error, onVote, guestId, tab, ratedFilms } = props

  if (ratedFilms) {
    ratedFilms.forEach((ratedFilm) => {
      newArr = films.map((film) => {
        if (ratedFilm.id === film.id) {
          film.myrating = ratedFilm.rating
        }
        return film
      })
    })
  }

  let newFilms = []
  if (tab === 'Search' && ratedFilms) {
    newFilms = newArr
  }
  if (tab === 'Rated') {
    newFilms = ratedFilms
  } else {
    newFilms = films
  }

  if (error) {
    return (
      <Alert
        message="Кина не будет"
        description="Простите, ничего не получилось, хотя мы очень старались"
        type="error"
      />
    )
  }

  const element = newFilms.map((film) => (
    <Item
      ratedFilms={ratedFilms}
      key={film.id}
      poster={film.backdrop_path}
      title={film.title}
      overview={film.overview}
      time={film.release_date}
      filmGenre={film.genre_ids}
      voteAverage={film.vote_average}
      onVote={onVote}
      guestId={guestId}
      mooviId={film.id}
      myRating={film.rating}
      newRating={film.myrating}
      tab={tab}
    />
  ))

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Alert message="Warning Text" type="warning" />
  }
  return (
    <div className="wrap">
      <ul className="wrapper">{element}</ul>
    </div>
  )
}

export default ItemList
