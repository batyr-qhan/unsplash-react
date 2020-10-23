import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './history.scss'

// Images
import { ReactComponent as FavoriteIcon } from '../../images/favoriteIcon.svg'
import downloadIcon from '../../images/download_24px_rounded.svg'
import maximizeIcon from '../../images/maximize-2.svg'
import line from '../../images/Line.png'
import { Link } from 'react-router-dom'

// Hooks
import { useSelector, useDispatch } from 'react-redux'
import { toJson } from 'unsplash-js'

//Action
import { addPhotos, addCollections } from '../../actions/photoActions'

const History = ({ unsplash }) => {

  const reduxPhotos = useSelector(state => state.photos)
  const collections = useSelector(state => state.collections)
  const dispatch = useDispatch()

  // const [collections, setCollections] = useState([])
  const [photos, setPhotos] = useState([])

  return (
    <div className='history'>
      <div className='history__panel panel'>
        <div className="panel__inner">
          <h1>Search history</h1>
          <img className="panel__line" src={line} alt="line"/>
          <ul className="panel__collections">
            {collections.map((item) => {
              return (
                <li>
                  <Link to="/">{item.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>

      </div>

      <div className='container'>
        <div className="history__inner">

          <ul className="history__list">
            {reduxPhotos.map((item) => {
              return (
                <li key={item.id} className="history__photo photo">
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
                      {/*{(() => {*/}
                      {/*  if (*/}
                      {/*    this.props.favoritesArray.some(*/}
                      {/*      (el) => el.id === item.id*/}
                      {/*    )*/}
                      {/*  ) {*/}
                      {/*    return (*/}
                      {/*      <FavoriteIcon*/}
                      {/*        className="likeIcon"*/}
                      {/*        onClick={() => {*/}
                      {/*          this.props.removeFavorites(item)*/}
                      {/*        }}*/}
                      {/*        style={{fill: 'red'}}*/}
                      {/*      />*/}
                      {/*    )*/}
                      {/*  } else*/}
                      {/*    return (*/}
                      {/*      <FavoriteIcon*/}
                      {/*        className="likeIcon"*/}
                      {/*        onClick={() => {*/}
                      {/*          this.props.addFavorites(item)*/}
                      {/*        }}*/}
                      {/*        style={{fill: 'white'}}*/}
                      {/*      />*/}
                      {/*    )*/}
                      {/*})()}*/}
                      <a href={`photo/${item.id}`}>
                        <img src={maximizeIcon} alt="maximize"/>
                      </a>
                      <img src={downloadIcon} alt="download"/>{' '}
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

History.propTypes = {
  unsplash: PropTypes.object
}

export default History
