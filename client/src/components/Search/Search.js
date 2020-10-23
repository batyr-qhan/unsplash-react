import React, { Component, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './search.scss'

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

const Search = ({ unsplash }) => {

  const reduxPhotos = useSelector(state => state.photos)
  const collections = useSelector(state => state.collections)
  const dispatch = useDispatch()

  const [value, setValue] = useState('')

  useEffect(() => {
    unsplash.collections
      .listCollections(1, 8, 'popular')
      .then(toJson)
      .then((json) => {
        dispatch(addCollections(json))
      })
  }, [dispatch])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value)
    unsplash.search.photos(value, 1, 10, { orientation: 'portrait', color: 'green' })
      .then(toJson)
      .then(json => {
        console.log(json)
        dispatch(addPhotos(json))
        // Your code
      })
  }

  return (
    <div className='search'>
      <div className='search__panel panel'>
        <div className="panel__inner">
          <form onSubmit={handleSubmit}>
            <input className='panel__input' placeholder='Search' onChange={handleChange}/>
          </form>
          <img className="panel__line" src={line} alt="line"/>
          <ul className="panel__collections">
            {collections.map((item) => {
              return (
                <li key={item.id} onClick={() => {
                  unsplash.collections
                    .getCollectionPhotos(item.id, 1, 9, 'popular')
                    .then(toJson)
                    .then((json) => {
                      // console.log(json);
                      dispatch(addPhotos(json))
                    })
                }}>
                  {item.title}
                </li>
              )
            })}
          </ul>
        </div>

      </div>

      <div className='container'>
        <div className="search__inner">

          <ul className="search__list">
            {reduxPhotos.map((item) => {
              return (
                <li key={item.id} className="search__photo photo">
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

Search.propTypes = {
  unsplash: PropTypes.object
}

export default Search
