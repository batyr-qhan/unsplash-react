import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './home.scss'

// Images
import { ReactComponent as FavoriteIcon } from '../../images/favoriteIcon.svg'
import downloadIcon from '../../images/download_24px_rounded.svg'
import maximizeIcon from '../../images/maximize-2.svg'
import line from '../../images/Line.png'
import { Link } from 'react-router-dom'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { toJson } from 'unsplash-js'

//Actions
import { addPhotos, addToFavorites, removeFromFavorites } from '../../actions/photoActions'

// Components

import PhotoList from '../PhotoList/PhotoList'

const Home = ({ unsplash }) => {

  const reduxPhotos = useSelector(state => state.photos)
  const favorites = useSelector(state => state.favorites)
  const dispatch = useDispatch()

  return (
    <div className='home'>

      {/*<div className='home__search search'>*/}
      {/*  <div className="search__inner">*/}
      {/*    <h1>Поиск</h1>*/}
      {/*    <img className="search__line" src={line} alt="line"/>*/}
      {/*    <ul className="search__collections">*/}
      {/*      {collections.map((item) => {*/}
      {/*        return (*/}
      {/*          <li>*/}
      {/*            <Link to="/">{item.title}</Link>*/}
      {/*          </li>*/}
      {/*        )*/}
      {/*      })}*/}
      {/*    </ul>*/}
      {/*  </div>*/}

      {/*</div>*/}

      <div className='container'>
        <PhotoList photos={reduxPhotos} favorites={favorites} dispatch={dispatch}/>
      </div>
    </div>

  )
}

Home.propTypes = {
  unsplash: PropTypes.object
}

export default Home
