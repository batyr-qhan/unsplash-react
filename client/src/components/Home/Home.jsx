import React, {Component, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import './home.scss'

import {ReactComponent as FavoriteIcon} from '../../images/favoriteIcon.svg'

import downloadIcon from '../../images/download_24px_rounded.svg'
import maximizeIcon from '../../images/maximize-2.svg'
import line from '../../images/Line.png'
import {Link} from 'react-router-dom'
import {toJson} from 'unsplash-js'

const Home = ({unsplash}) => {

  // const [collections, setCollections] = useState([])
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    // unsplash.collections
    //   .listCollections(1, 8, 'popular')
    //   .then(toJson)
    //   .then((json) => {
    //     // console.log(json);
    //     setCollections(json)
    //   })

    unsplash.photos
      .listPhotos(2, 15, 'latest')
      .then(toJson)
      .then((json) => {
        setPhotos(json)

      })
  }, [photos])

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

          <ul className="photoList">
            {photos.map((item) => {
              return (
                <li key={item.id} className="photoContainer">
                  <img src={item.urls.small} alt="" className="image"/>
                  <div className="overlay">
                    <img
                      src={item.user.profile_image.medium}
                      alt="avatar"
                      className="avatar"
                    />
                    <p className="userFullname">
                      {item.user.first_name} {item.user.last_name}
                    </p>
                    <p className="username">@{item.user.username}</p>
                    <div className="iconsContainer">
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

Home.propTypes = {
  unsplash: PropTypes.string
}

export default Home
