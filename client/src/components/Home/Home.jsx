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
        <div className="home__inner">
          <ul className="home__list">
            {reduxPhotos.map((item) => {
              return (
                <li key={item.id} className="home__photo photo">
                  <img src={item.urls.small} alt="" className="photo__image"/>
                  <div className="photo__overlay">
                    <img
                      src={item.user.profile_image.medium}
                      alt="avatar"
                      className="photo__avatar"
                    />
                    <p className="photo__fullname">
                      {item.user.first_name} {item.user.last_name}
                    </p>
                    <p className="photo__username">@{item.user.username}</p>
                    <div className="photo__icons">
                      <div>
                        {(() =>
                            (
                              favorites.some(
                                (el) => el.id === item.id
                              )
                            ) ? (
                                <FavoriteIcon style={{ fill: 'red' }} onClick={() => {
                                  dispatch(removeFromFavorites(item))
                                }}/>
                              ) :
                              <FavoriteIcon style={{ fill: 'white' }} onClick={() => {
                                console.log('sdfsdfsdfsdf')
                                dispatch(addToFavorites(item))
                              }}/>

                        )()}


                        {/*<FavoriteIcon style={{ fill: 'white' }} onClick={() => {*/}
                        {/*  console.log('sdfsdfsdfsdf')*/}
                        {/*  dispatch(addToFavorites(item))*/}
                        {/*}}/>*/}
                      </div>

                      <div>
                        <a href={`photo/${item.id}`}>
                          <img src={maximizeIcon} alt="maximize"/>
                        </a>
                      </div>
                      <div>
                        <img src={downloadIcon} alt="download"/>{' '}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>

  )
}

Home.propTypes = {
  unsplash: PropTypes.object
}

export default Home
