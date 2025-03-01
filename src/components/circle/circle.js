import React from 'react'

import './circle.css'

function Circle(props) {
  function getClass(score) {
    let c = ''
    c = score <= 3 ? 'low' : c
    c = score > 3 && score < 5 ? 'middle' : c
    c = score > 7 ? 'huge' : c

    return c
  }
  const { voteAverage } = props
  const score = voteAverage.toFixed(1)
  const newClass = getClass(score)

  const classScore = `circle ${newClass}`

  return (
    <div className={classScore}>
      <span>{score}</span>
    </div>
  )
}

export default Circle
