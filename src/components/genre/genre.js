import React from 'react'

import StoreContext from '../context'

function Genre(props) {
  const { filmGenre } = props
  const arr = []

  return (
    <StoreContext.Consumer>
      {(value) => {
        value.forEach((elem) => {
          filmGenre.forEach((g) => {
            if (elem.id === g) {
              arr.push(elem.name)
            }
            return arr
          })
        })
        const element = arr.map((genre) => <GenreBtn genre={genre} />)
        return <div>{element}</div>
      }}
    </StoreContext.Consumer>
  )
}

export default Genre

function GenreBtn(props) {
  const { genre } = props

  return <input type="button" value={genre} />
}
