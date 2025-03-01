import React, { Component } from 'react'
import { Rate } from 'antd'

class Stars extends Component {
  onStarChange = (val) => {
    const { onVote, guestId, mooviId } = this.props

    onVote(guestId, mooviId, val)
  }

  render() {
    const { myRating, tab, newRating } = this.props
    const rating = tab === 'Search' ? newRating : myRating

    return <Rate onChange={(value) => this.onStarChange(value)} value={rating} count={10} className="stars" />
  }
}
export default Stars
