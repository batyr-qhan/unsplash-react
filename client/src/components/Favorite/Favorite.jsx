import React from 'react'

//Icons

import favoriteIcon from '../../images/favoriteIcon.svg'
import downloadIcon from '../../images/download_24px_rounded.svg'
import maximizeIcon from '../../images/maximize-2.svg'

import { useSelector, useDispatch } from 'react-redux'
import PhotoList from '../PhotoList/PhotoList'

export default function Favorite (props) {

  const favorites = useSelector(state => state.favorites)
  const dispatch = useDispatch()

  return (
    <div>
      <PhotoList photos={favorites} favorites={favorites} dispatch={dispatch}/>
    </div>

  )
}
