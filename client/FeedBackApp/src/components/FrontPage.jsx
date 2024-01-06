import React from 'react'
import PositiveComments from './PositiveComment/PositiveComments'
import LatestPosts from './LatestPosts/LatestPosts'

function FrontPage() {
  return (
    <div>
        <LatestPosts />
       <PositiveComments />

    </div>
  )
}

export default FrontPage
