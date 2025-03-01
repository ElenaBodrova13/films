import React from 'react'
import './item.css'
import { parseISO, format } from 'date-fns'

import reduseText from '../../reduseText'
import Loading from '../loading'
import Stars from '../stars'
import Genre from '../genre'
import Circle from '../circle'

function Item(props) {
  const {
    title,
    overview,
    poster,
    time,
    filmGenre,
    voteAverage,
    onVote,
    guestId,
    mooviId,
    myRating,
    tab,

    newRating,
  } = props

  let newDate = time
  if (time === '') {
    newDate = '2023-09-26'
  }
  const imageWuer = poster ? (
    <Image poster={poster} />
  ) : (
    <div className="image">
      {' '}
      <Loading />
    </div>
  )

  return (
    <li className="moovi">
      {imageWuer}
      <div className="desribe">
        <div className="title">
          <h5>{title}</h5>
          <Circle voteAverage={voteAverage} />
        </div>
        <p className="data">{format(parseISO(newDate), 'PP')}</p>
        <Genre filmGenre={filmGenre} />

        <p>{reduseText(overview)}</p>
        <div className="starsContainer">
          <Stars
            onVote={onVote}
            guestId={guestId}
            mooviId={mooviId}
            myRating={myRating}
            tab={tab}
            newRating={newRating}
          />
        </div>
      </div>
    </li>
  )
}
export default Item

function Image(props) {
  const { poster } = props

  return (
    <div className="image">
      <img alt="imege" src={`https://image.tmdb.org/t/p/original${poster}`} />
    </div>
  )
}
